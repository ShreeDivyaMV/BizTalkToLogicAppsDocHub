---
title: Networking, scale and load balancing
description: Design private connectivity and HTTP routing around Logic Apps without confusing ingress balancing with state recovery.
---

# Place Logic Apps at the center of the network design

Identify each inbound trigger and outbound dependency first. Private connectivity, runtime scaling and load balancing solve different problems.

## Inbound and outbound paths

| Requirement | Evaluate | Verify |
| --- | --- | --- |
| Private inbound HTTP access | Standard private endpoint / appropriate isolated-host ingress | Caller network access, private DNS, TLS and trigger authorization |
| Private outbound calls | VNet integration, routes and target private access | Runtime DNS, firewall and target identity |
| On-premises access | VPN/ExpressRoute or the applicable gateway/connector design | End-to-end route and operation-specific support |
| Controlled egress | Appropriate NAT/firewall design for the selected host | Expected source address and required platform/storage access |
| Hybrid processing | Supported customer-managed infrastructure | Outbound Arc/management and cloud-connector dependencies |

A private endpoint is **inbound** access; it does not automatically provide outbound connectivity. VNet peering alone does not connect an on-premises network. Hybrid is partially connected, not inherently air-gapped.

The [Standard networking guidance](https://learn.microsoft.com/en-us/azure/logic-apps/secure-single-tenant-workflow-virtual-network-private-endpoint) calls out managed webhook callbacks that cannot reach a private-only endpoint. Check each selected trigger/action path; built-in and managed operations do not share all network behavior.

## Scale the runtime before adding a router

Scale capacity/instances using the selected Standard hosting model and its limits. Measure concurrency, CPU/memory, storage and connector/downstream throttling. More workers do not fix a saturated dependency or create global message ordering.

For queue/event triggers, use the broker's consumption/partition/session semantics. An HTTP load balancer does not distribute queue messages or preserve broker settlement.

## HTTP load-balancing choices

| Product/path | Role | Design conditions |
| --- | --- | --- |
| Standard hosting ingress | Routes requests to healthy platform workers | Host capacity, app readiness and trigger limits |
| Application Gateway v2 | Regional layer-7 routing and optional WAF around reachable backends | Subnet/DNS reachability, backend TLS/host header, probes and authorization |
| Front Door Standard/Premium | Global HTTP routing and health-based origin selection | Supported origin/private-connectivity path, TLS/host header, WAF and regional dependencies |
| APIM | Governed API façade and intentional backend selection/policies | Tier/network support, timeouts, retries, identity and service-specific routing |

These are design options, not a universal certified topology. Verify the selected host, SKU, private-origin support and actual backend connectivity. Do not attach Azure Load Balancer directly to a managed Workflow Service Plan as if it were a VM backend pool.

## Safe routing for workflow endpoints

1. Preserve the intended workflow route, query handling and authentication through the proxy.
2. Keep signed callback URLs/tokens out of public logs and repositories; prefer an approved authentication boundary.
3. Set backend host/TLS details for the actual origin and validate from the routing service.
4. Use a **side-effect-free health endpoint**; probes must never submit a business order.
5. Define timeout and retry behavior across client, router and workflow. Retrying an HTTP request can duplicate a business operation.
6. Use consistent business IDs and durable duplicate handling across every active backend.

## Multiple regions and recovery

Routing to another region does not migrate an in-flight stateful run. Deploy the target app and dependencies separately, design state/replay/reconciliation, and confirm RTO/RPO.

Active-active processing needs global business deduplication and suitable data/broker topology. Active-passive designs need controlled trigger activation and dependency failover. A probe-green workflow can still have a failing downstream system.

## Test the complete path

- Runtime DNS and target address match the intended private/public path.
- Inbound clients/webhooks can reach the selected ingress without bypassing access controls.
- Storage and required platform dependencies remain reachable.
- Gateway probes do not create side effects; origin failure routes as designed.
- Replay/duplicate requests do not create unintended effects.
- Capacity, throttling and recovery meet measured targets.

References: [Standard networking](https://learn.microsoft.com/en-us/azure/logic-apps/secure-single-tenant-workflow-virtual-network-private-endpoint), [Application Gateway v2](https://learn.microsoft.com/en-us/azure/application-gateway/overview), [Front Door origins](https://learn.microsoft.com/en-us/azure/frontdoor/origin), [multi-region recovery](https://learn.microsoft.com/en-us/azure/logic-apps/multi-region-disaster-recovery).

See [connection diagnostics](./connectivity.md), [pricing](./pricing.md) and [recovery patterns](./journey.mdx#recovery).
