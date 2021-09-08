import { PostParams, Product } from '../types/types';
import { NotFoundError, ValidationError } from '../utils/errors';
import { Client, ClientConfig, QueryResult } from 'pg';
import validator from 'validator';

const { DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASS } = process.env;

const dbConfig: ClientConfig = {
  host: DB_HOST,
  port: +DB_PORT,
  database: DB_DATABASE,
  user: DB_USER,
  password: DB_PASS,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 5000,
};

const executeQuery = async <T>(query: string, params: string[] = []): Promise<QueryResult<T>> => {
  const client = new Client(dbConfig);
  try {
    await client.connect();
    return await client.query<T>(query, params);
  } finally {
    await client.end();
  }
};

export const getAllProducts = async (): Promise<Product[]> => {
  const query = 'SELECT * FROM products p join stocks s on p.id = s.product_id';
  const res = await executeQuery<Product>(query);
  return res.rows;
};

export const getProduct = async (id: string): Promise<Product> => {
  const query = 'SELECT * FROM products p join stocks s on p.id = s.product_id WHERE id=$1';
  const res = await executeQuery<Product>(query, [id]);

  const product = res.rows[0];
  if (!product) {
    throw new NotFoundError(`Product with id = ${id} not found`);
  }

  return product;
};

const validateParams = (params: PostParams): void => {
  const { price, count } = params;
  if (!validator.isInt(String(price))) {
    throw new ValidationError(`Price should be integer - ${price}`);
  }
  if (!validator.isInt(String(count))) {
    throw new ValidationError(`Count should be integer - ${count}`);
  }
};

// TODO: refactor this method
export const addProductToDB = async (params: PostParams): Promise<void> => {
  validateParams(params);
  const { title, price, description, count } = params;

  const client = new Client(dbConfig);

  try {
    await client.connect();
    await client.query('BEGIN');
    const queryAddProduct = `INSERT INTO products(title, description, price)
                             VALUES ($1, $2, $3)
                             RETURNING id`;
    const res = await client.query<Product>(queryAddProduct, [title, description, String(price)]);

    const queryAddCount = `INSERT INTO stocks(product_id, count)
                           VALUES ($1, $2)`;
    await client.query(queryAddCount, [res.rows[0]?.id, String(count)]);
    await client.query('COMMIT');
  } finally {
    await client.end();
  }
};
