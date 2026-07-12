export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  return sendRedirect(event, config.docsUrl || '/', 302)
})
