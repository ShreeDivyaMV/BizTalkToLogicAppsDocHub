---
title: Testing and troubleshooting
description: Build evidence for behavior, performance, resilience, security and operations before cutover.
---

# Prove parity before production

Preserve required business behavior, not incidental implementation details. Test exact inputs, transformed outputs, external side effects and error paths. Run local artifact tests separately from runtime/connector tests so a failure can be traced to the right layer.

## Test by layer

| Layer | Execute | Does not prove |
| --- | --- | --- |
| Artifact | XSD/XSLT fixtures and pure-code unit tests | Connector, identity or hosted-runtime behavior |
| Workflow | Trigger input, action dependencies, failure paths and outputs in Standard | Full end-to-end behavior when external systems are mocked |
| Integration | Real operation against a test endpoint with target-host identity/network | Production-scale capacity or partner certification |
| Load/recovery | Peak traffic, throttling, restarts, duplicate/replay and resource measurements | Correctness for untested contracts |

Start with the [local transformation lab](./workshop.md). Then feed the same cases into the Standard workflow and compare business identifiers, payloads and side effects.

## A repeatable failure investigation

1. Locate the message by business correlation ID and identify its workflow/run/action.
2. Inspect the first unexpected action status; later skipped actions are often symptoms.
3. Check sanitized inputs, operation settings, connection references and effective runtime identity.
4. Distinguish invalid contract data, authorization, network failure, throttling and business rejection.
5. Reproduce in a test environment, fix the responsible layer, then rerun the failure and duplicate cases.

Avoid replay until you know which external side effects already committed. See [recovery patterns](./journey.mdx#recovery).

## Freeze the baseline

For each scenario capture:

- Source application and artifact version.
- Sanitized input, trigger conditions and environment assumptions.
- Expected output, side effects, acknowledgments and ordering.
- Correlation identifiers and the expected observable failure path.
- Allowed differences, explicitly approved by the business owner.

Never compare only successful HTTP status codes or workflow completion flags when the requirement is a downstream business outcome.

## Acceptance dimensions

| Dimension | Cases | Evidence and owner |
| --- | --- | --- |
| Functional | Happy path, schema failure, boundary values, transformation, rule outcomes, partner acknowledgments | Expected/actual payloads and side effects; application/test lead |
| Delivery semantics | Duplicate messages, ordering, correlation, replay and compensation | Reconciled business identifiers; application architect |
| Performance | Typical load, peak sustained load, bursts and representative payload sizes | Measured latency percentiles, throughput and resource pressure against agreed thresholds; performance lead |
| Resilience | Endpoint failure, throttling, transient faults, exhausted retries, recovery and replay | No silent loss or duplicate side effects beyond the agreed contract; operations lead |
| Security | Least privilege, identity, network boundaries, secret/certificate handling and data exposure | Security review and negative-access tests; security owner |
| Operations | Alerts, business tracing, recovery, retention and incident procedures | Demonstrated operator diagnosis and recovery; service owner |
| Release | Deployment, environment configuration, coexistence and rollback | Rehearsed runbook and release provenance; release lead |

Set numeric performance, error-rate, reconciliation and recovery thresholds per interface. This hub intentionally does not invent universal thresholds for different businesses.

## A useful test record

| Field | Example of what to record |
| --- | --- |
| Scenario | Stable identifier and requirement reference |
| Source / target | Commit IDs, runtime versions and environment |
| Input / expected | Approved fixture IDs and exact expected business result |
| Actual | Output, side effects and correlation IDs |
| Threshold | Agreed measurable pass/fail condition |
| Verdict | Pass, fail or blocked; no success-shaped fallback for unavailable dependencies |
| Follow-up | Defect link, owner and retest evidence |

## Exit gate

The business owner approves parity; operations accepts monitoring and recovery; security approves controls; the release owner accepts coexistence and rollback. Any unresolved exception must have explicit risk acceptance and a named owner.

Continue with the [cutover runbook](./cutover.md).
