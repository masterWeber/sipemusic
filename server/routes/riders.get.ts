export default defineEventHandler((event) => {
  const ridersUrl = process.env.RIDERS_URL || '/'
  return sendRedirect(event, ridersUrl, 302)
})
