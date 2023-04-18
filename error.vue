<template lang="pug">
.d-flex.flex-column.align-center.justify-center.pa-4(
  style="width: 100%; height: 100vh")
  img.mb-n6(width="290", contain, src="/img/roketpage-404.svg")
  .text-h6.mb-6.text-secondary.text-center
    b You've found a page that doesn't exist.
  v-btn.elevation-0.text-capitalize(
    color="info",
    rounded,
    @click="$router.push('/signin')")
    b Back to home
    v-icon(end) mdi-home
</template>

<script setup></script>

<style lang="scss" scoped></style>
