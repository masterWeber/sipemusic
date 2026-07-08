<template>
  <div class="admin-layout" :class="{ 'admin-layout--dark': isDark }">
    <aside
      class="admin-layout__sidebar"
      :class="{ 'admin-layout__sidebar--collapsed': collapsed, 'admin-layout__sidebar--hovered': hovered }"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
    >
      <div class="admin-layout__sidebar-header">
        <div class="admin-layout__logo">S</div>
        <span v-if="!collapsed || hovered" class="admin-layout__title">SIPE Admin</span>
      </div>
      <nav class="admin-layout__nav" aria-label="Панель навигации">
        <NuxtLink
          to="/admin/concerts"
          class="admin-layout__link"
          :class="{ 'admin-layout__link--active': isConcertsPage }"
        >
          <span class="admin-layout__link-icon">♪</span>
          <span v-if="!collapsed || hovered" class="admin-layout__link-text">Концерты</span>
        </NuxtLink>
      </nav>
      <div class="admin-layout__sidebar-footer">
        <button class="admin-layout__link" @click="toggle">
          <span class="admin-layout__link-icon">{{ isDark ? '☀' : '☾' }}</span>
          <span v-if="!collapsed || hovered" class="admin-layout__link-text">{{ isDark ? 'Светлая тема' : 'Тёмная тема' }}</span>
        </button>
        <button class="admin-layout__link admin-layout__link--logout" @click="logout">
          <span class="admin-layout__link-icon">⏻</span>
          <span v-if="!collapsed || hovered" class="admin-layout__link-text">Выйти</span>
        </button>
      </div>
    </aside>
    <button
      class="admin-layout__toggle"
      :style="{ left: toggleLeft + 'px' }"
      @click="collapsed = !collapsed"
      :aria-label="collapsed ? 'Развернуть панель' : 'Свернуть панель'"
    >
      {{ collapsed ? '→' : '←' }}
    </button>
    <main id="main-content" class="admin-layout__content">
      <div class="admin-layout__page">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const collapsed = ref(false)
const hovered = ref(false)
const { isDark, toggle } = useDarkMode()

const isConcertsPage = computed(() => route.path.startsWith('/admin/concerts'))

const toggleLeft = computed(() => {
  if (!collapsed.value) return 240
  if (hovered.value) return 240
  return 60
})

async function logout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  router.push('/admin/login')
}
</script>

<style lang="scss">
.admin-layout {
  --bg: #f0f2f5;
  --sidebar-bg: #fff;
  --sidebar-border: #e5e7eb;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --text-muted: #9ca3af;
  --accent: #3b82f6;
  --accent-hover: #2563eb;
  --danger: #ef4444;
  --danger-hover: #dc2626;
  --card-bg: #fff;
  --card-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  --table-row-hover: #f9fafb;
  --table-header-bg: #f9fafb;
  --table-border: #e5e7eb;
  --table-row-border: #f3f4f6;
  --input-border: #d1d5db;
  --input-focus-ring: rgba(59, 130, 246, 0.1);
  --input-placeholder: #bbb;
  --btn-secondary-bg: #f3f4f6;
  --btn-secondary-hover: #e5e7eb;
  --btn-secondary-text: #6b7280;
  --link-active-bg: #eff6ff;
  --link-hover-bg: #f3f4f6;
  --danger-bg: #fef2f2;
  --danger-hover-bg: #fee2e2;
  --toggle-bg: #fff;
  --toggle-border: #e5e7eb;
  --toggle-color: #9ca3af;
  --toggle-hover: #3b82f6;

  &--dark {
    --bg: #111827;
    --sidebar-bg: #1f2937;
    --sidebar-border: #374151;
    --text-primary: #f3f4f6;
    --text-secondary: #9ca3af;
    --text-muted: #6b7280;
    --accent: #60a5fa;
    --accent-hover: #3b82f6;
    --danger: #f87171;
    --danger-hover: #ef4444;
    --card-bg: #1f2937;
    --card-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    --table-row-hover: #374151;
    --table-header-bg: #374151;
    --table-border: #374151;
    --table-row-border: #374151;
    --input-border: #4b5563;
    --input-focus-ring: rgba(96, 165, 250, 0.2);
    --input-placeholder: #6b7280;
    --btn-secondary-bg: #374151;
    --btn-secondary-hover: #4b5563;
    --btn-secondary-text: #9ca3af;
    --link-active-bg: #1e3a5f;
    --link-hover-bg: #374151;
    --danger-bg: #3b1c1c;
    --danger-hover-bg: #4b2222;
    --toggle-bg: #1f2937;
    --toggle-border: #374151;
    --toggle-color: #6b7280;
    --toggle-hover: #60a5fa;
  }

  display: flex;
  min-height: 100vh;
  background: var(--bg);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  &__sidebar {
    width: 240px;
    min-width: 240px;
    background: var(--sidebar-bg);
    border-right: 1px solid var(--sidebar-border);
    display: flex;
    flex-direction: column;
    transition: width 0.2s, min-width 0.2s;
    flex-shrink: 0;
    overflow: hidden;

    &--collapsed {
      width: 60px;
      min-width: 60px;
    }

    &--collapsed#{&}--hovered {
      width: 240px;
      min-width: 240px;
    }
  }

  &__sidebar-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 20px 16px;
    border-bottom: 1px solid var(--sidebar-border);
    white-space: nowrap;
  }

  &__logo {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: var(--accent);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 16px;
    flex-shrink: 0;
  }

  &__title {
    font-size: 15px;
    font-weight: 700;
    color: var(--text-primary);
    white-space: nowrap;
  }

  &__toggle {
    position: fixed;
    top: 20px;
    z-index: 10;
    width: 24px;
    height: 24px;
    border-radius: 0 6px 6px 0;
    background: var(--toggle-bg);
    border: 1px solid var(--toggle-border);
    border-left: none;
    color: var(--toggle-color);
    cursor: pointer;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    transition: left 0.2s, color 0.15s;

    &:hover {
      color: var(--toggle-hover);
    }
  }

  &__nav {
    flex: 1;
    padding: 12px 8px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__link {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 8px;
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.15s;
    cursor: pointer;
    background: none;
    border: none;
    width: 100%;
    text-align: left;
    white-space: nowrap;

    &:hover {
      background: var(--link-hover-bg);
      color: var(--text-primary);
    }

    &--active {
      background: var(--link-active-bg);
      color: var(--accent);
      font-weight: 600;
    }

    &--logout {
      &:hover {
        background: var(--danger-bg);
        color: var(--danger);
      }
    }
  }

  &__link-icon {
    font-size: 16px;
    width: 20px;
    text-align: center;
    flex-shrink: 0;
  }

  &__link-text {
    white-space: nowrap;
  }

  &__sidebar-footer {
    padding: 12px 8px;
    border-top: 1px solid var(--sidebar-border);
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__content {
    flex: 1;
    overflow-x: hidden;
  }

  &__page {
    padding: 32px;
    max-width: 960px;
    color: var(--text-primary);
  }
}
</style>
