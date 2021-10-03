import AWS from 'aws-sdk';
import { middyfy } from '@libs/lambda';
import { InputProduct, REGION } from '../../types/types';
import { SQSEvent } from 'aws-lambda';
import { addProductToDB } from '../../components/data.component';

export const catalogBatchProcess = async (event: SQSEvent): Promise<void> => {
  try {
    console.log('catalogBatchProcess start');
    const InputProducts: InputProduct[] = event.Records.map(({ body }) => JSON.parse(body));
    console.log('Input products:', InputProducts);

    for (const product of InputProducts) {
      await addProductToDB(product);

      console.log('Product added to DB', product);

      const sns = new AWS.SNS({ region: REGION });
      await sns
        .publish({
          Subject: 'Product added',
          Message: JSON.stringify(product),
          TopicArn: process.env.SNS_ARN,
          MessageAttributes: {
            event: {
              DataType: 'String',
              StringValue: 'product_added',
            },
            product_title: {
              DataType: 'String',
              StringValue: product.title,
            },
          },
        })
        .promise();

      console.log('SNS has been sent for product', product);
    }
  } catch (e) {
    console.log('ERROR in catalogBatchProcess', e);
  }
};

export const main = middyfy(catalogBatchProcess);
