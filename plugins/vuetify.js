// plugins/vuetify.js
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    theme: {
      dark: true,
      themes: {
        light: {
          primary: '#353535',
          secondary: '#FFC800',
          accent: '#5099C2',
        },
        dark: {
          primary: '#FFC800',
        },
      },
    }
  })

  nuxtApp.vueApp.use(vuetify)
})
