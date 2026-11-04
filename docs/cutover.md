---
title: Cutover and decommission runbooks
description: Plan coexistence, reconciliation, traffic switch, rollback, hypercare and retirement.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Cut over with controls

These are operational templates to adapt and rehearse. They are not executable scripts or authorization to change production.

<a className="button button--primary" href={useBaseUrl('/downloads/cutover-runbook.csv')} download>Download the cutover template (CSV)</a>

## Define before the release

Record application scope, source/target versions, owners, change window, endpoint switch method, in-flight message handling, partner contacts and approved rollback deadline.

Agree numeric go/no-go thresholds for error rate, latency, message reconciliation and recovery time. Name the person authorized to halt the release.

## Coexistence controls

- Assign a single active consumer or explicitly define safe fan-out semantics.
- Keep correlation and business message identifiers consistent across systems.
- Define idempotency and duplicate handling before shadow or parallel execution.
- Route shadow outputs to an isolated sink; never duplicate business side effects accidentally.
- Reconcile received, completed, failed, retried and in-flight messages by business identifier.

## Cutover sequence

| Step | Action | Go/no-go evidence | Owner |
| --- | --- | --- | --- |
| 1. Approve | Confirm release, test evidence, staffing and rollback readiness | Signed release record and current recovery rehearsal | Release lead |
| 2. Freeze | Freeze configuration and source changes within agreed scope | Version manifest and change controls | Application lead |
| 3. Quiesce | Pause new intake using the approved source mechanism | Intake state recorded and upstream owners informed | BizTalk operations |
| 4. Drain | Complete or explicitly park in-flight messages and long-running instances | Identified backlog and owned exception list | BizTalk operations |
| 5. Reconcile | Compare business identifiers, state and expected side effects | All unexplained differences resolved or explicitly accepted | Business/test owner |
| 6. Switch | Apply the reviewed routing/endpoint change | Correct target identity, connection and traffic verified | Platform lead |
| 7. Observe | Monitor end-to-end business outcomes against approved thresholds | Traceable success, errors, latency and partner responses | Operations |
| 8. Accept | Obtain business and service-owner acceptance | Signed decision and hypercare handoff | Business owner |

## Rollback is a designed path

Trigger rollback when an agreed threshold is crossed, reconciliation fails, a critical security issue occurs or a dependency is unavailable beyond the approved tolerance.

1. Stop or isolate target intake to avoid uncontrolled duplicate processing.
2. Identify target-completed, failed and in-flight messages by business ID.
3. Reconcile already committed external side effects. Returning an endpoint to BizTalk does **not** undo them.
4. Restore the approved source route and compatible configuration.
5. Replay only the reconciled safe subset under the agreed duplicate policy.
6. Verify business outcomes, record the incident and reschedule only after remediation.

Some data or partner-side changes cannot be automatically reversed. Document compensation, recovery authority and point-of-no-return conditions before release.

## Hypercare

Staff the agreed observation period with business, application, platform and partner contacts. Track failed/retried messages, duplicates, latency, business reconciliation and capacity. Close only when stability criteria and service ownership are accepted.

## Decommission only after stabilization

- Obtain business, operations, security and records-retention approval.
- Confirm no remaining producers, consumers, schedules, long-running instances or shared dependencies rely on BizTalk.
- Archive source, bindings, certificates **by reference**, runbooks, tracking evidence and approvals in approved secure storage.
- Apply retention rules for audit data and business records; do not delete them simply because workflows moved.
- Remove routing, secrets, certificates, identities and network access through controlled changes.
- Retire infrastructure, monitoring rules and licenses using the organization's asset process.
- Record the retirement date, evidence location, cost outcome and final owner sign-off.

No automatic retirement or production-changing commands are included in this hub.
