<template lang="pug">
div.page-content
  dashboard-main-dashboard
  dashboard-latest-order
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
  name: 'dashboard'
})
</script>
<style lang="scss" scoped></style>
