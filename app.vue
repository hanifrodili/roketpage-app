<template lang="pug">
.app
  MainNav(v-if="!(excludeNav.includes($route.name))")
  NuxtPage.main-content
  NuxtSnackbar
  //- nuxt-layout
  //-   nuxt-page
</template>

<script setup>
const excludeNav = ref([
  'signin', 
  'signup', 
  'forgot', 
  'reset',
])
</script>

<style lang="scss">
@use "./public/variables";
</style>