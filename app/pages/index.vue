<template>
  <div class="page">
    <VideoSmoke />
    <Header />
    <Hero />
    <Concerts />
    <About />
    <Merch />
    <Footer />
  </div>
</template>

<script setup>
useSeoMeta({
  description: 'Проект Sipe это не просто музыка, это целая вселенная, где каждый трек живёт своей жизнью. Это пространство для экспериментов, поиска и вдохновения, где не бывает конечной точки. Музыка здесь это путь, который никогда не заканчивается.',
  ogTitle: 'SIPE MUSIC',
  ogDescription: 'Проект Sipe это не просто музыка, это целая вселенная, где каждый трек живёт своей жизнью. Это пространство для экспериментов, поиска и вдохновения, где не бывает конечной точки. Музыка здесь это путь, который никогда не заканчивается.',
  ogImage: 'https://sipemusic.com/og-image.webp',
  ogUrl: 'https://sipemusic.com',
  twitterTitle: 'SIPE MUSIC',
  twitterDescription: 'Проект Sipe это не просто музыка, это целая вселенная, где каждый трек живёт своей жизнью. Это пространство для экспериментов, поиска и вдохновения, где не бывает конечной точки. Музыка здесь это путь, который никогда не заканчивается.',
  twitterImage: 'https://sipemusic.com/og-image.webp',
})
</script>

<style lang="scss" scoped>
.page {
  position: relative;
  font-family: var(--font-main);
  font-weight: 300;
  line-height: 1.5;
}
</style>
