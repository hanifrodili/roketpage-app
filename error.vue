<template lang="pug">
.error
  div.d-flex.flex-column.align-center.justify-center(style="width:100%; height:100vh")
    img.mb-5(width="400" height="auto" src="/img/roketpage-404.svg")
    h2.mb-10.text-secondary You've found a page that doesn't exist.
    v-btn.elevation-0.text-capitalize(color="primary" @click="$router.push('/')") Back to home
</template>

<script setup>
</script>

<style lang="scss" scoped></style>
