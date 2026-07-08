<template>
  <Teleport to="body">
    <div v-if="visible" class="lightbox-overlay" @click.self="close" tabindex="0" ref="overlayRef"
      @touchstart="onTouchStart" @touchend="onTouchEnd">

      <button class="lightbox-close" @click="close" aria-label="Закрыть"></button>

      <button class="lightbox-nav lightbox-nav--prev" :disabled="!hasPrev" @click="prev" aria-label="Предыдущее"></button>

      <div class="lightbox-image-wrap">
        <img :src="images[currentIndex]" class="lightbox-image" :alt="`Изображение ${currentIndex + 1} из ${images.length}`" @click.stop draggable="false">
      </div>

      <button class="lightbox-nav lightbox-nav--next" :disabled="!hasNext" @click="next" aria-label="Следующее"></button>

      <div class="lightbox-counter">{{ currentIndex + 1 }} / {{ images.length }}</div>
    </div>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  images: { type: Array, required: true },
  modelValue: { type: Number, default: null },
})

const emit = defineEmits(['update:modelValue'])

const visible = ref(false)
const currentIndex = ref(0)
const overlayRef = ref(null)
const touchStartX = ref(0)

const hasPrev = computed(() => currentIndex.value > 0)
const hasNext = computed(() => currentIndex.value < props.images.length - 1)

watch(() => props.modelValue, (val) => {
  if (val !== null && val >= 0) {
    currentIndex.value = val
    visible.value = true
    nextTick(() => overlayRef.value?.focus())
  } else {
    visible.value = false
  }
})

function close() {
  visible.value = false
  emit('update:modelValue', null)
}

function prev() {
  if (hasPrev.value) currentIndex.value--
}

function next() {
  if (hasNext.value) currentIndex.value++
}

function onTouchStart(e) {
  touchStartX.value = e.touches[0].clientX
}

function onTouchEnd(e) {
  const diff = touchStartX.value - e.changedTouches[0].clientX
  if (Math.abs(diff) > 50) {
    if (diff > 0) next()
    else prev()
  }
}

onMounted(() => {
  document.addEventListener('keydown', (e) => {
    if (!visible.value) return
    if (e.key === 'Escape') close()
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
  })
})
</script>

<style lang="scss" scoped>
.lightbox-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.lightbox-close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 44px;
  height: 44px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 2;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 24px;
    height: 2px;
    background: #fff;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  &:hover {
    opacity: 0.5;
  }
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  height: 60px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 2;
  transition: opacity 0.3s;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 16px;
    height: 16px;
    border-style: solid;
    border-color: #fff;
    border-width: 0 2px 2px 0;
  }

  &:hover {
    opacity: 0.5;
  }

  &:disabled {
    visibility: hidden;
  }
}

.lightbox-nav--prev {
  left: 20px;

  &::after {
    transform: translate(-50%, -50%) rotate(135deg);
  }
}

.lightbox-nav--next {
  right: 20px;

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
}

.lightbox-image-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 90vw;
  max-height: 85vh;
  z-index: 1;
}

.lightbox-image {
  max-width: 100%;
  max-height: 85vh;
  object-fit: contain;
  user-select: none;
  -webkit-user-drag: none;
}

.lightbox-counter {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-main);
  font-size: 14px;
  color: #aaa;
  letter-spacing: 1px;
  z-index: 1;
}
</style>
