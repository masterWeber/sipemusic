export default defineEventHandler(async () => {
  const concerts = await prisma.concert.findMany({
    orderBy: { date: 'asc' },
  })
  return concerts
})
