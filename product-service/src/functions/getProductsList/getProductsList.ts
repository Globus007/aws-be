import 'source-map-support/register';

import { middyfy } from '@libs/lambda';
import { getAllProducts } from '../../components/data.component';
import { formatJSONResponse } from '@libs/apiGateway';

const getProductList = async () => {
  console.log('getProductList lambda is running');
  try {
    const products = await getAllProducts();
    return formatJSONResponse(200, products);
  } catch (e) {
    return formatJSONResponse(500, e?.message);
  }
};

export const main = middyfy(getProductList);
