<template lang="pug">
div.page-content
  settings-main-settings
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
  name: 'settings'
})
</script>
<style lang="scss" scoped></style>