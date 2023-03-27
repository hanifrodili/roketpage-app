<template lang="pug">
.MainNavDrawer
  v-layout
    v-app-bar.elevation-1(color="neutralDark" prominent style="z-index:1000")
      v-app-bar-nav-icon(variant="text" @click.stop="drawer = !drawer")
      v-toolbar-title.ml-0
        img(height="48" src="/icon.svg" )
      v-spacer
      v-btn.elevation-0.text-neutral.mr-2( @click="toggleTheme" variant="text" :icon="theme.global.current.value.dark ? 'mdi-white-balance-sunny' : 'mdi-weather-night'" :style="!theme.global.current.value.dark ? 'transform: rotate(0deg)' : 'transform: rotate(-90deg)'")
      v-menu()
        template( v-slot:activator="{ props }" )
          v-btn.elevation-0.text-neutral.bg-primary(icon="mdi-account" variant="outlined" v-bind="props")
        v-list.pa-0
          v-list-item(@click="$router.push('logout')")
            v-list-item-title {{ $t('logout') }}

    v-navigation-drawer.py2(
        v-model="drawer"
        temporary
        style="height:100%; top:0; z-index:1999"
      )

      v-list.pa-0
        v-list-group
          template( v-slot:activator="{ props }" ) 
            v-list-item.py-3(
              v-bind="props"
              prepend-avatar="https://ik.imagekit.io/hanifrodili/HNFRDL.jpg?updatedAt=1671006782759"
              title="HNFRDL Store"
              append-icon=""
            )
          v-list-item(@click="openSelectCompany = true" style="padding-left:20px !important")
            template(v-slot:prepend)
              v-icon.mr-2.icon-nav mdi-swap-horizontal
            v-list-item-title.menu-text {{ $t('switchcompany') }}

        v-divider

        v-list-item.px-5(@click="$router.push('/dashboard'), drawer = false" :class="$route.name == 'dashboard' ? 'activated' : ''")
          template(v-slot:prepend)
            v-icon.mr-2.icon-nav mdi-view-dashboard
          v-list-item-title.menu-text {{ $t('dashboard') }}

        v-list-item.px-5(@click="$router.push('/order'), drawer = false" :class="$route.name == 'order' ? 'activated' : ''")
          template(v-slot:prepend)
            v-icon.mr-2.icon-nav mdi-inbox-arrow-down
          div.d-flex.flex-row.align-center.justify-space-between
            v-list-item-title.menu-text {{ $t('order') }}
            div.rounded-pill.bg-red.d-flex.align-center.justify-center(style="height:25px; padding:5px")
              p.mb-0(style="font-size:14px") 20

        v-list-item.px-5(@click="$router.push('/product'), drawer = false" :class="$route.name == 'product' ? 'activated' : ''")
          template(v-slot:prepend)
            v-icon.mr-2.icon-nav mdi-package
          v-list-item-title.menu-text {{ $t('product') }}

        v-list-item.px-5(@click="$router.push('/sites'), drawer = false" :class="$route.name == 'sites' ? 'activated' : ''")
          template(v-slot:prepend)
            v-icon.mr-2.icon-nav mdi-file-link
          v-list-item-title.menu-text {{ $t('sites') }}

        v-list-item.px-5(@click="$router.push('/settings'), drawer = false" :class="$route.name == 'settings' ? 'activated' : ''")
          template(v-slot:prepend)
            v-icon.mr-2.icon-nav mdi-cogs
          v-list-item-title.menu-text {{ $t('settings') }}

        v-divider

        v-list-item.px-5(
          @click="openSelectLanguage = true"
        )
          template(v-slot:prepend)
            v-icon.mr-2 mdi-translate
          v-list-item-title.menu-text {{ $t('language') }}
  
  //- Language dialog
  v-dialog( v-model="openSelectLanguage" width="100%" max-width="350px")
    v-card(  )
      v-card-title {{ $t('chooselanguage') }}
      v-card-text
        v-list.pa-0
          v-list-item.rounded.mb-1(@click="setLanguage('en')" :class="$i18n.locale == 'en' ? 'bg-primary' : ''")
            v-list-item-title English
          v-list-item.rounded(@click="setLanguage('ms')" :class="$i18n.locale == 'ms' ? 'bg-primary' : ''")
            v-list-item-title B. Melayu

  //- Company dialog
  v-dialog( v-model="openSelectCompany" width="100%" max-width="350px")
    v-card(  )
      v-card-title {{ $t('choosecompany') }}
      v-card-text
        v-list.pa-0
          v-list-item.rounded.mb-1(@click="" :class="true ? 'bg-primary' : ''")
            v-list-item-title HNFRDL Store
          v-list-item.rounded(@click="" :class="false ? 'bg-primary' : ''")
            v-list-item-title BestFood Store

</template>

<script setup>

import { onMounted } from 'vue';
import { useTheme } from 'vuetify'
import { useI18n } from 'vue-i18n'

const theme = useTheme()
const { locale } = useI18n({ useScope: 'global' })

const drawer = ref(false)
const openSelectLanguage = ref(false)
const openSelectCompany = ref(false)

onMounted(() => {
  locale.value = window.localStorage.getItem('preferredLanguage') || 'en'
  theme.global.name.value = window.localStorage.getItem('preferredTheme') || 'light'
})

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  window.localStorage.setItem('preferredTheme', theme.global.name.value)
}

function setLanguage(lang) {
  locale.value = lang
  openSelectLanguage.value = false
  window.localStorage.setItem('preferredLanguage', lang)
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

.icon-nav{
  color: rgb(var(--v-theme-neutralLight));
}

.v-list-item.activated {
  background-color: rgb(var(--v-theme-primary));
  
  .menu-text{
    color: #000;
  }

  .v-icon{
    color:#000
  }
}

:deep(.v-navigation-drawer__scrim) {
    background-color: rgba(0,0,0,.2);
    opacity: 1;
    backdrop-filter: blur(2px);
}

@media(max-width: 500px){
  .menu-text {
  padding: 0;
}
}
</style>
