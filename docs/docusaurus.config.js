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
        blog: false, // We don't need a blog
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        // respectPrefersColorScheme: true,
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