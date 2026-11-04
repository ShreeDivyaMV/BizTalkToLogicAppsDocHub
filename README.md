# BizTalk to Logic Apps Migration Hub

A Docusaurus migration documentation hub with an original visual homepage and three connected sections: why migrate and get help, migrate with Migration Agent, and build on Logic Apps Standard with supporting Azure Integration Services.

[Published documentation](https://shreedivyamv.github.io/BizTalkToLogicAppsDocHub/) | [GitHub repository](https://github.com/ShreeDivyaMV/BizTalkToLogicAppsDocHub)

## Run locally

Install Node.js 22 or later, then:

```powershell
npm ci
npm start
```

The development server normally runs at `http://localhost:3000/BizTalkToLogicAppsDocHub/`. To develop at the domain root instead, set `$env:BASE_URL = '/'` before starting or building.

```powershell
npm test
npm run build
npm run serve
```

Local search is generated during the production build. Use `npm run serve` to validate it; a development-server search index may not exist yet.

## Content

- Original homepage layout with three segment cards and a prominent five-stage Migration Agent panel.
- BizTalk end-of-life first, then Logic Apps enterprise performance, governance, security and reliability; support routes and contact links.
- Horizontal Hands-on Lab navigation tab with step-by-step Agent setup, discovery, planning, conversion, validation and optional deployment.
- Agent capability catalogue and installation/usage guide.
- Hosting choices first in the Logic Apps technical section, before feature and architecture details.
- Migration-focused announcements and roadmap covering Agent assessment, conversion, validation and upcoming deployment options, with preview and future-item distinctions.
- Logic Apps–first feature mapping and supporting AIS product selection.
- Dedicated pricing/cost planning and networking/scale/load-balancing guidance.
- Technical cookbook for state, correlation, retries, recovery and delivery semantics.
- Guides for schemas/maps/pipelines, connectors/identity/networking and custom .NET.
- Standard project layout, configuration, artifact packaging and diagnostics.
- Downloadable local XSD/XSLT lab with positive and negative regression cases.
- Technical assessment without version gating; supporting lifecycle, tooling and support references.
- Support directory and inline product references; no separate source-policy page.

The questionnaire keeps answers only in page memory. It does not upload data, assess your estate or call the Migration Agent. No backend, analytics, credentials, Azure resources or deployment are included.

## Publish with GitHub Pages

The [deployment workflow](.github/workflows/deploy-pages.yml) runs on pushes to `main` and can also be started manually from the repository's **Actions** tab. It installs the locked dependencies, runs the regression suite, builds Docusaurus and deploys the static artifact to GitHub Pages.

The repository's **Settings > Pages > Build and deployment > Source** must be **GitHub Actions**. The workflow derives `SITE_URL` and `BASE_URL` from Pages metadata so internal links, assets, search and downloads use the repository path. Deployment uses GitHub's short-lived workflow credentials; no deployment secret is required.

Only the generated site is uploaded to Pages. Dependencies, generated build/cache folders and local environment files are excluded from source control. The repository and site are public.

## Build for another static host

Override the public URL and path prefix when publishing somewhere else:

```powershell
$env:SITE_URL = 'https://your-organization.github.io'
$env:BASE_URL = '/your-repository/'
npm run build
```

For a root-hosted site, use `/` for `BASE_URL`. Publish the generated `build` directory using the static host of your choice. The default configuration targets `https://shreedivyamv.github.io/BizTalkToLogicAppsDocHub/`. This project does not provision Azure resources.

## Maintain the guidance

Content lives in `docs`; shared technical patterns are in `src/data/migration.mjs`. Update sidebar entries in `sidebars.js` when adding guides. Downloads are in `static/downloads`; `xml-lab` contains the self-contained PowerShell/.NET XML example.

Use relative document links, base-path-aware download links and Docusaurus `Link` for internal application links. Within the configured base path, the homepage is `/` and documentation is under `/docs`. The official client-redirects plugin preserves the short URLs from the earlier revision; the retired capability-page URL directs readers to the technical cookbook. Keep broken links fatal in the build.

Tests check the three-segment homepage/sidebar, horizontal lab tab, EOL-first enterprise positioning, hosting order, announcement status boundaries, source-policy removal, Agent/lab and destination-feature content, lifecycle caveats, technical pattern anchors, removed version gating, readiness recommendations, local links, JSON syntax, templates and XML lab execution. The XML lab test requires Windows PowerShell on Windows or `pwsh` on other platforms. The destination-feature catalogue does not reintroduce a source-version eligibility questionnaire.

The downloadable XML lab validates XSD/XSLT locally; it does not deploy or execute a Logic Apps workflow. The separate Agent lab requires a controlled source application and installed Agent tooling; its conversion/runtime/deployment are not performed by this website's tests. Code fragments elsewhere are explanatory, not complete deployable projects. No Azure resources are provisioned.
