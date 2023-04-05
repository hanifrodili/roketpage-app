<template lang="pug">
div
  v-btn.text-capitalize.align-center( @click="dialog = true" prepend-icon="mdi-plus-circle-outline" variant="tonal" color="info" rounded) New Product
  general-dialog-type-a(v-model="dialog" :persistent='true')
    template(v-slot:title)
      p Add Product
    template( v-slot:content )
      v-form(ref="form" fast-fail)
          v-row
            v-col.py-0(cols="12")
              v-text-field.mb-4(v-model="productForm.name" hide-details="auto" variant="outlined" label="Name" density="compact" :rules='rules.not_empty')
          v-row
            v-col.py-0(cols="12")
              v-textarea.mb-4(v-model="productForm.description" hide-details="auto" variant="outlined" label="Description" density="compact" :rules='rules.not_empty' append-inner-icon="mdi-help-circle-outline" @click:append-inner="descriptionHelpDialog = true")
          v-row
            v-col.py-0(cols="12" md="4")
              v-text-field.mb-4(v-model="productForm.price" hide-details="auto" variant="outlined" label="Price" density="compact" type="number" placeholder="0" prefix="RM" :rules='rules.not_empty')
            v-col.py-0(cols="12" md="4")
              v-text-field.mb-4(v-model="productForm.weight" hide-details="auto" variant="outlined" label="Weight" density="compact" type="number" placeholder="0" suffix="KG" :rules='rules.not_empty')
            v-col.py-0(cols="12" md="4")
              v-text-field.mb-4(v-model="productForm.stock" hide-details="auto" variant="outlined" label="Stock" density="compact" type="number" placeholder="0" :rules='rules.not_empty')
          v-row
            v-col.py-0(cols="12")
              v-text-field.mb-4(v-model="productForm.image_url" hide-details="auto" variant="outlined" label="Image URL" density="compact" type="url" :rules='rules.not_empty' append-inner-icon="mdi-help-circle-outline" @click:append-inner="imageHelpDialog = true")
    template( v-slot:action )
      v-btn( @click="dialog = false" variant="text") Cancel
      v-btn( @click="addProduct" variant="tonal" color="info" :loading="loading") Add

  general-dialog-type-a(v-model="imageHelpDialog" :persistent='true')
    template(v-slot:title)
      p Image URL
    template( v-slot:content )
      ul.px-5
        li Use image from your <a href="https://photos.google.com/" target="_blank">Google Photo</a>. Click your photo, open image in new tab and copy the url.
        li Use <a href="https://imagekit.io/" target="_blank">ImageKit.io</a> to host your image. Upload your image to ImageKit and copy the url.
    template( v-slot:action )
      v-btn( @click="imageHelpDialog = false" variant="tonal") Close
  
  general-dialog-type-a(v-model="descriptionHelpDialog" :persistent='true')
    template(v-slot:title)
      p Product Description
    template( v-slot:content )
      ul.px-5
        li Write detailed information about your product, including its features, benefits, and specifications.
        li You can use <a href="https://chat.openai.com/chat" target="_blank">ChatGPT</a> to help you write better description.
        li Example, "Describe keropok cendawan in 150 characters. Must include keyword organic, fresh, original from my own recipe and premium"
    template( v-slot:action )
      v-btn( @click="descriptionHelpDialog = false" variant="tonal") Close
</template>

<script setup>
import axios from 'axios'

const emits = defineEmits(['updateProduct'])

const dialog = ref(false)
const imageHelpDialog = ref(false)
const descriptionHelpDialog = ref(false)
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
  form.value.reset()
  dialog.value = false
  loading.value = false
}
</script>

<style lang="scss" scoped></style>
