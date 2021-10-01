import { handlerPath } from '@libs/handlerResolver';
import { BUCKET, UPLOADED_FOLDER } from '../../types/types';

const EVENT = 's3:ObjectCreated:*';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      s3: {
        bucket: BUCKET,
        event: EVENT,
        rules: [{ prefix: UPLOADED_FOLDER }],
        existing: true,
      },
    },
  ],
};
