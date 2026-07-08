<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)
const mobileOpen = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 0
}

function toggleMobile() {
  mobileOpen.value = !mobileOpen.value
}

function closeMobile() {
  mobileOpen.value = false
}

function smoothScroll(e: MouseEvent) {
  const link = (e.currentTarget as HTMLAnchorElement)
  const href = link.getAttribute('href')
  if (!href || !href.startsWith('#')) return
  e.preventDefault()
  const target = document.querySelector(href)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' })
  }
  closeMobile()
}

watch(mobileOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>
<template>
  <header class="header" :class="{ 'header--scrolled': scrolled }">
    <div class="container header__inner">
      <div class="logo">
        <span class="logo__text">S I P E</span>
      </div>
      <button class="burger" :class="{ 'burger--active': mobileOpen }" @click="toggleMobile" aria-label="Меню">
        <span class="line-1"></span>
        <span class="line-2"></span>
        <span class="line-3"></span>
        <span class="cross"></span>
      </button>
      <nav class="nav" aria-label="Основная навигация">
        <a href="#about" class="nav__link" @click="smoothScroll">О проекте</a>
        <a href="#concerts" class="nav__link" @click="smoothScroll">Концерты</a>
        <a href="#merch" class="nav__link" @click="smoothScroll">Мерч</a>
        <a href="#contacts" class="nav__link" @click="smoothScroll">Контакты</a>
      </nav>
    </div>
    <Teleport to="body">
      <div class="mobile-menu" :class="{ 'mobile-menu--open': mobileOpen }" :aria-hidden="!mobileOpen">
        <div class="mobile-menu__backdrop" @click="closeMobile"></div>
        <nav class="mobile-menu__nav" aria-label="Мобильная навигация">
          <a href="#about" class="mobile-menu__link" @click="smoothScroll">О проекте</a>
          <a href="#concerts" class="mobile-menu__link" @click="smoothScroll">Концерты</a>
          <a href="#merch" class="mobile-menu__link" @click="smoothScroll">Мерч</a>
          <a href="#contacts" class="mobile-menu__link" @click="smoothScroll">Контакты</a>
        </nav>
      </div>
    </Teleport>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 30;
  color: #ffffff;
  transition: background 0.3s, backdrop-filter 0.3s;

  &--scrolled {
    position: fixed;
    background: rgba(13, 13, 13, 0.7);
    backdrop-filter: blur(12px);
  }

  &__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    @media (max-width: 1200px) {
      padding: 12px;
    }
  }
}

.logo {
  &__text {
    display: block;
    font-family: var(--font-logo);
    font-size: 36px;
    line-height: 1;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: -8px;
  }
}

.nav {
  display: flex;
  gap: 40px;

  &__link {
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 2px;
    font-weight: 400;
    transition: opacity 0.3s;
    color: inherit;
    text-decoration: none;

    &:hover {
      opacity: 0.7;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
}

.burger {
  display: none;
  position: relative;
  cursor: pointer;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  z-index: 30;

  @media (max-width: 768px) {
    display: block;
  }
}

.line-1, .line-2, .line-3 {
  position: absolute;
  left: 8px;
  display: block;
  width: 22px;
  height: 2px;
  background: #ffffff;
  transition: 0.3s;
  border: none;
}

.line-1 {
  top: 11px;
  transition-delay: 0.3s;
}

.line-2 {
  top: 19px;
  transition-delay: 0.5s;
}

.line-3 {
  top: 27px;
  transition-delay: 0.6s;
}

.burger--active .line-1,
.burger--active .line-2,
.burger--active .line-3 {
  width: 0;
}

.burger--active .line-1 {
  transition-delay: 0.1s;
}

.burger--active .line-2 {
  transition-delay: 0.2s;
}

.burger--active .line-3 {
  transition-delay: 0.3s;
}

.cross,
.cross::after {
  position: absolute;
  width: 0;
  height: 2px;
  background: #ffffff;
  top: 50%;
  left: 50%;
  transition: 0.3s;
}

.cross {
  transform: translate(-50%, -50%) rotate(45deg);
  transition-delay: 0.2s;
}

.cross::after {
  content: "";
  transform: translate(-50%, -50%) rotate(90deg);
  transition-delay: 0.05s;
}

.burger--active .cross {
  width: 22px;
  transition-delay: 0.4s;
}

.burger--active .cross::after {
  width: 22px;
  transition-delay: 0.55s;
}

.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.3s, visibility 0.3s;

  &--open {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }

  &__backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(8px);
  }

  &__nav {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 32px;
    height: 100%;
    padding-top: 80px;
  }

  &__link {
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: #ffffff;
    font-family: var(--font-main);
    text-decoration: none;
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.7;
    }
  }

  @media (min-width: 769px) {
    display: none !important;
  }
}
</style>