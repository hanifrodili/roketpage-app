<template lang="pug">
.app
  nav-main-nav-drawer(v-if="!excludeNav.includes($route.name)")
    slot
  div(v-else)
    slot
</template>

<script setup>
const excludeNav = ref(["index", "signin", "signup", "forgot", "reset", "welcome", "test", "companies"]);
</script>

<style lang="scss"></style>
