import { handlerPath } from '@libs/handlerResolver';
import schema from '@functions/addProduct/schema';

export default {
  handler: `${handlerPath(__dirname)}/addProduct.main`,
  events: [
    {
      http: {
        method: 'post',
        path: '/products/',
        cors: true,
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};
