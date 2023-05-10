<template lang="pug">
.PageForm.d-flex.flex-column()
  v-divider.mb-4
  p.font-weight-bold Fill form below
  template(v-for="(input, index) in inputs" :key="index")
    //- p {{ input }}
    v-text-field(v-if="input.published && input.field_type !== 'dropdown'"  variant="outlined" :label="input.field_name" :type="input.field_type" density="compact" hide-details="auto")
    v-select(v-if="input.published && input.field_type === 'dropdown'"  variant="outlined" :label="input.field_name" :items="input.field_option" density="compact" hide-details="auto")

  div.d-flex.flex-column.product-card(v-for="(id, index) in products" :key="index")
    div.d-flex.flex-row
      img(:src="getProduct(id)?.image" alt="product image" height="100" width="100" style="object-fit: cover; object-position: center;")
      div.d-flex.flex-column.product-info
        p.title {{ getProduct(id)?.name }}
        p.description {{ getProduct(id)?.description }}
    div.d-flex.flex-row.px-5.py-3.justify-space-between.align-center
      p.font-weight-bold {{ fCurrency(getProduct(id)?.base_price) }}
      general-count-input-normal(min="0")
  div.d-flex.flex-row.justify-space-between.align-center(style="gap:12px")
    v-btn.flex-grow-1.text-capitalize(variant="flat" color="#25d366" prepend-icon="mdi-whatsapp") WhatsApp
    v-btn.flex-grow-1.text-capitalize(v-if="type === 'Payment'" variant="flat" color="light-blue-darken-2" prepend-icon="mdi-cash-register") Checkout
    v-btn.flex-grow-1.text-capitalize(v-else variant="flat" color="light-blue-darken-2" prepend-icon="mdi-send") Submit
    
</template>

<script setup>
const props = defineProps(['form', 'products', 'type'])
const supabase = useSupabaseAuthClient()
const userStore = useStoreUser()

const productList = ref([])
const company_id = ref("")
const inputs = ref([])

onMounted(() => {
  userStore.getUser()
  company_id.value = userStore.user.current_company.id

  getProducts()
  sortInput()
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

  inputs.value = arr
}

const  fCurrency = (cent) => {
  const amount = cent / 100
  return amount.toLocaleString('en-MY', { style: 'currency', currencyDisplay: 'symbol', currency: 'myr' });
}
</script>

<style lang="scss" scoped>
.PageForm{
  gap: 16px;
  padding: 40px 16px;
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
