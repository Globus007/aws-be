import { handlerPath } from '@libs/handlerResolver';

export * from './constants';
export * from './helpers';

export default {
  handler: `${handlerPath(__dirname)}/handler.basicAuthorizer`,
};
