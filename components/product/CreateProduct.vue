<template lang="pug">
div
  v-btn.px-0.outlined-1( @click="dialog = true" variant="tonal" rounded="lg" color="info" height="100%" min-width="40px" )
    v-icon(style="font-size:24px") mdi-plus
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
      v-img.mt-2.rounded-lg(v-if="productForm.image_url" :src="productForm.image_url")
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
        li Example, "Describe keropok cendawan in 100 characters. Must include keyword organic, fresh, original from my own recipe and premium"
    template( v-slot:action )
      v-btn( @click="descriptionHelpDialog = false" variant="tonal") Close
</template>

<script setup>
import { useStoreUser } from '~/store/storeMerchant'

const emits = defineEmits(['addProduct'])

const supabase = useSupabaseAuthClient();
const snackbar = useSnackbar()
const userStore = useStoreUser()

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
    loading.value = false
    return
  }

  userStore.getUser()
  
  const resp = await supabase
    .from('product')
    .insert([
      {
        name: productForm.value.name,
        description: productForm.value.description,
        base_price: productForm.value.price * 100, //convert to sen, RM1 = 100sen
        base_stock: productForm.value.stock,
        base_weight: productForm.value.weight * 1000, //combert to gram, 1KG = 1000gram
        image: productForm.value.image_url,
        company_id: userStore.user.current_company.id
      },
    ])

  // console.log(resp);

  if (resp.status === 201) {
    snackbar.add({
      type: 'success',
      text: 'New product added !'
    })
    emits('addProduct', true)
  }

  if (resp.error) {
    snackbar.add({
      type: 'error',
      text: resp.error
    })
  }
  form.value.reset()
  dialog.value = false
  loading.value = false
}
</script>

<style lang="scss" scoped></style>
