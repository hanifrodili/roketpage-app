<template lang="pug">
.page-content
  .index
    customer-main-customer
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
  name: 'customer'
})
</script>
<style lang="scss" scoped></style>
