import type { AWS } from '@serverless/typescript';
import { addProduct, catalogBatchProcess, getProductsById, getProductsList } from '@functions/index';

const serverlessConfiguration: AWS = {
  service: 'aws-be',
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
      SNS_ARN: { Ref: 'SNSTopic' },
    },
    lambdaHashingVersion: '20201221',
    httpApi: {
      cors: true,
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['sns:*'],
        Resource: { Ref: 'SNSTopic' },
      },
    ],
  },

  resources: {
    Resources: {
      SNSTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: { TopicName: 'import-service-topic' },
      },
      SNSSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'zqn29865@zwoho.com',
          Protocol: 'email',
          TopicArn: { Ref: 'SNSTopic' },
        },
      },
      SNSSubscriptionFilteredByTitle: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'aqc45350@zwoho.com',
          Protocol: 'email',
          TopicArn: { Ref: 'SNSTopic' },
          FilterPolicy: { event: ['product_added'], product_title: [{ prefix: 'iPhone' }] },
        },
      },
    },
  },
  // import the function via paths
  functions: { getProductsList, getProductsById, addProduct, catalogBatchProcess },
};

module.exports = serverlessConfiguration;
