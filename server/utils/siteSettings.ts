export interface SettingDef {
  key: string
  label: string
  type: 'text' | 'url' | 'email' | 'textarea'
  group: string
  defaultValue: string
}

export const settingsDef: SettingDef[] = [
  // Social links
  { key: 'social_telegram', label: 'Telegram', type: 'url', group: 'Социальные сети', defaultValue: 'https://t.me/sipemusic' },
  { key: 'social_instagram', label: 'Instagram', type: 'url', group: 'Социальные сети', defaultValue: 'https://www.instagram.com/sipe_music' },
  { key: 'social_youtube', label: 'YouTube', type: 'url', group: 'Социальные сети', defaultValue: 'https://www.youtube.com/@Sipemusic' },
  { key: 'social_vk', label: 'VK', type: 'url', group: 'Социальные сети', defaultValue: 'https://vk.com/sipe_music' },

  // Music platforms
  { key: 'music_youtube', label: 'YouTube Music', type: 'url', group: 'Музыкальные платформы', defaultValue: 'https://music.youtube.com/channel/UCirM3qiKXGcvl6E1QzMURMw?si=sug158qkqSKm-O6E' },
  { key: 'music_yandex', label: 'Yandex Music', type: 'url', group: 'Музыкальные платформы', defaultValue: 'https://music.yandex.ru/artist/984216' },
  { key: 'music_apple', label: 'Apple Music', type: 'url', group: 'Музыкальные платформы', defaultValue: 'https://music.apple.com/ru/artist/sipe/524775020' },
  { key: 'music_spotify', label: 'Spotify', type: 'url', group: 'Музыкальные платформы', defaultValue: 'https://open.spotify.com/artist/0uK6MWFA6CV1nOTv5PPqt3?si=XcqN3CAzSZOBWhXgj_kxGg' },
  { key: 'music_zvuk', label: 'Zvuk', type: 'url', group: 'Музыкальные платформы', defaultValue: 'https://zvuk.com/artist/3162035' },

  // Contacts
  { key: 'contact_email', label: 'Email для бронирования', type: 'email', group: 'Контакты', defaultValue: 'sipe.booking@gmail.com' },
  { key: 'contact_email_label', label: 'Текст подписи email', type: 'text', group: 'Контакты', defaultValue: 'концерты / сотрудничество' },

  // Support
  { key: 'support_url', label: 'Ссылка для донатов', type: 'url', group: 'Поддержка', defaultValue: 'https://tips.yandex.ru/guest/payment/8215730' },
  { key: 'support_text', label: 'Текст ссылки донатов', type: 'text', group: 'Поддержка', defaultValue: 'Яндекс Чаевые' },
  { key: 'support_label', label: 'Заголовок блока донатов', type: 'text', group: 'Поддержка', defaultValue: 'Поддержать проект' },

  // Merch
  { key: 'merch_buy_url', label: 'Ссылка «Купить»', type: 'url', group: 'Мерч', defaultValue: 'https://vk.com/market-55019377?screen=group' },
  { key: 'merch_buy_text', label: 'Текст кнопки «Купить»', type: 'text', group: 'Мерч', defaultValue: 'Купить' },

  // Site info
  { key: 'site_url', label: 'URL сайта', type: 'url', group: 'Сайт', defaultValue: 'https://sipemusic.com' },
  { key: 'site_copyright', label: 'Копирайт', type: 'text', group: 'Сайт', defaultValue: '© SIPE 2026' },
  { key: 'site_tagline', label: 'Слоган', type: 'text', group: 'Сайт', defaultValue: 'Живая электроника' },
  { key: 'site_description', label: 'Описание сайта (SEO)', type: 'textarea', group: 'Сайт', defaultValue: 'Проект Sipe это не просто музыка, это целая вселенная, где каждый трек живёт своей жизнью. Это пространство для экспериментов, поиска и вдохновения, где не бывает конечной точки. Музыка здесь это путь, который никогда не заканчивается.' },

  // Hero
  { key: 'hero_title', label: 'Заголовок Hero', type: 'text', group: 'Hero', defaultValue: 'S I P E' },
  { key: 'hero_subtitle', label: 'Подзаголовок Hero', type: 'text', group: 'Hero', defaultValue: 'Живая электроника' },

  // About
  { key: 'about_text', label: 'Текст раздела «О проекте»', type: 'textarea', group: 'О проекте', defaultValue: 'SIPE - российский проект на стыке индитроники, электроники и экспериментального звука. Это пространство, где каждый трек становится отдельной историей, наполненной атмосферой, эмоциями и глубокими музыкальными текстурами. Sipe объединяет жанры, нарушает границы и приглашает слушателя в путешествие по звуковым мирам.' },

  // Docs
  { key: 'docs_url', label: 'Ссылка «Документация»', type: 'url', group: 'Документы', defaultValue: '' },
  { key: 'riders_url', label: 'Ссылка «Райдеры»', type: 'url', group: 'Документы', defaultValue: '' },
]

export function getDefaultSettings(): Record<string, string> {
  const result: Record<string, string> = {}
  for (const def of settingsDef) {
    result[def.key] = def.defaultValue
  }
  return result
}
