import { createReadStream } from 'fs'
import { join, resolve } from 'path'
import { stat } from 'fs/promises'

const uploadDir = resolve(process.cwd(), 'uploads')

export default defineEventHandler(async (event) => {
  const path = getRouterParam(event, 'path')
  if (!path) {
    throw createError({ statusCode: 400, message: 'No path provided' })
  }

  const filePath = join(uploadDir, path)
  try {
    const fileStat = await stat(filePath)
    if (!fileStat.isFile()) {
      throw createError({ statusCode: 404, message: 'Not found' })
    }
  } catch {
    throw createError({ statusCode: 404, message: 'Not found' })
  }

  setResponseHeader(event, 'Content-Type', 'image/webp')
  setResponseHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')

  return sendStream(event, createReadStream(filePath))
})
