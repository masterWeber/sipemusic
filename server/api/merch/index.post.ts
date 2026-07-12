import sharp from 'sharp'
import { mkdirSync } from 'fs'
import { resolve } from 'path'

export default defineEventHandler(async (event) => {
  const user = await getAuthenticatedUser(event)
  if (!user) {
    throw createError({ statusCode: 401, message: 'Not authenticated' })
  }

  const body = await readMultipartFormData(event)
  if (!body) {
    throw createError({ statusCode: 400, message: 'No data received' })
  }

  const fileField = body.find(f => f.name === 'file')
  if (!fileField || !fileField.data) {
    throw createError({ statusCode: 400, message: 'File is required' })
  }

  const cropX = Number(body.find(f => f.name === 'cropX')?.data?.toString() || 0)
  const cropY = Number(body.find(f => f.name === 'cropY')?.data?.toString() || 0)
  const cropW = Number(body.find(f => f.name === 'cropW')?.data?.toString() || 0)
  const cropH = Number(body.find(f => f.name === 'cropH')?.data?.toString() || 0)

  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.webp`
  const publicPath = `/merch/${filename}`
  const dir = resolve(process.cwd(), 'uploads')
  mkdirSync(dir, { recursive: true })
  const filePath = resolve(dir, filename)

  let pipeline = sharp(fileField.data)

  if (cropW > 0 && cropH > 0) {
    pipeline = pipeline.extract({
      left: Math.round(cropX),
      top: Math.round(cropY),
      width: Math.round(cropW),
      height: Math.round(cropH),
    })
  }

  await pipeline
    .resize(800, 1035, { fit: 'cover', position: 'centre' })
    .webp({ quality: 90 })
    .toFile(filePath)

  const maxOrder = await prisma.merchItem.aggregate({ _max: { order: true } })
  const nextOrder = (maxOrder._max.order ?? -1) + 1

  const item = await prisma.merchItem.create({
    data: {
      image: publicPath,
      order: nextOrder,
    },
  })

  return item
})
