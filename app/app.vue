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
</script>

<style lang="scss">
:root {
  --font-main: 'Montserrat', sans-serif;
  --font-logo: 'Terrakota Sans', sans-serif;
}

@font-face {
  font-family: 'Terrakota Sans';
  src: url('/fonts/Terrakota sans Regular.otf') format('opentype');
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
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section {
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

<style lang="scss" scoped>
.page {
  position: relative;
  font-family: var(--font-main);
  font-weight: 300;
  line-height: 1.5;
}
</style>