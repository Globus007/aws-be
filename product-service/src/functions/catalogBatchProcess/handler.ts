import { SNS } from 'aws-sdk';
import { middyfy } from '@libs/lambda';
import { InputProduct, REGION } from '../../types';
import { SQSEvent } from 'aws-lambda';
import { MessageAttributeMap } from 'aws-sdk/clients/sns';
import { addProductToDB } from '../../components/data.component';

export const catalogBatchProcess = async (event: SQSEvent): Promise<void> => {
  try {
    console.log('catalogBatchProcess. Event:', event);
    const InputProducts: InputProduct[] = event.Records.map(({ body }) => JSON.parse(body));
    console.log('catalogBatchProcess. Products:', InputProducts);
    const sns = new SNS({ region: REGION });

    for (const product of InputProducts) {
      await addProductToDB(product);

      const snsParams = prepareSNSParams(product);
      await sns.publish(snsParams).promise();

      console.log('SNS has been sent for product', product);
    }
  } catch (e) {
    console.error('ERROR in catalogBatchProcess', e);
  }
};

function prepareSNSParams(product: InputProduct): SNS.Types.PublishInput {
  const TopicArn = process.env.SNS_ARN;
  const Subject = 'Product added';
  const Message = JSON.stringify(product);
  const MessageAttributes: MessageAttributeMap = {
    event: {
      DataType: 'String',
      StringValue: 'product_added',
    },
    product_title: {
      DataType: 'String',
      StringValue: product.title,
    },
  };
  return { TopicArn, Subject, Message, MessageAttributes };
}

export const main = middyfy(catalogBatchProcess);
