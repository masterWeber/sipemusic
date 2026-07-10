<template>
  <div class="settings-page">
    <div class="settings-page__header">
      <h1 class="settings-page__title">Настройки сайта</h1>
      <button class="settings-page__save-btn" :disabled="saving" @click="save">
        {{ saving ? 'Сохранение...' : 'Сохранить' }}
      </button>
    </div>

    <div v-if="saved" class="settings-page__toast">Настройки сохранены</div>

    <div v-if="loading" class="settings-page__loading">Загрузка...</div>

    <template v-else>
      <div v-for="group in groups" :key="group.name" class="settings-group">
        <h2 class="settings-group__title">{{ group.name }}</h2>
        <div class="settings-group__fields">
          <div v-for="def in group.fields" :key="def.key" class="settings-field">
            <label class="settings-field__label">{{ def.label }}</label>
            <textarea
              v-if="def.type === 'textarea'"
              v-model="form[def.key]"
              class="settings-field__input settings-field__input--textarea"
              rows="4"
            ></textarea>
            <input
              v-else
              v-model="form[def.key]"
              class="settings-field__input"
              :type="def.type === 'email' ? 'email' : 'text'"
            >
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

useHead({ title: 'Настройки' })

const form = ref({})
const loading = ref(true)
const saving = ref(false)
const saved = ref(false)

const groups = [
  {
    name: 'Социальные сети',
    fields: [
      { key: 'social_telegram', label: 'Telegram', type: 'url' },
      { key: 'social_instagram', label: 'Instagram', type: 'url' },
      { key: 'social_youtube', label: 'YouTube', type: 'url' },
      { key: 'social_vk', label: 'VK', type: 'url' },
    ],
  },
  {
    name: 'Музыкальные платформы',
    fields: [
      { key: 'music_youtube', label: 'YouTube Music', type: 'url' },
      { key: 'music_yandex', label: 'Yandex Music', type: 'url' },
      { key: 'music_apple', label: 'Apple Music', type: 'url' },
      { key: 'music_spotify', label: 'Spotify', type: 'url' },
      { key: 'music_zvuk', label: 'Zvuk', type: 'url' },
    ],
  },
  {
    name: 'Контакты',
    fields: [
      { key: 'contact_email', label: 'Email для бронирования', type: 'email' },
      { key: 'contact_email_label', label: 'Текст подписи email', type: 'text' },
    ],
  },
  {
    name: 'Поддержка',
    fields: [
      { key: 'support_url', label: 'Ссылка для донатов', type: 'url' },
      { key: 'support_text', label: 'Текст ссылки донатов', type: 'text' },
      { key: 'support_label', label: 'Заголовок блока донатов', type: 'text' },
    ],
  },
  {
    name: 'Мерч',
    fields: [
      { key: 'merch_buy_url', label: 'Ссылка «Купить»', type: 'url' },
      { key: 'merch_buy_text', label: 'Текст кнопки «Купить»', type: 'text' },
    ],
  },
  {
    name: 'Сайт',
    fields: [
      { key: 'site_url', label: 'URL сайта', type: 'url' },
      { key: 'site_copyright', label: 'Копирайт', type: 'text' },
      { key: 'site_tagline', label: 'Слоган', type: 'text' },
      { key: 'site_description', label: 'Описание сайта (SEO)', type: 'textarea' },
    ],
  },
  {
    name: 'Hero',
    fields: [
      { key: 'hero_title', label: 'Заголовок Hero', type: 'text' },
      { key: 'hero_subtitle', label: 'Подзаголовок Hero', type: 'text' },
    ],
  },
  {
    name: 'О проекте',
    fields: [
      { key: 'about_text', label: 'Текст раздела «О проекте»', type: 'textarea' },
    ],
  },
  {
    name: 'Документы',
    fields: [
      { key: 'docs_url', label: 'Ссылка «Документация»', type: 'url' },
      { key: 'riders_url', label: 'Ссылка «Райдеры»', type: 'url' },
    ],
  },
]

async function load() {
  loading.value = true
  try {
    const data = await $fetch('/api/settings')
    form.value = { ...data }
  } finally {
    loading.value = false
  }
}

async function save() {
  saving.value = true
  saved.value = false
  try {
    await $fetch('/api/settings', {
      method: 'PUT',
      body: form.value,
    })
    saved.value = true
    setTimeout(() => { saved.value = false }, 3000)
  } finally {
    saving.value = false
  }
}

load()
</script>

<style lang="scss" scoped>
.settings-page {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
    gap: 16px;
    flex-wrap: wrap;
  }

  &__title {
    font-size: 22px;
    font-weight: 700;
    margin: 0;
    color: var(--text-primary);
  }

  &__save-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 10px 24px;
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

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  &__loading {
    text-align: center;
    padding: 60px 0;
    color: var(--text-muted);
    font-size: 14px;
  }

  &__toast {
    padding: 10px 16px;
    background: #16a34a;
    color: #fff;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 20px;
    display: inline-block;
  }
}

.settings-group {
  background: var(--card-bg);
  border-radius: 10px;
  padding: 24px;
  box-shadow: var(--card-shadow);
  margin-bottom: 20px;

  &__title {
    font-size: 15px;
    font-weight: 700;
    margin: 0 0 16px;
    color: var(--text-primary);
    padding-bottom: 12px;
    border-bottom: 1px solid var(--table-row-border);
  }

  &__fields {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
}

.settings-field {
  display: flex;
  flex-direction: column;
  gap: 4px;

  &__label {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  &__input {
    padding: 10px 12px;
    border: 1px solid var(--input-border);
    border-radius: 6px;
    font-size: 14px;
    background: var(--card-bg);
    color: var(--text-primary);
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
    font-family: var(--font-main);

    &:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 3px var(--input-focus-ring);
    }

    &--textarea {
      resize: vertical;
      min-height: 80px;
      line-height: 1.5;
    }
  }
}
</style>
