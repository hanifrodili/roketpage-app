<template lang="pug">
.page-content
  customer-main-customer
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
  name: 'customer'
})
</script>
<style lang="scss" scoped></style>
