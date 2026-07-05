<template>
  <div class="page">
    <VideoSmoke />
    <Header />
    <Hero />
    <About />
    <Concerts />
    <Merch />
    <Footer />
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Electronic Music',
  description: 'SIPE — electronic music project. Live concerts, releases and merch.',
  ogTitle: 'SIPE — Electronic Music',
  ogDescription: 'Electronic music project. Live concerts, releases and merch.',
  ogImage: '/photo_2026-06-22_12-04-43.jpg',
  ogUrl: 'https://sipe.live',
  twitterTitle: 'SIPE — Electronic Music',
  twitterDescription: 'Electronic music project. Live concerts, releases and merch.',
  twitterImage: '/photo_2026-06-22_12-04-43.jpg',
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
