<template>
  <div class="merch-page">
    <div class="merch-page__header">
      <h1 class="merch-page__title">Мерч</h1>
      <button class="merch-page__add-btn" @click="openUpload">+ Добавить</button>
    </div>

    <div v-if="loading" class="merch-page__loading">Загрузка...</div>

    <div v-else-if="items.length === 0" class="merch-page__empty">
      Мерча пока нет. Нажмите «Добавить», чтобы загрузить первый.
    </div>

    <div v-else class="merch-grid">
      <div
        v-for="(item, index) in items"
        :key="item.id"
        class="merch-card"
      >
        <div class="merch-card__image-wrap">
          <img :src="item.image" :alt="`Мерч ${index + 1}`" class="merch-card__image">
        </div>
        <div class="merch-card__info">
          <span class="merch-card__index">#{{ index + 1 }}</span>
        </div>
        <div class="merch-card__actions">
          <button
            class="merch-card__btn merch-card__btn--up"
            :disabled="index === 0"
            @click="moveUp(item.id)"
            aria-label="Переместить вверх"
          >◀</button>
          <button
            class="merch-card__btn merch-card__btn--down"
            :disabled="index === items.length - 1"
            @click="moveDown(item.id)"
            aria-label="Переместить вниз"
          >▶</button>
          <button
            class="merch-card__btn merch-card__btn--delete"
            @click="confirmDelete(item)"
            aria-label="Удалить"
          >✕</button>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="uploadModalOpen" class="modal-overlay" @click.self="closeUpload">
        <div class="modal-card modal-card--upload">
          <h2 class="modal-card__title">{{ cropping ? 'Обрезка' : 'Загрузка' }}</h2>

          <div v-if="!previewUrl" class="upload-area">
            <label class="upload-area__label">
              <input type="file" accept="image/*" class="upload-area__input" @change="onFileSelect">
              <div class="upload-area__placeholder">
                <span class="upload-area__icon">+</span>
                <span>Выберите файл</span>
              </div>
            </label>
          </div>

          <div v-else class="crop-area">
            <div class="crop-area__canvas-wrap">
              <canvas
                ref="cropCanvasRef"
                class="crop-area__canvas"
                @mousedown="onCropMouseDown"
                @mousemove="onCropMouseMove"
                @mouseup="onCropMouseUp"
                @mouseleave="onCropMouseUp"
              ></canvas>
              <div
                v-if="cropActive"
                class="crop-area__selector"
                :style="cropStyle"
              ></div>
            </div>
            <p class="crop-area__hint">Выделите область для кадрирования или оставьте как есть — фото будет обрезано по центру</p>
          </div>

          <div class="modal-card__actions">
            <button v-if="previewUrl" class="modal-card__btn modal-card__btn--cancel" @click="resetUpload">Назад</button>
            <button class="modal-card__btn modal-card__btn--cancel" @click="closeUpload">Отмена</button>
            <button
              class="modal-card__btn modal-card__btn--save"
              :disabled="saving"
              @click="saveItem"
            >{{ saving ? 'Сохранение...' : 'Сохранить' }}</button>
          </div>
        </div>
      </div>
    </Teleport>

    <Teleport to="body">
      <div v-if="deleteModalOpen" class="modal-overlay" @click.self="deleteModalOpen = false">
        <div class="modal-card">
          <h2 class="modal-card__title">Удалить</h2>
          <p class="modal-card__text">
            Вы уверены, что хотите удалить этот товар?
          </p>
          <div class="modal-card__actions">
            <button class="modal-card__btn modal-card__btn--cancel" @click="deleteModalOpen = false">Отмена</button>
            <button class="modal-card__btn modal-card__btn--delete" :disabled="deleting" @click="deleteItem">
              {{ deleting ? 'Удаление...' : 'Удалить' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

useHead({ title: 'Мерч' })

const items = ref([])
const loading = ref(true)

const uploadModalOpen = ref(false)
const previewUrl = ref('')
const uploadFile = ref(null)
const saving = ref(false)
const cropping = ref(false)
const cropCanvasRef = ref(null)

const cropStart = ref({ x: 0, y: 0 })
const cropEnd = ref({ x: 0, y: 0 })
const cropDragging = ref(false)
const cropActive = ref(false)
const cropImageSize = ref({ w: 0, h: 0 })

const deleteModalOpen = ref(false)
const deletingItem = ref(null)
const deleting = ref(false)

const cropStyle = computed(() => {
  if (!cropActive.value) return {}
  const x = Math.min(cropStart.value.x, cropEnd.value.x)
  const y = Math.min(cropStart.value.y, cropEnd.value.y)
  const w = Math.abs(cropEnd.value.x - cropStart.value.x)
  const h = Math.abs(cropEnd.value.y - cropStart.value.y)
  return {
    left: x + 'px',
    top: y + 'px',
    width: w + 'px',
    height: h + 'px',
  }
})

async function fetchItems() {
  loading.value = true
  try {
    items.value = await $fetch('/api/merch')
  } finally {
    loading.value = false
  }
}

function openUpload() {
  uploadModalOpen.value = true
  cropping.value = false
  previewUrl.value = ''
  uploadFile.value = null
  cropActive.value = false
}

function closeUpload() {
  uploadModalOpen.value = false
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
  }
}

function resetUpload() {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
  }
  previewUrl.value = ''
  uploadFile.value = null
  cropActive.value = false
  cropping.value = false
}

function onFileSelect(e) {
  const file = e.target.files?.[0]
  if (!file) return
  uploadFile.value = file
  previewUrl.value = URL.createObjectURL(file)

  nextTick(() => {
    const canvas = cropCanvasRef.value
    if (!canvas) return
    const img = new Image()
    img.onload = () => {
      const maxSize = 600
      const scale = Math.min(maxSize / img.width, maxSize / img.height, 1)
      const dw = Math.round(img.width * scale)
      const dh = Math.round(img.height * scale)
      canvas.width = dw
      canvas.height = dh
      cropImageSize.value = { w: img.width, h: img.height }
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, dw, dh)
      cropping.value = true
    }
    img.src = previewUrl.value
  })
}

function onCropMouseDown(e) {
  const rect = cropCanvasRef.value.getBoundingClientRect()
  cropStart.value = { x: e.clientX - rect.left, y: e.clientY - rect.top }
  cropEnd.value = { x: e.clientX - rect.left, y: e.clientY - rect.top }
  cropDragging.value = true
  cropActive.value = true
}

function onCropMouseMove(e) {
  if (!cropDragging.value) return
  const rect = cropCanvasRef.value.getBoundingClientRect()
  cropEnd.value = { x: e.clientX - rect.left, y: e.clientY - rect.top }
}

function onCropMouseUp() {
  cropDragging.value = false
  const w = Math.abs(cropEnd.value.x - cropStart.value.x)
  const h = Math.abs(cropEnd.value.y - cropStart.value.y)
  if (w < 10 || h < 10) {
    cropActive.value = false
  }
}

async function saveItem() {
  if (!uploadFile.value) return
  saving.value = true

  try {
    let cropX = 0, cropY = 0, cropW = 0, cropH = 0

    if (cropActive.value) {
      const canvas = cropCanvasRef.value
      const scaleX = cropImageSize.value.w / canvas.width
      const scaleY = cropImageSize.value.h / canvas.height
      const x = Math.min(cropStart.value.x, cropEnd.value.x)
      const y = Math.min(cropStart.value.y, cropEnd.value.y)
      const w = Math.abs(cropEnd.value.x - cropStart.value.x)
      const h = Math.abs(cropEnd.value.y - cropStart.value.y)
      cropX = Math.round(x * scaleX)
      cropY = Math.round(y * scaleY)
      cropW = Math.round(w * scaleX)
      cropH = Math.round(h * scaleY)
    }

    const formData = new FormData()
    formData.append('file', uploadFile.value)
    formData.append('cropX', String(cropX))
    formData.append('cropY', String(cropY))
    formData.append('cropW', String(cropW))
    formData.append('cropH', String(cropH))

    await $fetch('/api/merch', {
      method: 'POST',
      body: formData,
    })

    closeUpload()
    await fetchItems()
  } catch (err) {
    console.error('Upload failed', err)
  } finally {
    saving.value = false
  }
}

async function moveUp(id) {
  const idx = items.value.findIndex(p => p.id === id)
  if (idx <= 0) return
  const newItems = [...items.value]
  ;[newItems[idx - 1], newItems[idx]] = [newItems[idx], newItems[idx - 1]]
  items.value = newItems
  await $fetch('/api/merch/reorder', {
    method: 'PUT',
    body: { ids: newItems.map(p => p.id) },
  })
}

async function moveDown(id) {
  const idx = items.value.findIndex(p => p.id === id)
  if (idx >= items.value.length - 1) return
  const newItems = [...items.value]
  ;[newItems[idx], newItems[idx + 1]] = [newItems[idx + 1], newItems[idx]]
  items.value = newItems
  await $fetch('/api/merch/reorder', {
    method: 'PUT',
    body: { ids: newItems.map(p => p.id) },
  })
}

function confirmDelete(item) {
  deletingItem.value = item
  deleteModalOpen.value = true
}

async function deleteItem() {
  if (!deletingItem.value) return
  deleting.value = true
  try {
    await $fetch(`/api/merch/${deletingItem.value.id}`, { method: 'DELETE' })
    items.value = items.value.filter(p => p.id !== deletingItem.value.id)
    deleteModalOpen.value = false
  } finally {
    deleting.value = false
    deletingItem.value = null
  }
}

fetchItems()
</script>

<style lang="scss" scoped>
.merch-page {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
  }

  &__title {
    font-size: 22px;
    font-weight: 700;
    margin: 0;
    color: var(--text-primary);
  }

  &__add-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 10px 18px;
    background: var(--accent);
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s;

    &:hover {
      background: var(--accent-hover);
    }
  }

  &__loading {
    text-align: center;
    padding: 60px 0;
    color: var(--text-muted);
    font-size: 14px;
  }

  &__empty {
    text-align: center;
    padding: 60px 20px;
    background: var(--card-bg);
    border-radius: 10px;
    color: var(--text-muted);
    font-size: 14px;
    box-shadow: var(--card-shadow);
  }
}

.merch-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
}

.merch-card {
  background: var(--card-bg);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: var(--card-shadow);

  &__image-wrap {
    width: 100%;
    aspect-ratio: 1;
    overflow: hidden;
    background: #222;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &__info {
    padding: 10px 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__index {
    font-size: 12px;
    color: var(--text-muted);
    font-weight: 500;
  }

  &__actions {
    display: flex;
    border-top: 1px solid var(--table-row-border);
  }

  &__btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    border: none;
    background: none;
    color: var(--text-secondary);
    cursor: pointer;
    font-size: 14px;
    transition: all 0.15s;
    border-right: 1px solid var(--table-row-border);

    &:last-child {
      border-right: none;
    }

    &:hover:not(:disabled) {
      background: var(--link-hover-bg);
      color: var(--text-primary);
    }

    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    &--delete:hover:not(:disabled) {
      background: var(--danger-bg);
      color: var(--danger);
    }
  }
}

.upload-area {
  padding: 40px 20px;

  &__label {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    cursor: pointer;
  }

  &__input {
    display: none;
  }

  &__placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 40px;
    border: 2px dashed var(--table-border);
    border-radius: 10px;
    color: var(--text-muted);
    font-size: 14px;
    transition: border-color 0.15s;

    &:hover {
      border-color: var(--accent);
    }
  }

  &__icon {
    font-size: 32px;
    line-height: 1;
  }
}

.crop-area {
  display: flex;
  flex-direction: column;
  gap: 16px;

  &__canvas-wrap {
    position: relative;
    max-width: 600px;
    margin: 0 auto;
    user-select: none;
  }

  &__canvas {
    display: block;
    max-width: 100%;
    cursor: crosshair;
  }

  &__selector {
    position: absolute;
    border: 2px solid var(--accent);
    background: rgba(59, 130, 246, 0.1);
    pointer-events: none;
  }

  &__hint {
    margin: 0;
    font-size: 12px;
    color: var(--text-muted);
    text-align: center;
  }
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-card {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 28px;
  width: 400px;
  max-width: 90vw;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);

  &--upload {
    width: 660px;
    max-width: 95vw;
  }

  &__title {
    font-size: 17px;
    font-weight: 700;
    margin: 0 0 16px;
    color: var(--text-primary);
  }

  &__text {
    font-size: 14px;
    color: var(--text-secondary);
    margin: 0 0 24px;
    line-height: 1.5;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
  }

  &__btn {
    padding: 9px 20px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: all 0.15s;

    &--cancel {
      background: var(--btn-secondary-bg);
      color: var(--btn-secondary-text);

      &:hover {
        background: var(--btn-secondary-hover);
      }
    }

    &--save {
      background: var(--accent);
      color: #fff;

      &:hover {
        background: var(--accent-hover);
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }

    &--delete {
      background: var(--danger);
      color: #fff;

      &:hover {
        background: var(--danger-hover);
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
  }
}
</style>
