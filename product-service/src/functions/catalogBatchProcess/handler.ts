import AWS from 'aws-sdk';
import { middyfy } from '@libs/lambda';
import { InputProduct, REGION } from '../../types/types';
import { addProductToDB } from '../../components/data.component';
import { SQSEvent } from 'aws-lambda';

export const catalogBatchProcess = async (event: SQSEvent): Promise<void> => {
  try {
    console.log('catalogBatchProcess start');
    const InputProducts: InputProduct[] = event.Records.map(({ body }) => JSON.parse(body));
    console.log('Input products:', InputProducts);

    for (const product of InputProducts) {
      await addProductToDB(product);
    }

    const sns = new AWS.SNS({ region: REGION });
    sns.publish(
      {
        Subject: 'Product added',
        Message: JSON.stringify(InputProducts),
        TopicArn: process.env.SNS_ARN,
      },
      (err) => {
        if (err) {
          throw err;
        }
        console.log('SNS sent with message:', InputProducts);
      },
    );
  } catch (e) {
    console.log('ERROR in catalogBatchProcess', e);
  }
};

export const main = middyfy(catalogBatchProcess);
