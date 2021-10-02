export interface LambdaResponse {
  headers?: Record<string, string>;
  statusCode: number;
  body?: string;
}
