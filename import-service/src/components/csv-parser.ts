import AWS from 'aws-sdk';
import csvParser from 'csv-parser';
import { Readable } from 'stream';

export const logCSVFile = async (stream: Readable): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const sqs = new AWS.SQS();
    const results = [];

    const headers = ['Title', 'Description', 'Price', 'Count', 'Action'];
    const separator = ';';

    stream
      .pipe(csvParser({ separator, headers }))
      .on('data', (data) => {
        results.push(data);

        sqs.sendMessage(
          {
            QueueUrl: process.env.SQS_URL,
            MessageBody: data,
          },
          (err, data) => {
            if (err) {
              console.log('SendMessage Error', err);
            }
            console.log('Send message', data);
          },
        );
      })
      .on('error', (error) => {
        console.log(error.message);
        reject(error);
      })
      .on('end', () => {
        console.log(results);
        resolve();
      });
  });
};
