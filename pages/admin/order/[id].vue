<template lang="pug">
div.page-content
 h1 ID {{ `#${$route.params.id}` }}
</template>

<script setup>
const route = useRoute()
definePageMeta({
  middleware: 'auth',
  name: 'Order Details'
})
</script>

<style lang="scss" scoped></style>
