import { InputProduct, Product } from '../types';
import { NotFoundError } from '../utils/errors';
import { Client, ClientConfig, QueryResult } from 'pg';

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
  const query = `SELECT id, title, description, price, count
                 FROM products p
                          join stocks s on p.id = s.product_id`;
  const { rows: products } = await executeQuery<Product>(query);
  return products;
};

export const getProduct = async (id: string): Promise<Product> => {
  const query = `SELECT id, title, description, price, count
                 FROM products p
                          join stocks s on p.id = s.product_id
                 WHERE id = $1`;
  const {
    rows: [product],
  } = await executeQuery<Product>(query, [id]);

  if (!product) {
    throw new NotFoundError(`Product with id = ${id} not found`);
  }

  return product;
};

export const addProductToDB = async (params: InputProduct): Promise<void> => {
  console.log('addProductToDB', params);
  const { title, price, description, count } = params;

  const client = new Client(dbConfig);

  try {
    await client.connect();
    await client.query('BEGIN');
    const queryAddProduct = `INSERT INTO products(title, description, price)
                             VALUES ($1, $2, $3)
                             RETURNING id`;
    const {
      rows: [product],
    } = await client.query<Product>(queryAddProduct, [title, description, String(price)]);

    const queryAddCount = `INSERT INTO stocks(product_id, count)
                           VALUES ($1, $2)`;
    await client.query(queryAddCount, [product?.id, String(count)]);
    await client.query('COMMIT');
    console.log('Product added to DB', product);
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    await client.end();
  }
};
