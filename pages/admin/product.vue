<template lang="pug">
div.page-content
  product-main-product
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
  name: 'product'
})
</script>
<style lang="scss" scoped></style>
