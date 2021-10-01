import 'source-map-support/register';

import { middyfy } from '@libs/lambda';
import { getProduct } from '../../components/data.component';
import { formatJSONResponse } from '@libs/apiGateway';

const getProductById = async (event) => {
  const productId = event.pathParameters.productId;
  console.log(`getProductById lambda is running with id = ${productId}`);
  try {
    const product = await getProduct(productId);
    return formatJSONResponse(200, product);
  } catch (e) {
    return formatJSONResponse(500, e?.message);
  }
};

export const main = middyfy(getProductById);
