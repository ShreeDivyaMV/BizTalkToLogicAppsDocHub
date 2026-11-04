---
title: Migration Agent capabilities
description: Discover the Agent's inventory, analysis, visualization, planning, conversion, validation, deployment and extensibility capabilities.
---

# AI-assisted. Engineer-reviewed.

The Azure Logic Apps Migration Agent is an open-source Visual Studio Code extension using GitHub Copilot and the VS Code Language Model API. It guides your team from source discovery to Logic Apps Standard deployment, with inspectable results at every stage.

This section brings its documented capabilities together, then links to [installation and usage](./agent-usage.md) and a [hands-on migration lab](./agent-lab.md). Application-specific behavior and generated artifacts still require technical review.

## Capability catalogue

| Capability | What it does | What to inspect |
| --- | --- | --- |
| Platform detection | Recognizes source project/file patterns | Correct source root and platform detection |
| Artifact parsing and inventory | Represents source metadata in a common intermediate representation | Missing files, artifact counts and unresolved references |
| Dependency analysis | Links projects, schemas, maps, orchestrations and other dependencies | Shared assemblies, endpoints and missing dependencies |
| Flow grouping | Identifies logical business flows, not necessarily one flow per project | Flow boundaries and cross-project dependencies |
| Architecture visualization | Generates interactive architecture diagrams | Source/target boundaries and actual connected components |
| Message-flow visualization | Traces triggers, processing, routing and completion | Correlation, branches, errors and external side effects |
| Pattern and gap detection | Identifies request/reply, publish/subscribe, scatter/gather, batch patterns and missing equivalents | Proposed remediation and business semantics |
| Target architecture and planning | Produces workflow definitions, component requirements and target patterns | Logic Apps as core; supporting services only when justified |
| Action mappings and dispositions | Maps source operations and records reuse/refactor/replace decisions | No unresolved operation hidden behind a default action |
| Conversion task planning | Orders implementation and local validation work from the approved plan | Dependencies and incomplete tasks |
| Workflow and project generation | Produces Standard workflows, connections, configuration and supporting files | Correct expressions, parameter references and environment settings |
| Custom-code generation | Can produce workflow-scoped .NET local functions where required | Runtime compatibility, dependencies and behavior tests |
| Validation assistance | Runs/generated-test workflows and compares source specifications | Exact outputs, failure cases and downstream business effects |
| Optional deployment | Prepares and deploys supported Azure targets after approval | Identity, network, configuration, resource cost and release boundary |
| Progress and saved results | Retains stage outputs for inspection and correction | Traceability from source to plan to implementation |
| Extensible parsers | Built-in BizTalk, MuleSoft and TIBCO parsers; extension points for other sources | Platform-specific coverage is not automatically identical |

The catalogue summarizes the [Agent overview](https://learn.microsoft.com/en-us/azure/logic-apps/migration/migration-agent-overview) and [Discovery documentation](https://learn.microsoft.com/en-us/azure/logic-apps/migration/migration-agent-discovery-stage), reviewed 3 November 2026. It is not a promise that every custom construct converts automatically.

## Source artifacts to collect

For BizTalk applications, the documentation covers project files (`.btproj`), orchestrations (`.odx`), schemas (`.xsd`), maps (`.btm`), pipelines (`.btp`), bindings, host data layouts (`.hidx`), exported rules and legacy web-service metadata (`.asmx`).

Include custom assemblies, source and referenced configuration. The public overview and BizTalk-specific approach differ on rule-export formats; check what the installed parser discovers rather than declaring every export format equivalent. Parser recognition alone does not prove conversion or adapter parity.

## Deployment scope

The reviewed BizTalk-specific article and [Deployment stage](https://learn.microsoft.com/en-us/azure/logic-apps/migration/migration-agent-deployment-stage) explicitly describe Workflow Service Plan automation for documented release 1.12.1; the generic overview has broader hosting wording. Treat ASE v3 and Hybrid deployment as a separately verified path using the generated Standard project until confirmed for the installed extension. See [hosting](./hosting.md) and [deployment](./deployment.md).

## Before you install

Use the current [Agent overview](https://learn.microsoft.com/en-us/azure/logic-apps/migration/migration-agent-overview), [repository](https://github.com/Azure/logicapps-migration-agent) and [release notes](https://github.com/Azure/logicapps-migration-agent/releases) for exact installation, VS Code, extension, Copilot access and local tooling prerequisites.

Collect:

- A controlled copy of the source solution, project files and sanitized bindings.
- Orchestrations, maps, schemas, pipelines, rules, custom code and referenced dependencies.
- Endpoint and adapter metadata without passwords, private keys or customer secrets.
- Representative inputs, expected outputs and current operational constraints.
- A non-production environment, approved AI-tool usage policy and named reviewers.

Confirm organization approval before allowing AI-assisted tooling to process source or integration metadata. This hub itself does not send your estate to the Agent.

## Inputs, outputs and responsibilities

| Stage | What you provide | What the Agent helps produce | Required human gate |
| --- | --- | --- | --- |
| **Discovery** | Source projects, artifacts and dependency context | Inventory, dependency graph, flow groups, architecture views and gaps | Reconcile against deployed interfaces and approve flow boundaries |
| **Planning** | Reviewed discovery and target constraints | Target architecture, flow definitions, action mappings, component requirements, dispositions and gap analysis | Resolve gaps and approve hosting, semantics, security and cost |
| **Conversion** | An approved flow plan | Standard workflows, connections, configuration, supporting code and local validation tasks | Review output, fix invalid configuration and implement unresolved behavior |
| **Validation** | Test messages, expected results and acceptance criteria | Execution and comparison assistance | Prove functional parity, resilience, performance, security and operations |
| **Deployment** | Approved environment and reviewed project | Optional deployment assistance within the release's supported targets | Separate approval of identity, network, resources, cost and production release |

The specialized Copilot agents are `@migration-analyser`, `@migration-planner` and `@migration-converter`. Inspect and retain the saved stage outputs rather than treating a completed stage as an automatic approval.

## Review the Agent's output

- Generated target: **Logic Apps Standard project artifacts**.
- During Discovery, confirm the inventory, endpoints, custom assemblies and business dependencies are complete.
- During Planning, assign an owner and resolution for every gap rather than treating an incomplete mapping as approval.
- Confirm deployment automation for your selected hosting environment in the current Agent guidance; plan a separate deployment process where needed.
- Custom code, unsupported constructs, missing dependencies and business-specific semantics can require manual implementation or redesign.
- The Agent does not replace business acceptance, partner certification, operational readiness or cutover ownership.

## Where effort can be reduced

Repeatable inventory, initial pattern analysis, source-to-target mapping and baseline artifact generation can reduce repetitive engineering. The actual benefit depends on source completeness, pattern reuse, custom code and review quality. This hub does not promise a percentage reduction or a delivery duration.

## First practical step

Follow [how to use the Agent](./agent-usage.md), then [the Agent migration lab](./agent-lab.md). Review generated code against the [technical cookbook](./journey.mdx), [transformation tests](./workshop.md) and [connection requirements](./connectivity.md).

### Tooling and learning links

- [Install Migration Agent](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.logicapps-migration-agent)
- [Official quickstart](https://learn.microsoft.com/en-us/azure/logic-apps/migration/migration-agent-quickstart)
- [Repository and issues](https://github.com/Azure/logicapps-migration-agent)
- [Release notes](https://github.com/Azure/logicapps-migration-agent/releases)
- [Extend with custom parsers](https://learn.microsoft.com/en-us/azure/logic-apps/migration/migration-agent-extend)
- [Logic Apps Labs](https://azure.github.io/logicapps-labs/)

### Stage documentation

- [Discovery](https://learn.microsoft.com/en-us/azure/logic-apps/migration/migration-agent-discovery-stage)
- [Planning](https://learn.microsoft.com/en-us/azure/logic-apps/migration/migration-agent-planning-stage)
- [Conversion](https://learn.microsoft.com/en-us/azure/logic-apps/migration/migration-agent-conversion-stage)
- [Validation](https://learn.microsoft.com/en-us/azure/logic-apps/migration/migration-agent-validation-stage)
- [Deployment](https://learn.microsoft.com/en-us/azure/logic-apps/migration/migration-agent-deployment-stage)
