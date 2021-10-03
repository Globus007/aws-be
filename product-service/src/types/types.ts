export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
}

export interface InputProduct {
  title: string;
  description?: string;
  price: number;
  count: number;
}

export const REGION = 'eu-west-1';
