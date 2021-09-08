import { Product } from '../types/types';
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
