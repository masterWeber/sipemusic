<template>
  <main id="main-content" class="login-page" :class="{ 'login-page--dark': isDark }">
    <div class="login-card">
      <div class="login-card__header">
        <div class="login-card__logo">S</div>
        <h1 class="login-card__title">SIPE Admin</h1>
        <p class="login-card__subtitle">Войдите в панель управления</p>
      </div>

      <form class="login-card__form" @submit.prevent="login">
        <div class="login-card__field">
          <label class="login-card__label" for="email">Email</label>
          <input
            id="email"
            v-model="form.email"
            class="login-card__input"
            type="email"
            placeholder="admin@sipemusic.com"
          />
        </div>

        <div class="login-card__field">
          <label class="login-card__label" for="password">Пароль</label>
          <input
            id="password"
            v-model="form.password"
            class="login-card__input"
            type="password"
            placeholder="••••••••"
          />
        </div>

        <div class="login-card__theme-toggle">
          <button class="login-card__theme-btn" type="button" @click="toggle">
            {{ isDark ? '☀ Светлая тема' : '☾ Тёмная тема' }}
          </button>
        </div>

        <button class="login-card__submit" type="submit" :disabled="loading">
          {{ loading ? 'Вход...' : 'Войти' }}
        </button>
      </form>

      <p v-if="error" class="login-card__error">{{ error }}</p>
    </div>
  </main>
</template>

<script setup>
definePageMeta({ layout: false })

useHead({ title: 'Admin Login' })

const router = useRouter()
const { isDark, toggle } = useDarkMode()
const form = reactive({ email: '', password: '' })
const loading = ref(false)
const error = ref('')

async function login() {
  loading.value = true
  error.value = ''

  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: form,
    })
    router.push('/admin/concerts')
  } catch {
    error.value = 'Неверный email или пароль'
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  --login-bg: #f0f2f5;
  --login-card-bg: #fff;
  --login-text: #1f2937;
  --login-subtitle: #9ca3af;
  --login-label: #374151;
  --login-input-border: #d1d5db;
  --login-input-focus: rgba(59, 130, 246, 0.1);
  --login-placeholder: #bbb;
  --login-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  --accent: #3b82f6;
  --accent-hover: #2563eb;
  --danger: #ef4444;

  &--dark {
    --login-bg: #111827;
    --login-card-bg: #1f2937;
    --login-text: #f3f4f6;
    --login-subtitle: #6b7280;
    --login-label: #f3f4f6;
    --login-input-border: #4b5563;
    --login-input-focus: rgba(96, 165, 250, 0.2);
    --login-placeholder: #6b7280;
    --login-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    --accent: #60a5fa;
    --accent-hover: #3b82f6;
    --danger: #f87171;
  }

  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--login-bg);
  font-family: var(--font-main);
}

.login-card {
  width: 100%;
  max-width: 380px;
  background: var(--login-card-bg);
  border-radius: 12px;
  padding: 40px 32px 32px;
  box-shadow: var(--login-shadow);

  &__header {
    text-align: center;
    margin-bottom: 28px;
  }

  &__logo {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: var(--accent);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 18px;
    margin: 0 auto 16px;
  }

  &__title {
    font-size: 22px;
    font-weight: 700;
    color: var(--login-text);
    margin: 0 0 6px;
  }

  &__subtitle {
    font-size: 14px;
    color: var(--login-subtitle);
    margin: 0;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__theme-toggle {
    text-align: center;
  }

  &__theme-btn {
    background: none;
    border: none;
    color: var(--login-subtitle);
    font-size: 13px;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 6px;
    transition: color 0.15s, background 0.15s;

    &:hover {
      color: var(--accent);
      background: rgba(59, 130, 246, 0.08);
    }
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  &__label {
    font-size: 13px;
    font-weight: 600;
    color: var(--login-label);
  }

  &__input {
    padding: 10px 14px;
    background: var(--login-card-bg);
    color: var(--login-text);
    border: 1px solid var(--login-input-border);
    border-radius: 8px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;

    &:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 3px var(--login-input-focus);
    }

    &::placeholder {
      color: var(--login-placeholder);
    }
  }

  &__submit {
    padding: 12px;
    background: var(--accent);
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 14px;
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

  &__error {
    text-align: center;
    color: var(--danger);
    font-size: 13px;
    margin: 16px 0 0;
  }
}
</style>
