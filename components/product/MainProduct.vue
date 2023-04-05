<template lang="pug">
div
  div.d-flex.flex-row.mb-4
    product-create-product.ml-auto(@update-product="addProduct")
  v-card.card
    v-card-text.d-flex.flex-column.justify-space-between.pa-0
      template(v-for="(product, index) in products" :key="product.id")
        product-item-product(:product="product" @update-publish="updatePublish")
</template>

<script setup>
import axios from 'axios'

const config = useRuntimeConfig()

const snackbar = useSnackbar()

const products = ref([])

onMounted(async () => {
  await getData()
})

async function getData() {
  let url = `${config.public.apiUrl}/items/product_test?fields[]=*&sort[]=id`

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

function addProduct(e){
  e.status = 'true'
  // console.log(e);
  products.value.push(e)
}

async function updatePublish(e) {
  let url = `${config.public.apiUrl}/items/product_test/${e.id}`

  let text

  if (e.value) {
    text = 'published'
  }else{
    text = 'changed to draft'
  }

  await axios.patch(url, { status: e.value })
    .then(response => {
      // Handle successful response
      snackbar.add({
        type: 'success',
        text:`${response.data.data.name} ${text}.`
      })
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
