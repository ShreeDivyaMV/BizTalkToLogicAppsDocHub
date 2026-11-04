---
title: Migration announcements and roadmap
description: BizTalk migration announcements, documented Migration Agent capabilities and upcoming deployment options.
---

# Migration announcements and roadmap

Focus on features that help move BizTalk workloads to Logic Apps Standard: assessment, compatibility analysis, artifact conversion, validation and deployment. **Last checked: 4 November 2026.** Keep announced previews, documented capabilities and future options separate; roadmap items are not production dependencies.

## Recently announced

The [Microsoft Build 2026 announcement, published 2 June 2026](https://techcommunity.microsoft.com/blog/integrationsonazureblog/whats-new-in-azure-logic-apps-at-microsoft-build-2026/4524685), introduced **Migration Agent for Azure Logic Apps** in public preview to assist migration from BizTalk and other integration platforms.

| Migration feature | Status in the announcement | Value for BizTalk modernization |
| --- | --- | --- |
| Migration Agent for Azure Logic Apps | **Public preview** | Assist legacy-platform discovery, compatibility analysis, migration planning and implementation; use the [hands-on lab](./agent-lab.md) to review real outputs |

This is the announcement-time status, not a claim about a later GA transition. Check current release notes and prerequisites before adopting the tooling.

## Migration capabilities

The [Agent overview](https://learn.microsoft.com/en-us/azure/logic-apps/migration/migration-agent-overview) documents the following migration features. These are capabilities to evaluate, not separate newly released features or promises of automatic parity.

| Capability | Migration benefit | What to verify |
| --- | --- | --- |
| Artifact discovery and dependency visualization | Inventory projects, schemas, maps, pipelines and bindings; identify logical flows and missing references | Source coverage, shared assemblies, bindings and flow boundaries |
| Compatibility analysis and target planning | Review gaps, action mappings, artifact dispositions and required target components | Business semantics, unsupported constructs and Logic Apps-first design |
| Standard project generation | Generate workflows, connections, configuration and supporting code from the reviewed plan | Complete operations, environment values and compatible dependencies |
| Behavioral validation | Compare generated workflows with source expectations, including field-level outputs and error cases | Test evidence, duplicate effects, failures and the generated test report |
| Optional Azure deployment | Provision and deploy the reviewed project within the documented hosting scope | Subscription, identity, network, cost and installed-release support |

Use the [capability catalogue](./migration-agent.md) for detail, [installation and usage](./agent-usage.md) for setup, and the [step-by-step migration lab](./agent-lab.md) to test these features on a controlled source application.

## Upcoming features

The [Migration Agent Deployment stage documentation](https://learn.microsoft.com/en-us/azure/logic-apps/migration/migration-agent-deployment-stage) explicitly identifies the following as **future options** for documented version **1.12.1**:

| Published future option | Current documented boundary | Planning guidance |
| --- | --- | --- |
| Agent-automated deployment to ASE v3 | Release 1.12.1 documents Workflow Service Plan automation; ASE v3 automation is not supported there | ASE v3 is already a Logic Apps hosting option; use a separately verified deployment approach rather than assuming Agent automation |
| Agent-automated Hybrid deployment | Hybrid automation is listed as a future option, not supported in that documented release | Hybrid hosting already exists; validate customer-managed infrastructure, feature differences and deployment separately |

**No committed release dates are provided in that source.** “Future” is not a delivery guarantee. Preview features above are not automatically upcoming GA commitments, and existing hosting support is different from the Agent's ability to deploy it automatically.

## How to follow updates

- [Migration Agent releases](https://github.com/Azure/logicapps-migration-agent/releases): compare installed extension versions and published changes.
- [Migration Agent documentation](https://learn.microsoft.com/en-us/azure/logic-apps/migration/migration-agent-overview): check migration stages, supported artifacts and limitations.
- [BizTalk migration approaches](https://learn.microsoft.com/en-us/azure/logic-apps/biztalk-server-migration-approaches): verify conversion and deployment boundaries.
- [Azure Integration Services product blog](https://techcommunity.microsoft.com/category/azure/blog/integrationsonazureblog): follow BizTalk migration and tooling announcements.

For production design, start with [hosting options](./hosting.md) and the [feature catalogue](./features.md). Adopt a new capability only after confirming support, governance/security controls, performance and recovery behavior in your target environment.
