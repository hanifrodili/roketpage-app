<template lang="pug">
div.page-content.setting-content
  .d-flex.flex-row.align-center
    v-btn(variant="text" icon="mdi-arrow-left" @click.stop="$router.push('/admin/settings')")
    h1.page-title {{ $t('subscription') }}
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
  name: 'settings-subscription'
})
</script>

<style lang="scss" scoped></style>
