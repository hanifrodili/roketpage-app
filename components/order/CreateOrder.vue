<template lang="pug">
div
  v-btn.px-0.outlined-1( @click="dialog = true" variant="tonal" rounded="lg" color="info" height="100%" min-width="40px" )
    v-icon(style="font-size:24px") mdi-plus
  general-dialog-type-a(v-model="dialog" :persistent='true')
    template(v-slot:title)
      p Add Order
    template( v-slot:content )
      v-form(ref="form" fast-fail)
          v-row
            v-col.py-0(cols="12")
              v-text-field.mb-4(v-model="orderForm.name" hide-details="auto" variant="outlined" label="Name" density="compact" :rules='rules.not_empty')
          v-row
            v-col.py-0(cols="12" md="6")
              v-text-field.mb-4(v-model="orderForm.phone" hide-details="auto" variant="outlined" label="Phone" density="compact" type="tel" :rules='rules.not_empty')
            v-col.py-0(cols="12" md="6")
              v-text-field.mb-4(v-model="orderForm.email" hide-details="auto" variant="outlined" label="Email" density="compact" type="email" :rules='rules.not_empty')
          v-row
            v-col.py-0(cols="12")
              v-textarea.mb-4(v-model="orderForm.address" hide-details="auto" variant="outlined" label="Address" density="compact" :rules='rules.not_empty')
          v-row
            v-col.py-0(cols="12" md="4")
              v-text-field.mb-4(v-model="orderForm.postcode" hide-details="auto" variant="outlined" label="Postcode" density="compact" :rules='rules.not_empty' @keyup="getCityState")
            v-col.py-0(cols="12" md="4")
              v-text-field.mb-4(v-model="orderForm.city" hide-details="auto" variant="outlined" label="City" density="compact" :rules='rules.not_empty')
            v-col.py-0(cols="12" md="4")
              v-text-field.mb-4(v-model="orderForm.state" hide-details="auto" variant="outlined" label="State" density="compact" :rules='rules.not_empty')
          v-row
            v-col.py-0(cols="12")
              .d-flex.flex-row.justify-space-between.align-center.pa-2.px-md-5(v-for="(item, index) in selectedProduct" :key="item.id")
                p {{ item.name }}
                general-count-input-delete(v-model="selectedProduct[index].quantity" min="1" @remove="removeProduct(item)")
          v-row
            v-col.py-0(cols="12")
              v-select.mb-4.pa-2.px-md-5(v-model="product" hide-details="auto" variant="underlined" :items="products" item-title="name" item-value="id" return-object placeholder="Select product" @update:model-value="addProduct(product)")
    template( v-slot:action )
      v-btn( @click="dialog = false" variant="text") Cancel
      v-btn( @click="addOrder" variant="tonal" color="info" :loading="loading") Add
</template>

<script setup>
import axios from 'axios'
import postcode from '@/src/postcode'

const emits = defineEmits(['addProduct'])

const snackbar = useSnackbar()
const config = useRuntimeConfig()

const products = ref([])
const product = ref(null)
const selectedProduct = ref([])
const quantity = ref(null)
const dialog = ref(false)
const loading =ref(false)
const form = ref(null)

const stateList = ref([])

const orderForm = ref({
  name: '',
  phone: '',
  email: '',
  address: '',
  postcode: '',
  city: '',
  state: '',
})

const rules = ref(
  {
    not_empty: [(val) => (val || '').length > 0 || 'This field is required']
  }
)

onMounted(async () => {
  await getProduct()
  stateList.value = postcode.getStates()
})

watch(dialog, (updatedDialog) => {
  selectedProduct.value = []
})

function addProduct(e) {
  e.quantity = 0
  selectedProduct.value.push(e)
  products.value = products.value.filter(prod => prod.id != e.id);
  product.value = null
}

function removeProduct(e) {
  selectedProduct.value = selectedProduct.value.filter(prod => prod.id != e.id)
  const { quantity, ...obj } = e
  products.value.push(obj)
  products.value.sort(function (a, b) {
    return a.id - b.id
  });

}

async function getProduct() {
  let url = `${config.public.apiUrl}/items/product_test?lfields[]=*&sort[]=id&filter[status]=true`

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

function getCityState(){
  orderForm.value.city = postcode.findPostcode(orderForm.value.postcode).city
  orderForm.value.state = postcode.findPostcode(orderForm.value.postcode).state
}

async function addOrder() {
  loading.value = true
  const validation = await form.value.validate()
  if (!validation.valid) {
    return
  }
  let url = `https://api-test.roketpage.com/items/order_test`

  // await axios.post(url,{
  //   name: orderForm.value.name,
  //   description: orderForm.value.description,
  //   base_price: orderForm.value.price,
  //   base_stock: orderForm.value.stock,
  //   base_weight: orderForm.value.weight,
  //   image: orderForm.value.image_url
  // })
  //   .then(response => {
  //     // Handle successful response
  //     snackbar.add({
  //       type: 'success',
  //       text: 'New order added !'
  //     })
  //     emits('addProduct', response.data.data)
  //   })
  //   .catch(error => {
  //     // Handle error
  //     snackbar.add({
  //       type: 'error',
  //       text: error.response.data.errors[0].message
  //     })
  //     console.log(error.response.data.errors[0].message);
  //   });
  form.value.reset()
  dialog.value = false
  loading.value = false
}
</script>

<style lang="scss" scoped></style>
