<template lang="pug">
div.page-content.setting-content
  .d-flex.flex-row.align-center
    v-btn(variant="text" icon="mdi-arrow-left" @click.stop="$router.push('/admin/settings')")
    h1.page-title {{ $t('payment') }}
  v-card.general-card.pa-0
    v-expansion-panels(variant="accordion" v-model="panel")
      v-expansion-panel(elevation="0")
        v-expansion-panel-title.font-weight-bold(expand-icon="mdi-plus" collapse-icon="mdi-minus") Payment Gateway
        v-expansion-panel-text.pa-0
          settings-gateway-setting
      v-expansion-panel(elevation="0")
        v-expansion-panel-title.font-weight-bold(expand-icon="mdi-plus" collapse-icon="mdi-minus") Bank Transfer
        v-expansion-panel-text
          settings-bank-setting
            
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
  name: 'settings-payment'
})
const panel = ref(0)
</script>

<style lang="scss" scoped>
// :deep(.v-expansion-panel-text__wrapper),
// :deep(.v-expansion-panel-title) {
//   padding: 8px 24px !important;
// }

// @media(max-width: 400px){
//   :deep(.v-expansion-panel-text__wrapper),
//   :deep(.v-expansion-panel-title) {
//   padding: 8px !important;
// }
// }
</style>
