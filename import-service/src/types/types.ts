export const REGION = 'eu-west-1';
export const BUCKET = 'aws-task5';
export const UPLOADED_FOLDER = 'uploaded';
export const PARSED_FOLDER = 'parsed';

export interface LambdaResponse {
  headers?: Record<string, string>;
  statusCode: number;
  body?: string;
}

export interface InputProduct {
  title: string;
  description?: string;
  price: number;
  count: number;
}
