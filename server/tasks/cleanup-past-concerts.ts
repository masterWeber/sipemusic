export default defineTask({
  meta: {
    name: 'cleanup-past-concerts',
    description: 'Удаляет прошедшие концерты из базы данных',
  },
  async run() {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const { count } = await prisma.concert.deleteMany({
      where: {
        date: { lt: today },
      },
    })

    console.log(`[cron] Удалено ${count} прошедших концертов`)
    return { result: { deleted: count } }
  },
})
