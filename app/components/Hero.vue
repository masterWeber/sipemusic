<template>
  <section class="hero">
    <div class="hero__poster" :style="{ backgroundImage: `url(/hero-bg-poster.jpg?v=${v})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }"></div>
    <video ref="videoRef" class="hero__bg" :class="{ 'hero__bg--ready': videoReady }" autoplay loop muted playsinline preload="auto" :poster="`/hero-bg-poster.jpg?v=${v}`" fetchpriority="high" disablepictureinpicture>
      <source :src="`/hero-bg.mp4?v=${v}`" type="video/mp4">
      <source :src="`/hero-bg.webm?v=${v}`" type="video/webm">
    </video>
    <div class="hero__overlay"></div>
    <div class="container hero__content">
      <h1 class="hero__title">S I P E</h1>
      <p class="hero__subtitle">&nbsp;Живая электроника</p>
      <div class="hero__platforms">
        <div class="hero__platforms-icons">
          <a href="https://music.youtube.com/channel/UCirM3qiKXGcvl6E1QzMURMw?si=sug158qkqSKm-O6E" target="_blank" rel="noopener noreferrer" class="hero__platforms-icon" aria-label="YouTube Music">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12s12-5.376 12-12S18.624 0 12 0m0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104s-3.18 7.104-7.104 7.104m0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772M9.684 15.54V8.46L15.816 12z" />
            </svg>
          </a>
          <a href="https://music.yandex.ru/artist/984216" target="_blank" rel="noopener noreferrer" class="hero__platforms-icon" aria-label="Yandex Music">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 442 445" fill="none">
              <path d="M220.86 445C342.838 445 441.72 345.383 441.72 222.5C441.72 99.6166 342.838 0 220.86 0C98.8825 0 0 99.6166 0 222.5C0 345.383 98.8825 445 220.86 445Z" fill="black"/>
              <path d="M388.708 178.196L387.278 171.451L330.975 161.517L363.752 116.784L359.979 112.4L311.801 135.793L317.888 73.7988L312.958 70.8861L283.65 121.169L250.842 46.3274H245.06L252.881 118.532L170.161 51.5703L163.192 53.6245L226.769 134.628L100.802 92.2255L94.989 98.6641L207.595 163.571L52.3205 176.725L50.5857 186.382L211.947 204.196L77.2764 317.086L83.0893 324.966L243.294 236.665L211.673 392.234H221.26L282.767 245.74L320.232 360.348L326.897 355.074L311.527 238.719L369.839 305.681L373.613 299.518L328.936 216.491L391.326 239.884L391.904 232.863L335.905 191.043L388.708 178.196Z" fill="white"/>
            </svg>
          </a>
          <a href="https://music.apple.com/ru/artist/sipe/524775020" target="_blank" rel="noopener noreferrer" class="hero__platforms-icon" aria-label="Apple Music">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M23.994 6.124a9.2 9.2 0 0 0-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5 5 0 0 0-1.877-.726a10.5 10.5 0 0 0-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986q-.227.014-.455.026c-.747.043-1.49.123-2.193.4c-1.336.53-2.3 1.452-2.865 2.78c-.192.448-.292.925-.363 1.408a11 11 0 0 0-.1 1.18c0 .032-.007.062-.01.093v12.223l.027.424c.05.815.154 1.624.497 2.373c.65 1.42 1.738 2.353 3.234 2.801c.42.127.856.187 1.293.228c.555.053 1.11.06 1.667.06h11.03a13 13 0 0 0 1.57-.1c.822-.106 1.596-.35 2.295-.81a5.05 5.05 0 0 0 1.88-2.207c.186-.42.293-.87.37-1.324c.113-.675.138-1.358.137-2.04c-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206c-.29.59-.76.962-1.388 1.14q-.524.15-1.07.173c-.95.045-1.773-.6-1.943-1.536a1.88 1.88 0 0 1 1.038-2.022c.323-.16.67-.25 1.018-.324c.378-.082.758-.153 1.134-.24c.274-.063.457-.23.51-.516a1 1 0 0 0 .02-.193q0-2.723-.002-5.443a.7.7 0 0 0-.026-.185c-.04-.15-.15-.243-.304-.234c-.16.01-.318.035-.475.066q-1.14.226-2.28.456l-2.325.47l-1.374.278l-.048.013c-.277.077-.377.203-.39.49q-.002.063 0 .13c-.002 2.602 0 5.204-.003 7.805c0 .42-.047.836-.215 1.227c-.278.64-.77 1.04-1.434 1.233q-.526.152-1.075.172c-.96.036-1.755-.6-1.92-1.544c-.14-.812.23-1.685 1.154-2.075c.357-.15.73-.232 1.108-.31c.287-.06.575-.116.86-.177q.574-.126.6-.714v-.15l.002-8.882c0-.123.013-.25.042-.37c.07-.285.273-.448.546-.518c.255-.066.515-.112.774-.165q1.1-.224 2.2-.444l2.27-.46l2.01-.403c.22-.043.442-.088.663-.106c.31-.025.523.17.554.482q.012.11.012.223q.003 2.866 0 5.732z" />
            </svg>
          </a>
          <a href="https://open.spotify.com/artist/0uK6MWFA6CV1nOTv5PPqt3?si=XcqN3CAzSZOBWhXgj_kxGg" target="_blank" rel="noopener noreferrer" class="hero__platforms-icon" aria-label="Spotify">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12s12-5.4 12-12S18.66 0 12 0m5.521 17.34c-.24.359-.66.48-1.021.24c-2.82-1.74-6.36-2.101-10.561-1.141c-.418.122-.779-.179-.899-.539c-.12-.421.18-.78.54-.9c4.56-1.021 8.52-.6 11.64 1.32c.42.18.479.659.301 1.02m1.44-3.3c-.301.42-.841.6-1.262.3c-3.239-1.98-8.159-2.58-11.939-1.38c-.479.12-1.02-.12-1.14-.6s.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2m.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721c-.18-.601.18-1.2.72-1.381c4.26-1.26 11.28-1.02 15.721 1.621c.539.3.719 1.02.419 1.56c-.299.421-1.02.599-1.559.3" />
            </svg>
          </a>
          <a href="https://zvuk.com/artist/3162035" target="_blank" rel="noopener noreferrer" class="hero__platforms-icon" aria-label="Zvuk">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="4 4 24 24" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M14.4714 23.2204C14.5215 23.4625 14.5466 23.5835 14.4709 23.6685C14.3951 23.7535 14.2689 23.7423 14.0163 23.7198C12.6026 23.5939 11.8119 23.3347 11.1935 23.0786C10.1649 22.6525 9.3476 21.8352 8.92151 20.8066C8.66535 20.1881 8.40613 19.3974 8.28022 17.9837C8.25773 17.7311 8.24649 17.6049 8.3315 17.5291C8.4165 17.4534 8.53754 17.4785 8.7796 17.5286C11.6333 18.1192 13.8808 20.3667 14.4714 23.2204ZM17.204 23.7719C17.0076 23.781 16.9094 23.7856 16.842 23.7297C16.7745 23.6738 16.7601 23.5717 16.7312 23.3676C16.1386 19.1768 12.8232 15.8615 8.63245 15.2688C8.42827 15.2399 8.32618 15.2255 8.27028 15.158C8.21439 15.0906 8.21897 14.9924 8.22813 14.796C8.2665 13.9735 8.34429 13.3272 8.44427 12.8001C8.47716 12.6268 8.4936 12.5401 8.56217 12.4875C8.63075 12.4349 8.71957 12.4416 8.89721 12.4549C14.5808 12.8822 19.1178 17.4193 19.5451 23.1029C19.5584 23.2805 19.5651 23.3693 19.5125 23.4379C19.4599 23.5065 19.3732 23.5229 19.1998 23.5558C18.6728 23.6558 18.0265 23.7335 17.204 23.7719ZM22.2989 22.0324C22.0753 22.2769 21.9635 22.3992 21.8274 22.3586C21.6913 22.3179 21.6622 22.137 21.6039 21.7753C20.6639 15.9423 16.0578 11.3362 10.2249 10.3961C9.86317 10.3378 9.68229 10.3087 9.64163 10.1726C9.60096 10.0365 9.72326 9.92471 9.96785 9.70115C10.3246 9.37503 10.7384 9.10993 11.1935 8.9214C12.055 8.56456 13.2508 8.20183 16 8.20183C18.7492 8.20183 19.9452 8.56457 20.8067 8.9214C21.8354 9.34749 22.6526 10.1648 23.0787 11.1934C23.4355 12.0548 23.7982 13.2507 23.7982 16C23.7982 18.7493 23.4355 19.9452 23.0787 20.8066C22.8902 21.2618 22.625 21.6755 22.2989 22.0324ZM6 16C6 13.018 6.40011 11.527 6.88728 10.3508C7.53685 8.78265 8.78276 7.53673 10.3509 6.88717C11.5271 6.4 13.018 6 16 6C18.982 6 20.4732 6.4 21.6493 6.88717C23.2175 7.53673 24.4634 8.78265 25.1129 10.3508C25.6001 11.527 26 13.018 26 16C26 18.982 25.6001 20.473 25.1129 21.6492C24.4634 23.2174 23.2175 24.4633 21.6493 25.1128C20.4732 25.6 18.982 26 16 26C13.018 26 11.5271 25.6 10.3509 25.1128C8.78276 24.4633 7.53685 23.2174 6.88728 21.6492C6.40011 20.473 6 18.982 6 16Z" fill="currentColor"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const v = 1
const videoRef = ref(null)
const videoReady = ref(false)

useHead({
  link: [
    { rel: 'preload', href: `/hero-bg-poster.jpg?v=${v}`, as: 'image', fetchpriority: 'high' },
  ],
})

onMounted(() => {
  const video = videoRef.value
  if (!video) return

  const show = () => {
    videoReady.value = true
  }

  if (video.readyState >= 3) {
    show()
  } else {
    video.addEventListener('playing', show, { once: true })
    setTimeout(show, 1000)
  }
})
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

  &__poster {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    filter: brightness(0.6);
  }

  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
    filter: brightness(0.6);
    opacity: 0;
    transition: opacity 0.6s;

    &--ready {
      opacity: 1;
    }
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

  &__platforms {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    &-label {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #999;
    }

    &-icons {
      display: flex;
      gap: 20px;
    }

    &-icon {
      color: #fff;
      transition: opacity 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        opacity: 0.7;
      }

      svg {
        width: 24px;
        height: 24px;
      }
    }
  }
}
</style>