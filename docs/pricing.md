---
title: Pricing and cost planning
description: Model Logic Apps hosting, connector calls, storage, networking and optional AIS products without inventing a quote.
---

# Price the complete integration

Start with **Logic Apps Standard** hosting, then add costs for actual connector usage, state/storage, networking, telemetry and the supporting products selected by the architecture.

The [official pricing page](https://azure.microsoft.com/en-us/pricing/details/logic-apps/) is region/currency/offer dependent. Its retrieved tables contain unresolved price placeholders, so this hub does not publish invented unit rates or a fixed monthly quote.

## What to include

| Cost component | Inputs to measure | Reference |
| --- | --- | --- |
| Workflow Service Plan | Capacity/instance count and active hours, including non-production | [Logic Apps prices](https://azure.microsoft.com/en-us/pricing/details/logic-apps/) |
| ASE v3 | Isolated plan capacity, environment requirements and consolidation | [App Service prices](https://azure.microsoft.com/en-us/pricing/details/app-service/windows/) |
| Hybrid | Applicable Logic Apps vCPU charges plus Kubernetes, SQL/SMB, network and operations | [Hybrid requirements](https://learn.microsoft.com/en-us/azure/logic-apps/set-up-standard-workflows-hybrid-deployment-requirements) |
| Managed connector usage | Billable calls, polling, retries, pagination and batching | Connector-specific pricing; calls need not equal workflow executions |
| Storage/state | Run-state transactions, capacity, retention and redundancy | [Storage pricing](https://azure.microsoft.com/en-us/pricing/details/storage/) |
| B2B/artifacts | Applicable integration-account and partner-processing requirements | Logic Apps pricing and selected B2B operation guidance |
| Supporting AIS | Service Bus/APIM/Event Grid capacity and operation meters only if selected | [Supporting services](./ais-services.md) |
| Network/ingress | Private endpoints, egress, VPN/ExpressRoute, gateways and Front Door | Selected network product pricing |
| Telemetry | Ingestion, retention and query/alert requirements | [Azure Monitor prices](https://azure.microsoft.com/en-us/pricing/details/monitor/) |
| Tooling/delivery | Copilot access, dev environments, testing, migration effort and coexistence | Relevant subscription/commercial agreements |

Standard built-in operations are generally included in the hosting model; that does **not** mean compute, state/storage, managed calls or downstream services are free. Verify the current meter for the selected operation/hosting model.

## Build an estimate

```text
Monthly target estimate =
  hosting capacity
  + billable connector usage
  + storage/state
  + selected supporting AIS services
  + network/ingress
  + telemetry
  + applicable ancillary charges
```

For each term, record the region, currency, SKU, price source/date, usage assumptions and commercial offer. Include test/DR capacity and temporary source/target coexistence. Avoid charging the same connector meter twice under two descriptions.

Use the [Azure pricing calculator](https://azure.microsoft.com/en-us/pricing/calculator/) under the appropriate offer and [contact sales](https://azure.microsoft.com/en-us/contact/) for a quote. Estimates are not support or discount commitments.

## Capacity and optimization

- Load-test representative payloads and peak concurrency before selecting capacity.
- Group workloads only when their isolation, scaling and lifecycle requirements align.
- Compare built-in versus managed operation behavior and cost, not names alone.
- Count retry/polling/pagination traffic, not just incoming messages.
- Reduce unnecessary logging of payloads and choose retention according to business/security requirements.
- Cost DR and independent regional copies explicitly; an ingress router does not synchronize workflow state.

Compare with the BizTalk baseline: licenses, SQL/Windows, compute, storage, HA/DR, patching, deployment and operations. Do not promise percentage savings without measured before/after evidence.
