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
        authorizer: {
          name: 'basicAuthorizer',
          arn: '${cf:authorization-service-dev.AuthorizationArn}',
          resultTtlInSeconds: 0,
          identitySource: 'method.request.header.Authorization',
          type: 'token',
        },
      },
    },
  ],
};
