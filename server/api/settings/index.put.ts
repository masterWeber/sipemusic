export default defineEventHandler(async (event) => {
  const user = await getAuthenticatedUser(event)
  if (!user) {
    throw createError({ statusCode: 401, message: 'Not authenticated' })
  }

  const body = await readBody<Record<string, string>>(event)

  if (!body || typeof body !== 'object') {
    throw createError({ statusCode: 400, message: 'Invalid body' })
  }

  const defaults = getDefaultSettings()

  for (const [key, value] of Object.entries(body)) {
    if (!(key in defaults)) continue
    await prisma.siteSetting.upsert({
      where: { key },
      create: { key, value },
      update: { value },
    })
  }

  return { success: true }
})
