import csvParser from 'csv-parser';
import { Readable } from 'stream';

export const logCSVFile = async (stream: Readable): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const results = [];

    const headers = ['Title', 'Description', 'Price', 'Count', 'Action'];
    const separator = ';';

    stream
      .pipe(csvParser({ separator, headers }))
      .on('data', (data) => results.push(data))
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
