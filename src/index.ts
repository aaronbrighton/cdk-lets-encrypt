import * as path from 'path';
import { Duration, CustomResource } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda-nodejs';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import * as cr from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';

export interface LetsEncryptCertificateProps {

  /**
   * Domain name to generate the certificate for and run DNS validation against.
   */
  readonly domain: string;

  /**
   * Route53 Zone ID that is authoritative for the domain specified in the domain property.
   */
  readonly zone: string;

  /**
   * An email address to be used as part of the Let's Encrypt registration.
   */
  readonly email: string;

}

export class LetsEncryptCertificate extends Construct {

  /**
   * The Secrets Manager Secret that contains the generated Lets Encrypt Certificate and Key.
   */
  readonly secret: secretsmanager.Secret;

  constructor(scope: Construct, id: string, props: LetsEncryptCertificateProps) {
    super(scope, id);

    const secretHolderForCertificate = new secretsmanager.Secret(this, 'ServerCertificate', {
      secretStringBeta1: secretsmanager.SecretStringValueBeta1.fromUnsafePlaintext(JSON.stringify({
        certPem: '',
        keyPem: '',
      })),
    });
    this.secret = secretHolderForCertificate;

    const letsEncryptProvisionerFunction = new lambda.NodejsFunction(this, 'Provisioner', {
      entry: path.join(__dirname, 'lets-encrypt-provisioner-lambda/index.js'),
      handler: 'handler',
      timeout: Duration.minutes(5),
      bundling: {
        nodeModules: [
          'acme-client',
        ],
      },
    });
    secretHolderForCertificate.grantWrite(letsEncryptProvisionerFunction);
    letsEncryptProvisionerFunction.addToRolePolicy(new iam.PolicyStatement({
      actions: ['route53:ChangeResourceRecordSets'],
      resources: [`arn:aws:route53:::hostedzone/${props.zone}`],
    }));

    const crProvider = new cr.Provider(this, 'CRProvider', {
      onEventHandler: letsEncryptProvisionerFunction,
    });

    new CustomResource(this, 'Certificate', {
      serviceToken: crProvider.serviceToken,
      properties: {
        email: props.email,
        domain: props.domain,
        zone: props.zone,
        secretArn: secretHolderForCertificate.secretArn,
      },
    });

  }
}