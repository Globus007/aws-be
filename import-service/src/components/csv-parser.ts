import * as csvParser from 'csv-parser';
import { Readable } from 'stream';

export const logCSVFile = (stream: Readable): void => {
  const results = [];

  const headers = ['Title', 'Description', 'Price', 'Count', 'Action'];
  const separator = ';';

  stream
    .pipe(csvParser({ separator, headers }))
    .on('data', (data) => results.push(data))
    .on('end', () => {
      console.log(results);
    });
};
