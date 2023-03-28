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
    },
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    customRoutes: 'config',
    pages: {
      'app/settings': {
        ms: '/tetapan'
      },
      'app/dashboard': {
        ms: '/utama',
      }
    }
  })
  nuxtApp.vueApp.use(i18n);
})