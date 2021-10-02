import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { LambdaResponse } from '../../../../import-service/src/types/types';

const catalogBatchProcess = async (event): Promise<LambdaResponse> => {
  const products = event.Records.map(({ body }) => body);
  console.log('Products:', products);
  return formatJSONResponse(200, '');
};

export const main = middyfy(catalogBatchProcess);
