export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === '/admin/login') return

  if (import.meta.server) {
    const headers = useRequestHeaders(['cookie'])
    if (!headers.cookie?.includes('auth_token=')) {
      return navigateTo('/admin/login')
    }
    return
  }

  try {
    await $fetch('/api/auth/me')
  } catch {
    return navigateTo('/admin/login')
  }
})
