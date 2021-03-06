export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
}

export interface PostParams {
  title: string;
  description?: string;
  price: number;
  count: number;
}
