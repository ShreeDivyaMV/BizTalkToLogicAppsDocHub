import {themes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'BizTalk Migration Hub',
  tagline: 'Why migrate, how to use Migration Agent, and what to build on Logic Apps Standard.',
  favicon: 'img/hub-mark.svg',
  url: process.env.SITE_URL || 'https://shreedivyamv.github.io',
  baseUrl: process.env.BASE_URL || '/BizTalkToLogicAppsDocHub/',
  trailingSlash: true,
  onBrokenLinks: 'throw',
  markdown: {hooks: {onBrokenMarkdownLinks: 'throw'}},
  presets: [
    ['classic', {
      docs: {sidebarPath: './sidebars.js', showLastUpdateTime: false},
      blog: false,
      theme: {customCss: './src/css/custom.css'},
    }],
  ],
  plugins: [
    ['@docusaurus/plugin-client-redirects', {
      redirects: [
        {from: '/docs', to: '/docs/start'},
        {from: '/docs/capabilities', to: '/docs/journey'},
        {from: ['/sources', '/docs/sources'], to: '/docs/start'},
        ...['start', 'lifecycle', 'readiness', 'journey', 'hosting', 'migration-agent', 'workshop', 'migration-factory', 'validation', 'cutover', 'support']
          .map((slug) => ({from: `/${slug}`, to: `/docs/${slug}`})),
      ],
    }],
  ],
  themes: [
    ['@easyops-cn/docusaurus-search-local', {
      hashed: true,
      indexDocs: true,
      indexPages: true,
      indexBlog: false,
      docsRouteBasePath: '/docs',
      highlightSearchTermsOnTargetPage: true,
    }],
  ],
  themeConfig: {
    image: 'img/hub-mark.svg',
    colorMode: {respectPrefersColorScheme: true},
    navbar: {
      title: 'BizTalk Migration Hub',
      logo: {alt: '', src: 'img/hub-mark.svg'},
      items: [
        {to: '/docs/start', label: 'Why migrate', position: 'left'},
        {to: '/docs/migration-agent', label: 'Migration Agent', position: 'left'},
        {to: '/docs/agent-lab', label: 'Hands-on Lab', position: 'left'},
        {to: '/docs/hosting', label: 'Logic Apps and AIS', position: 'left'},
        {to: '/docs/support', label: 'Get help', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {title: 'Why migrate', items: [
          {label: 'Why move from BizTalk', to: '/docs/start'},
          {label: 'EOL dates and support terms', to: '/docs/lifecycle'},
          {label: 'Migration announcements and roadmap', to: '/docs/whats-new'},
          {label: 'Support, tools and contacts', to: '/docs/support'},
        ]},
        {title: 'Migration Agent', items: [
          {label: 'Capabilities and outputs', to: '/docs/migration-agent'},
          {label: 'Install and use the Agent', to: '/docs/agent-usage'},
          {label: 'Hands-on migration lab', to: '/docs/agent-lab'},
          {label: 'Official Agent repository', href: 'https://github.com/Azure/logicapps-migration-agent'},
        ]},
        {title: 'Logic Apps and AIS', items: [
          {label: 'Logic Apps hosting options', to: '/docs/hosting'},
          {label: 'Features and integration patterns', to: '/docs/features'},
          {label: 'Supporting AIS products', to: '/docs/ais-services'},
          {label: 'Pricing and cost planning', to: '/docs/pricing'},
          {label: 'Networking and load balancing', to: '/docs/networking'},
        ]},
      ],
      copyright: 'An independent technical migration resource. Not an official Microsoft support or eligibility statement.',
    },
    prism: {theme: themes.github, darkTheme: themes.dracula},
  },
};

export default config;
