<template lang="pug">
div
  v-card.card
    v-card-text.d-flex.flex-column.justify-space-between.pa-0
      template(v-for="(product, index) in products" :key="product.id")
        product-item-product(:product="product")
</template>

<script setup>
import axios from 'axios'

const products = ref([])

onMounted(async () => {
  await getData()
})

async function getData() {
  let url = `https://api-test.roketpage.com/items/product_test?fields[]=*&sort[]=id`

  await axios.get(url)
    .then(response => {
      // Handle successful response
      products.value = response.data.data
    })
    .catch(error => {
      // Handle error
      console.log(error);
    });
}
</script>
<style lang="scss" scoped>
.card{
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 8px;
  // align-items: center;
  // justify-content: center;
  // box-shadow: 0px 2px 4px -1px rgb(34 34 34 / 50%);
  box-shadow: none;
  min-height: 400px;
  height: fit-content;
  height: 100%;
  border: .5px solid #ababab;
  border-radius: 8px;
}
</style>
