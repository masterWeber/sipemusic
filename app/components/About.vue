<template>
  <section class="section about" id="about">
    <div class="container about__inner">
      <div class="about__text-block">
        <h2 class="section-title about__title">О проекте</h2>
        <p class="about__desc">
          SIPE - российский проект на стыке индитроники и альтернативной музыки, где атмосферная электроника переплетается с живыми инструментами и мощным вокалом.
        </p>
      </div>

      <div class="about__gallery">
        <div class="about__carousel-wrap">
          <button
            class="gallery-nav gallery-nav--prev"
            :disabled="carouselRef?.data?.currentSlide === 0"
            @click="prev"
          ></button>

          <Carousel
            ref="carouselRef"
            v-model="curSlide"
            :items-to-show="perView"
            :items-to-scroll="1"
            :gap="15"
            snap-align="start"
            :breakpoints="breakpoints"
            :clamp="true"
            :mouse-drag="true"
            :touch-drag="true"
            class="about__carousel"
          >
            <Slide v-for="(member, index) in members" :key="index">
              <div class="member-card">
                <div class="member-card__image-wrapper">
                  <img :src="member.image" :alt="member.name" class="member-card__image" draggable="false">
                </div>
              </div>
            </Slide>
          </Carousel>

          <button
            class="gallery-nav gallery-nav--next"
            :disabled="carouselRef?.data?.currentSlide >= carouselRef?.data?.maxSlide"
            @click="next"
          ></button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const members = ref([
  { image: '/photo/Саша джу.webp' },
  { image: '/photo/Все.webp' },
  { image: '/photo/конц.webp' },
  { image: '/photo/конц4.webp' },
  { image: '/photo/Джу конц.webp' },
  { image: '/photo/сашаконц.webp' },
  { image: '/photo/сипе.webp' },
  { image: '/photo/сашаконцспб.webp' },
  { image: '/photo/джу43.webp' },
  { image: '/photo/Дмитрий.webp' },
  { image: '/photo/Антон.webp' },
  { image: '/photo/Олег.webp' },
  { image: '/photo/концмск.webp' },
  { image: '/photo/барабан.webp' },
  { image: '/photo/Виталь.webp' },
  { image: '/photo/автограф.webp' },
  { image: '/photo/концуцк.webp' },
  { image: '/photo/концфото.webp' },
  { image: '/photo/все2.webp' },
])

const carouselRef = ref(null)
const curSlide = ref(0)
const perView = ref(4)

const breakpoints = {
  0: { itemsToShow: 1 },
  480: { itemsToShow: 2 },
  1024: { itemsToShow: 4 },
}

function prev() {
  carouselRef.value?.prev()
}

function next() {
  carouselRef.value?.next()
}
</script>

<style lang="scss" scoped>
$text-muted: #999999;

.about {
  z-index: 10;
  position: relative;

  &__inner {
    display: flex;
    gap: 60px;
    align-items: flex-start;

    @media (max-width: 1024px) {
      flex-direction: column;
    }
  }

  &__text-block {
    flex: 0 0 35%;

    @media (max-width: 1024px) {
      flex: 1;
      width: 100%;
    }
  }

  &__title {
    margin-bottom: 30px;
  }

  &__desc {
    font-size: 14px;
    line-height: 1.8;
    letter-spacing: 0.5px;
    color: #ddd;
    max-width: 400px;

    @media (max-width: 1024px) {
      max-width: 100%;
    }
  }

  &__gallery {
    flex: 1;
    min-width: 0;
  }

  &__carousel-wrap {
    position: relative;

    .gallery-nav--prev {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 2;
    }

    .gallery-nav--next {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 2;
    }
  }

  &__carousel {
    :deep(.carousel__viewport) {
      overflow: hidden;
      user-select: none;
      -webkit-user-select: none;
    }

    :deep(.carousel__track) {
      display: flex;
      gap: 15px;
    }

    :deep(.carousel__slide) {
      padding: 0;
    }
  }

  .member-card {
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-width: 0;

    &__image-wrapper {
      width: 100%;
      aspect-ratio: 3/4;
      overflow: hidden;
      background-color: #222;
    }

    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: grayscale(100%);
      transition: filter 0.3s;

      &:hover {
        filter: grayscale(0%);
      }
    }

    &__info {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    &__name {
      font-size: 13px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #fff;
    }

    &__role {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: $text-muted;
    }
  }
}
</style>
