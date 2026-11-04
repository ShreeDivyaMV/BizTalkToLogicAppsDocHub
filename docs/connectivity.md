---
title: Connections, identity and networking
description: Replace BizTalk adapter operations with verified connector behavior, identity and network configuration.
---

# Replace operations, not adapter names

Choose the exact trigger/action and test its behavior. A connector with a matching product name does not imply identical polling, transaction, acknowledgment, ordering or payload semantics.

## Built-in versus managed operations

Standard built-in operations execute with the runtime; managed connectors use their service-specific connection model. The same system may expose both, with different inputs, identity choices and network behavior.

For each receive/send operation, capture:

- Polling versus push behavior; batching and message-size limits.
- Lock duration, renewal, completion/abandon behavior and dead-letter handling.
- Retry and timeout settings; duplicate delivery and ordering expectations.
- Authentication options and required permissions for the actual operation.
- Whether private connectivity is supported by that connector path.

Use the [connector reference](https://learn.microsoft.com/en-us/connectors/) to check the selected operation, not a generic service overview.

## Identity and credentials

Prefer managed identity where supported. Grant only the data-plane permissions the operation requires: resource-management access alone does not grant message or database access.

Keep local developer authentication separate from the deployed runtime identity. Never commit connection strings, client secrets, private keys or live callback URLs. Inject secrets through approved settings/secret references and verify rotation without rebuilding workflow definitions.

For managed connections, inspect both the connection resource and the workflow's connection reference/access configuration. For built-in connections, inspect `serviceProviderConnections` and the referenced app settings.

## Private connectivity

1. Resolve the target hostname from the **runtime network** and confirm the intended private/public address.
2. Verify routing, NSG/firewall rules and target ingress policy.
3. Check storage dependencies, private DNS links and outbound access required by the chosen host.
4. Authenticate with the runtime identity and execute the real connector operation.

An inbound private endpoint does not by itself provide outbound connectivity to on-premises systems. A successful request from a developer laptop also does not prove access from the hosted runtime.

## B2B and certificates

Preserve partner identities, agreement selection, protocol versions and acknowledgment behavior. Validate signing/encryption certificate references and their trust chains, with a rotation overlap appropriate to the partner contract.

Test negative acknowledgments, expired/untrusted certificates, duplicate interchange IDs and delayed responses. Confirm which partner/agreement/certificate artifacts the selected Standard operation requires; local XML map support does not eliminate every integration-account requirement.

## Diagnose failures

| Symptom | Investigate |
| --- | --- |
| 401 | Wrong identity, token audience or expired credential |
| 403 | Data-plane role, resource access policy or connection authorization |
| Timeout / name-resolution error | Runtime DNS, routes, firewall, private endpoint and proxy path |
| Lock lost / duplicate delivery | Processing duration, lock renewal, settlement and idempotency |
| Throttling | Connector/service quotas, concurrency and backoff behavior |
| Works locally only | Different identity, local settings or different outbound network path |

Collect the business ID, workflow/run ID, operation name and sanitized error. Do not place payloads, authorization headers or credentials in public issues.

See [deployment configuration](./deployment.md) and [recovery patterns](./journey.mdx#recovery).
