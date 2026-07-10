export default defineEventHandler(async (event) => {
  const user = await getAuthenticatedUser(event)
  if (!user) {
    throw createError({ statusCode: 401, message: 'Not authenticated' })
  }

  const body = await readBody(event)
  const ids = body.ids as string[]

  if (!Array.isArray(ids)) {
    throw createError({ statusCode: 400, message: 'ids array is required' })
  }

  await prisma.$transaction(
    ids.map((id, index) =>
      prisma.aboutPhoto.update({
        where: { id },
        data: { order: index },
      })
    )
  )

  return { success: true }
})
