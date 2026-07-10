<template>
  <section class="section merch" id="merch">
    <div class="container">
      <h2 class="section-title merch__title">Мерч</h2>
      <div class="merch__slider">
        <div class="merch__carousel-wrap">
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
              :gap="10"
              snap-align="start"
              :breakpoints="breakpoints"
              :clamp="true"
              :mouse-drag="true"
              :touch-drag="true"
              class="merch__carousel"
          >
            <Slide v-for="(item, index) in merchItems" :key="index">
              <img :src="item.image" :alt="`Мерч SIPE ${index + 1}`" draggable="false" loading="lazy" @click="openLightbox(index)" style="cursor: pointer">
            </Slide>
          </Carousel>

          <Lightbox :images="merchImages" v-model="lightboxIndex" />

          <button
              class="gallery-nav gallery-nav--next"
              :disabled="carouselRef?.data?.currentSlide >= carouselRef?.data?.maxSlide"
              @click="next"
              aria-label="Следующий"
          ></button>
        </div>
      </div>
      <div class="merch__btn-wrapper">
        <a :href="settings?.merch_buy_url ?? '#'" target="_blank" class="button-primary">{{ settings?.merch_buy_text ?? 'Купить' }}</a>
      </div>
    </div>
  </section>
</template>

<script setup>
const { settings } = useSiteSettings()
const merchItems = ref([])

const carouselRef = ref(null)
const curSlide = ref(0)
const perView = ref(5)
const lightboxIndex = ref(null)

onMounted(async () => {
  try {
    merchItems.value = await $fetch('/api/merch')
  } catch (err) {
    console.error('Failed to load merch', err)
  }
})

const merchImages = computed(() => merchItems.value.map(i => i.image))

function openLightbox(index) {
  lightboxIndex.value = index
}

const breakpoints = {
  0: {itemsToShow: 2},
  768: {itemsToShow: 5},
}

function prev() {
  const c = carouselRef.value
  if (c && c.data?.currentSlide > 0) c.prev()
}

function next() {
  const c = carouselRef.value
  if (c && c.data?.currentSlide < c.data?.maxSlide) c.next()
}
</script>

<style lang="scss" scoped>
.merch {
  position: relative;
  z-index: 10;

  &__title {
    margin-top: 0;
  }

  &__slider {
    margin-bottom: 40px;
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
      gap: 10px;
    }

    :deep(.carousel__slide) {
      background: #111;
      overflow: hidden;
      padding: 0;

      img {
        width: 100%;
        height: auto;
        display: block;
        filter: grayscale(100%);
        transition: filter 0.3s;
      }

      &:hover img {
        filter: grayscale(0%);
      }
    }
  }

  &__btn-wrapper {
    display: flex;
    justify-content: center;
  }

  .button-primary {
    background: transparent;
    border: 1px solid #fff;
    color: #fff;
    padding: 15px 60px;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 2px;
    cursor: pointer;
    transition: all 0.3s;
    text-decoration: none;

    &:hover {
      background: #fff;
      color: #000;
    }
  }
}
</style>
