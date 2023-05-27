<template lang="pug">
v-app
  v-navigation-drawer(v-model="drawer")
    v-list.pa-0.d-flex.flex-column.h-100
      v-sheet.py-1(color="transparent", variant="flat")
        v-card-text
          .ml-4.text-body-1
            b RoketPage

      v-divider

      v-list-item.px-5(
        v-for="(nav, index) in navList",
        :key="index",
        @click="$router.push(nav.path)",
        :class="$route.name.split('-')[0] == nav.name ? 'activated' : ''")
        template(v-slot:prepend)
          v-icon.mr-2.icon-nav {{ `mdi-${nav.mdi}` }}
        .d-flex.flex-row.align-center.justify-space-between
          v-list-item-title.menu-text {{ $t(nav.i18n_key) }}
          .rounded-pill.bg-red.d-flex.align-center.justify-center(
            style="height: 25px; padding: 5px",
            v-if="nav.notification")
            p.mb-0(style="font-size: 14px") {{ nav.notification }}

      v-spacer
      v-divider

      //- v-list-item.px-5(@click="openSelectLanguage = true")
      //-   template(v-slot:prepend)
      //-     v-icon.mr-2.icon-nav mdi-translate
      //-   div.d-flex.flex-row.align-center.justify-space-between
      //-     v-list-item-title.menu-text {{ $t('language') }}

      .d-flex.flex-row.align-center.justify-center.py-2
        v-btn.elevation-0(
          @click="openSelectLanguage = true",
          variant="text",
          rounded)
          .d-flex.flex-column.align-center.justify-center
            v-icon mdi-translate
            p(style="font-size: 7px") {{ $t("language") }}

        //- v-btn.elevation-0(
          @click="toggleTheme",
          variant="text",
          :icon="theme.global.current.value.dark ? 'mdi-hite-balance-sunny' : 'mdi-weather-night'",
          :style="!theme.global.current.value.dark ? 'transform: rotate(0deg)' : 'transform: rotate(-90deg)'")

  v-app-bar.px-md-12(border, elevation="0")
    v-app-bar-nav-icon(variant="text", @click.stop="drawer = !drawer")
    v-toolbar-title.ml-0.ml-md-4.page-title {{ $t($route.name.split("-")[0]) }}

    v-spacer

    //- v-btn.elevation-0.bg-transparent(
      size="small",
      icon="mdi-help-circle-outline",
      variant="text",
      width="28",
      height="28")

    //- v-menu
      template(v-slot:activator="{ props }")
        v-btn.elevation-0.bg-transparent.mr-2(
          size="small",
          icon="mdi-bell-outline",
          variant="text",
          v-bind="props",
          width="28",
          height="28")
      v-list.pa-0
        v-list-item
          v-list-item-title Nothing new.

    v-menu
      template(v-slot:activator="{ props }")
        v-btn.elevation-0.bg-transparent(icon, size="35", v-bind="props")
          v-icon(size="25") mdi-account
      v-list.pa-0
        v-list-item(@click="$router.push('/companies')")
          template(v-slot:prepend)
            //- v-icon.mr-2.icon-nav mdi-swap-horizontal
          v-list-item-title {{ $t("switchaccount") }}
        v-list-item(@click="logout", v-if="userStore.user.email != ''")
          v-list-item-title {{ $t("logout") }}

  v-main
    slot
  //- Language dialog
  v-dialog(v-model="openSelectLanguage", width="100%", max-width="350px")
    v-card
      v-card-title {{ $t("chooselanguage") }}
      v-card-text
        v-list.pa-0
          v-list-item.rounded.mb-1(
            @click="setLanguage('en')",
            :class="$i18n.locale == 'en' ? 'bg-primary' : ''")
            v-list-item-title English
          v-list-item.rounded(
            @click="setLanguage('ms')",
            :class="$i18n.locale == 'ms' ? 'bg-primary' : ''")
            v-list-item-title B. Melayu

  //- Company dialog
  v-dialog(v-model="openSelectCompany", width="100%", max-width="350px")
    v-card
      v-card-title {{ $t("chooseaccount") }}
      v-card-text
        v-list.pa-0
          v-list-item.rounded.mb-1(
            @click="",
            :class="true ? 'bg-primary' : ''")
            v-list-item-title HNFRDL Store
          v-list-item.rounded(@click="", :class="false ? 'bg-primary' : ''")
            v-list-item-title BestFood Store
</template>

<script setup>
import { useDisplay, useTheme } from "vuetify";
import { useI18n } from "vue-i18n";

const config = useRuntimeConfig();
const supabase = useSupabaseAuthClient();

const theme = useTheme();
const display = useDisplay();
const { locale } = useI18n({ useScope: "global" });
const userStore = useStoreUser();
const router = useRouter();

const navList = ref([
  {
    path: "/admin/dashboard",
    name: "dashboard",
    mdi: "view-dashboard",
    i18n_key: "dashboard",
    notification: 0,
  },
  {
    path: "/admin/order",
    name: "order",
    mdi: "inbox-arrow-down",
    i18n_key: "order",
    notification: 20,
  },
  {
    path: "/admin/customer",
    name: "customer",
    mdi: "account-group",
    i18n_key: "customer",
    notification: 0,
  },
  {
    path: "/admin/product",
    name: "product",
    mdi: "package",
    i18n_key: "product",
    notification: 0,
  },
  {
    path: "/admin/pages",
    name: "pages",
    mdi: "file-link",
    i18n_key: "pages",
    notification: 0,
  },
  {
    path: "/admin/settings",
    name: "settings",
    mdi: "cogs",
    i18n_key: "settings",
    notification: 0,
  },
]);

const drawer = ref(false);
const openSelectLanguage = ref(false);
const openSelectCompany = ref(false);
const user = ref({});
const user_avatar = ref("");
const company_name = ref("");

onMounted(async () => {
  locale.value = window.localStorage.getItem("preferredLanguage") || "en";
  theme.global.name.value =
    window.localStorage.getItem("preferredTheme") || "light";
  await userStore.getUser();
  user.value = userStore.user;
  user_avatar.value = user.value.profile.avatar_url;
  company_name.value = user.value.current_company.name;
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

async function logout() {
  let { error } = await supabase.auth.signOut();
  if (!error) {
    userStore.setUser();
    router.push("/signin");
  }
}
</script>

<style lang="scss" scoped>
.menu-text {
  color: rgb(var(--v-theme-neutralLight));
  padding: 10px 0px;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  vertical-align: middle;
}

.icon-nav {
  color: rgb(var(--v-theme-neutralLight));
}

.v-list-item.activated {
  background-color: rgb(var(--v-theme-primary));

  .menu-text {
    color: #000;
  }

  .v-icon {
    color: #000;
  }
}

:deep(.v-navigation-drawer__scrim) {
  background-color: rgba(0, 0, 0, 0.2);
  opacity: 1;
  backdrop-filter: blur(2px);
}

@media (max-width: 500px) {
  .menu-text {
    padding: 0;
  }
}
</style>
