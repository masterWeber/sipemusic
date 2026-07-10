export function useSiteSettings() {
  const { data } = useAsyncData<Record<string, string>>('site-settings', () =>
    $fetch('/api/settings'),
    {
      default: () => ({}),
    }
  )

  return {
    settings: data,
  }
}
