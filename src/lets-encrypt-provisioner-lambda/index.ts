import * as acme from 'acme-client';
import * as AWS from 'aws-sdk';

var route53 = new AWS.Route53();
var secretsmanager = new AWS.SecretsManager();

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function handler(event: AWSLambda.CloudFormationCustomResourceEvent) {
  switch (event.RequestType) {
    case 'Create':
    case 'Update':

      const client = new acme.Client({
        directoryUrl: acme.directory.letsencrypt.production,
        accountKey: await acme.forge.createPrivateKey(),
      });

      /* Create CSR */
      const [key, csr] = await acme.forge.createCsr({
        commonName: event.ResourceProperties.domain,
      });

      /* Certificate */
      const cert = await client.auto({
        csr,
        email: event.ResourceProperties.email,
        termsOfServiceAgreed: true,
        challengePriority: ['dns-01'],
        challengeCreateFn: async (authz: {[key: string]: any}, challenge: {[key: string]: any}, keyAuthorization: string) => {

          console.log(`Triggered challengeCreateFn() with chllenge type: ${challenge.type}`);

          const dnsRecord = `_acme-challenge.${authz.identifier.value}`;
          const recordValue = keyAuthorization;

          console.log(`Creating TXT record for ${authz.identifier.value}: ${dnsRecord}`);

          await route53.changeResourceRecordSets({
            HostedZoneId: event.ResourceProperties.zone,
            ChangeBatch: {
              Changes: [{
                Action: 'UPSERT',
                ResourceRecordSet: {
                  Name: dnsRecord,
                  ResourceRecords: [{
                    Value: `"${recordValue}"`,
                  }],
                  TTL: 60,
                  Type: 'TXT',
                },
              }],
            },
          }).promise();
          await sleep(30000);

          console.log(`Would create TXT record "${dnsRecord}" with value "${recordValue}"`);

        },
        challengeRemoveFn: async (authz: {[key: string]: any}, challenge: {[key: string]: any}, keyAuthorization: string) => {

          console.log(`Triggered challengeRemoveFn() with chllenge type: ${challenge.type}`);

          const dnsRecord = `_acme-challenge.${authz.identifier.value}`;
          const recordValue = keyAuthorization;

          console.log(`Removing TXT record for ${authz.identifier.value}: ${dnsRecord}`);

          await route53.changeResourceRecordSets({
            HostedZoneId: event.ResourceProperties.zone,
            ChangeBatch: {
              Changes: [{
                Action: 'DELETE',
                ResourceRecordSet: {
                  Name: dnsRecord,
                  ResourceRecords: [{
                    Value: `"${recordValue}"`,
                  }],
                  TTL: 60,
                  Type: 'TXT',
                },
              }],
            },
          }).promise();
          await sleep(30000);

          console.log(`Would remove TXT record "${dnsRecord}" with value "${recordValue}"`);
        },
      });

      /* Done */
      await secretsmanager.putSecretValue({
        SecretId: event.ResourceProperties.secretArn,
        SecretString: JSON.stringify({
          certPem: cert.toString(),
          keyPem: key.toString(),
        }),
      }).promise();

      return;
    case 'Delete':
      // implement deletion of custom resource
      console.log(event);
      return;
    default:
      console.log(event);
      throw new Error('Invalid event');
  }
}