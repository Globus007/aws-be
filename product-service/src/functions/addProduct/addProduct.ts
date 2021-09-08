import { addProductToDB } from '../../components/data.component';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { ValidationError } from '../../utils/errors';

const addProduct = async (event) => {
  const { title, description, price } = event.body;
  console.log(`addProductToDB lambda is running with title=${title}, description=${description}, price=${price}`);
  try {
    const product = await addProductToDB(title, description, price);
    return formatJSONResponse(201, product);
  } catch (e) {
    if (e instanceof ValidationError) {
      return formatJSONResponse(400, e?.message);
    }
    return formatJSONResponse(500, e?.message);
  }
};

export const main = middyfy(addProduct);
