<template>
  <div class="concerts-page">
    <div class="concerts-page__header">
      <h1 class="concerts-page__title">Концерты</h1>
      <button class="concerts-page__add-btn" @click="router.push('/admin/concerts/new')">+ Добавить концерт</button>
    </div>

    <div v-if="loading" class="concerts-page__loading">Загрузка...</div>

    <div v-else-if="concerts.length === 0" class="concerts-page__empty">
      Концертов пока нет. Нажмите «Добавить концерт», чтобы создать первый.
    </div>

    <div v-else class="concerts-table">
      <div class="concerts-table__header">
        <span class="concerts-table__cell concerts-table__cell--date">Дата</span>
        <span class="concerts-table__cell concerts-table__cell--city">Город</span>
        <span class="concerts-table__cell concerts-table__cell--venue">Площадка</span>
        <span class="concerts-table__cell concerts-table__cell--actions"></span>
      </div>
      <div
        v-for="concert in concerts"
        :key="concert.id"
        class="concerts-table__row"
      >
        <span class="concerts-table__cell concerts-table__cell--date">{{ formatDate(concert.date) }}</span>
        <span class="concerts-table__cell concerts-table__cell--city">{{ concert.city }}</span>
        <span class="concerts-table__cell concerts-table__cell--venue">{{ concert.venue }}</span>
        <span class="concerts-table__cell concerts-table__cell--actions">
          <button
            class="concerts-table__action concerts-table__action--edit"
            :aria-label="`Редактировать ${concert.city}`"
            @click="router.push(`/admin/concerts/${concert.id}`)"
          >✎</button>
          <button
            class="concerts-table__action concerts-table__action--delete"
            :aria-label="`Удалить ${concert.city}`"
            @click="confirmDelete(concert)"
          >✕</button>
        </span>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="deleteModalOpen" class="modal-overlay" @click.self="deleteModalOpen = false">
        <div class="modal-card">
          <h2 class="modal-card__title">Удалить концерт</h2>
          <p class="modal-card__text">
            Вы уверены, что хотите удалить концерт в городе <strong>{{ deletingConcert?.city }}</strong>?
          </p>
          <div class="modal-card__actions">
            <button class="modal-card__btn modal-card__btn--cancel" @click="deleteModalOpen = false">Отмена</button>
            <button class="modal-card__btn modal-card__btn--delete" :disabled="deleting" @click="deleteConcert">
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

useHead({ title: 'Концерты' })

const router = useRouter()
const concerts = ref([])
const loading = ref(true)
const deleteModalOpen = ref(false)
const deletingConcert = ref(null)
const deleting = ref(false)

async function fetchConcerts() {
  loading.value = true
  try {
    concerts.value = await $fetch('/api/concerts')
  } finally {
    loading.value = false
  }
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function confirmDelete(concert) {
  deletingConcert.value = concert
  deleteModalOpen.value = true
}

async function deleteConcert() {
  if (!deletingConcert.value) return
  deleting.value = true
  try {
    await $fetch(`/api/concerts/${deletingConcert.value.id}`, { method: 'DELETE' })
    concerts.value = concerts.value.filter(c => c.id !== deletingConcert.value.id)
    deleteModalOpen.value = false
  } finally {
    deleting.value = false
    deletingConcert.value = null
  }
}

fetchConcerts()
</script>

<style lang="scss" scoped>
.concerts-page {
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

.concerts-table {
  background: var(--card-bg);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: var(--card-shadow);

  &__header {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 80px;
    padding: 14px 20px;
    background: var(--table-header-bg);
    border-bottom: 1px solid var(--table-border);
  }

  &__row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 80px;
    padding: 14px 20px;
    border-bottom: 1px solid var(--table-row-border);
    align-items: center;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background: var(--table-row-hover);
    }
  }

  &__cell {
    font-size: 14px;
    color: var(--text-primary);

    &--date {
      font-weight: 500;
    }

    &--actions {
      display: flex;
      gap: 6px;
      justify-content: flex-end;
    }
  }

  &__action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.15s;

    &--edit {
      background: var(--btn-secondary-bg);
      color: var(--btn-secondary-text);

      &:hover {
        background: var(--btn-secondary-hover);
        color: var(--accent);
      }
    }

    &--delete {
      background: var(--danger-bg);
      color: var(--danger);

      &:hover {
        background: var(--danger-hover-bg);
      }
    }
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

  &__title {
    font-size: 17px;
    font-weight: 700;
    margin: 0 0 12px;
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
