import { Product } from '../types/types';
import products from '../products.json';
import { NotFoundError } from '../utils/errors';

export const getAllProducts = async (): Promise<Product[]> => {
  return products as unknown as Product[];
};

export const getProduct = async (id: number): Promise<Product> => {
  const product: Product = products[id] as unknown as Product;
  if (!product) {
    throw new NotFoundError(`Product with id = ${id} not found`);
  }
  return product;
};
