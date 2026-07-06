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
              <img :src="item.image" alt="Футболка" draggable="false">
            </Slide>
          </Carousel>

          <button
              class="gallery-nav gallery-nav--next"
              :disabled="carouselRef?.data?.currentSlide >= carouselRef?.data?.maxSlide"
              @click="next"
          ></button>
        </div>
      </div>
      <div class="merch__btn-wrapper">
        <a href="https://vk.com/market-55019377?screen=group" target="_blank" class="button-primary">Купить</a>
      </div>
    </div>
  </section>
</template>

<script setup>
const images = [
  'jKBJAoaonxyiCLrq0jKyA31SHKa1K4OtsPRbB8E5Ktww_nX71TQarVC5eQGxzQZM14IGCSsdRmYIx-6Oz54cttaq.jpg',
  'oCKJTndwIPwrzPkS4WFDgWJygv0oNW4PXupELlMTfD0QWKw6sdH8R0_i8-JaYF6jHSk9K2wrA9jlJ4FStd1zDyF2.jpg',
  'iaHJO635qz6Ayup4vLZ_mj-u7hfJ9-ilceQLO6tLXihcMfNRYXkuiWAmc3PcI55CrAKqIuoJjXFqd3naeEC1cViU.jpg',
  'VHnJ54jd5V8u1DHWxMrxRjQz60bkMF37Sxd-IELXkp2ye6YZQR8YW-s3r_zb-dwBAFoVJyMAJvXTK18pT1UF0HIs.jpg',
  'R2jSTrvhwzUGSkshRmP7_noLn0YwPNu8FI5ayUNtu7uLdPqlrJgwqIziuICTHq9Ki_iHABj9xWTNdFvJ5kDzIaXR.jpg',
  'm6pEOw2-5R_PxJzaZ9OzhNU7t64xhiYZO4KP0stMkfndeuir-ZuoWpWK-tC8CKU3g_j5AbHKFNIc7Jy6X3eqUmy9.jpg',
  'HvLXKEMZlSfYidQTwLjIwcrRyfeevgv3bsx6fks-vk9vZjM3xwt9HzDF34siA0IHxFIBkjYmll0FfD9Gw8GxnvQZ.jpg',
  'pwcO7zpf22guR0ht2BL33udcDxOslUfM8BAUHTW7yXrSmez7vqdEHASYi8zZtMXldj5hqJQK776sIrgHTXLpHJhe.jpg',
  '19ovFZMdx0WlaJIoiPwA1SgNXpnSEekOW1tQYzFuzL_L85D70ovJBkCEKDcQX5LmnWPFOL9NUHdOZH_a2NJ3JFYS.jpg',
]

const merchItems = ref(images.map(file => ({image: `/merch/${file}`})))

const carouselRef = ref(null)
const curSlide = ref(0)
const perView = ref(5)

const breakpoints = {
  0: {itemsToShow: 2},
  768: {itemsToShow: 5},
}

function prev() {
  carouselRef.value?.prev()
}

function next() {
  carouselRef.value?.next()
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
