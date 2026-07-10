export default defineEventHandler(async (event) => {
  const user = await getAuthenticatedUser(event)
  if (!user) {
    throw createError({ statusCode: 401, message: 'Not authenticated' })
  }

  const id = getRouterParam(event, 'id')

  const photo = await prisma.aboutPhoto.findUnique({ where: { id } })
  if (!photo) {
    throw createError({ statusCode: 404, message: 'Photo not found' })
  }

  const filePath = `public${photo.image}`
  try {
    await unlink(filePath)
  } catch {
    // file might not exist
  }

  await prisma.aboutPhoto.delete({ where: { id } })

  return { success: true }
})
