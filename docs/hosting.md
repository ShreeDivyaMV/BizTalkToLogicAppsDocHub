---
title: Logic Apps hosting options
description: Decide hosting, isolation and operational ownership before converting your first flow.
---

# Choose your Logic Apps hosting first

Select Azure Logic Apps **Standard** hosting based on durability, network isolation, runtime dependencies and workload characteristics. Add other services only when a specific requirement justifies a separate boundary; do not mechanically replace every BizTalk component with a different Azure resource.

## Compare hosting options

| Requirement | Evaluate | Review before selection |
| --- | --- | --- |
| Managed single-tenant Azure hosting | Workflow Service Plan | Capacity, virtual network access, private endpoints, storage, availability and total cost |
| Dedicated isolated Azure environment | App Service Environment v3 | Environment and plan cost, networking, deployment process and operational model |
| Customer-managed runtime / local processing | Hybrid | Supported Kubernetes/runtime requirements, feature differences, identity, connectivity, observability and customer operational responsibilities |

:::info Validate the actual runtime
Connector availability, identity, network configuration and deployment mechanics vary by host. A local workflow test does not establish that the same configuration works in Workflow Service Plan, ASE v3 or Hybrid.
:::

## Stateful or stateless?

Use stateful workflows when persisted execution and recovery are required. Stateless execution suits bounded in-memory flows only when its duration, payload and failure behavior fit the requirement. Do not select stateless solely because a happy-path test is faster.

Measure the complete flow under expected concurrency. Related workflows in one Standard app share runtime resources; isolate workloads with incompatible scaling, security or deployment requirements.

## A practical decision tree

1. **Must workflow execution remain on customer-managed infrastructure?** Evaluate Hybrid and its supported features first.
2. **Is an isolated Azure hosting environment required?** Evaluate ASE v3 and confirm it is necessary for your isolation controls.
3. **Otherwise:** evaluate Workflow Service Plan as the managed Azure option.
4. For every choice, verify connectivity to real endpoints, identity, storage, monitoring, HA/DR and deployment responsibilities.
5. Use a non-production representative flow to validate the decision before scaling.

## Architecture review checklist

- **Workflow boundaries:** group related workflows with compatible ownership, lifecycle, scaling and security requirements.
- **State:** choose stateful versus stateless based on durability and recovery semantics, not habit.
- **Messaging:** introduce independent brokering only when buffering, decoupling, ordering or delivery semantics require it.
- **Custom code:** consider local functions for workflow-scoped code; use separate compute where independent scaling or ownership warrants it.
- **Identity:** prefer managed identity where supported; document credential and certificate rotation for other connections.
- **Network:** validate DNS, routing, firewall rules, private access and on-premises connectivity.
- **Recovery:** define RTO/RPO, replay and duplicate controls; prove recovery with tests.
- **Operations:** Azure-hosted and Hybrid monitoring capabilities differ. Design telemetry, business correlation and on-call procedures for the actual host.
- **Delivery:** separate infrastructure and application deployment, environment configuration and secrets.

## Compare total cost, not one meter

Baseline BizTalk licensing, compute, SQL, storage, patching, HA/DR, deployment tooling and support. Compare that with target hosting, storage, managed connector calls, networking, telemetry retention, extra services and operational ownership.

Use measured throughput and payload sizes in a representative load test. Avoid per-artifact cost estimates and unsupported percentage-savings promises.

## Product references

- [BizTalk migration overview and hosting choices](https://learn.microsoft.com/en-us/azure/logic-apps/biztalk-server-migration-overview)
- [Standard and Consumption comparison](https://learn.microsoft.com/en-us/azure/logic-apps/single-tenant-overview-compare)
- [BizTalk-specific Agent deployment scope](https://learn.microsoft.com/en-us/azure/logic-apps/biztalk-server-migration-approaches)

Next, explore [Logic Apps features](./features.md), [networking and load balancing](./networking.md) and [pricing](./pricing.md). Check the [migration announcements and roadmap](./whats-new.md) separately from the hosting options available today.
