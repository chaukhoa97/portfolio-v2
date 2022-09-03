// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
// const darkCodeTheme = require('prism-react-renderer/themes/palenight')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Finn Chau',
  tagline: 'Front-end Developer',
  url: 'https://finnchau.vercel.app',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  // favicon: 'img/favicon2.ico',
  favicon: 'img/aot.gif',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Finn Chau', // Usually your GitHub org/user name.
  projectName: 'Portfolio v2', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
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
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'Finn Chau',
        logo: {
          alt: 'Finn Chau Logo',
          // src: 'img/logo2.png',
          src: 'img/aot.gif',
        },
        items: [
          {
            type: 'doc',
            docId: 'before-you-read',
            position: 'left',
            label: 'Docs',
          },
          // { to: "/blog", label: "Blog", position: "left" },
        ],
      },
      footer: {
        // style: 'light',
        // links: [
        //   {
        //     title: 'Docs',
        //     items: [
        //       {
        //         label: 'Before you read',
        //         to: '/docs/before-you-read',
        //       },
        //     ],
        //   },
        // ],
        copyright: `Copyright © ${new Date().getFullYear()} Finn Chau's personal page. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      algolia: {
        // The application ID provided by Algolia
        appId: 'WIQAV03P4Q',
        // Public API key: it is safe to commit it
        apiKey: '27e56a8447e70f6ce311a85e2b2475d8',
        indexName: 'finnchau',
        contextualSearch: false,
      },
    }),
}

module.exports = config
