<template lang="pug">
div
  v-btn(icon="mdi-file-edit-outline", variant="text", size="small" @click="dialog=true")
  general-dialog-type-a(v-model="dialog", persistent)
    template(v-slot:title)
      p Edit Address
    template( v-slot:content )
      v-form(ref="form" fast-fail)
          //- v-row
          //-   v-col.py-0(cols="12")
          //-     v-text-field.mb-4(v-model="orderForm.name" hide-details="auto" variant="outlined" label="Name" density="compact" :rules='rules.not_empty')
          //- v-row
          //-   v-col.py-0(cols="12" md="6")
          //-     v-text-field.mb-4(v-model="orderForm.phone" hide-details="auto" variant="outlined" label="Phone" density="compact" type="tel" :rules='rules.not_empty')
          //-   v-col.py-0(cols="12" md="6")
          //-     v-text-field.mb-4(v-model="orderForm.email" hide-details="auto" variant="outlined" label="Email" density="compact" type="email" :rules='rules.not_empty')
          v-row
            v-col.py-0(cols="12")
              v-text-field.mb-4(v-model="orderForm.address_1" hide-details="auto" variant="outlined" label="Address 1" density="compact" :rules='rules.not_empty')
          v-row
            v-col.py-0(cols="12")
              v-text-field.mb-4(v-model="orderForm.address_2" hide-details="auto" variant="outlined" label="Address 2" density="compact")
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
              
    template( v-slot:action )
      v-btn( @click="dialog = false" variant="text") Cancel
      v-btn( @click="updateOrder" variant="tonal" color="info" :loading="loading") Add
</template>

<script setup>
import postcode from '@/src/postcode'

const emits = defineEmits(["updateOrder"]);
const props = defineProps(["order", "productList"])

const supabase = useSupabaseAuthClient()
const snackbar = useSnackbar()

const products = ref([])
const product = ref(null)
const selectedProduct = ref([])
const quantity = ref(null)
const dialog = ref(false)
const loading =ref(false)
const form = ref(null)

const stateList = ref([])

const orderForm = ref({
  // name: '',
  // phone: '',
  // email: '',
  address_1: '',
  address_2: '',
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
  orderForm.value = {
    // name: props.order.name,
    // phone: props.order.phone,
    // email: props.order.email,
    address_1: props.order.address_1,
    address_2: props.order.address_2,
    postcode: props.order.postcode,
    city: props.order.city,
    state: props.order.state,
  }
})

watch(dialog, (updatedDialog) => {
  selectedProduct.value = []
})

const updateOrder = async () => {
  loading.value = true;
  const validation = await form.value.validate();
  if (!validation.valid) {
    return;
  }

  console.log(orderForm.value);

  const resp = await supabase
    .from('order')
    .update([
      {
        // name: '',
        // phone: '',
        // email: '',
        address_1: orderForm.value.address_1,
        address_2: orderForm.value.address_2,
        postcode: orderForm.value.postcode,
        city: orderForm.value.city,
        state: orderForm.value.state,
      }
    ])
    .eq('id', props.order.id)

  if (resp.status === 204) {
    emits('updateOrder')
  }
  dialog.value = false;
  loading.value = false;
}

const getProduct = (id) => {
  return props.productList.find(x => x.id === id)
}

function getCityState(){
  orderForm.value.city = postcode.findPostcode(orderForm.value.postcode).city
  orderForm.value.state = postcode.findPostcode(orderForm.value.postcode).state
}
</script>

<style lang="scss" scoped></style>
