import { S3, SQS } from 'aws-sdk';
import { BUCKET, LambdaResponse, PARSED_FOLDER, REGION, UPLOADED_FOLDER } from '../../types/types';
import { parseCSVFile } from '../../components/csv-parser';
import { middyfy } from '@libs/lambda';

const importFileParser = async (event): Promise<LambdaResponse> => {
  const s3: S3 = new S3({ region: REGION });

  try {
    for (const record of event.Records) {
      const fileKey = record.s3.object.key;
      const fileParams: S3.GetObjectRequest = { Bucket: BUCKET, Key: fileKey };
      const copyParams: S3.CopyObjectRequest = {
        Bucket: BUCKET,
        CopySource: `${BUCKET}/${fileKey}`,
        Key: fileKey.replace(UPLOADED_FOLDER, PARSED_FOLDER),
      };
      const QueueUrl = process.env.SQS_URL;

      const stream = s3.getObject(fileParams).createReadStream();
      const products = await parseCSVFile(stream);

      const sqs = new SQS();
      for (const product of products) {
        const MessageBody = JSON.stringify(product);
        await sqs.sendMessage({ QueueUrl, MessageBody }).promise();
      }

      await s3.copyObject(copyParams).promise();
      await s3.deleteObject(fileParams).promise();
    }

    console.log('importFileParser: Csv parsed correctly');
    return { statusCode: 200 };
  } catch (e) {
    console.log('importFileParser', e);
    return { statusCode: 500 };
  }
};

export const main = middyfy(importFileParser);
