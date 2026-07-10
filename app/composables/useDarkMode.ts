export const useDarkMode = () => {
  const isDark = ref(false)

  function syncHtmlClass(val: boolean) {
    if (import.meta.client) {
      document.documentElement.classList.toggle('theme-dark', val)
    }
  }

  onMounted(() => {
    const stored = localStorage.getItem('admin-dark-mode')
    if (stored !== null) {
      isDark.value = stored === 'true'
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    syncHtmlClass(isDark.value)
  })

  watch(isDark, (val) => {
    if (import.meta.client) {
      localStorage.setItem('admin-dark-mode', String(val))
      syncHtmlClass(val)
    }
  })

  function toggle() {
    isDark.value = !isDark.value
  }

  return { isDark, toggle }
}
