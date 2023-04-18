<template lang="pug">
.index
  order-main-order
</template>
<script setup>
definePageMeta({
  middleware: 'auth',
  name: 'order'
})
</script>
<style lang="scss" scoped></style>
