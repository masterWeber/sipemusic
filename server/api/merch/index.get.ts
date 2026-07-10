export default defineEventHandler(async () => {
  const items = await prisma.merchItem.findMany({
    orderBy: { order: 'asc' },
  })
  return items
})
