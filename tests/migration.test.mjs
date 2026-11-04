import test from 'node:test';
import assert from 'node:assert/strict';
import {copyFileSync, existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {tmpdir} from 'node:os';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {patterns, recommendPath} from '../src/data/migration.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));

test('technical cookbook exposes twelve implementation patterns with verification cases', () => {
  assert.equal(patterns.length, 12);
  assert.equal(new Set(patterns.map((pattern) => pattern.id)).size, 12);
  for (const category of ['Workflows', 'Data', 'Connectivity', 'Operations']) {
    assert.equal(patterns.filter((pattern) => pattern.category === category).length, 3);
  }
  const cookbook = readFileSync(resolve(root, 'docs', 'journey.mdx'), 'utf8');
  for (const pattern of patterns) {
    assert.ok(pattern.implementation.length > 30);
    assert.ok(pattern.verify.length > 30);
    assert.ok(cookbook.includes(`{#${pattern.id}}`), `Missing navigable heading: ${pattern.id}`);
    assert.ok(cookbook.includes(`<PatternDetail id="${pattern.id}" />`), `Missing pattern: ${pattern.id}`);
    assert.ok(existsSync(resolve(root, 'docs', `${pattern.guide.split('#')[0]}.${pattern.guide.startsWith('journey') ? 'mdx' : 'md'}`)));
  }
});

test('visual homepage introduces the three sections with prominent Agent guidance', () => {
  const content = readFileSync(resolve(root, 'docs', 'start.md'), 'utf8');
  assert.doesNotMatch(content, /^slug: \/$/m);
  assert.match(content, /# Why migrate from BizTalk/);
  const home = readFileSync(resolve(root, 'src', 'pages', 'index.jsx'), 'utf8');
  assert.match(home, /<h1>Modernize BizTalk<br \/>with <span>Logic Apps\.<\/span><\/h1>/);
  assert.match(home, /title="BizTalk to Logic Apps Migration"/);
  assert.doesNotMatch(home, /next chapter|Your integrations\.|Their next/i);
  for (const section of ['hero-section', 'pathways-section', 'journey-section', 'resource-section']) assert.ok(home.includes(section));
  for (const guide of ['start', 'migration-agent', 'hosting', 'agent-usage', 'agent-lab', 'pricing', 'whats-new']) assert.ok(home.includes(`/docs/${guide}`));
  for (const stage of ['Discovery', 'Planning', 'Conversion', 'Validation', 'Deployment']) assert.ok(home.includes(`<span>${stage}</span>`));
  assert.ok(home.indexOf('agent-section') < home.indexOf('journey-section'));
  const config = readFileSync(resolve(root, 'docusaurus.config.js'), 'utf8');
  assert.match(config, /docsRouteBasePath: '\/docs'/);
  assert.ok(!existsSync(resolve(root, 'docs', 'capabilities.mdx')));
});

test('all six assessment combinations give technical advice without version gating', () => {
  for (const estate of ['pilot', 'portfolio']) {
    for (const hosting of ['undecided', 'azure', 'isolated']) {
      const result = recommendPath({estate, hosting});
      assert.equal(result.length, 3);
      assert.match(result[0], /schemas, maps, pipeline behavior/);
      assert.match(result[1], estate === 'portfolio' ? /shared maps/ : /transformations, connector semantics/);
      if (hosting === 'isolated') assert.match(result[2], /private DNS/);
      if (hosting === 'azure') assert.match(result[2], /Workflow Service Plan/);
      if (hosting === 'undecided') assert.match(result[2], /stateful or stateless/);
    }
  }
});

test('technical guides have parseable JSON examples and implementation/troubleshooting content', () => {
  for (const file of ['journey.mdx', 'transforms.md', 'connectivity.md', 'custom-code.md', 'deployment.md']) {
    const content = readFileSync(resolve(root, 'docs', file), 'utf8');
    assert.match(content, /## (Troubleshoot|Diagnose)/);
    for (const match of content.matchAll(/```json\r?\n([\s\S]*?)```/g)) assert.doesNotThrow(() => JSON.parse(match[1]), file);
  }
});

test('published guidance and navigation contain no retired section or BizTalk version restrictions', () => {
  for (const file of readdirSync(resolve(root, 'docs'))) {
    const content = readFileSync(resolve(root, 'docs', file), 'utf8');
    assert.doesNotMatch(content, /Can I migrate\?|capabilities\.mdx|only supports BizTalk|unsupported BizTalk version|older-version/i, file);
  }
  const sidebar = readFileSync(resolve(root, 'sidebars.js'), 'utf8');
  assert.doesNotMatch(sidebar, /capabilities/);
  const tools = readFileSync(resolve(root, 'src', 'components', 'MigrationTools.jsx'), 'utf8');
  assert.doesNotMatch(tools, /CapabilityMatrix|setVersion|source version/i);
  const checklist = readFileSync(resolve(root, 'static', 'downloads', 'readiness-checklist.csv'), 'utf8');
  assert.doesNotMatch(checklist, /BizTalk versions|source coverage/);
});

test('sidebar has exactly three segments and includes every document once', () => {
  const sidebar = readFileSync(resolve(root, 'sidebars.js'), 'utf8');
  assert.equal((sidebar.match(/type: 'category'/g) || []).length, 3);
  for (const label of ['1. Why migrate and get help', '2. Migrate with Migration Agent', '3. Build on Logic Apps and AIS']) {
    assert.ok(sidebar.includes(`label: '${label}'`));
  }
  const ids = [...sidebar.matchAll(/items: \[([\s\S]*?)\]/g)]
    .flatMap((match) => [...match[1].matchAll(/'([^']+)'/g)].map((id) => id[1]));
  const documents = readdirSync(resolve(root, 'docs')).filter((file) => /\.mdx?$/.test(file)).map((file) => file.replace(/\.mdx?$/, ''));
  assert.equal(new Set(ids).size, ids.length);
  assert.deepEqual([...ids].sort(), documents.sort());
});

test('horizontal lab tab and hosting order make the requested guides prominent', () => {
  const config = readFileSync(resolve(root, 'docusaurus.config.js'), 'utf8');
  assert.match(config, /\{to: '\/docs\/agent-lab', label: 'Hands-on Lab', position: 'left'\}/);
  assert.match(config, /\{to: '\/docs\/hosting', label: 'Logic Apps and AIS', position: 'left'\}/);
  const sidebar = readFileSync(resolve(root, 'sidebars.js'), 'utf8');
  assert.match(sidebar, /label: '3\. Build on Logic Apps and AIS', collapsed: false, items: \[\s*'hosting', 'features'/);
});

test('migration rationale begins with BizTalk EOL before enterprise Logic Apps benefits', () => {
  const start = readFileSync(resolve(root, 'docs', 'start.md'), 'utf8');
  const lifecycle = start.indexOf('## BizTalk end-of-life');
  const platform = start.indexOf('## Why choose Logic Apps');
  assert.ok(lifecycle > 0 && platform > lifecycle);
  assert.ok(start.indexOf('10 April 2030') < platform);
  assert.match(start, /enterprise integration platform, not just a workflow designer/);
  for (const pillar of ['Performance and scale', 'Governance', 'Security', 'Reliability and operational resilience']) assert.ok(start.includes(`### ${pillar}`));
  assert.match(start, /zone redundancy/);
  assert.match(start, /role-based access control/);
  assert.match(start, /managed identity/);
});

test('removed source-policy page is absent from content and navigation', () => {
  assert.ok(!existsSync(resolve(root, 'docs', 'sources.md')));
  const sidebar = readFileSync(resolve(root, 'sidebars.js'), 'utf8');
  assert.doesNotMatch(sidebar, /'sources'/);
  const home = readFileSync(resolve(root, 'src', 'pages', 'index.jsx'), 'utf8');
  assert.doesNotMatch(home, /\/docs\/sources|editorial-note|source policy/i);
  for (const file of readdirSync(resolve(root, 'docs'))) {
    assert.doesNotMatch(readFileSync(resolve(root, 'docs', file), 'utf8'), /sources\.md|\/docs\/sources/);
  }
});

test('announcements focus on migration and distinguish preview from future deployment options', () => {
  const updates = readFileSync(resolve(root, 'docs', 'whats-new.md'), 'utf8');
  for (const heading of ['## Recently announced', '## Migration capabilities', '## Upcoming features', '## How to follow updates']) assert.ok(updates.includes(heading));
  for (const item of ['Public preview', '4 November 2026', 'Artifact discovery', 'Compatibility analysis', 'Standard project generation', 'Behavioral validation', 'Migration Agent', 'ASE v3', 'Hybrid']) assert.ok(updates.includes(item));
  assert.match(updates, /not separate newly released features/);
  assert.match(updates, /No committed release dates/);
  assert.match(updates, /Status in the announcement/);
  assert.match(updates, /techcommunity\.microsoft\.com/);
  assert.match(updates, /migration-agent-deployment-stage/);
  const home = readFileSync(resolve(root, 'src', 'pages', 'index.jsx'), 'utf8');
  for (const content of [updates, home]) assert.doesNotMatch(content, /MCP Server|Foundry|Knowledge as a Service|Codeful Workflows|Logic Apps Automation/);
  assert.match(home, /whats-new#migration-capabilities/);
});

test('Agent capabilities, usage and hands-on lab separate documentation from proven execution', () => {
  const agent = readFileSync(resolve(root, 'docs', 'migration-agent.md'), 'utf8');
  for (const capability of ['Platform detection', 'Dependency analysis', 'Flow grouping', 'Architecture visualization', 'Message-flow visualization', 'Pattern and gap detection', 'Action mappings', 'Custom-code generation', 'Validation assistance', 'Optional deployment', 'Extensible parsers']) assert.ok(agent.includes(capability));
  const usage = readFileSync(resolve(root, 'docs', 'agent-usage.md'), 'utf8');
  for (const command of ['Select Source Folder', 'Analyze Source Design', 'Plan Logic App Design', 'Create Conversion Tasks', 'Execute All', '@migration-analyser', '@migration-planner', '@migration-converter', 'TEST-REPORT.md']) assert.ok(usage.includes(command));
  const lab = readFileSync(resolve(root, 'docs', 'agent-lab.md'), 'utf8');
  for (const stage of ['1. Run Discovery', '2. Review Planning', '3. Convert', '4. Validate', '5. Optional test deployment']) assert.ok(lab.includes(stage));
  assert.match(lab, /not a bundled BizTalk solution/);
  assert.match(lab, /alone are not a BizTalk application/);
  assert.match(lab, /Stop here unless deployment is approved/);
  assert.match(lab, /Duplicate input/);
  assert.match(lab, /## Set up the lab/);
  for (const action of ['Ctrl+Shift+X', 'Select Source Project Folder or MSI', 'Analyze Source Design', 'Export Report', 'Plan Logic App Design', 'Create Conversion Tasks', 'func start --verbose', 'Cloud Deployment & Testing']) assert.ok(lab.includes(action));
  for (const section of ['1. Run Discovery', '2. Review Planning', '3. Convert the flow', '4. Validate the implementation', '5. Optional test deployment']) {
    const body = lab.split(`## ${section}`)[1].split('\n## ')[0];
    assert.match(body, /(?:^|\n)1\. /, `Missing numbered instructions: ${section}`);
    assert.match(body, /(?:^|\n)2\. /, `Missing second instruction: ${section}`);
  }
});

test('lifecycle and target guidance include commercial and technical limits', () => {
  const lifecycle = readFileSync(resolve(root, 'docs', 'lifecycle.md'), 'utf8');
  for (const date of ['31 March 2027', '12 April 2028', '13 April 2028', '10 April 2030']) assert.ok(lifecycle.includes(date));
  assert.match(lifecycle, /BizTalk Server 2020/);
  assert.match(lifecycle, /eligibility, exclusions, coverage, pricing and purchasing terms/);
  const features = readFileSync(resolve(root, 'docs', 'features.md'), 'utf8');
  for (const feature of ['Durable orchestration', 'Schemas and transformation', 'Pipelines', 'Business rules', 'EDI/B2B', 'BAM/business visibility']) assert.ok(features.includes(feature));
  assert.match(features, /does not mean drop-in parity/);
  const ais = readFileSync(resolve(root, 'docs', 'ais-services.md'), 'utf8');
  assert.match(ais, /Logic Apps Standard remains the core/);
  for (const service of ['Service Bus', 'API Management', 'Event Grid', 'Event Hubs']) assert.ok(ais.includes(service));
  const pricing = readFileSync(resolve(root, 'docs', 'pricing.md'), 'utf8');
  assert.match(pricing, /does not publish invented unit rates/);
  assert.match(pricing, /pricing\/calculator/);
  const network = readFileSync(resolve(root, 'docs', 'networking.md'), 'utf8');
  for (const topic of ['**inbound**', 'VNet integration', 'Application Gateway v2', 'Front Door Standard/Premium', 'side-effect-free health endpoint', 'does not migrate an in-flight stateful run']) assert.ok(network.includes(topic));
});

test('every local Markdown content link resolves to a real document', () => {
  for (const file of readdirSync(resolve(root, 'docs'))) {
    const path = resolve(root, 'docs', file);
    const content = readFileSync(path, 'utf8');
    for (const match of content.matchAll(/\]\((\.[^)\s#]+)(?:#[^)]*)?\)/g)) {
      assert.ok(existsSync(resolve(dirname(path), match[1])), `${file}: unresolved ${match[1]}`);
    }
  }
});

test('cutover and decommission runbooks and their download links are removed', () => {
  assert.ok(!existsSync(resolve(root, 'docs', 'cutover.md')));
  assert.ok(!existsSync(resolve(root, 'static', 'downloads', 'cutover-runbook.csv')));
  assert.doesNotMatch(readFileSync(resolve(root, 'sidebars.js'), 'utf8'), /'cutover'/);
  for (const file of readdirSync(resolve(root, 'docs'))) {
    assert.doesNotMatch(readFileSync(resolve(root, 'docs', file), 'utf8'), /cutover\.md|cutover-runbook\.csv/);
  }
});

test('readiness template includes explicit owners and evidence', () => {
  const file = 'readiness-checklist.csv';
  const content = readFileSync(resolve(root, 'static', 'downloads', file), 'utf8');
  const lines = content.trim().split(/\r?\n/);
  const columns = lines[0].split('","').length;
  assert.ok(lines.length >= 15);
  assert.match(lines[0], /Owner/);
  assert.match(lines[0], /Evidence/);
  for (const line of lines) assert.equal(line.split('","').length, columns, `${file}: malformed row`);
});

test('downloaded XML lab executes valid, invalid-quantity and namespace assertions', () => {
  const command = process.platform === 'win32' ? 'powershell.exe' : 'pwsh';
  const result = spawnSync(command, ['-NoProfile', '-NonInteractive', '-File', resolve(root, 'static', 'downloads', 'xml-lab', 'Test-OrderTransform.ps1')], {encoding: 'utf8', timeout: 30000});
  assert.ifError(result.error);
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  assert.match(result.stdout, /PASS: valid order matches expected fulfillment XML/);
  assert.match(result.stdout, /PASS: invalid quantity is rejected/);
  assert.match(result.stdout, /PASS: unexpected namespace is rejected/);
});

test('XML lab fails rather than reporting success for an incorrect expected business value', () => {
  const folder = mkdtempSync(resolve(tmpdir(), 'biztalk-xml-lab-'));
  try {
    for (const file of readdirSync(resolve(root, 'static', 'downloads', 'xml-lab'))) {
      copyFileSync(resolve(root, 'static', 'downloads', 'xml-lab', file), resolve(folder, file));
    }
    const expected = resolve(folder, 'expected.xml');
    writeFileSync(expected, readFileSync(expected, 'utf8').replace('<Units>2</Units>', '<Units>999</Units>'));
    const result = spawnSync(process.platform === 'win32' ? 'powershell.exe' : 'pwsh', ['-NoProfile', '-NonInteractive', '-File', resolve(folder, 'Test-OrderTransform.ps1')], {encoding: 'utf8', timeout: 30000});
    assert.ifError(result.error);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /does not match expected fulfillment XML/);
  } finally {
    rmSync(folder, {recursive: true});
  }
});
