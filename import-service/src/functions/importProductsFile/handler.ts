import 'source-map-support/register';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import * as AWS from 'aws-sdk';

const REGION = 'eu-west-1';
const BUCKET = 'aws-task5';
const PREFIX = 'csv/';

const importProductsFile = async () => {
  const s3: AWS.S3 = new AWS.S3({ region: REGION });
  // const s3 = new S3Client({ region: REGION });
  const params = { Bucket: BUCKET, Prefix: PREFIX };

  try {
    const s3Response = await s3.listObjectsV2(params).promise();

    const response = s3Response.Contents;
    const files = response
      .filter((file) => file.Size)
      .map((file) => `https://${BUCKET}.s3.amazonaws.com/${file.Key}`);

    return formatJSONResponse(200, files);
  } catch (e) {
    return formatJSONResponse(500, e?.message);
  }
};

export const main = middyfy(importProductsFile);
