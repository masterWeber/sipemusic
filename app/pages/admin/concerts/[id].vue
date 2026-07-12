<template>
  <div class="concert-form">
    <h1 class="concert-form__title">Редактировать концерт</h1>

    <div v-if="!loading" class="concert-form__card">
      <form class="concert-form__body" @submit.prevent="save">
        <div class="concert-form__field">
          <label class="concert-form__label" for="date">Дата</label>
          <input
            id="date"
            v-model="form.date"
            class="concert-form__input"
            type="date"
            required
          />
        </div>

        <div class="concert-form__field">
          <label class="concert-form__label" for="time">Время</label>
          <input
            id="time"
            v-model="form.time"
            class="concert-form__input"
            type="time"
          />
        </div>

        <div class="concert-form__field concert-form__field--inline">
          <label class="concert-form__checkbox-label">
            <input
              v-model="form.showTime"
              class="concert-form__checkbox"
              type="checkbox"
            />
            Показывать время на сайте
          </label>
        </div>

        <div class="concert-form__field">
          <label class="concert-form__label" for="city">Город</label>
          <input
            id="city"
            v-model="form.city"
            class="concert-form__input"
            type="text"
            required
          />
        </div>

        <div class="concert-form__field">
          <label class="concert-form__label" for="venue">Площадка</label>
          <input
            id="venue"
            v-model="form.venue"
            class="concert-form__input"
            type="text"
            required
          />
        </div>

        <div class="concert-form__field">
          <label class="concert-form__label" for="ticketUrl">Ссылка на билеты</label>
          <input
            id="ticketUrl"
            v-model="form.ticketUrl"
            class="concert-form__input"
            type="url"
            placeholder="https://"
          />
        </div>

        <div class="concert-form__actions">
          <button class="concert-form__btn concert-form__btn--cancel" type="button" @click="router.push('/admin/concerts')">Отмена</button>
          <button class="concert-form__btn concert-form__btn--save" type="submit" :disabled="saving">
            {{ saving ? 'Сохранение...' : 'Сохранить' }}
          </button>
        </div>
      </form>
    </div>

    <div v-else class="concert-form__loading">Загрузка...</div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

useHead({ title: 'Редактировать концерт' })

const router = useRouter()
const route = useRoute()
const saving = ref(false)
const loading = ref(true)

const form = reactive({
  date: '',
  time: '',
  showTime: false,
  city: '',
  venue: '',
  ticketUrl: '',
})

async function loadConcert() {
  const concerts = await $fetch('/api/concerts')
  const concert = concerts.find(c => c.id === route.params.id)
  if (!concert) {
    return router.push('/admin/concerts')
  }
  form.date = concert.date.slice(0, 10)
  form.time = concert.time || '18:00'
  form.showTime = concert.showTime ?? false
  form.city = concert.city
  form.venue = concert.venue
  form.ticketUrl = concert.ticketUrl || ''
  loading.value = false
}

async function save() {
  if (!form.date || !form.city || !form.venue) return
  saving.value = true
  try {
    await $fetch(`/api/concerts/${route.params.id}`, {
      method: 'PUT',
      body: form,
    })
    router.push('/admin/concerts')
  } finally {
    saving.value = false
  }
}

loadConcert()
</script>

<style lang="scss" scoped>
.concert-form {
  max-width: 520px;

  &__title {
    font-size: 22px;
    font-weight: 700;
    margin: 0 0 24px;
    color: var(--text-primary);
  }

  &__card {
    background: var(--card-bg);
    border-radius: 10px;
    box-shadow: var(--card-shadow);
  }

  &__body {
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 6px;

    &--inline {
      flex-direction: row;
      align-items: center;
    }
  }

  &__label {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-primary);
  }

  &__input {
    padding: 10px 14px;
    background: var(--card-bg);
    color: var(--text-primary);
    border: 1px solid var(--input-border);
    border-radius: 8px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;

    &:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 3px var(--input-focus-ring);
    }

    &::placeholder {
      color: var(--input-placeholder);
    }
  }

  &__checkbox {
    accent-color: var(--accent);
  }

  &__checkbox-label {
    font-size: 14px;
    color: var(--text-primary);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding-top: 6px;
  }

  &__btn {
    padding: 10px 22px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    display: inline-flex;
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
  }

  &__loading {
    text-align: center;
    padding: 60px 0;
    color: var(--text-muted);
    font-size: 14px;
  }
}
</style>
