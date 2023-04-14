<template lang="pug">
v-app
  v-navigation-drawer(v-model="drawer")
    v-list.pa-0.d-flex.flex-column.h-100
      .pa-4.d-flex.align-center
        v-avatar(size="40")
          v-img(
            src="https://ik.imagekit.io/hanifrodili/HNFRDL.jpg?updatedAt=1671006782759")

        .text-h6.ml-4
          b HNFRDL Store

      v-divider

      v-list-item.px-5(
        v-for="(nav, index) in navList",
        :key="index",
        @click="$router.push(nav.path)",
        :class="$route.name.split('-')[0] == nav.name ? 'bg-secondary text-neutralLight' : ''")
        template(v-slot:prepend)
          v-icon.mr-2(color="neutralLight") {{ `mdi-${nav.mdi}` }}
        .d-flex.flex-row.align-center.justify-space-between
          .text-body-2
            b {{ $t(nav.i18n_key) }}
          v-avatar(color="red", size="30", v-if="nav.notification")
            b {{ nav.notification }}

      v-spacer
      v-divider

      .d-flex.flex-row.align-center.justify-center
        v-btn(@click="openSelectLanguage = true", icon, flat)
          .d-flex.flex-column.align-center.justify-center
            v-icon(size="x-small") mdi-translate
            .text-caption.mt-n1 {{ $t("language") }}

        v-btn(
          flat,
          @click="toggleTheme",
          :icon="theme.global.current.value.dark ? 'mdi-white-balance-sunny' : 'mdi-weather-night'",
          :style="!theme.global.current.value.dark ? 'transform: rotate(0deg)' : 'transform: rotate(-90deg)'")

  v-app-bar.elevation-1
    v-app-bar-nav-icon(variant="text", @click.stop="drawer = !drawer")
    v-toolbar-title.ml-0.ml-md-4.page-title {{ $t($route.name.split("-")[0]) }}

    v-spacer

    //- v-btn(
      icon="mdi-help-circle-outline",
      variant="icon",
      width="35",
      height="35")

    v-menu
      template(v-slot:activator="{ props }")
        v-btn(
          icon="mdi-bell-outline",
          variant="icon",
          v-bind="props",
          width="35",
          height="35")
      v-list.pa-0
        v-list-item
          v-list-item-title Nothing new.

    v-menu
      template(v-slot:activator="{ props }")
        v-btn(
          icon="mdi-account-outline",
          variant="icon",
          width="35",
          height="35",
          v-bind="props")
      v-list.pa-0
        v-list-item(@click="openSelectCompany = true")
          template(v-slot:prepend)
            v-icon.mr-2.icon-nav mdi-swap-horizontal
          v-list-item-title {{ $t("switchaccount") }}
        v-list-item(@click="logout", v-if="userStore.user.email != ''")
          v-list-item-title {{ $t("logout") }}

  v-main(style="min-height: 100vh")
    slot

  //- dialogs
  //- Language dialog
  general-dialog-type-a(v-model="openSelectLanguage", max-width="450")
    template(#title) {{ $t("chooselanguage") }}
    template(#content)
      v-list
        v-list-item.rounded.mb-1(
          @click="setLanguage('en')",
          :class="$i18n.locale == 'en' ? 'bg-primary' : ''")
          v-list-item-title English
        v-list-item.rounded(
          @click="setLanguage('ms')",
          :class="$i18n.locale == 'ms' ? 'bg-primary' : ''")
          v-list-item-title B. Melayu

  //- Company dialog
  general-dialog-type-a(v-model="openSelectCompany", max-width="450")
    template(#title) {{ $t("chooseaccount") }}
    template(#content)
      v-list
        v-list-item.rounded-lg.mb-1(
          @click="",
          :class="true ? 'bg-primary' : ''")
          v-list-item-title HNFRDL Store
        v-list-item.rounded-lg(@click="", :class="false ? 'bg-primary' : ''")
          v-list-item-title BestFood Store
</template>

<script setup>
import { useStoreUser } from "~/store/storeMerchant";
import { onMounted } from "vue";
import { useDisplay, useTheme } from "vuetify";
import { useI18n } from "vue-i18n";

const theme = useTheme();
const display = useDisplay();
const { locale } = useI18n({ useScope: "global" });
const userStore = useStoreUser();
const router = useRouter();

const navList = ref([
  {
    path: "/dashboard",
    name: "dashboard",
    mdi: "view-dashboard",
    i18n_key: "dashboard",
    notification: 0,
  },
  {
    path: "/order",
    name: "order",
    mdi: "inbox-arrow-down",
    i18n_key: "order",
    notification: 20,
  },
  {
    path: "/customer",
    name: "customer",
    mdi: "account-group",
    i18n_key: "customer",
    notification: 30,
  },
  {
    path: "/product",
    name: "product",
    mdi: "package",
    i18n_key: "product",
    notification: 0,
  },
  {
    path: "/pages",
    name: "pages",
    mdi: "file-link",
    i18n_key: "pages",
    notification: 0,
  },
  {
    path: "/settings",
    name: "settings",
    mdi: "cogs",
    i18n_key: "settings",
    notification: 0,
  },
]);

const drawer = ref(false);
const openSelectLanguage = ref(false);
const openSelectCompany = ref(false);

onMounted(() => {
  locale.value = window.localStorage.getItem("preferredLanguage") || "en";
  theme.global.name.value =
    window.localStorage.getItem("preferredTheme") || "light";
  userStore.getUser();
});

watch(drawer, (newDrawerVal) => {
  if (display.width.value < 1280) {
    if (newDrawerVal) {
      document.querySelector(".app").style.overflow = "hidden";
      document.querySelector(".app").style.height = "100vh";
    } else {
      document.querySelector(".app").style.overflow = "auto";
      document.querySelector(".app").style.height = "unset";
    }
  }
});

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
  window.localStorage.setItem("preferredTheme", theme.global.name.value);
}

function setLanguage(lang) {
  locale.value = lang;
  openSelectLanguage.value = false;
  window.localStorage.setItem("preferredLanguage", lang);
}

function logout() {
  userStore.setUser();
  router.push("/signin");
}
</script>

<style lang="scss" scoped>
.v-list-item.activated {
  background-color: rgb(var(--v-theme-primary));

  .v-icon {
    color: #000;
  }
}

:deep(.v-navigation-drawer__scrim) {
  background-color: rgba(0, 0, 0, 0.2);
  opacity: 1;
  backdrop-filter: blur(2px);
}
</style>
