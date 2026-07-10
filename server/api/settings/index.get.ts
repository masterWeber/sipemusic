export default defineEventHandler(async () => {
  const rows = await prisma.siteSetting.findMany()
  const dbValues: Record<string, string> = {}
  for (const row of rows) {
    dbValues[row.key] = row.value
  }

  const defaults = getDefaultSettings()
  const merged: Record<string, string> = {}
  for (const [key, defaultVal] of Object.entries(defaults)) {
    merged[key] = dbValues[key] ?? defaultVal
  }

  return merged
})
