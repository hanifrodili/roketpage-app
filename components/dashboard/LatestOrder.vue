<template lang="pug">
div.py-15
  //- h2.pa-0.mb-3 {{ $t('dashboard') }}
  v-card.card
    h2.pa-0.mb-3(style="font-size:20px") {{ $t('latestorder',{number: 5}) }}
    v-table(style="background-color:transparent")
      tbody
        tr(v-for="n in 5" :key="n")
          td.px-0.order-row
            order-item-order
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
  box-shadow: 0px 2px 4px -1px rgb(34 34 34 / 50%);
  min-height: 150px;
  height: 100%;
  border-radius: 16px;
}

.order-row:not(:last-of-type){
  border-bottom: 1px solid #7d7d7d;
}
</style>
