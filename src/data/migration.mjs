export const sources = {
  overview: 'https://learn.microsoft.com/en-us/azure/logic-apps/biztalk-server-migration-overview',
  approaches: 'https://learn.microsoft.com/en-us/azure/logic-apps/biztalk-server-migration-approaches',
  agent: 'https://learn.microsoft.com/en-us/azure/logic-apps/migration/migration-agent-overview',
  lifecycle: 'https://learn.microsoft.com/en-us/lifecycle/',
  releases: 'https://github.com/Azure/logicapps-migration-agent/releases',
};

export const patterns = [
  {id: 'workflow-boundaries', title: 'Choose workflow boundaries', category: 'Workflows', implementation: 'Group workflows that share security, scaling and deployment requirements. Split integrations that need independent isolation or capacity.', verify: 'Load-test independent workloads together and confirm that shared compute does not violate latency objectives.', guide: 'hosting'},
  {id: 'durable-orchestrations', title: 'Replace durable orchestrations', category: 'Workflows', implementation: 'Use stateful workflows for persisted execution. Rebuild transactions and compensation explicitly rather than assuming a distributed transaction across connectors.', verify: 'Interrupt an execution between side effects; recover it and reconcile the external state.', guide: 'journey#durable-orchestrations'},
  {id: 'correlation', title: 'Preserve correlation and ordering', category: 'Workflows', implementation: 'Carry a stable business ID across messages. Use a broker session or durable state store where conversation correlation or ordered processing requires it.', verify: 'Interleave two business conversations, deliver a duplicate and replay a message after a restart.', guide: 'journey#correlation'},
  {id: 'schema-validation', title: 'Validate message contracts', category: 'Data', implementation: 'Preserve XML namespaces, required elements and encoding. Validate against the intended schema before transformation or business side effects.', verify: 'Reject malformed XML and missing required data; check that a namespace change cannot silently produce an empty result.', guide: 'transforms'},
  {id: 'transformations', title: 'Reuse maps deliberately', category: 'Data', implementation: 'Evaluate generated XSLT and its dependencies rather than renaming a BizTalk map. Select a compatible transform action and deploy the map with its referenced artifacts.', verify: 'Compare output XML structurally and exercise custom functoids, script dependencies and culture-sensitive values.', guide: 'transforms'},
  {id: 'pipelines', title: 'Decompose pipeline behavior', category: 'Data', implementation: 'Separate decode, disassemble, validate, transform and send behavior into explicit operations. Preserve envelope, signing and batching semantics.', verify: 'Test a multi-document envelope, invalid encoding and partial batch failure without losing individual messages.', guide: 'transforms#pipeline-behavior'},
  {id: 'connectors', title: 'Replace adapter operations', category: 'Connectivity', implementation: 'Compare the exact trigger/action, protocol and delivery semantics. Select built-in or managed connectivity and configure identity, DNS and private access.', verify: 'Exercise the target operation from the actual runtime network with its intended identity, not only from a developer machine.', guide: 'connectivity'},
  {id: 'custom-code', title: 'Adapt custom .NET logic', category: 'Connectivity', implementation: 'Separate pure business logic from BizTalk runtime dependencies. Use local functions for suitable workflow-specific code or a separate service for independent lifecycles.', verify: 'Run unit tests for the extracted logic and integration tests for serialization, failures and runtime dependencies.', guide: 'custom-code'},
  {id: 'b2b', title: 'Preserve B2B contracts', category: 'Connectivity', implementation: 'Recreate partner agreements, certificate references and acknowledgments with the selected B2B operations. Keep certificate rotation and partner routing explicit.', verify: 'Test signatures, negative acknowledgments, retries, expiry and partner duplicate handling.', guide: 'connectivity#b2b-and-certificates'},
  {id: 'deployment', title: 'Package and configure Standard', category: 'Operations', implementation: 'Version workflows, maps, schemas and connections together. Inject environment configuration separately from source and provision dependencies before activating triggers.', verify: 'Deploy the same build to an isolated environment and inspect resolved settings, identities and connection references.', guide: 'deployment'},
  {id: 'observability', title: 'Trace business outcomes', category: 'Operations', implementation: 'Record business IDs, workflow runs, action failures and downstream acknowledgments without exposing payloads or credentials.', verify: 'Diagnose a failed business message end-to-end using telemetry and correlation alone.', guide: 'validation'},
  {id: 'recovery', title: 'Make retries and replay safe', category: 'Operations', implementation: 'Use explicit retry limits, failure paths and durable idempotency for side effects. Quarantine messages that cannot be safely processed.', verify: 'Replay the same business ID during a transient outage and confirm that external side effects occur only as intended.', guide: 'journey#recovery'},
];

export function recommendPath({estate, hosting}) {
  const items = [];
  items.push('Capture bindings, schemas, maps, pipeline behavior and representative input/output messages before choosing replacement operations.');
  items.push(estate === 'portfolio'
    ? 'Identify shared maps, assemblies and endpoints; define reusable patterns without coupling workflows that require independent scaling.'
    : 'Implement one bounded interface and verify its transformations, connector semantics, error paths and duplicate behavior.');
  items.push(hosting === 'undecided'
    ? 'Choose stateful or stateless execution, hosting isolation and network connectivity before implementing the workflow.'
    : hosting === 'isolated'
      ? 'Evaluate ASE v3 or Hybrid; test private DNS, endpoint reachability and runtime-specific connector and deployment behavior.'
      : 'Evaluate Workflow Service Plan, then confirm networking, capacity, identity and cost before deployment.');
  return items;
}
