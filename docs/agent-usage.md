---
title: Install and use Migration Agent
description: Set up Visual Studio Code tooling, select source artifacts, inspect Agent outputs and run conversion safely.
---

# How to use Migration Agent

Follow the current [official quickstart](https://learn.microsoft.com/en-us/azure/logic-apps/migration/migration-agent-quickstart) for release-specific prerequisites and UI. The instructions below explain what to do and what evidence to inspect, without adding a source-version eligibility questionnaire.

## Install the tools

| Tool | Purpose |
| --- | --- |
| [Visual Studio Code](https://code.visualstudio.com/download) | Source workspace and Agent interface |
| [Migration Agent extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.logicapps-migration-agent) | Discovery, analysis, planning and generation |
| [Logic Apps Standard extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurelogicapps) | Workflow development and local tooling |
| [GitHub Copilot access](https://github.com/features/copilot/plans) | Model-powered analysis, planning and conversion |
| [Azure Functions extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions) and [Core Tools](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local) | Local Standard runtime and local-function development; not a separate Function app requirement |
| [Docker Desktop](https://docs.docker.com/desktop/) | Connector/local dependency testing when required by the exercise |
| [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli) and an authorized subscription | Azure provisioning/deployment only |

Install the Agent from VS Code's **Extensions** view. Verify dependent extensions and local tool prerequisites from the quickstart. Organization policy must permit the model/tooling access used for source processing.

## Select your source

1. Open a controlled, sanitized copy of the source application in VS Code.
2. On the Activity Bar, open **Azure Logic Apps Migration Agent**.
3. In **Discovery Results**, choose **Select Source Folder**.
4. Select the source root containing projects, artifacts and dependencies.

The documented Command Palette alternative is **Azure Logic Apps Migration Agent: Select Source Folder**. Do not select the generated target folder as the source.

## Discover and inspect

The Agent detects the platform, parses files and builds an inventory/dependency graph. `@migration-analyser` groups flows and generates architecture, message-flow, pattern and gap views.

On the **Home** tab, select **Analyze Source Design** for the chosen flow. Inspect **Architecture Diagram**, **Message Flow**, **Components**, **Missing Dependencies**, **Gap Analysis** and **Patterns**. Use **Suggest a Change**, **Regenerate Analysis** or **Export Report** as appropriate.

Reconcile bindings, endpoints, maps, schemas and custom dependencies. Inspect inferred flow groups: they can span multiple source projects. Correct missing references before relying on the plan.

## Plan and resolve gaps

On **Home**, select **Plan Logic App Design** for the flow. Use `@migration-planner` to inspect the target workflow definitions, action mappings, artifact dispositions, component requirements and unresolved gaps. Start with **Logic Apps Standard**; require a reason for each additional AIS service.

Choose the host, identity/network assumptions and expected error/delivery behavior. Correct the plan before conversion, especially for custom pipeline logic, correlation, transactions and partner protocols.

## Convert and inspect files

On **Home**, select **Create Conversion Tasks**. Review the tasks, then choose an individual **Execute** action or **Execute All** to run required conversion and local validation in dependency order. **Execute Conversion Tasks** on Home invokes that required-task path. The optional **Cloud Deployment & Testing** task is excluded from **Execute All** and requires a separate action.

`@migration-converter` executes the implementation tasks derived from the approved plan. Inspect `workflow.json`, connection references, parameters, maps/schemas and generated code.

Review command permissions when prompted; approval to read/analyze source does not authorize provisioning or production access. Replace generated environment values with isolated test settings.

## Validate and optionally deploy

Use representative inputs and exact expected outputs. Test malformed data, duplicates, downstream failure and recovery; compare business effects, not only successful run status.

The [Validation stage](https://learn.microsoft.com/en-us/azure/logic-apps/migration/migration-agent-validation-stage) runs `func start --verbose`, prepares local/Azurite/container resources where supported and checks field-level outputs. Review the generated project's `TEST-REPORT.md` for per-workflow results, deviations, test adaptations, resources and exact retest commands. Azure-backed validation still requires permission and may incur cost.

Deployment is optional and separately approved. Confirm subscription, region, cost, identity, networking and the extension's deployment-target scope. No live deployment is performed by this documentation site.

## Troubleshoot the right layer

| Symptom | Check |
| --- | --- |
| Artifacts missing | Selected root, accessible files, project references and parser results |
| Incomplete flow groups | Cross-project dependencies and inferred grouping |
| Generated actions differ from source | Planning mappings, gap dispositions and missing behavior |
| Local execution fails | Core Tools, Standard extension, generated project build and local dependencies |
| Connector works only on a laptop | Target identity, DNS and network path |
| Deployment target unclear | Installed release and explicit host-specific documentation |

See [capabilities](./migration-agent.md), [hands-on lab](./agent-lab.md) and [support contacts](./support.md).
