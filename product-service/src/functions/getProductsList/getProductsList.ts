import 'source-map-support/register';

import { middyfy } from '@libs/lambda';
import { getAllProducts } from '../../components/data.component';
import { formatJSONResponse } from '@libs/apiGateway';

const getProductList = async () => {
  const products = await getAllProducts();
  return formatJSONResponse(200, products);
};

export const main = middyfy(getProductList);
