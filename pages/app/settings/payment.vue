<template lang="pug">
div.page-content.setting-content
  .d-flex.flex-row.align-center
    v-btn(variant="text" icon="mdi-arrow-left" @click.stop="$router.push('/settings')")
    h1.page-title {{ $t('payment') }}
  v-card.general-card
    v-expansion-panels(variant="accordion" v-model="panel")
      v-expansion-panel(elevation="0" opened)
        v-expansion-panel-title(expand-icon="mdi-plus" collapse-icon="mdi-minus") Payment Gateway
        v-expansion-panel-text.pa-0
          settings-gateway-setting
      v-expansion-panel(elevation="0" opened)
        v-expansion-panel-title(expand-icon="mdi-plus" collapse-icon="mdi-minus") Bank Transfer
        v-expansion-panel-text
          p todo: Add bank
            
</template>

<script setup>
const panel = ref(0)
</script>

<style lang="scss" scoped>
:deep(.v-expansion-panel-text__wrapper) {
  padding: 8px !important;
}
</style>
