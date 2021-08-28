import 'source-map-support/register';

import { middyfy } from '@libs/lambda';
import {getProduct} from "../../components/data.component";
import {formatJSONResponse} from "@libs/apiGateway";

const getProductById = async (event) => {
    const product = await getProduct(event.pathParameters.productId);
    return formatJSONResponse(product)
}

export const main = middyfy(getProductById);
