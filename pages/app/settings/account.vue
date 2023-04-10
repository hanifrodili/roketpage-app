<template lang="pug">
div.page-content.setting-content
  .d-flex.flex-row.align-center
    v-btn(variant="text" icon="mdi-arrow-left" @click.stop="$router.push('/settings')")
    h1.page-title {{ $t('account') }}
</template>

<script setup></script>

<style lang="scss" scoped></style>
