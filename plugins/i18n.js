import { createI18n } from 'vue-i18n'
import en from '@/src/locales/en.json'
import ms from '@/src/locales/ms.json'

export default defineNuxtPlugin((nuxtApp) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'en',
    messages: {
      en,
      ms
    }
  })
  nuxtApp.vueApp.use(i18n);
})