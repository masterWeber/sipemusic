<template>
  <div class="video-smoke">
    <div class="smoke-wrapper smoke-wrapper--left">
      <video ref="videoL" class="smoke-clip" muted playsinline />
    </div>
    <div class="smoke-wrapper smoke-wrapper--right">
      <video ref="videoR" class="smoke-clip" muted playsinline />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const videoL = ref(null)
const videoR = ref(null)
const videoSrc = '/smoke.mp4'

const FADE_DURATION = 2
const BASE_OPACITY = 0.1

let fadeId

onMounted(() => {
  videoL.value.src = videoSrc
  videoR.value.src = videoSrc

  function onEnded(video) {
    video.currentTime = 0
    video.play().catch(() => {})
  }

  videoL.value.addEventListener('ended', () => onEnded(videoL.value))

  function onEndedR(video) {
    const safeRange = video.duration - 2 * FADE_DURATION
    video.currentTime = FADE_DURATION + Math.random() * Math.max(safeRange, 0)
    video.play().catch(() => {})
  }

  videoR.value.addEventListener('ended', () => onEndedR(videoR.value))

  function tick() {
    for (const v of [videoL.value, videoR.value]) {
      if (!v || !v.duration) continue
      const t = v.currentTime
      const d = v.duration
      let factor = 1
      if (t < FADE_DURATION) {
        factor = t / FADE_DURATION
      } else if (d - t < FADE_DURATION) {
        factor = (d - t) / FADE_DURATION
      }
      v.style.opacity = BASE_OPACITY * factor
    }
    fadeId = requestAnimationFrame(tick)
  }

  let tickStarted = false

  function startTick() {
    if (tickStarted) return
    tickStarted = true
    tick()
  }

  const play = (v) => {
    v.play().catch(() => {})
  }

  videoL.value.addEventListener('loadeddata', () => {
    play(videoL.value)
    startTick()
  }, { once: true })

  videoR.value.addEventListener('loadeddata', () => {
    const safeRange = videoR.value.duration - 2 * FADE_DURATION
    const offset = FADE_DURATION + Math.random() * Math.max(safeRange, 0)
    videoR.value.currentTime = offset
    play(videoR.value)
    startTick()
  }, { once: true })
})

onBeforeUnmount(() => {
  if (fadeId) cancelAnimationFrame(fadeId)
})
</script>

<style scoped>
.video-smoke {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 2;
}

.smoke-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 35vw;
  overflow: hidden;

  @media (max-width: 768px) {
    overflow: initial;
  }
}

.smoke-wrapper--left {
  left: 0;
}

.smoke-wrapper--right {
  right: 0;
}

.smoke-clip {
  position: absolute;
  width: 100vh;
  height: 35vw;
  object-fit: cover;
  object-position: top center;
  mix-blend-mode: screen;
  opacity: 0;

  @media (max-width: 768px) {
    height: 100vw;
  }
}

.smoke-wrapper--left .smoke-clip {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) rotate(-90deg) scaleX(-1);
}

.smoke-wrapper--right .smoke-clip {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) rotate(90deg);
}
</style>
