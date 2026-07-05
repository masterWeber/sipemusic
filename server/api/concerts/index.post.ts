export default defineEventHandler(async (event) => {
  const user = await getAuthenticatedUser(event)
  if (!user) {
    throw createError({ statusCode: 401, message: 'Not authenticated' })
  }

  const body = await readBody(event)

  if (!body.date || !body.city || !body.venue) {
    throw createError({ statusCode: 400, message: 'Date, city, and venue are required' })
  }

  const concert = await prisma.concert.create({
    data: {
      date: new Date(body.date),
      city: body.city,
      venue: body.venue,
      ticketUrl: body.ticketUrl || null,
    },
  })

  return concert
})
