import React, {useState} from 'react';
import Link from '@docusaurus/Link';
import {patterns, recommendPath} from '../data/migration.mjs';

export function PatternDetail({id}) {
  const pattern = patterns.find((item) => item.id === id);
  if (!pattern) throw new Error(`Unknown migration pattern: ${id}`);
  return (
    <div>
      <p><strong>Implementation:</strong> {pattern.implementation}</p>
      <p><strong>Verify:</strong> {pattern.verify}</p>
    </div>
  );
}

export function ReadinessGuide() {
  const [estate, setEstate] = useState('pilot');
  const [hosting, setHosting] = useState('undecided');
  const recommendations = recommendPath({estate, hosting});
  return (
    <section className="readiness-guide" aria-label="Choose your technical starting point">
      <div className="tool-controls">
        <label>Migration scope
          <select value={estate} onChange={(event) => setEstate(event.target.value)}>
            <option value="pilot">One application / initial pilot</option>
            <option value="portfolio">Multiple applications / enterprise estate</option>
          </select>
        </label>
        <label>Hosting requirements
          <select value={hosting} onChange={(event) => setHosting(event.target.value)}>
            <option value="undecided">Not decided yet</option>
            <option value="azure">Managed Azure hosting</option>
            <option value="isolated">Isolated or customer-managed hosting</option>
          </select>
        </label>
      </div>
      <div className="recommendation" aria-live="polite">
        <h3>Technical considerations for your integration</h3>
        <ol>{recommendations.map((item) => <li key={item}>{item}</li>)}</ol>
        <div className="inline-links">
          <Link to="/docs/journey">Implementation patterns</Link>
          <Link to="/docs/hosting">Compare hosting</Link>
          <Link to="/docs/transforms">Maps and pipelines</Link>
        </div>
      </div>
      <small>This guide highlights technical design choices, not effort estimates. Answers stay in this page's memory and reset on refresh; no estate data is collected.</small>
    </section>
  );
}
