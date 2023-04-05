<template lang="pug">
div.py-8
  //- h2.pa-0.mb-3 {{ $t('dashboard') }}
  v-card.card
    div.d-flex.flex-row.align-center.mb-3
      h2.pa-0(style="font-size:20px") {{ $t('latestorder',{number: 5}) }}
      v-btn(icon="mdi-open-in-new" variant="text" size="small" @click="$router.push(`/order`)")
    v-table(style="background-color:transparent")
      tbody
        tr(v-for="order in orders" :key="order.id")
          td.px-0.order-row
            order-item-order-simple(:order="order")
</template>

<script setup>
import axios from 'axios'

const config = useRuntimeConfig()

const orders = ref([])

onMounted(async () => {
  await axios.get(`${config.public.apiUrl}/items/order_test?limit=5&fields[]=*&sort[]=id&filter[status]=new`)
    .then(response => {
      // Handle successful response
      orders.value = response.data.data
    })
    .catch(error => {
      // Handle error
      console.log(error);
    });
})
</script>
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
