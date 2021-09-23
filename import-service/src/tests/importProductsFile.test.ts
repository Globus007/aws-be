import { mock, restore } from 'aws-sdk-mock';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { importProductsFile } from '@functions/importProductsFile/handler';

const s3getSignedUrlMock = 'test_signed_url';

const eventMock: APIGatewayProxyEvent = {
  queryStringParameters: {
    name: 'test_name',
  },
} as any;

describe('ImportProductFile lambda should work correct', () => {
  beforeEach(() => {
    mock('S3', 'getSignedUrl', s3getSignedUrlMock);
  });

  afterEach(() => {
    restore();
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  test('ImportProductFile should return correct SignedUrl in body', async () => {
    const result = await importProductsFile(eventMock);
    expect(result.statusCode).toBe(200);
    expect(result.body).toContain('test_signed_url');
  });

  test('ImportProductFile should return statusCode 500 if something wrong', async () => {
    const result = await importProductsFile(null);
    expect(result.statusCode).toBe(500);
  });
});
