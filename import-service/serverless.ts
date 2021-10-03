import type { AWS } from '@serverless/typescript';
import { importFileParser, importProductsFile } from '@functions/index';

const serverlessConfiguration: AWS = {
  service: 'import-service',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      SQS_URL: { Ref: 'SQSQueue' },
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: 's3:ListBucket',
        Resource: ['arn:aws:s3:::aws-task5'],
      },
      {
        Effect: 'Allow',
        Action: ['sqs:*'],
        Resource: [{ 'Fn::GetAtt': ['SQSQueue', 'Arn'] }],
      },
      {
        Effect: 'Allow',
        Action: 's3:*',
        Resource: ['arn:aws:s3:::aws-task5/*'],
      },
    ],

    lambdaHashingVersion: '20201221',
  },

  resources: {
    Resources: {
      SQSQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: { QueueName: 'import-service-queue' },
      },
    },
    Outputs: {
      QueueARN: {
        Description: 'ARN of import-service-queue',
        Value: { 'Fn::GetAtt': ['SQSQueue', 'Arn'] },
        Export: { Name: 'QueueARN' },
      },
    },
  },

  // import the function via paths
  functions: { importProductsFile, importFileParser },
};
module.exports = serverlessConfiguration;
