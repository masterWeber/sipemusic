<template>
  <a href="#main-content" class="skip-link">Перейти к содержимому</a>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
useHead({
  titleTemplate: (title) => title ? `${title} — SIPE MUSIC` : 'SIPE MUSIC',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'title', content: 'SIPE MUSIC' },
    { name: 'description', content: 'Проект Sipe это не просто музыка, это целая вселенная, где каждый трек живёт своей жизнью. Это пространство для экспериментов, поиска и вдохновения, где не бывает конечной точки. Музыка здесь это путь, который никогда не заканчивается.' },
    { name: 'keywords', content: 'sipe, electronic music, concerts, music' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'SIPE MUSIC' },
    { property: 'og:url', content: 'https://sipemusic.com' },
    { property: 'og:title', content: 'SIPE MUSIC' },
    { property: 'og:description', content: 'Проект Sipe это не просто музыка, это целая вселенная, где каждый трек живёт своей жизнью. Это пространство для экспериментов, поиска и вдохновения, где не бывает конечной точки. Музыка здесь это путь, который никогда не заканчивается.' },
    { property: 'og:image', content: 'https://sipemusic.com/og-image.webp' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: 'https://sipemusic.com' },
    { name: 'twitter:title', content: 'SIPE MUSIC' },
    { name: 'twitter:description', content: 'Проект Sipe это не просто музыка, это целая вселенная, где каждый трек живёт своей жизнью. Это пространство для экспериментов, поиска и вдохновения, где не бывает конечной точки. Музыка здесь это путь, который никогда не заканчивается.' },
    { name: 'twitter:image', content: 'https://sipemusic.com/og-image.webp' },
  ],
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'icon', href: '/favicon.ico', type: 'image/x-icon' },
  ],
})
</script>

<style lang="scss">
:root {
  --font-main: 'Montserrat', sans-serif;
  --font-logo: 'Terrakota Sans', sans-serif;
}

@font-face {
  font-family: 'Terrakota Sans';
  src: url('/fonts/TerrakotaSans-Regular.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

* {
  box-sizing: border-box;
}

html {
  background-color: #0d0d0d;
}

body {
  margin: 0;
  color: #ffffff;
  font-family: var(--font-main);
}

.skip-link {
  position: absolute;
  top: -100%;
  left: 0;
  z-index: 1000;
  padding: 8px 16px;
  background: #fff;
  color: #000;
  font-size: 14px;
  text-decoration: none;

  &:focus {
    top: 0;
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section {
  scroll-margin-top: 80px;
  padding: 80px 0;

  @media (max-width: 768px) {
    padding: 50px 0;
  }
}

.section-title {
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 4px;
  font-size: 28px;
  margin-bottom: 40px;
}

.gallery-nav {
  position: relative;
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.3s;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 10px;
    border-style: solid;
    border-color: #fff;
    border-width: 0 2px 2px 0;
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  &:hover {
    &::after {
      opacity: 0.5;
    }
  }

  &.swiper-button-disabled,
  &:disabled {
    visibility: hidden;
    pointer-events: none;
  }
}

.gallery-nav--prev {
  &::after {
    transform: translate(-50%, -50%) rotate(135deg);
  }
}
</style>
