<template lang="pug">
div.page-content.setting-content
  .d-flex.flex-row.align-center
    v-btn(variant="text" icon="mdi-arrow-left" @click.stop="$router.push('/admin/settings')")
    h1.page-title {{ $t('shipping') }}
  v-card.general-card.px-4.py-0
    settings-shipping-setting
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
  name: 'settings-shipping'
})
</script>

<style lang="scss" scoped></style>
