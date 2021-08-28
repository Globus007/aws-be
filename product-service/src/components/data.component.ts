import {Product} from "../types/types";
import products from '../products.json';

export const getAllProducts = async (): Promise<Product[]> => {
    return (products as unknown) as Product[];
}

export const getProduct = async (id: number): Promise<Product> => {
    return (products[id] as unknown) as Product;
}