import { mock } from 'aws-sdk-mock';
import { catalogBatchProcess } from '@functions/catalogBatchProcess/handler';
import { SQSEvent } from 'aws-lambda';
import * as dataFunctions from '../components/data.component';

const snsPublishMock = jest.fn().mockImplementation(() => Promise.resolve());

const sqsEventMockOneProduct: SQSEvent = {
  Records: [
    {
      body: '{"title":"Name18","description":"project18","price":"29","count":"38"}',
    },
  ],
} as any;

const sqsEventMockTwoProducts: SQSEvent = {
  Records: [
    {
      body: '[{"title":"Name18","description":"project18","price":"29","count":"38"},{"title":"Name18","description":"project18","price":"29","count":"38"}]',
    },
  ],
} as any;

jest.spyOn(dataFunctions, 'addProductToDB').mockReturnValue(null);

describe('catalogBatchProcess lambda should work correct', () => {
  test('catalogBatchProcess should emmit SNS publish one time with one product', async () => {
    console.log = jest.fn();
    mock('SNS', 'publish', snsPublishMock);

    await catalogBatchProcess(sqsEventMockOneProduct);

    expect(snsPublishMock).toBeCalled();
    expect(snsPublishMock).toBeCalledTimes(1);
  });

  test('catalogBatchProcess should emmit SNS publish 2 times with 2 products', async () => {
    console.log = jest.fn();
    mock('SNS', 'publish', snsPublishMock);

    await catalogBatchProcess(sqsEventMockTwoProducts);

    expect(snsPublishMock).toBeCalled();
    expect(snsPublishMock).toBeCalledTimes(2);
  });
});
