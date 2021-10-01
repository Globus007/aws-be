import { addProductToDB } from '../../components/data.component';
import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { ValidationError } from '../../utils/errors';
import schema from '@functions/addProduct/schema';
import { PostParams } from '../../types/types';

const addProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const params = event.body as PostParams;
  console.log(`addProductToDB lambda is running with params = ${params}`);

  try {
    await addProductToDB(params);
    return formatJSONResponse(201, 'Product created');
  } catch (e) {
    if (e instanceof ValidationError) {
      return formatJSONResponse(400, e?.message);
    }
    return formatJSONResponse(500, e?.message);
  }
};

export const main = middyfy(addProduct);
