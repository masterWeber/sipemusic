import { unlinkSync } from 'fs'
import { resolve } from 'path'

export default defineEventHandler(async (event) => {
  const user = await getAuthenticatedUser(event)
  if (!user) {
    throw createError({ statusCode: 401, message: 'Not authenticated' })
  }

  const id = getRouterParam(event, 'id')

  const item = await prisma.merchItem.findUnique({ where: { id } })
  if (!item) {
    throw createError({ statusCode: 404, message: 'Item not found' })
  }

  const filename = item.image.replace('/merch/', '')
  try {
    unlinkSync(resolve(process.cwd(), 'uploads', filename))
  } catch {}

  await prisma.merchItem.delete({ where: { id } })

  return { success: true }
})
