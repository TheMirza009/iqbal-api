// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'IqbalAPI',
  tagline: 'A free, open REST API for Allama Iqbal\'s poetry.',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
  },

  url: 'https://iqbal-api-docs.up.railway.app',
  baseUrl: '/', 

  organizationName: 'TheMirza009',
  projectName: 'iqbal-api',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/TheMirza009/iqbal-api/tree/main/docs/',
        },
        blog: false, 
        theme: {
          customCss: './src/css/custom.css',
        },
        // ADDED: Robots.txt plugin configuration
        plugins: [
          [
            'standalone-plugin-robots-txt', // Ensure this is installed or use standard docusaurus behavior
            {
              host: 'https://iqbal-api-docs.up.railway.app',
              sitemap: 'https://iqbal-api-docs.up.railway.app/sitemap.xml',
              policy: [{ userAgent: '*', allow: '/' }],
            },
          ],
        ],
        // ADDED: Sitemap Configuration
        sitemap: {
          lastmod: new Date().toISOString(),
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // FIXED: Google Verification should only contain the code, not the full <meta> tag
      metadata: [
        {
          name: 'google-site-verification', 
          content: 'wLrLxKZ2sqikreG1w2CC75c7tki7w4NrOINrcFQu5oE' 
        },
        {
          name: 'keywords',
          content: 'Iqbal API, Allama Iqbal, Urdu Poetry API, REST API, Iqbal Poetry English'
        }
      ],
      image: 'img/social-card.png',
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
      },
      navbar: {
        title: 'IqbalAPI',
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          { to: '/playground', label: 'Playground', position: 'left' },
          {
            href: 'https://iqbal-api.up.railway.app',
            label: 'Live API',
            position: 'left',
          },
          {
            href: 'https://github.com/TheMirza009/iqbal-api',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              { label: 'Getting Started', to: '/docs/intro' },
              { label: 'Endpoints', to: '/docs/Reference/endpoints' },
              { label: 'Search', to: '/docs/Reference/search' },
              { label: 'Examples', to: '/docs/More/examples' },
            ],
          },
          {
            title: 'API',
            items: [
              {
                label: 'Live API',
                href: 'https://iqbal-api.up.railway.app',
              },
              {
                label: 'Playground',
                href: 'https://iqbal-api-docs.up.railway.app/playground',
              },
              {
                label: 'Repository',
                href: 'https://github.com/TheMirza009/iqbal-api',
              },
            ],
          },
          {
            title: 'Author',
            items: [
              { label: 'GitHub', href: 'https://github.com/TheMirza009' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mirza-abdulmoeed009/' },
              { label: 'Portfolio', href: 'https://themirza.vercel.app/' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Mirza AbdulMoeed. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;