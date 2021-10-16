import { ALLOW } from '@functions/basicAuthorizer';
import { APIGatewayAuthorizerResult } from 'aws-lambda';

export const generatePolicy = (principalId: string, resource: string, effect = ALLOW): APIGatewayAuthorizerResult => ({
  principalId,
  policyDocument: {
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: resource,
      },
    ],
  },
});
