<template lang="pug">
div.page-content.setting-content
  .d-flex.flex-row.align-center
    v-btn(variant="text" icon="mdi-arrow-left" @click.stop="$router.push('/admin/settings')")
    h1.page-title {{ $t('notification') }}
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
  name: 'settings-notification'
})
</script>

<style lang="scss" scoped></style>
