export default defineEventHandler(async () => {
  const photos = await prisma.aboutPhoto.findMany({
    orderBy: { order: 'asc' },
  })
  return photos
})
