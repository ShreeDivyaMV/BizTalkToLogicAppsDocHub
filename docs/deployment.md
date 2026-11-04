---
title: Deployment and configuration
description: Understand Standard project files, environment configuration, connection references and deployment diagnostics.
---

# Package the implementation, separate the environment

A Standard app can contain multiple workflows and shared artifacts. Keep their source together where they share a lifecycle; do not embed environment credentials in workflow definitions.

## Typical project layout

```text
host.json
connections.json
parameters.json
local.settings.json
Artifacts/
  Maps/
  Schemas/
OrderIntake/
  workflow.json
```

Local-function projects add their own source/build layout; use the current Standard workspace scaffold rather than treating this tree as a complete template.

| File | Purpose | Important distinction |
| --- | --- | --- |
| `workflow.json` | Triggers, actions, dependencies and workflow kind | Version this implementation; check the trigger is intentionally enabled |
| `connections.json` | Built-in and managed connection references/configuration | Resolve environment-specific values; do not store live credentials |
| `parameters.json` | Workflow parameter values/references | Distinguish workflow expressions from app settings |
| `host.json` | Runtime configuration | Host settings can affect all workflows in the app |
| `local.settings.json` | Local development settings | Keep secrets out of source; do not assume this file configures Azure |
| `Artifacts` | Maps, schemas and related assets | Include referenced artifacts in the deployed package |

## Environment configuration

In supported connection fields, reference app settings instead of literal credentials. For example, a built-in connection may reference a setting such as:

```json
{
  "connectionString": "@appsetting('ServiceBusConnectionString')"
}
```

This is a **field fragment**, not a complete connector definition. Use the designer-generated connection structure for the chosen operation. Prefer a managed-identity connection when supported; the connection-string example does not require that authentication choice.

Provide settings in the target environment before enabling listeners. Verify resource IDs, endpoint hostnames, identities, connection access policies, DNS and artifact names independently for each environment.

## Build and deploy

- Scaffold/build using the [Standard Visual Studio Code tooling](https://learn.microsoft.com/en-us/azure/logic-apps/create-standard-workflows-visual-studio-code).
- Provision the selected hosting, storage, network and connection dependencies separately from app content.
- Package workflows and their maps/schemas/code consistently; promote the same built artifact between environments.
- Apply environment settings and verify identity/connection references before activating production intake.
- Run a synthetic message and confirm the downstream business result, not only that the deployment operation succeeded.

This hub does not provision infrastructure or supply a universal deployment command: Workflow Service Plan, ASE v3 and Hybrid have different prerequisites and deployment paths.

## Troubleshoot a deployed app

| Symptom | Check |
| --- | --- |
| Workflow missing | Package root, workflow folder, `workflow.json` and disabled state |
| Connection cannot resolve a setting | Setting name/case, runtime environment and expression location |
| Managed API connection fails | Resource ID, location, connection access/authorization and runtime URL |
| Transform artifact missing | Package contents and selected artifact source/name |
| Startup/storage errors | Required runtime settings, storage connectivity, DNS and permissions |
| Trigger fires against the wrong system | Environment overrides and stale connection references |

Use the [technical testing guide](./validation.md) for deployment smoke checks and [cutover reference](./cutover.md) for production traffic switching.
