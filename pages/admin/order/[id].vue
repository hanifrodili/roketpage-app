<template lang="pug">
div.page-content
 h1 ID {{ `#${$route.params.id}` }}
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
  name: 'order'
})
</script>

<style lang="scss" scoped></style>
