import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export function generateToken(userId: string) {
  const config = useRuntimeConfig()
  return jwt.sign({ userId }, config.authSecret, { expiresIn: '7d' })
}

export function verifyToken(token: string) {
  try {
    const config = useRuntimeConfig()
    return jwt.verify(token, config.authSecret) as { userId: string }
  } catch {
    return null
  }
}

export function getTokenFromEvent(event: H3Event) {
  return getCookie(event, 'auth_token') || null
}

export async function getAuthenticatedUser(event: H3Event) {
  const token = getTokenFromEvent(event)
  if (!token) return null

  const payload = verifyToken(token)
  if (!payload) return null

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, email: true, name: true },
  })

  return user
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10)
}
