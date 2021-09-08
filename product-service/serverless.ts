import type { AWS } from '@serverless/typescript';

import { addProduct, getProductsById, getProductsList } from '@functions/index';

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
    },
    lambdaHashingVersion: '20201221',
    httpApi: {
      cors: true,
    },
  },
  // import the function via paths
  functions: { getProductsList, getProductsById, addProduct },
};

module.exports = serverlessConfiguration;
