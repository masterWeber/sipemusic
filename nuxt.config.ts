export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['vue3-carousel-nuxt', ['@nuxt/ui', { fonts: false }]],
  runtimeConfig: {
    authSecret: '',
  },
  experimental: {
    inlineSSRStyles: true,
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'ru',
      },
      charset: 'utf-8',
      link: [
        { rel: 'canonical', href: 'https://sipemusic.com' },
        { rel: 'preload', href: '/fonts/Terrakota sans Regular.otf', as: 'font', type: 'font/otf', crossorigin: 'anonymous' },
      ],
    },
  },
})
