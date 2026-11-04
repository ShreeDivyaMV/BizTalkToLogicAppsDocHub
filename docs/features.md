---
title: Logic Apps features for BizTalk workloads
description: Explore compatible modernization paths with Logic Apps Standard as core and supporting services used only when needed.
---

# Logic Apps Standard is the core

Use Standard workflows, connectors, transformations and local code as the primary integration application. Other Azure Integration Services (AIS) solve specific messaging, API or event requirements; they are not mandatory replacements for every BizTalk artifact.

This catalogue covers the main capability families in the [Microsoft migration overview](https://learn.microsoft.com/en-us/azure/logic-apps/biztalk-server-migration-overview). **Compatible modernization path does not mean drop-in parity:** evaluate exact artifact contents, operations, limits, host and business semantics.

## Core feature catalogue

| Existing integration need | Logic Apps–led implementation | Technical checks / guide |
| --- | --- | --- |
| Durable orchestration | Stateful Standard workflows | Persistence, correlation, compensation and recovery: [patterns](./journey.mdx) |
| Bounded low-latency processing | Stateless workflows where their limits fit | Duration, memory and failure semantics: [hosting](./hosting.md) |
| Multiple related processes | Multiple workflows in one Standard app | Shared scaling/security/lifecycle boundaries: [architecture](./hosting.md) |
| Schemas and transformation | XSD, XSLT, Liquid/Data Mapper where suitable | Namespaces, imports, extension functions and output parity: [maps](./transforms.md) |
| Pipelines | Explicit native actions plus suitable local/custom logic | Decode, disassembly, streaming, batching and context properties: [pipelines](./transforms.md#pipeline-behavior) |
| Adapter connectivity | Built-in, managed or custom connectors/APIs | Exact operation, identity, payload, throughput and host: [connectivity](./connectivity.md) |
| Helper assemblies / custom processing | Workflow-scoped .NET local functions; external service only for a separate boundary | Compatible dependencies, streaming/duration limits and serialization: [custom code](./custom-code.md) |
| Business rules | Logic Apps Rules Engine for compatible policies/facts; redesign other logic | Policies, vocabularies, fact types and rule outcomes |
| EDI/B2B | Standard B2B operations and required partner/agreement artifacts | Protocols, certificates, acknowledgments and partner tests: [B2B](./connectivity.md#b2b-and-certificates) |
| MessageBox-style routing | Workflow routing where sufficient; independent broker when required | Publish/subscribe, sessions, settlement and duplicates: [AIS services](./ais-services.md) |
| BAM/business visibility | Business Process Tracking where supported or a deliberate reporting design | Business milestones, retention and host availability |
| Technical tracking | Run history, tracked properties and host-appropriate telemetry | Correlation, security and operational diagnosis: [validation](./validation.md) |
| CI/CD and operations | Versioned project artifacts and environment-specific configuration | Connections, settings, deploy/replay checks: [deployment](./deployment.md) |
| Private/local processing | WSP/ASE v3 networking or supported Hybrid deployment | DNS, storage, outbound access and feature differences: [networking](./networking.md) |

## Rules and business tracking

- [Logic Apps Rules Engine overview](https://learn.microsoft.com/en-us/azure/logic-apps/rules-engine/rules-engine-overview): verify supported policies, facts and invocation requirements. Rules reuse is not equivalent to automatic support for every custom fact/assembly.
- [Azure Business Process Tracking](https://learn.microsoft.com/en-us/azure/business-process-tracking/overview): assess Azure-hosted support and business milestones. The migration overview notes that Hybrid does not support Azure Business Process Tracking; design other telemetry/reporting where needed.

## Integration patterns

| Pattern | Core Logic Apps responsibility | Supporting product only if required |
| --- | --- | --- |
| Request/reply | Validate, transform, orchestrate and return the agreed response | APIM for API governance; gateway/Front Door for HTTP routing |
| Publish/subscribe | Process each subscriber's business flow | Service Bus topics for independent durable subscriptions |
| Scatter/gather | Fan out, correlate responses, aggregate and handle partial failure | Broker/state store when asynchronous coordination requires it |
| Batch/envelope | Split safely, preserve per-item identity and aggregate results | Storage/broker for payload or buffering needs |
| Claim-check | Carry payload references and enforce access/recovery | Storage for payloads larger than appropriate message/action limits |
| Saga/compensation | Model side effects, compensating actions and recovery | Store/broker for durable coordination as required |
| Event-driven processing | React and integrate systems | Event Grid for discrete event distribution; Event Hubs for streaming ingestion |

Start with the [technical cookbook](./journey.mdx). Use [supporting AIS services](./ais-services.md) to decide what belongs outside the workflow, [pricing](./pricing.md) to cost it, and [networking/load balancing](./networking.md) to place it.

The catalogue describes destination capabilities, not source-version eligibility.
