import { main } from '@functions/getProductsById/getProductById';

describe('Lambda getProductById() should work correct', () => {
  const event = { pathParameters: { productId: 1 } };

  test('Lambda getProductById() should return string in body', async () => {
    // @ts-ignore
    const response = await main(event);
    // @ts-ignore
    expect(typeof response.body).toBe('string');
  });

  test('Lambda getProductById() should return correct status', async () => {
    // @ts-ignore
    const response = await main(event);
    // @ts-ignore
    expect(response.statusCode).toBe(200);
  });

  test('Lambda getProductById() should return correct body', async () => {
    const expectBody = '{"id":2,"title":"iPhone 13","description":"Phone 13, 128 Gb, Black","price":1500}';
    // @ts-ignore
    const response = await main(event);
    // @ts-ignore
    expect(response.body).toBe(expectBody);
  });
});
