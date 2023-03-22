// plugins/vuetify.js
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    treeShake: true,
    customVariables: ["@/public/variables.scss"],
    defaultAssets: {
      font: {
        family: "Nunito",
      },
    },
    theme: {
      dark: true,
      themes: {
        light: {
          colors: {
            primary: "#13ED9A",
            secondary: "#666666",
            accent: "#5099C2",
            neutralLight: "#2B2B2B",
            neutralDark: "#F7F7F7",
            bodyBg: "#F7F7F7"
          },
        },
        dark: {
          colors: {
            primary: "#13ED9A",
            secondary: "#666666",
            accent: "#5099C2",
            neutralLight: "#F7F7F7",
            neutralDark: "#2B2B2B",
            bodyBg: "#2B2B2B"
          },
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
