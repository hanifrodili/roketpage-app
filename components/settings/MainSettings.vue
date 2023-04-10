<template lang="pug">
div
  div.d-flex.align-center.mb-6(style="gap: 16px" :class="$vuetify.display.width < 600 ? 'flex-column' : 'flex-row'")
    div.flex-shrink-1.pa-4.bg-green.rounded-circle
      v-img(:aspect-ratio="1/1" width="40" src="/img/logo.svg" )
    div.d-flex.flex-column()
      p.text-wrap.font-weight-bold Mohd Hanif Bin Mohamod Rodili
      .d-flex.flex-row.align-center.justify-space-between
        div
          p(style="color:#767676; font-size:14px; font-weight:400") hanifrodili@gmail.com
          p(style="color:#767676; font-size:14px; font-weight:400") Owner
        v-btn( variant="text" @click="$router.push('/settings/account')" icon="mdi-account-edit-outline" width="32" height="32" color="secondary")
  v-card.card
    v-card-text.d-flex.flex-column.pa-0
      div.d-flex.flex-row.align-center.settings-item.pa-3.py-4.px-md-5(style="gap:20px" v-for="(setting, index) in settingsList" :key="index" @click="$router.push(setting.path)")
        v-icon mdi-{{ setting.mdi }}
        p.label {{ $t(setting.label) }}
        v-icon.ml-auto mdi-chevron-right
</template>

<script setup>
const settingsList = ref([
  {
    label: 'company',
    path: '/settings/company',
    mdi: 'domain'
  },
  {
    label: 'payment',
    path: '/settings/payment',
    mdi: 'cash-multiple'
  },
  {
    label: 'shipping',
    path: '/settings/shipping',
    mdi: 'truck'
  },
  {
    label: 'notification',
    path: '/settings/notification',
    mdi: 'bell-ring'
  },
  {
    label: 'subscription',
    path: '/settings/subscription',
    mdi: 'account-credit-card'
  }
])
</script>

<style lang="scss" scoped>
.card{
  width: 100%;
  display: flex;
  flex-direction: column;
  // align-items: center;
  // justify-content: center;
  // box-shadow: 0px 2px 4px -1px rgb(34 34 34 / 50%);
  box-shadow: none;
  height: fit-content;
  height: 100%;
  border: .5px solid #ababab;
  border-radius: 8px;
}

.settings-item{
  cursor: pointer;
  p.label{
    font-size: 15px;
    font-weight: 500;
  }
}

.settings-item:not(:last-of-type){
  border-bottom: 0.5px #ababab solid;
}
</style>
