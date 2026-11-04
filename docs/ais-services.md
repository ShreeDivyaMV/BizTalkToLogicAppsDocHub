---
title: Supporting AIS services
description: Decide when Service Bus, API Management and Event Grid should support the Logic Apps core.
---

# Add services for a defined requirement

**Logic Apps Standard remains the core orchestration and integration application.** Azure Integration Services commonly brings Logic Apps together with Service Bus, API Management and Event Grid. Add those services when their independent capability is needed, not because every migration must use the entire suite.

## Core and supporting responsibilities

| Product | Role around Logic Apps | Add it when | Do not confuse it with |
| --- | --- | --- | --- |
| **Logic Apps Standard** | Workflows, connectors, transformation, B2B and local code | The main integration execution | A clone of the BizTalk MessageBox or every distributed transaction |
| Service Bus | Durable queues/topics, buffering and broker semantics | Independent producer/consumer lifecycles, subscriptions or required ordering/settlement | Workflow orchestration or exactly-once external effects |
| API Management | API contracts, authentication/policies, throttling and lifecycle | A governed API boundary is required | A durable queue or automatic global DR/state synchronization |
| Event Grid | Distribution of discrete events to subscribers | Event notification/fan-out is required | Ordered transaction processing or a high-volume replayable stream |

Additional supporting products may include **Event Hubs** for streaming, **Storage** for claim-check/artifacts, **Azure Functions** for independently owned code, and **Azure Monitor/Application Insights** for Azure-hosted telemetry. They are not all mandatory AIS components.

## Example architectures

```text
Simple integration:
Client -> Logic Apps Standard -> existing API/database

Governed asynchronous API:
Client -> APIM -> Logic Apps intake -> Service Bus -> Logic Apps worker -> target

Event notification:
Publisher -> Event Grid -> Logic Apps Standard -> target
```

Each extra boundary adds configuration, authentication, network, failure handling and cost. A separate Function app is not required merely because a workflow uses custom .NET: consider [local functions](./custom-code.md) first.

## Keep the semantics explicit

- Broker redelivery, HTTP retry and workflow resubmission can each duplicate work. Carry business IDs and use safe side-effect handling.
- Event distribution is not a substitute for the required acknowledgment/ordering contract.
- API policies cannot undo a committed downstream business operation.
- Hybrid requires checking local/customer-managed equivalents and each cloud-dependent operation; do not assume an air-gapped runtime or identical Azure feature availability.

## Product references and prices

- [Service Bus overview](https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-overview) and [pricing](https://azure.microsoft.com/en-us/pricing/details/service-bus/)
- [API Management overview](https://learn.microsoft.com/en-us/azure/api-management/api-management-key-concepts) and [pricing](https://azure.microsoft.com/en-us/pricing/details/api-management/)
- [Event Grid overview](https://learn.microsoft.com/en-us/azure/event-grid/overview) and [pricing](https://azure.microsoft.com/en-us/pricing/details/event-grid/)
- [Event Hubs overview](https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-about)
- [Logic Apps–led migration guidance](https://learn.microsoft.com/en-us/azure/logic-apps/biztalk-server-migration-overview)

Continue with [cost planning](./pricing.md), [networking/load balancing](./networking.md) and [integration patterns](./features.md).
