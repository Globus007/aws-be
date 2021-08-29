import 'source-map-support/register';

import { middyfy } from '@libs/lambda';
import { getProduct } from '../../components/data.component';
import { formatJSONResponse } from '@libs/apiGateway';

const getProductById = async (event) => {
  const productId = event.pathParameters.productId;
  const product = await getProduct(productId);
  if (!product) {
    return formatJSONResponse(`Product with id = '${productId}' not found`);
  }
  return formatJSONResponse(product);
};

export const main = middyfy(getProductById);
