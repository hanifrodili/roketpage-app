<template lang="pug">
.PageForm.d-flex.flex-column()
  v-divider.mb-4
  p.font-weight-bold Fill form below
  v-form(ref="form")
    template(v-for="(input, index) in inputFields" :key="index")
      v-text-field.mb-4(v-model="inputs[index].field_value" v-if="input?.enabled && input?.field_type !== 'dropdown'"  variant="outlined" :label="input?.field_name" :type="input?.field_type" density="compact" hide-details="auto" :prefix="input?.field_type === 'tel' ? '+60' : ''" :rules="input?.field_type === 'number' ? rules.not_zero : rules.not_empty")
      v-select.mb-4(v-model="inputs[index].field_value" v-if="input?.enabled && input?.field_type === 'dropdown'"  variant="outlined" :label="input?.field_name" :items="input?.field_option" density="compact" hide-details="auto" :rules="rules.not_empty")

  div.d-flex.flex-column.product-card(v-for="(id, index) in products" :key="index")
    div.d-flex.flex-row
      img(:src="getProduct(id)?.image" alt="product image" height="100" width="100" style="object-fit: cover; object-position: center;")
      div.d-flex.flex-column.product-info
        p.title {{ getProduct(id)?.name }}
        p.description {{ getProduct(id)?.description }}
    div.d-flex.flex-row.px-5.py-3.justify-space-between.align-center
      p.font-weight-bold {{ fCurrency(getProduct(id)?.base_price) }}
      general-count-input-normal(v-model="selectedProducts[index].quantity" min="0")
  //- p {{ inputs }}
  div.d-flex.flex-row.justify-space-between.align-center(style="gap:12px")
    v-btn.flex-grow-1.text-capitalize(variant="flat" color="#25d366" prepend-icon="mdi-whatsapp" :loading="loading") WhatsApp
    v-btn.flex-grow-1.text-capitalize(variant="flat" color="light-blue-darken-2" :prepend-icon="type === 'Payment' ? 'mdi-cash-register' :'mdi-send'" @click="submit" :loading="loading") {{ type === 'Payment' ? 'Checkout' :'Submit' }}
    
</template>

<script setup>
const props = defineProps(['form', 'products', 'type', 'company'])
const supabase = useSupabaseAuthClient()
const userStore = useStoreUser()
const snackbar = useSnackbar()
const router = useRouter()
const form = ref(null)
const productList = ref([])
const company_id = ref("")
const inputFields = ref([])
const inputs = ref([])
const loading = ref(false)
const selectedProducts = ref([
  {
    id: null,
    quantity: 0
  }
])

const rules = ref(
  {
    not_empty: [(val) => (val || '').length > 0 || 'This field is required'],
    not_zero: [(val) => val > 0 || 'This field is required']
  }
)


onMounted(async () => {
  userStore.getUser()
  company_id.value = props.company
  props.products.forEach((product, index) => {
    if (selectedProducts.value[index]) {
      selectedProducts.value[index].id = product
    }else{
      selectedProducts.value.push(
        {
          id: product,
          quantity: 0
        }
      )
    }
  });
  console.log(selectedProducts.value);
  await getProducts()
  setTimeout(() => {
    sortInput()
  }, 500);
})

const getProducts = async () => {
  let { data: product, error, count } = await supabase
    .from('product')
    .select('*', { count: "exact" })
    .eq('company_id', company_id.value)
    .eq('published', true)

  productList.value = product
}

const getProduct = (id) => {
  return productList.value.find(x => x.id === id)
}

const sortInput = () => {
  const name = props.form.find(x => x.field_name === 'name')
  const phone = props.form.find(x => x.field_name === 'phone')
  const email = props.form.find(x => x.field_name === 'email')
  const arr = [name, phone, email]
  // console.log(props.form);
  props.form.forEach(input => {
    if (!arr.includes(input)) {
      arr.push(input)
    }
  });
  inputFields.value = arr
  inputs.value = []
  arr.forEach(input => {
    inputs.value.push({
      company_id: input.company_id,
      page_slug: input.page_slug,
      field_name: input.field_name,
      field_type: input.field_type,
      field_value: null,
      field_position: input.field_position
    })
  });
}

const  fCurrency = (cent) => {
  const amount = cent / 100
  return amount.toLocaleString('en-MY', { style: 'currency', currencyDisplay: 'symbol', currency: 'myr' });
}

const submit = async () => {
  loading.value = true
  const name = inputs.value[0]
  const phone = inputs.value[1]
  const email = inputs.value[2]

  const validation = await form.value.validate()
  if (!validation.valid) {
    loading.value = false
    return
  }

  if (selectedProducts.value[0].quantity < 1) {
    snackbar.add({
      type: 'error',
      text: 'Please choose product quantity!'
    })
    loading.value = false
    return
  }

  const resp = await supabase
    .from('customers')
    .insert([
      { 
        created_at: 'now()',
        status: 'new',
        name: name.field_value,
        phone: sanitizePhoneNumber(phone.field_value),
        email: email.field_value,
        paid: false,
        company_id: company_id.value,
        page_slug: name.page_slug,
        products: selectedProducts.value
      }
    ])
    .select()

  // console.log(resp);

  if (resp.status === 201) {
    inputs.value.forEach(async (field, index) => {
      if (field.field_position > 2) {
        await supabase
          .from('customers_extra_field')
          .insert([
            {
              customer_id: resp.data[0].id,
              company_id: field.company_id,
              page_slug: field.page_slug,
              field_name: field.field_name,
              field_position: index,
              field_type: field.field_type,
              field_value: field.field_value
            },
          ])
      }
    });

    if (props.type === 'Payment') {
      const orderID = randID(7)
      await supabase
        .from('order')
        .insert([
          {
            created_at: 'now()',
            customer_id: resp.data[0].id,
            company_id: company_id.value,
            order_id: orderID
          },
        ])
      
      router.push(`/checkout/${orderID}`)
    }

    snackbar.add({
      type: 'success',
      text: 'Submitted!'
    })
  }

  form.value.reset()
  loading.value = false
}

const randID = (len) => {
  var length = len;
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const sanitizePhoneNumber = (phoneNumber) => {
  // Remove any non-digit characters
  const sanitizedNumber = phoneNumber.replace(/\D/g, '');

  // Check if the number starts with "+60"
  if (sanitizedNumber.startsWith('+60')) {
    return sanitizedNumber;
  } else if (sanitizedNumber.startsWith('0')) {
    // Remove the leading '0' and add "+60" to the beginning of the number
    return '+60' + sanitizedNumber.slice(1);
  } else {
    // Add "+60" to the beginning of the number
    return '+60' + sanitizedNumber;
  }
}

const testLog = (e) => {
  console.log(e); 
}
</script>

<style lang="scss" scoped>
.PageForm{
  gap: 16px;
  padding: 20px 16px;
  max-width: 800px;
  margin: auto;
}

.product-card{
  border: 1px solid rgba(171,171,171, 0.5);
  border-radius: 8px;
  overflow: hidden;
  gap: 0px;
  // height: 100px;
}

.product-info{
  padding: 12px;
  gap:4px;

  .title{
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;  
    overflow: hidden;
  }

  .description{
    font-size: 10px;
    font-weight: 400;
    line-height: normal;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;  
    overflow: hidden;
  }
}

:deep(.v-field-label){
  text-transform: capitalize;
}
</style>
