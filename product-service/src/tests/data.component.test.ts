import { getAllProducts, getProduct } from '../components/data.component';

describe('data component should work correct', () => {
  test('getAllProducts() should return an Array', async () => {
    const products = await getAllProducts();
    expect(Array.isArray(products)).toBe(true);
  });

  test('getAllProducts() should return not empty Array', async () => {
    const products = await getAllProducts();
    expect(products.length).toBeGreaterThan(0);
  });

  test('getProduct() should return one Product', async () => {
    const product = await getProduct(0);
    expect(product).toBeTruthy();
  });

  test('getProduct() should return correct Object', async () => {
    const product = await getProduct(0);
    expect(product.title).toBe('iPhone 12');
  });
});
