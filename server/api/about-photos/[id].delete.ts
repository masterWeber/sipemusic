import { unlinkSync } from 'fs'
import { resolve } from 'path'

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

  const filename = photo.image.replace('/about-photos/', '')
  try {
    unlinkSync(resolve(process.cwd(), 'uploads', filename))
  } catch {}

  await prisma.aboutPhoto.delete({ where: { id } })

  return { success: true }
})
