const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Aaron Brighton',
  authorAddress: 'https://aaronbrighton.ca/',
  cdkVersion: '2.12.0',
  defaultReleaseBranch: 'main',
  name: 'cdk-lets-encrypt',
  repositoryUrl: 'https://github.com/aaronbrighton/cdk-lets-encrypt.git',
  releaseToNpm: true,
  publishDryRun: true,
  keywords: [
    'aws-cdk',
  ],

  deps: [
    'aws-sdk',
    'acme-client',
  ],
  description: "Automatically generate a Let's Encrypt certificate for a domain managed in Route53, pushing the resulting certificates and key into Secrets Manager.",
  devDeps: [
    '@types/cfn-response',
  ],
  bundledDeps: [
    'acme-client',
    'aws-sdk',
  ],
});
project.synth();