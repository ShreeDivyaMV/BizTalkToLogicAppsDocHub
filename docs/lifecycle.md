---
title: EOL dates and support terms
description: Published BizTalk lifecycle milestones, end-of-sale expectations and optional support caveats.
---

# Lifecycle and migration timing

## Published lifecycle milestones

The [Microsoft migration overview](https://learn.microsoft.com/en-us/azure/logic-apps/biztalk-server-migration-overview) describes BizTalk Server 2020 as the final release and publishes the following dates. Reviewed **3 November 2026**.

| Milestone | Date | Meaning |
| --- | --- | --- |
| Expected end of sales | **31 March 2027** | A sales milestone, not an immediate shutdown or end of support |
| Mainstream support milestone | **12 April 2028** | Plan assessment, implementation and cutover with contingency |
| Planned optional paid extended-mainstream support begins | **13 April 2028** | Eligible customers only, subject to final terms and coverage |
| Expected end of that optional offering | **10 April 2030** | Temporary migration coverage, not a guaranteed extension for every customer |

:::warning Confirm the applicable agreement
The optional paid offering remains subject to eligibility, exclusions, coverage, pricing and purchasing terms. BAM, ESB Toolkit, industry accelerators and some legacy dependencies are specifically called out for early assessment in the overview. A paid agreement does not remove the need to migrate or redesign excluded features.
:::

The [Lifecycle listing](https://learn.microsoft.com/en-us/lifecycle/products/biztalk-server-2020) displays mainstream and extended dates in Pacific Time and contains a note with a different mainstream date presentation. The overview and listing also use different extended-support terminology. Confirm the exact applicable date and entitlement with Microsoft rather than resolving commercial terms from this hub.

These milestones apply to the named product lifecycle. They do not restrict which source estate you can assess with the Agent.

### Primary announcements

- [BizTalk product lifecycle update](https://techcommunity.microsoft.com/blog/integrationsonazureblog/microsoft-biztalk-server-product-lifecycle-update/4478559)
- [End-of-sale announcement](https://techcommunity.microsoft.com/blog/integrationsonazureblog/biztalk-server-2020-end-of-sale-announcement/4551317)
- [Microsoft Fixed Lifecycle Policy](https://learn.microsoft.com/en-us/lifecycle/policies/fixed)

Use a representative implementation to expose technical unknowns before committing to a broad schedule. Lifecycle policies and support agreements are separate considerations from the engineering guidance in this hub.

## Start with discovery, not a deadline assumption

Inspect shared dependencies, custom behavior and remediation work early. Use measured implementation and test effort rather than committing a schedule from artifact counts alone.

:::info Keep commercial decisions separate
Confirm lifecycle policies, support agreements and any optional support offering directly with Microsoft. They are planning constraints, not Agent eligibility checks or guarantees of migration duration.
:::

## Recommended sequence

These are recommended delivery phases, **not Microsoft-mandated deadlines or promised durations**. Work backwards from your organization's approved completion date with contingency.

### Now: assess and fund

- Identify interface owners and the scope of the existing implementation.
- Baseline message flows, operational costs, custom code and specialist dependencies.
- Inspect dependencies and identify high-risk redesign items.
- Obtain sponsorship, capacity, budget and engagement routes.

**Exit:** a reviewed inventory, risk register, initial target architecture and funded pilot.

### Next: prove patterns and migrate priority waves

- Complete a representative implementation before scaling migration.
- Approve hosting, network connectivity, identity, HA/DR and cost.
- Sequence dependencies and establish reusable patterns and tests.
- Move high-risk unknowns into early engineering spikes, not the last release.

**Exit:** repeatable implementation patterns and accepted migration waves.

### Before your approved completion date: cut over

- Rehearse freeze, drain, reconciliation, routing switch and rollback.
- Pass functional, performance, security and operations acceptance.
- Reserve business-owner availability for release decisions and hypercare.

**Exit:** signed acceptance, reconciled messages and stable target operations.

### After stabilization: decommission

- Confirm retention and audit obligations.
- Remove remaining dependencies, secrets and routing only after approval.
- Archive source, configuration, migration decisions and acceptance evidence.
- Retire licenses and infrastructure through your normal change process.

**Exit:** a signed retirement record. Use the [cutover and retirement runbook](./cutover.md).

## Sources

- [Migration Agent workflow](./migration-agent.md)
- [Microsoft migration planning guidance](https://learn.microsoft.com/en-us/azure/logic-apps/biztalk-server-migration-approaches)
- [Microsoft Lifecycle](https://learn.microsoft.com/en-us/lifecycle/)

Your applicable agreement remains authoritative for support and commercial decisions.
