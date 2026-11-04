---
title: Reusable integration components
description: Share tested maps, code, configuration and failure-handling patterns without coupling independent applications.
---

# Reuse implementations, not hidden assumptions

Repeated integration patterns benefit from reusable artifacts and tests. Sharing a component must not silently couple deployment, scaling or credentials across unrelated workflows.

## Good reuse boundaries

| Component | Package with | Contract test |
| --- | --- | --- |
| Schema/map | Referenced imports, transform dependencies and fixtures | Input schema and expected output for each supported contract |
| Custom .NET helper | Explicit dependencies and runtime compatibility | Success, validation error and serialization cases |
| Connection pattern | Operation type, identity requirements and configuration names | Target-host authentication and operation execution |
| Error/retry pattern | Retryable conditions, timeout, failure destination and correlation | Transient failure, permanent failure, replay and duplicate delivery |
| Workflow template | Parameter definitions, expected side effects and runtime assumptions | An end-to-end synthetic message in an isolated environment |

## Keep configuration outside shared code

Use consistent setting names and inject values per environment. Do not distribute a template with a real endpoint, credential or connection resource ID embedded in it. A shared connection resource may create a shared failure/security boundary; decide whether that is intentional.

## Version changes explicitly

Pin a tested artifact version per consumer. Changing a schema namespace, field meaning, rounding rule or retry policy can break downstream behavior even if a workflow still builds.

Run producer/consumer contract tests before promoting a shared change. For incompatible schemas, publish a new contract rather than replacing an old artifact under the same name.

## Avoid accidental runtime coupling

Do not use a static variable in shared code for cross-workflow state. Do not assume one shared host provides transaction isolation. Keep workflows with independent security, capacity or release needs in separate application boundaries.

Measure repeated XML parsing, payload copies and connector calls before centralizing them behind another network service. Reuse does not always require a remote API.

## Technical verification

- Run the same fixture suite against every supported map version.
- Resolve all artifact references from a clean build.
- Deploy without developer-local paths or environment-specific secrets.
- Exercise the error path when a shared dependency is unavailable.
- Identify every consumer before removing an old artifact or credential.

See [deployment](./deployment.md), [custom code](./custom-code.md) and [technical validation](./validation.md).
