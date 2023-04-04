<template lang="pug">
div
  v-btn.text-capitalize.align-center( @click="dialog = true" prepend-icon="mdi-plus-circle-outline" variant="tonal" color="info" rounded) New Product
  v-dialog(
      v-model="dialog"
      width="100%"
      max-width="600px"
      persistent
    )
    v-card()
      v-card-title.d-flex.flex-row.align-center.justify-space-between(style="font-size:14px")
        p Add Product
        v-icon.cursor-pointer(@click="dialog = false") mdi-close-circle-outline
      v-card-text
        v-form(ref="form" fast-fail)
          v-text-field.mb-4(v-model="productForm.name" hide-details="auto" variant="outlined" label="Name" density="compact" :rules='rules.not_empty')
          v-textarea.mb-4(v-model="productForm.description" hide-details="auto" variant="outlined" label="Description" density="compact" :rules='rules.not_empty')
          v-row
            v-col(cols="4")
              v-text-field.mb-4(v-model="productForm.price" hide-details="auto" variant="outlined" label="Price" density="compact" type="number" placeholder="0" prefix="RM" :rules='rules.not_empty')
            v-col(cols="4")
              v-text-field.mb-4(v-model="productForm.weight" hide-details="auto" variant="outlined" label="Weight" density="compact" type="number" placeholder="0" suffix="KG" :rules='rules.not_empty')
            v-col(cols="4")
              v-text-field.mb-4(v-model="productForm.stock" hide-details="auto" variant="outlined" label="Stock" density="compact" type="number" placeholder="0" :rules='rules.not_empty')
          v-text-field.mb-4(v-model="productForm.image_url" hide-details="auto" variant="outlined" label="Image URL" density="compact" type="url" :rules='rules.not_empty')
      v-card-actions
        v-spacer
        v-btn( @click="dialog = false" variant="text") Cancel
        v-btn( @click="addProduct" variant="tonal" color="info" :loading="loading") Add
</template>

<script setup>
import axios from 'axios'

const emits = defineEmits(['updateProduct'])

const dialog = ref(false)
const loading =ref(false)
const form = ref(null)
const productForm = ref({
  name: '',
  description: '',
  price: null,
  weight: null,
  stock: null,
  image_url: ''
})

const rules = ref(
  {
    not_empty: [(val) => (val || '').length > 0 || 'This field is required']
  }
)

async function addProduct() {
  loading.value = true
  const validation = await form.value.validate()
  if (!validation.valid) {
    return
  }
  let url = `https://api-test.roketpage.com/items/product_test`

  await axios.post(url,{
    name: productForm.value.name,
    description: productForm.value.description,
    base_price: productForm.value.price,
    base_stock: productForm.value.stock,
    base_weight: productForm.value.weight,
    image: productForm.value.image_url
  })
    .then(response => {
      // Handle successful response
      emits('updateProduct', response.data.data)
    })
    .catch(error => {
      // Handle error
      console.log(error);
    });
  dialog.value = false
  loading.value = false
}
</script>

<style lang="scss" scoped></style>
