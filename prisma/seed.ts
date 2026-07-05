import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@sipemusic.com'
  const password = process.env.ADMIN_PASSWORD || 'admin123'

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    console.log('Admin user already exists')
    return
  }

  await prisma.user.create({
    data: {
      email,
      password: await bcrypt.hash(password, 10),
      name: 'Admin',
    },
  })

  console.log(`Admin user created: ${email}`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
