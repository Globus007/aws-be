import csvParser from 'csv-parser';
import { Readable } from 'stream';
import { InputProduct } from '../types/types';
import { HEADERS, SEPARATOR } from './csv-parser.constants';

export const parseCSVFile = async (stream: Readable): Promise<InputProduct[]> => {
  return new Promise<InputProduct[]>((resolve, reject) => {
    const results: InputProduct[] = [];

    stream
      .pipe(csvParser({ separator: SEPARATOR, headers: HEADERS }))
      .on('data', (data) => {
        results.push(data);
      })
      .on('error', (error) => {
        console.error('parseCSVFile', error.message);
        reject(error);
      })
      .on('end', () => {
        console.log('parseCSVFile', results);
        resolve(results);
      });
  });
};
