import AWS from 'aws-sdk';
import csvParser from 'csv-parser';
import { Readable } from 'stream';

export const parseCSVFile = async (stream: Readable): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const sqs = new AWS.SQS();
    const results = [];

    const headers = ['title', 'description', 'price', 'count'];
    const separator = ';';

    stream
      .pipe(csvParser({ separator, headers }))
      .on('data', (data) => {
        results.push(data);

        sqs.sendMessage(
          {
            QueueUrl: process.env.SQS_URL,
            MessageBody: JSON.stringify(data),
          },
          (err) => {
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
