import 'source-map-support/register';
import { middyfy } from '@libs/lambda';
import * as AWS from 'aws-sdk';
import { S3 } from 'aws-sdk';
import { BUCKET, LambdaResponse, PARSED_FOLDER, REGION, UPLOADED_FOLDER } from '../../types/types';
import { parseCSVFile } from '../../components/csv-parser';

const importFileParser = async (event): Promise<LambdaResponse> => {
  const s3: AWS.S3 = new AWS.S3({ region: REGION });

  try {
    for (const record of event.Records) {
      const fileKey = record.s3.object.key;
      const fileParams: S3.GetObjectRequest = { Bucket: BUCKET, Key: fileKey };
      const copyParams: S3.CopyObjectRequest = {
        Bucket: BUCKET,
        CopySource: `${BUCKET}/${fileKey}`,
        Key: fileKey.replace(UPLOADED_FOLDER, PARSED_FOLDER),
      };

      const stream = s3.getObject(fileParams).createReadStream();
      await parseCSVFile(stream);

      await s3.copyObject(copyParams).promise();

      await s3.deleteObject(fileParams).promise();
    }

    return { statusCode: 200 };
  } catch (e) {
    console.log(e);
    return { statusCode: 500 };
  }
};

export const main = middyfy(importFileParser);
