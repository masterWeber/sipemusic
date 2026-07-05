export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['vue3-carousel-nuxt', '@nuxt/ui'],
  runtimeConfig: {
    authSecret: '',
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'ru',
      },
      charset: 'utf-8',
      link: [
        { rel: 'canonical', href: 'https://sipe.live' },
      ],
    },
  },
})
