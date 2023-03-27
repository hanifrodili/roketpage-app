import { resolve, dirname } from "node:path";
import { fileURLToPath } from "url";
import VueI18nVitePlugin from "@intlify/unplugin-vue-i18n/vite";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "RoketPage",
      titleTemplate: "%s | Help your sales to the moon 🚀",
      link: [{ rel: "icon", type: "image/svg", href: "/icon.svg" }],
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1 maximum-scale=1, user-scalable=no",
        },
        {
          hid: "description",
          name: "description",
          content: "To help no tech customer setting up a new sales funnel",
        },
        {
          hid: "keywords",
          name: "keywords",
          content: "ecommmerce, sales page, sales,",
        },
        // og metas
        {
          hid: "og:title",
          property: "og:title",
          content: "roketpage.com",
        },
        {
          hid: "og:description",
          property: "og:description",
          content: "Help your sales to the moon 🚀",
        },
        {
          hid: "og:image",
          property: "og:image",
          content: `${process.env.BASE_URL}icon.png`,
        },
        {
          hid: "og:url",
          property: "og:url",
          content: `${process.env.BASE_URL}`,
        },

        // twitter card
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary",
        },
        {
          hid: "twitter:creator",
          name: "twitter:creator",
          content: "",
        },

        {
          hid: "twitter:site",
          name: "twitter:site",
          content: "",
        },
      ],
    },
  },
  buildModules: [],
  modules: ["@pinia/nuxt", "nuxt-snackbar"],
  snackbar: {
    top: true,
    right: true,
    duration: 3000,
  },
  routeRules: {
    "/": { redirect: "/signin" }
  },
  server: {
    port: process.env.PORT,
  },
  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
  ],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
    plugins: [
      VueI18nVitePlugin({
        include: [
          resolve(
            dirname(fileURLToPath(import.meta.url)),
            "src/locales/*.json"
          ),
        ],
      }),
    ],
  },
  runtimeConfig: {
    // The private keys which are only available within server-side
    secret: "",
    // Keys within public, will be also exposed to the client-side
    public: {
      baseUrl: process.env.BASE_URL,
      apiUrl: process.env.API_URL,
    },
  },
});
