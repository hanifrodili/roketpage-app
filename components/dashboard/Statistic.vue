<template lang="pug">
div.pb-10
  //- h2.pa-0.mb-3 {{ $t('dashboard') }}
  div.card
    h2.pa-0.mb-3 {{ $t('order') }}
    v-img(src="/img/example.png" width="100%" v-for="n in 5" :key="n")
    p Image only for example. Todo later.
</template>

<script setup></script>
<style lang="scss" scoped>
.card{
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  // align-items: center;
  // justify-content: center;
  box-shadow: 0px 2px 4px -1px rgb(172 172 172 / 70%);
  min-height: 150px;
  height: 100%;
  border-radius: 16px;
  background-color: white;
}
</style>
