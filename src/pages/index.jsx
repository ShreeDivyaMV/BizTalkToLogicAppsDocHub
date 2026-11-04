import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {patterns} from '../data/migration.mjs';

const pathways = [
  {number: '01', tag: 'WHY MIGRATE AND GET HELP', title: 'Plan your migration', description: 'Start with BizTalk end-of-life, then explore Logic Apps as an enterprise integration platform and find support.', href: '/docs/start', link: 'Why migrate from BizTalk'},
  {number: '02', tag: 'MIGRATE WITH MIGRATION AGENT', title: 'Put the Agent to work', description: 'Discover its capabilities, install the tooling, and follow a hands-on migration from source to Standard.', href: '/docs/migration-agent', link: 'Explore the Migration Agent'},
  {number: '03', tag: 'BUILD ON LOGIC APPS AND AIS', title: 'Design the right integration', description: 'Choose your hosting first, then explore Logic Apps features, integration patterns, supporting AIS products and cost.', href: '/docs/hosting', link: 'Compare Logic Apps hosting'},
];

function IntegrationVisual() {
  return (
    <div className="journey-visual" aria-label="BizTalk integration artifacts become Azure Logic Apps Standard workflows">
      <div className="visual-caption"><span className="live-dot" /> PRESERVE BEHAVIOR. MODERNIZE IMPLEMENTATION.</div>
      <div className="platform-node source-node"><span className="node-glyph" aria-hidden="true">&#9638;</span><div><small>YOUR EXISTING ESTATE</small><strong>BizTalk Server</strong><span>Orchestrations. Maps. Adapters. Code.</span></div></div>
      <div className="visual-connector" />
      <div className="visual-stages"><span>Discover</span><span>Plan</span><span>Convert</span></div>
      <div className="visual-connector" />
      <div className="platform-node target-node"><span className="node-glyph" aria-hidden="true">&#8644;</span><div><small>TARGET INTEGRATION PLATFORM</small><strong>Azure Logic Apps <em>Standard</em></strong><span>Cloud and hybrid integration.</span></div></div>
      <div className="visual-note"><span aria-hidden="true">&#10003;</span> Validate contracts, delivery semantics and recovery</div>
    </div>
  );
}

export default function Home() {
  return (
    <Layout title="BizTalk to Logic Apps Migration" description="Understand lifecycle and support, migrate with the Migration Agent, and build on Logic Apps Standard with supporting Azure Integration Services.">
      <main>
        <div className="lifecycle-strip"><div className="hub-container"><span className="strip-label">PLAN AHEAD</span><span>Mainstream support milestone: <strong>12 April 2028</strong></span><Link to="/docs/lifecycle">See lifecycle dates and terms &rarr;</Link></div></div>
        <section className="hero-section">
          <div className="hub-container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow"><span /> THE BIZTALK TO LOGIC APPS MIGRATION HUB</span>
              <h1>Modernize BizTalk<br />with <span>Logic Apps.</span></h1>
              <p>Plan beyond BizTalk end-of-life, accelerate with the Migration Agent, and build enterprise integrations with performance, governance, security and reliability on Azure Logic Apps Standard.</p>
              <div className="hero-actions"><Link className="button button--primary button--lg" to="/docs/start">Explore the guidance &rarr;</Link><Link className="secondary-action" to="/docs/agent-lab">Try the Agent hands-on lab &#8599;</Link></div>
              <div className="hero-footnote"><span aria-hidden="true">&#10003;</span> Preserve business behavior. Modernize the implementation.</div>
            </div>
            <IntegrationVisual />
          </div>
        </section>
        <section className="hub-container pathways-section" aria-labelledby="pathways-title">
          <div className="section-heading"><div><span className="eyebrow">THREE CONNECTED GUIDES</span><h2 id="pathways-title">Understand. Migrate. Build.</h2></div><p>The context, the tooling,<br />and the target architecture.</p></div>
          <div className="pathway-grid">{pathways.map((path) => <Link className="pathway-card" to={path.href} key={path.number}>
            <div className="card-top"><span className="card-number">{path.number}</span><span aria-hidden="true">&#8599;</span></div><span className="card-tag">{path.tag}</span><h3>{path.title}</h3><p>{path.description}</p><span className="card-link">{path.link} &rarr;</span>
          </Link>)}</div>
        </section>
        <section className="hub-container agent-section" aria-labelledby="agent-title">
          <div className="agent-panel"><div className="agent-icon" aria-hidden="true">&#10023;</div><div><span className="eyebrow">AI-ASSISTED. ENGINEER-REVIEWED.</span><h2 id="agent-title">Meet your migration accelerator.</h2><p>Inventory and visualize your source, review action mappings, generate Standard projects, and validate the result with the Migration Agent.</p><div className="agent-chips"><span>Discovery</span><span>Planning</span><span>Conversion</span><span>Validation</span><span>Deployment</span></div></div><Link className="button button--primary" to="/docs/agent-usage">Install and use the Agent &rarr;</Link></div>
        </section>
        <section className="journey-section" aria-labelledby="patterns-title">
          <div className="hub-container">
            <div className="section-heading"><div><span className="eyebrow">DESIGN, IMPLEMENT AND TROUBLESHOOT</span><h2 id="patterns-title">Patterns that preserve what matters.</h2></div><Link to="/docs/journey">Browse the technical cookbook &rarr;</Link></div>
            <div className="phase-grid">{['Workflows', 'Data', 'Connectivity', 'Operations'].map((category, index) => <div className="phase-card" key={category}>
              <span className="phase-index">0{index + 1}</span><h3>{category}</h3><ul>{patterns.filter((pattern) => pattern.category === category).map((pattern) => <li key={pattern.id}><Link to={`/docs/journey#${pattern.id}`}>{pattern.title}</Link></li>)}</ul>
            </div>)}</div>
          </div>
        </section>
        <section className="hub-container resource-section" aria-labelledby="resources-title">
          <div className="section-heading"><div><span className="eyebrow">LEARN BY BUILDING</span><h2 id="resources-title">Code, configuration, and concrete examples.</h2></div></div>
          <div className="resource-grid">
            <Link to="/docs/agent-lab"><span className="resource-type">HANDS-ON MIGRATION LAB</span><h3>Run your first Agent migration &rarr;</h3><p>Use a small source application, inspect each stage, and validate the generated Standard implementation.</p></Link>
            <Link to="/docs/hosting"><span className="resource-type">HOSTING OPTIONS</span><h3>Choose where your integrations run &rarr;</h3><p>Compare Workflow Service Plan, ASE v3 and Hybrid before selecting your target architecture.</p></Link>
            <Link to="/docs/pricing"><span className="resource-type">COST AND CAPACITY</span><h3>Understand your target costs &rarr;</h3><p>Account for hosting, connectors, storage, networking and optional supporting services.</p></Link>
          </div>
        </section>
        <section className="hub-container resource-section" aria-labelledby="updates-title">
          <div className="section-heading"><div><span className="eyebrow">MIGRATION UPDATES</span><h2 id="updates-title">Migration announcements and roadmap.</h2></div><Link to="/docs/whats-new">Explore migration updates &rarr;</Link></div>
          <div className="resource-grid">
            <Link to="/docs/whats-new#recently-announced"><span className="resource-type">PUBLIC PREVIEW AT ANNOUNCEMENT</span><h3>Migration Agent for Logic Apps &rarr;</h3><p>Review the announcement for AI-assisted BizTalk assessment, compatibility analysis and migration guidance.</p></Link>
            <Link to="/docs/whats-new#migration-capabilities"><span className="resource-type">DOCUMENTED MIGRATION CAPABILITIES</span><h3>From source to validated workflows &rarr;</h3><p>Explore artifact discovery, target mappings, Standard project generation and behavioral validation.</p></Link>
            <Link to="/docs/whats-new#upcoming-features"><span className="resource-type">PUBLISHED FUTURE OPTIONS</span><h3>Track upcoming deployment options &rarr;</h3><p>See documented Agent roadmap items separately from supported Logic Apps hosting choices.</p></Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
