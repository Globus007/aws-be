import { mock } from 'aws-sdk-mock';
import { catalogBatchProcess } from '@functions/catalogBatchProcess/handler';
import { SQSEvent } from 'aws-lambda';
import * as dataFunctions from '../components/data.component';

const snsPublishMock = jest.fn().mockImplementation(() => Promise.resolve('SNS sent with message'));

const sqsEventMock: SQSEvent = {
  Records: [
    {
      body: '{"Title":"Name18","Description":"Project18","Price":"29","Count":"38","Action":"post"}',
    },
  ],
} as any;

jest.spyOn(dataFunctions, 'addProductToDB').mockReturnValue(null);

describe('catalogBatchProcess lambda should work correct', () => {
  test('catalogBatchProcess should emmit SNS publish', async () => {
    console.log = jest.fn();
    mock('SNS', 'publish', snsPublishMock);

    await catalogBatchProcess(sqsEventMock);

    expect(console.log).toBeCalledWith('catalogBatchProcess start');
    expect(snsPublishMock).toBeCalled();
  });
});
