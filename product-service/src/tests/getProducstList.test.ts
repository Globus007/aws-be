import { main } from "@functions/getProductsList/getProductsList";

describe('Lambda getProductsList() should work correct', () => {
    test('Lambda getProductsList() should return string in body', async () => {
        // @ts-ignore
        const response = await main({});
        // @ts-ignore
        expect(typeof response.body).toBe('string');
    });

    test('Lambda getProductsList() should return correct status', async () => {
        // @ts-ignore
        const response = await main({});
        // @ts-ignore
        expect(response.statusCode).toBe(200);
    });

})