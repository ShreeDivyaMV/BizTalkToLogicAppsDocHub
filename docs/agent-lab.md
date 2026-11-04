---
title: Hands-on Migration Agent lab
description: Step-by-step instructions to install Migration Agent, discover a BizTalk application, plan, convert, validate and optionally deploy.
---

# Your first hands-on Agent migration

Use a small application you own or a source example referenced by the [official quickstart](https://learn.microsoft.com/en-us/azure/logic-apps/migration/migration-agent-quickstart). This is an instructional lab, not a bundled BizTalk solution or a claim that its Agent execution has been tested against your environment.

**Lab outcome:** a reviewed source inventory, target design, generated Standard project and a test report that compares actual behavior with your source expectations. Azure deployment is optional.

The hub's [downloadable XML lab](./workshop.md) supplies local schema/map fixtures and a regression script. Those files **alone are not a BizTalk application** and cannot substitute for a `.btproj`, orchestration or bindings in Agent discovery.

## Set up the lab

1. Open Visual Studio Code, press **Ctrl+Shift+X**, search for **Azure Logic Apps Migration Agent**, and select **Install**.
2. Verify the [Standard extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurelogicapps), Azure Functions extension/Core Tools and local test dependencies in [installation and prerequisites](./agent-usage.md). Confirm GitHub Copilot access and your organization's permission to process the source with the selected tooling.
3. Use a branch or sanitized source copy, for example `C:\MigrationLab\source`. Keep generated target files separate from the source.
4. Record the installed Agent version, source revision and chosen test destinations. Never copy production credentials into prompts, screenshots or public issues.
5. For Azure-backed tests or deployment, obtain approval for the subscription, resource group and expected cost before allowing resource-creation commands.

The UI names below follow the [Microsoft quickstart](https://learn.microsoft.com/en-us/azure/logic-apps/migration/migration-agent-quickstart), checked 4 November 2026. Use its current instructions if the installed release differs.

## Prepare a bounded source

Choose a flow that receives an order, validates its schema, transforms it and sends it to a test destination. Include the real source projects, schemas/maps, bindings and referenced code.

Record:

- Valid and invalid input messages with exact expected outputs.
- Receive/send operation, authentication and network assumptions.
- Routing, retry, acknowledgment, duplicate and correlation behavior.
- A non-production destination and sanitized configuration.

Disable or replace live endpoint settings. The exercise must not send production messages.

## 1. Run Discovery

1. On the VS Code Activity Bar, select **Azure Logic Apps Migration Agent**.
2. In **Discovery Results**, choose **Select Source Folder**. Select the controlled source root and confirm **Select Source Project Folder or MSI**. Do not select generated output as the source.
3. Inspect the detected platform and inventory. Confirm the projects, schemas/maps, pipelines, bindings and references match the source application.
4. On **Home**, choose the logical flow group and select **Analyze Source Design**.
5. Open **Architecture Diagram**, **Message Flow**, **Components**, **Missing Dependencies**, **Gap Analysis** and **Patterns**. Verify the receive operation, schema/map, processing and send operation appear in the intended flow.
6. Use **Suggest a Change** to correct the analysis, add missing dependencies, then choose **Regenerate Analysis**. Use **Export Report** to keep the reviewed result.

**Keep:** the inventory, reviewed flow boundary, dependency/gap records and source revision.

## 2. Review Planning

1. Return to **Home** and select **Plan Logic App Design** for the same flow group.
2. Review **Architecture**, **Additional Azure components**, **Operations mapping**, **Artifact dispositions**, **Migration gaps**, **Integration patterns** and **Summary**.
3. Check how each receive/send operation, transformation, pipeline step, rule and custom-code dependency maps to the target.
4. Use `@migration-planner` in Copilot chat to correct mappings and resolve gaps before conversion.
5. Select the [hosting option](./hosting.md) and confirm identity, network, state, correlation and retry assumptions. For each optional Service Bus, APIM, Event Grid or separate code service, explain the requirement it solves.

**Keep:** the corrected plan and an explicit implementation/test for each gap.

## 3. Convert the flow

1. On **Home**, select **Create Conversion Tasks** for the reviewed flow.
2. Inspect the generated task list and dependency order. Confirm that scaffolding, artifacts, connection/workflow generation and required validation tasks are present for your flow.
3. Choose **Execute** to run a task individually, or **Execute All** to run required conversion and local validation in order. **Execute Conversion Tasks** on Home follows the required-task path.
4. Review each permission prompt before approving commands or file changes. Conversion approval is not permission for production access.
5. Open the generated target location reported by the Agent. Inspect the task results and files below before accepting the implementation.

Verify:

- Trigger/action types, expressions and `runAfter` dependencies.
- Schema/map references and extension dependencies.
- Connections and parameter/app-setting references.
- Generated code, exception behavior and runtime requirements.

Replace live endpoints with test values. Resolve incomplete behavior explicitly, rather than accepting empty/default outputs.

**Keep:** the reviewed target revision and unresolved issues, if any.

## 4. Validate the implementation

| Case | Required check |
| --- | --- |
| Valid order | Expected transformed message and downstream side effect |
| Missing/invalid field | Visible schema/business rejection, not silent success |
| Unexpected XML namespace | Rejection or intentionally specified handling |
| Duplicate input | No unintended duplicate business effect |
| Destination unavailable | Bounded retries, correlated failure and safe recovery |

1. Confirm generated connection/app settings point only to isolated test destinations and that required test services are running.
2. Run the generated **Validate Runtime** and applicable end-to-end testing tasks. If you need to diagnose startup manually, open a terminal in the generated Standard project root and run `func start --verbose` when that host is not already running.
3. Use the actual trigger's test mechanism to submit each saved input above: for example, the local HTTP endpoint or isolated queue/file location selected in the generated workflow. There is no universal URL for every trigger.
4. Compare field-level outputs and downstream business effects with your recorded source expectations. Inspect failed actions and correlation/run IDs for negative cases.
5. Correct a discrepancy in the plan/code/configuration and rerun the affected tests. Reject incorrect, empty or truncated values.
6. Open `TEST-REPORT.md` in the generated project root. Confirm it includes per-workflow results, expected/actual fields, deviations, resources used and exact retest commands.

For XML-only behavior, run the [local transformation lab](./workshop.md) before runtime tests. Then execute the same cases through the generated Standard workflow; local XSLT success does not establish connector or hosted-runtime correctness.

**Keep:** the generated `TEST-REPORT.md`, expected/actual outputs, run/business IDs and failures tied to the target revision. The report should include field-level checks, deviations and exact retest commands; do not accept empty or truncated values as a pass.

## 5. Optional test deployment

Stop here unless deployment is approved. Select an isolated environment, verify resources/cost/network/identity, and use the supported Agent deployment path or an appropriate separate pipeline for the chosen host.

1. Recheck the Azure subscription, region, resource group, identity, network configuration and estimated cost.
2. Confirm deployment support for your installed extension. The [documented 1.12.1 path](https://learn.microsoft.com/en-us/azure/logic-apps/migration/migration-agent-deployment-stage) automates Workflow Service Plan deployment, not ASE v3 or Hybrid.
3. Select **Execute** for **Cloud Deployment & Testing** only after reviewing the deployment plan and permissions.
4. Inspect the deployed connections/settings and authorize managed connections separately if required.
5. Send a synthetic test message, compare cloud output and destination effects, then inspect run diagnostics. Do not activate production listeners.

**Execute All** excludes **Cloud Deployment & Testing**. Running that optional task is a separate decision; Azure-dependent connector validation can also create costs even without a full deployment.

## Finish with technical evidence

Record what was generated successfully, what needed remediation and what remains untested. Feed those findings into the [Logic Apps feature guide](./features.md) and [technical cookbook](./journey.mdx), not a percentage-automation claim.

Stop local lab processes when finished. Review resources created during testing with their owner, then remove only confirmed disposable lab resources after approval; do not delete shared resources or a group containing unrelated workloads.

Further links: [Discovery](https://learn.microsoft.com/en-us/azure/logic-apps/migration/migration-agent-discovery-stage), [Planning](https://learn.microsoft.com/en-us/azure/logic-apps/migration/migration-agent-planning-stage), [Conversion](https://learn.microsoft.com/en-us/azure/logic-apps/migration/migration-agent-conversion-stage), [Validation](https://learn.microsoft.com/en-us/azure/logic-apps/migration/migration-agent-validation-stage), [Deployment](https://learn.microsoft.com/en-us/azure/logic-apps/migration/migration-agent-deployment-stage).
