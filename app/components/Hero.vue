<template>
  <section class="hero">
    <video class="hero__bg" autoplay loop muted playsinline>
      <source src="/hero-bg.webm" type="video/webm">
    </video>
    <div class="hero__overlay"></div>
    <div class="container hero__content">
      <h1 class="hero__title">S I P E</h1>
      <p class="hero__subtitle">&nbsp;Живая электроника</p>
    </div>
  </section>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  min-height: 600px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
  aspect-ratio: 16 / 6;

  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
    filter: brightness(0.6);
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:
      linear-gradient(to top, #0d0d0d 0%, transparent 30%),
      radial-gradient(circle, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.7) 100%);
    z-index: 1;
  }

  &__content {
    position: relative;
    z-index: 2;
  }

  &__title {
    margin: 0;
    font-family: var(--font-logo);
    font-size: 260px;
    font-weight: 400;
    line-height: 1;
    text-transform: uppercase;

    @media (max-width: 960px) {
      font-size: 160px;
    }
  }

  &__subtitle {
    margin: 0;
    font-size: clamp(1rem, 2vw, 22px);
    font-weight: 300;
    letter-spacing: 10px;
    text-transform: uppercase;
    color: #ccc;
  }
}
</style>