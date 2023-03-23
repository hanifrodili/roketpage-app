<template lang="pug">
.app
  nav-main-nav(v-if="!(excludeNav.includes($route.name))")
  slot
</template>

<script setup>
const excludeNav = ref(["index", "signin", "signup", "forgot", "reset"]);
</script>

<style lang="scss"></style>
