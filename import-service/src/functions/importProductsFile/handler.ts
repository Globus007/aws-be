import 'source-map-support/register';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import * as AWS from 'aws-sdk';
import { BUCKET, LambdaResponse, REGION, UPLOADED_FOLDER } from '../../types/types';
import { APIGatewayProxyEvent } from 'aws-lambda';

export const importProductsFile = async (event: APIGatewayProxyEvent): Promise<LambdaResponse> => {
  try {
    const { name } = event.queryStringParameters;

    const s3: AWS.S3 = new AWS.S3({ region: REGION });
    const s3Params = {
      Bucket: BUCKET,
      Key: `${UPLOADED_FOLDER}/${name}`,
      ContentType: 'text/csv',
    };

    const uploadUrl = await s3.getSignedUrlPromise('putObject', s3Params);

    return formatJSONResponse(200, uploadUrl);
  } catch (e) {
    return formatJSONResponse(500, e?.message);
  }
};

export const main = middyfy(importProductsFile);
