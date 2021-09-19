import { handlerPath } from '@libs/handlerResolver';

const PATH = 'import';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: PATH,
        cors: true,
      },
    },
  ],
};
