# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### LetsEncryptCertificate <a name="LetsEncryptCertificate" id="cdk-lets-encrypt.LetsEncryptCertificate"></a>

#### Initializers <a name="Initializers" id="cdk-lets-encrypt.LetsEncryptCertificate.Initializer"></a>

```typescript
import { LetsEncryptCertificate } from 'cdk-lets-encrypt'

new LetsEncryptCertificate(scope: Construct, id: string, props: LetsEncryptCertificateProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-lets-encrypt.LetsEncryptCertificate.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-lets-encrypt.LetsEncryptCertificate.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-lets-encrypt.LetsEncryptCertificate.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-lets-encrypt.LetsEncryptCertificateProps">LetsEncryptCertificateProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-lets-encrypt.LetsEncryptCertificate.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-lets-encrypt.LetsEncryptCertificate.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-lets-encrypt.LetsEncryptCertificate.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-lets-encrypt.LetsEncryptCertificateProps">LetsEncryptCertificateProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-lets-encrypt.LetsEncryptCertificate.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-lets-encrypt.LetsEncryptCertificate.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-lets-encrypt.LetsEncryptCertificate.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-lets-encrypt.LetsEncryptCertificate.isConstruct"></a>

```typescript
import { LetsEncryptCertificate } from 'cdk-lets-encrypt'

LetsEncryptCertificate.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-lets-encrypt.LetsEncryptCertificate.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-lets-encrypt.LetsEncryptCertificate.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-lets-encrypt.LetsEncryptCertificate.property.secret">secret</a></code> | <code>aws-cdk-lib.aws_secretsmanager.Secret</code> | The Secrets Manager Secret that contains the generated Lets Encrypt Certificate and Key. |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-lets-encrypt.LetsEncryptCertificate.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `secret`<sup>Required</sup> <a name="secret" id="cdk-lets-encrypt.LetsEncryptCertificate.property.secret"></a>

```typescript
public readonly secret: Secret;
```

- *Type:* aws-cdk-lib.aws_secretsmanager.Secret

The Secrets Manager Secret that contains the generated Lets Encrypt Certificate and Key.

---


## Structs <a name="Structs" id="Structs"></a>

### LetsEncryptCertificateProps <a name="LetsEncryptCertificateProps" id="cdk-lets-encrypt.LetsEncryptCertificateProps"></a>

#### Initializer <a name="Initializer" id="cdk-lets-encrypt.LetsEncryptCertificateProps.Initializer"></a>

```typescript
import { LetsEncryptCertificateProps } from 'cdk-lets-encrypt'

const letsEncryptCertificateProps: LetsEncryptCertificateProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-lets-encrypt.LetsEncryptCertificateProps.property.domain">domain</a></code> | <code>string</code> | Domain name to generate the certificate for and run DNS validation against. |
| <code><a href="#cdk-lets-encrypt.LetsEncryptCertificateProps.property.email">email</a></code> | <code>string</code> | An email address to be used as part of the Let's Encrypt registration. |
| <code><a href="#cdk-lets-encrypt.LetsEncryptCertificateProps.property.zone">zone</a></code> | <code>string</code> | Route53 Zone ID that is authoritative for the domain specified in the domain property. |

---

##### `domain`<sup>Required</sup> <a name="domain" id="cdk-lets-encrypt.LetsEncryptCertificateProps.property.domain"></a>

```typescript
public readonly domain: string;
```

- *Type:* string

Domain name to generate the certificate for and run DNS validation against.

---

##### `email`<sup>Required</sup> <a name="email" id="cdk-lets-encrypt.LetsEncryptCertificateProps.property.email"></a>

```typescript
public readonly email: string;
```

- *Type:* string

An email address to be used as part of the Let's Encrypt registration.

---

##### `zone`<sup>Required</sup> <a name="zone" id="cdk-lets-encrypt.LetsEncryptCertificateProps.property.zone"></a>

```typescript
public readonly zone: string;
```

- *Type:* string

Route53 Zone ID that is authoritative for the domain specified in the domain property.

---



