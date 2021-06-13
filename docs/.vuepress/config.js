module.exports = ctx => ({
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Vue Router',
      description: 'The official router for Vue.js.'
    },
  },
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }],
    [
      'link',
      { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }
    ],
    [
      'link',
      {
        rel: 'mask-icon',
        href: '/icons/safari-pinned-tab.svg',
        color: '#3eaf7c'
      }
    ],
    [
      'meta',
      {
        name: 'msapplication-TileImage',
        content: '/icons/msapplication-icon-144x144.png'
      }
    ]
  ],
  // theme: '@vuepress/vue',
  plugins: [
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: true
      }
    ]
  ],
  themeConfig: {
    algolia: ctx.isProd
      ? {
          apiKey: 'f854bb46d3de7eeb921a3b9173bd0d4c',
          indexName: 'vue-router'
        }
      : null,
    carbonAds: {
      carbon: 'CEBICK3I',
      custom: 'CEBICK3M',
      placement: 'routervuejsorg'
    },
    repo: 'vuejs/vue-router',
    docsDir: 'docs',
    smoothScroll: true,
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        nav: [
          {
            text: 'Guide',
            link: '/guide/'
          },
          {
            text: 'API Reference',
            link: '/api/'
          },
          {
            text: 'v3.x',
            items: [
              { text: 'v4.x', link: 'https://next.router.vuejs.org' }
            ]
          },
          {
            text: 'Release Notes',
            link: 'https://github.com/vuejs/vue-router/releases'
          }
        ],
        sidebar: [
          '/installation.md',
          {
            title: 'Essentials',
            collapsable: false,
            children: [
              '/guide/',
              '/guide/essentials/dynamic-matching.md',
              '/guide/essentials/nested-routes.md',
              '/guide/essentials/navigation.md',
              '/guide/essentials/named-routes.md',
              '/guide/essentials/named-views.md',
              '/guide/essentials/redirect-and-alias.md',
              '/guide/essentials/passing-props.md',
              '/guide/essentials/history-mode.md'
            ]
          },
          {
            title: 'Advanced',
            collapsable: false,
            children: [
              '/guide/advanced/navigation-guards.md',
              '/guide/advanced/meta.md',
              '/guide/advanced/transitions.md',
              '/guide/advanced/data-fetching.md',
              '/guide/advanced/scroll-behavior.md',
              '/guide/advanced/lazy-loading.md',
              '/guide/advanced/navigation-failures.md'
            ]
          }
        ]
      },
      
    }
  }
})
