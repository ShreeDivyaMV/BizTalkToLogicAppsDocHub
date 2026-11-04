---
title: Why migrate from BizTalk?
description: Start with BizTalk end-of-life, then explore Logic Apps as an enterprise integration platform with performance, governance, security and reliability.
---

# Why migrate from BizTalk?

BizTalk supports business-critical integrations. Its final release and published end-of-life milestones make it important to plan how those integrations will continue beyond the product lifecycle, rather than waiting until support options narrow.

## BizTalk end-of-life: why act now?

Microsoft identifies BizTalk Server 2020 as the final release. The [migration overview](https://learn.microsoft.com/en-us/azure/logic-apps/biztalk-server-migration-overview) and [lifecycle announcement](https://techcommunity.microsoft.com/blog/integrationsonazureblog/microsoft-biztalk-server-product-lifecycle-update/4478559) describe:

- **31 March 2027:** expected end of sales, not an immediate runtime shutdown.
- **12 April 2028:** mainstream support milestone.
- **13 April 2028 to 10 April 2030:** planned optional paid extended-mainstream support for eligible customers, not an entitlement for every installation.

End of sale is not end of support. The paid offering is subject to eligibility, exclusions, pricing and final purchasing terms; do not assume entitlement. Dates for a product lifecycle are **not Migration Agent source eligibility gates**.

Read [EOL dates and support terms](./lifecycle.md) for authoritative references, date/terminology caveats and commercial considerations.

Start early enough to inventory dependencies, verify message contracts, refactor unsupported behaviors, load-test the target and rehearse cutover. Migration is also an opportunity to modernize development, private-system connectivity and operations while evaluating the ongoing cost of maintaining the source environment.

## Why choose Logic Apps for enterprise integration?

**Azure Logic Apps is an enterprise integration platform, not just a workflow designer.** Microsoft's migration overview identifies it as the successor platform, with **Logic Apps Standard** as the core target for orchestration, transformations, enterprise connectivity, B2B and custom code.

### Performance and scale

- Dedicated Standard hosting capacity, multiple workflows per app and scale-out options let you align compute with workload needs.
- Choose durable stateful execution or bounded stateless processing according to the actual contract.
- Built-in operations and workflow-scoped .NET local functions can keep processing within the integration application boundary.
- Measure throughput, latency, concurrency, payload size and connector/downstream throttling under representative load. No fixed throughput or savings promise applies to every integration.

### Governance

- Use Azure role-based access control for resource management, supported Azure Policy controls, tagging and environment separation.
- Keep workflows, shared artifacts and infrastructure definitions in source control with reviewed CI/CD and deployment approvals.
- Define ownership, connection permissions, configuration standards and controlled access to run data across teams.
- Add API Management only when API lifecycle/policy governance is required outside the workflow.

### Security

- Use managed identity for supported connectors, least-privilege permissions and appropriate secret/certificate management.
- Design private inbound access and outbound VNet connectivity separately; validate DNS, firewalls and on-premises routes.
- Protect sensitive payloads in run history and telemetry, and validate authentication at each service boundary.
- Confirm each control for the selected connector and hosting model; Hybrid and Azure-hosted environments are not identical.

### Reliability and operational resilience

- Stateful execution, retry policies, scopes and explicit error paths support durable processing and recoverable failures.
- Configure zone redundancy for supported Standard hosting/regions and include storage and dependencies in the availability design.
- Design cross-region recovery with deployed dependencies, RTO/RPO, replay and duplicate controls; routing alone does not move in-flight state.
- Use run diagnostics, business correlation and host-appropriate monitoring to identify and recover failed integrations.

See [Microsoft's reliability guidance](https://learn.microsoft.com/en-us/azure/reliability/reliability-logic-apps), [networking and security](./networking.md), [technical patterns](./journey.mdx) and [deployment controls](./deployment.md).

### Enterprise integration capabilities

Preserve suitable schemas, maps, rule policies and .NET logic, with behavioral tests. Standard combines these with connectors and B2B capabilities; supporting AIS products provide independent messaging, API management or event distribution when required.

Migration is a refactoring exercise, not a guaranteed lift-and-shift. Preserve message contracts and business effects while changing the implementation.

## Choose hosting early

Compare **Workflow Service Plan**, **App Service Environment v3** and **Hybrid** in [Logic Apps hosting options](./hosting.md) before conversion. Then explore the [feature catalogue](./features.md) and [migration announcements and roadmap](./whats-new.md).

## Tools that help you migrate

The [Migration Agent](./migration-agent.md) assists with inventory, architecture/message-flow visualization, analysis, planning, conversion, validation and optional deployment. The [Standard extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurelogicapps) provides workflow development and local execution. The [technical assessment](./readiness.mdx) and existing test evidence help establish the baseline.

Start with [Agent installation and usage](./agent-usage.md), then the [hands-on migration lab](./agent-lab.md).

## Technical support and contact routes

- **Product incident:** use your Azure support plan through the Azure portal's **Help + support**; include sanitized error details and business impact.
- **Tooling defect:** use the [Migration Agent GitHub issues](https://github.com/Azure/logicapps-migration-agent/issues) with the installed release and a minimal reproduction.
- **Architecture or migration assistance:** contact your existing Microsoft account team or find a qualified delivery partner.
- **Pricing or purchase questions:** use the published [Azure sales contact](https://azure.microsoft.com/en-us/contact/).
- **Community guidance:** ask a sanitized question in [Microsoft Q&A](https://learn.microsoft.com/en-us/answers/tags/134/azure-logic-apps/).

See [support, tooling and contacts](./support.md) for direct links, scope and intake information. No private email address or unverified programme entitlement is published here.

## Continue through the hub

1. **Why migrate and get help:** lifecycle, tools, support and contacts.
2. **Migrate with Migration Agent:** capabilities, how to use it and hands-on validation.
3. **Build on Logic Apps and AIS:** compatible features, integration patterns, supporting products, pricing, networking and load balancing.

Begin the third section with [hosting options](./hosting.md), then use the [Logic Apps feature guide](./features.md) for detailed implementation guidance.
