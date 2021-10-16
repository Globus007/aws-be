import 'source-map-support/register';
import { APIGatewayAuthorizerCallback, APIGatewayTokenAuthorizerEvent } from 'aws-lambda';
import { ALLOW, DENY, generatePolicy, TOKEN, UNAUTHORIZED } from '@functions/basicAuthorizer';

export const basicAuthorizer = async (
  event: APIGatewayTokenAuthorizerEvent,
  _context,
  callback: APIGatewayAuthorizerCallback,
) => {
  console.log({ event });

  if (event.type !== TOKEN) {
    callback(UNAUTHORIZED);
  }

  try {
    const { authorizationToken } = event;
    const [, encodedCreds] = authorizationToken.split(' ');
    const buff = Buffer.from(encodedCreds, 'base64');
    const [username, password] = buff.toString('utf-8').split(':');

    console.log({ username }, { password });

    const storedUserPassword = process.env[username];
    const effect = !storedUserPassword ?? storedUserPassword !== password ? DENY : ALLOW;

    console.log({ storedUserPassword }, { effect });

    const policy = generatePolicy(encodedCreds, event.methodArn, effect);

    callback(null, policy);
  } catch (e) {
    callback(`${UNAUTHORIZED}: ${e.message}`);
  }
};
