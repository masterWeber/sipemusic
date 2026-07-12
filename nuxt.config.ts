export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['vue3-carousel-nuxt', ['@nuxt/ui', { fonts: false }]],
  runtimeConfig: {
    authSecret: process.env.NUXT_AUTH_SECRET || '',
    docsUrl: process.env.DOCS_URL || '',
    ridersUrl: process.env.RIDERS_URL || '',
  },
  nitro: {
    experimental: {
      tasks: true,
    },
    scheduledTasks: {
      '0 3 * * *': ['cleanup-past-concerts'],
    },
  },
  experimental: {
    inlineSSRStyles: true,
  },
  vite: {
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          if (warning.plugin === 'nuxt:module-preload-polyfill') return
          warn(warning)
        },
      },
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'ru',
      },
      charset: 'utf-8',
      link: [
        { rel: 'canonical', href: 'https://sipemusic.com' },
        { rel: 'preload', href: '/fonts/TerrakotaSans-Regular.otf', as: 'font', type: 'font/otf', crossorigin: 'anonymous' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&display=swap' },
      ],
    },
  },
})
