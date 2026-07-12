import { PrismaClient } from '@prisma/client'
import { existsSync } from 'fs'
import { resolve } from 'path'

const datasourceUrl = process.env.DATABASE_URL || (() => {
  for (const p of [
    resolve(process.cwd(), 'server/db.sqlite'),
    resolve(process.cwd(), 'db.sqlite'),
    resolve(process.cwd(), 'prisma/dev.db'),
  ]) {
    if (existsSync(p)) return `file:${p}`
  }
  return undefined
})()

const prisma = new PrismaClient({ datasourceUrl })

export default prisma
