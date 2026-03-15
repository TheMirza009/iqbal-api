/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    'Reference/endpoints',
    {
      type: 'category',
      label: 'Content',
      collapsed: false,
      items: ['Content/books', 'Content/poems', 'Content/verses'],
    },
    {
      type: 'category',
      label: 'Reference',
      collapsed: false,
      items: ['Reference/search', 'Reference/pagination', 'More/schema'],
    },
    'More/examples',
    'More/self-hosting',
    'More/credits'
  ],
};



export default sidebars;