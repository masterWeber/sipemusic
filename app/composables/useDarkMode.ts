export const useDarkMode = () => {
  const isDark = ref(false)

  onMounted(() => {
    const stored = localStorage.getItem('admin-dark-mode')
    if (stored !== null) {
      isDark.value = stored === 'true'
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
  })

  watch(isDark, (val) => {
    if (import.meta.client) {
      localStorage.setItem('admin-dark-mode', String(val))
    }
  })

  function toggle() {
    isDark.value = !isDark.value
  }

  return { isDark, toggle }
}
