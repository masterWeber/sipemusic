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
            aria-label="Предыдущий"
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
              <div class="member-card" @click="openLightbox(index)">
                <div class="member-card__image-wrapper">
                  <img :src="member.image" :alt="member.name" class="member-card__image" draggable="false" loading="lazy">
                </div>
              </div>
            </Slide>
          </Carousel>

          <Lightbox :images="memberImages" v-model="lightboxIndex" />

          <button
            class="gallery-nav gallery-nav--next"
            :disabled="carouselRef?.data?.currentSlide >= carouselRef?.data?.maxSlide"
            @click="next"
            aria-label="Следующий"
          ></button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const members = ref([])
const carouselRef = ref(null)
const curSlide = ref(0)
const perView = ref(4)
const lightboxIndex = ref(null)

const memberImages = computed(() => members.value.map(m => m.image))

function openLightbox(index) {
  lightboxIndex.value = index
}

const breakpoints = {
  0: { itemsToShow: 1 },
  480: { itemsToShow: 2 },
  1024: { itemsToShow: 4 },
}

function prev() {
  const c = carouselRef.value
  if (c && c.data?.currentSlide > 0) c.prev()
}

function next() {
  const c = carouselRef.value
  if (c && c.data?.currentSlide < c.data?.maxSlide) c.next()
}

onMounted(async () => {
  try {
    const data = await $fetch('/api/about-photos')
    members.value = data
  } catch {
    members.value = []
  }
})
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
