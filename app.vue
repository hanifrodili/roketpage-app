<template lang="pug">
.app
  MainNav
  NuxtPage.main-content
</template>

<script setup>
</script>

<style lang="scss">
@font-face {
  font-family: 'Montserrat';
  src: url('/fonts/Montserrat-VariableFont_wght.ttf');
}
@font-face {
  font-family: 'Open Sans';
  src: url('/fonts/OpenSans-VariableFont_wdth,wght.ttf');
}

body {
  font-family: 'Open Sans';
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Montserrat';
}

.main-content {
  padding: 30px 40px;
  padding-top: 100px;
}
</style>
