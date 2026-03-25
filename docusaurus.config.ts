import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'RPG Creator - Documentation',
  tagline: 'Official RPG Creator Documentation',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://doc.rpgcreator.dev/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Ward727a', // Usually your GitHub org/user name.
  projectName: 'RPGCreator', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Ward727a/rpgcreator-doc/tree/master',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Ward727a/rpgcreator-doc/tree/master',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {


    algolia: {
      // The application ID provided by Algolia
      appId: "LQKR694OX3",

      // Public API key: it is safe to commit it
      apiKey: "037d6b4d1831e9a40592ca2e3b789127",

      indexName: "RPG Creator documentation",

      // Optional: see doc section below
      contextualSearch: true,

      // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      externalUrlRegex: 'external\\.com|domain\\.com',

      // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
      //replaceSearchResultPathname: {
      //  from: '/docs/', // or as RegExp: /\/docs\//
      //  to: '/',
      //},

      // Optional: Algolia search parameters
      searchParameters: {},

      // Optional: path for search page that enabled by default (`false` to disable it)
      searchPagePath: 'search',

      // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
      insights: false,

      //... other Algolia params
    },
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'RPG Creator',
      logo: {
        alt: 'RPG Creator Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
            to: '/roadmap',
          position: 'left',
          label: 'Roadmap',
        },
        {
          href: 'https://github.com/Ward727a/rpgcreator-doc',
          label: 'GitHub',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right'
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/4yfq4NNzs4',
            },
            {
              label: 'Mastodon',
              href: 'https://mastodon.social/@RPGCreator',
            },
            {
              label: 'Bluesky',
              href: 'https://bsky.app/profile/rpgcreator.bsky.social',
            },
            {
              label: 'Itch.io',
              href: 'https://ward727.itch.io/rpg-creator',
            },
            {
              label: 'X',
              href: 'https://x.com/RPG_Creator_',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub - Engine',
              href: 'https://github.com/Ward727a/RPGCreator'
            },
            {
              label: 'GitHub - Documentation',
              href: 'https://github.com/Ward727a/rpgcreator-doc',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} RPG Creator under MIT License. Built with Docusaurus.`,
    },
    prism: {
      additionalLanguages: ['csharp'],
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
