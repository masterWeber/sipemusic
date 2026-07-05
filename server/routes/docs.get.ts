export default defineEventHandler((event) => {
  const docsUrl = process.env.DOCS_URL || '/'
  return sendRedirect(event, docsUrl, 302)
})
