import type { AWS } from '@serverless/typescript';
import { catalogBatchProcess } from '@functions/index';

const serverlessConfiguration: AWS = {
  service: 'queue-service',
  frameworkVersion: '2',
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
    },
  },
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    region: 'eu-west-1',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      SQS_URL: 'import-service-queue',
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { catalogBatchProcess },
};

module.exports = serverlessConfiguration;
