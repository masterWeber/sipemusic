<template>
  <footer class="footer" id="contacts">
    <div class="container footer__inner">
      <div class="footer__row">
        <div class="footer__col footer__col--left">
          <h2 class="section-title footer__title">Контакты</h2>
          <div class="footer__info">
            <span class="footer__label">{{ settings?.contact_email_label ?? 'концерты / сотрудничество' }}</span>
            <a :href="`mailto:${settings?.contact_email ?? 'sipe.booking@gmail.com'}`" class="footer__link">{{ settings?.contact_email ?? 'sipe.booking@gmail.com' }}</a>
          </div>
        </div>
        <div class="footer__col footer__col--center">
          <div class="footer__socials">
            <div class="footer__icons">
              <a :href="settings?.social_telegram ?? '#'" target="_blank" rel="noopener noreferrer" class="footer__icon" aria-label="Telegram">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path fill="currentColor" d="M17.094 7.146c.593-.215.888-.292 1.05-.32q.002.08-.002.122c-.232 2.444-1.251 8.457-1.775 11.255c-.122.655-.216.967-.85.595c-.416-.245-.792-.553-1.196-.817c-1.325-.869-3.221-2.162-3.065-2.084c-1.304-.86-.758-1.386-.03-2.088c.117-.113.24-.231.36-.356c.054-.056.317-.3.687-.645c1.188-1.104 3.484-3.239 3.542-3.486c.01-.04.018-.192-.071-.271c-.09-.08-.223-.053-.318-.031q-.203.046-6.474 4.279q-.918.63-1.664.614l.005.003c-.655-.231-1.308-.43-1.964-.63a66 66 0 0 1-1.3-.405l-.308-.098c4.527-1.972 7.542-3.27 9.053-3.899c2.194-.913 3.496-1.438 4.32-1.738m2.423-1.928a1.8 1.8 0 0 0-.726-.346c-.2-.048-.39-.063-.533-.06c-.477.008-.988.143-1.846.454c-.875.318-2.219.862-4.406 1.771Q9.691 8 2.804 11.001c-.404.161-.773.344-1.065.56c-.27.201-.647.56-.716 1.11c-.052.416.069.8.315 1.103c.214.263.488.423.697.524c.31.15.728.281 1.095.396c.573.18 1.144.363 1.719.539c1.778.544 3.242.992 4.852 2.054c1.181.778 2.34 1.59 3.523 2.366c.432.283.835.608 1.28.87c.488.285 1.106.546 1.86.477c1.138-.105 1.73-1.152 1.97-2.43c.521-2.79 1.557-8.886 1.8-11.432a3.8 3.8 0 0 0-.037-.885a1.66 1.66 0 0 0-.58-1.035" />
                </svg>
              </a>
              <a :href="settings?.social_instagram ?? '#'" target="_blank" rel="noopener noreferrer" class="footer__icon" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path fill="currentColor" d="M12.001 9a3 3 0 1 0 0 6a3 3 0 0 0 0-6m0-2a5 5 0 1 1 0 10a5 5 0 0 1 0-10m6.5-.25a1.25 1.25 0 0 1-2.5 0a1.25 1.25 0 0 1 2.5 0M12.001 4c-2.474 0-2.878.007-4.029.058c-.784.037-1.31.142-1.798.332a2.9 2.9 0 0 0-1.08.703a2.9 2.9 0 0 0-.704 1.08c-.19.49-.295 1.015-.331 1.798C4.007 9.075 4 9.461 4 12c0 2.475.007 2.878.058 4.029c.037.783.142 1.31.331 1.797c.17.435.37.748.702 1.08c.337.336.65.537 1.08.703c.494.191 1.02.297 1.8.333C9.075 19.994 9.461 20 12 20c2.475 0 2.878-.007 4.029-.058c.782-.037 1.308-.142 1.797-.331a2.9 2.9 0 0 0 1.08-.703c.337-.336.538-.649.704-1.08c.19-.492.296-1.018.332-1.8c.052-1.103.058-1.49.058-4.028c0-2.474-.007-2.878-.058-4.029c-.037-.782-.143-1.31-.332-1.798a2.9 2.9 0 0 0-.703-1.08a2.9 2.9 0 0 0-1.08-.704c-.49-.19-1.016-.295-1.798-.331C14.926 4.006 14.54 4 12 4m0-2c2.717 0 3.056.01 4.123.06c1.064.05 1.79.217 2.427.465c.66.254 1.216.598 1.772 1.153a4.9 4.9 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428c.047 1.066.06 1.405.06 4.122s-.01 3.056-.06 4.122s-.218 1.79-.465 2.428a4.9 4.9 0 0 1-1.153 1.772a4.9 4.9 0 0 1-1.772 1.153c-.637.247-1.363.415-2.427.465c-1.067.047-1.406.06-4.123.06s-3.056-.01-4.123-.06c-1.064-.05-1.789-.218-2.427-.465a4.9 4.9 0 0 1-1.772-1.153a4.9 4.9 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.012 15.056 2 14.717 2 12s.01-3.056.06-4.122s.217-1.79.465-2.428a4.9 4.9 0 0 1 1.153-1.772A4.9 4.9 0 0 1 5.45 2.525c.637-.248 1.362-.415 2.427-.465C8.945 2.013 9.284 2 12.001 2" />
                </svg>
              </a>
              <a :href="settings?.social_youtube ?? '#'" target="_blank" rel="noopener noreferrer" class="footer__icon" aria-label="YouTube">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path fill="currentColor" d="M19.607 6.995c-.076-.298-.292-.523-.539-.592C18.63 6.28 16.501 6 12.001 6s-6.628.28-7.069.403c-.244.068-.46.293-.537.592c-.109.424-.394 2.2-.394 5.005s.285 4.58.394 5.006c.076.297.292.522.538.59C5.373 17.72 7.5 18 12 18s6.629-.28 7.069-.403c.244-.068.46-.293.537-.592c.11-.424.394-2.205.394-5.005s-.285-4.58-.394-5.005m1.937-.497C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.897 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0 3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.108 4 12.001 4 12.001 4s5.896 0 7.605.476c.944.266 1.687 1.04 1.938 2.022M10.001 15.5v-7l6 3.5z" />
                </svg>
              </a>
              <a :href="settings?.social_vk ?? '#'" target="_blank" rel="noopener noreferrer" class="footer__icon" aria-label="VK">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path fill="currentColor" d="M5.827 5.828c-.344.349-.57.839-.696 1.77c-.129.965-.13 2.243-.13 4.082v.64c0 1.836.001 3.113.13 4.077c.125.932.352 1.425.697 1.777c.35.343.84.57 1.77.695c.965.129 2.243.131 4.082.131h.64c1.836 0 3.113-.002 4.078-.131c.931-.125 1.424-.352 1.776-.697c.343-.349.57-.839.695-1.77c.13-.965.131-2.243.131-4.082v-.64c0-1.836-.002-3.113-.13-4.077c-.126-.932-.353-1.425-.698-1.777c-.349-.343-.839-.57-1.77-.695C15.437 5.002 14.159 5 12.32 5h-.64c-1.836 0-3.113.002-4.077.131c-.932.125-1.424.352-1.776.697M11.68 3h.64c1.445 0 2.912-.043 4.347.149c1.156.155 2.135.486 2.917 1.26l.008.009c.773.784 1.105 1.763 1.26 2.92c.191 1.433.148 2.899.148 4.342v.64c0 1.444.044 2.911-.149 4.347c-.154 1.156-.486 2.135-1.26 2.917l-.009.008c-.783.773-1.762 1.104-2.92 1.26c-1.433.191-2.899.148-4.342.148h-.64c-1.444 0-2.911.043-4.346-.149c-1.157-.155-2.136-.486-2.917-1.26l-.009-.009c-.772-.784-1.104-1.763-1.259-2.92C2.957 15.23 3 13.764 3 12.32v-.64c0-1.444-.043-2.911.15-4.347c.154-1.156.486-2.135 1.26-2.917l.008-.008c.784-.773 1.763-1.104 2.92-1.26C8.772 2.958 10.238 3 11.68 3M6.036 8.478c.096 4.68 2.436 7.488 6.54 7.488h.24V13.29c1.506.15 2.646 1.254 3.102 2.676h2.13a5.92 5.92 0 0 0-3.078-3.756a5.72 5.72 0 0 0 2.628-3.738h-1.932c-.42 1.488-1.668 2.838-2.85 2.964V8.478h-1.938v5.184c-1.2-.3-2.712-1.752-2.778-5.184z" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        <div class="footer__col footer__col--right">
          <div class="footer__info">
            <span class="footer__label">{{ settings?.support_label ?? 'Поддержать проект' }}</span>
            <a :href="settings?.support_url ?? '#'" target="_blank" rel="noopener noreferrer" class="footer__link">{{ settings?.support_text ?? 'Яндекс Чаевые' }}</a>
          </div>
        </div>
      </div>
      <div class="footer__row">
        <div class="footer__copyright">
          {{ settings?.site_copyright ?? '© SIPE 2026' }}
        </div>
        <div class="footer__copyright">
          {{ settings?.site_tagline ?? 'Живая электроника' }}
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const { settings } = useSiteSettings()
</script>

<style lang="scss" scoped>
$text-muted: #999999;

.footer {
  scroll-margin-top: 80px;
  padding: 80px 0 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);

  &__inner {
    display: flex;
    flex-direction: column;
  }

  &__row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 40px;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
  }

  &__col {
    flex: 1;

    &--center {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 0 0 auto;
    }

    &--right {
      display: flex;
      flex-direction: column;
      align-items: end;
      text-align: right;
    }
  }

  &__title {
    font-size: 28px;
    letter-spacing: 4px;
    font-weight: 400;
    margin-top: 0;
    line-height: 1;
    margin-bottom: 30px;
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  &__label {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: $text-muted;
  }

  &__link {
    font-size: 14px;
    letter-spacing: 1px;
    transition: opacity 0.3s;
    color: inherit;
    text-decoration: none;

    &:hover {
      opacity: 0.7;
    }

    @media (max-width: 768px) {
      text-align: center;
    }
  }

  &__copyright {
    margin-top: 60px;
    font-size: 11px;
    color: $text-muted;
    letter-spacing: 1px;
  }

  &__socials {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    & + & {
      margin-top: 40px;
    }
  }

  &__social-label {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: $text-muted;
  }

  &__icons {
    display: flex;
    gap: 20px;
  }

  &__icon {
    color: #fff;
    transition: opacity 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      opacity: 0.7;
    }

    svg, span {
      width: 24px;
      height: 24px;
    }
  }

  &__bottom-text {
    margin-top: 40px;
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: $text-muted;
  }
}
</style>