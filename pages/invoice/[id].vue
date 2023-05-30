<template lang="pug">
div.d-flex.justify-center.align-center(style="min-height:100vh; background-color:#dfede8;")
  div(style="max-width:600px; width:100%;")
    v-card.general-card(density="compact")
      general-lottie-loading(v-if="gettingData")
      v-card-text.pa-md-8.pa-2(v-else)
        v-row 
          v-col.text-left(cols="12" md="8")
            div.mb-4
              p(style="font-size:16px;") {{ mainOrder?.company.name }}
              p(style="font-size:12px; color:#ababab") (Reg. Number: {{ mainOrder?.company.reg_number }})
            p(style="font-size:12px;") {{ mainOrder?.company.address }}
              br
              |{{ mainOrder?.company.postcode }}, {{ mainOrder?.company.city }}
              br
              |{{ mainOrder?.company.state }}, {{ mainOrder?.company.country || 'Malaysia' }}
          v-col(cols="12" md="4")
            v-row
              v-col(cols="6" md="12")
                p.font-weight-bold(style="font-size:24px; color:#ababab") Invoice
                p {{ `#${mainOrder?.order_id}` }}
              v-col(cols="6" md="12")
                div.d-flex.justify-center.align-center.rounded-lg(v-if="mainOrder?.customers.paid"  style="height:50px; width:100%; border:1px dashed green")
                  p.font-weight-black(style="font-size:1rem; color:green") PAID
                div.d-flex.justify-center.align-center.rounded-lg(v-if="!mainOrder?.shipping_fee && !mainOrder?.customers.paid" style="height:50px; width:100%; border:1px dashed lightgray")
                  p.font-weight-black(style="font-size:1rem; color:lightgray") Incomplete
                div.d-flex.justify-center.align-center.rounded-lg(v-if="mainOrder?.shipping_fee && !mainOrder?.customers.paid" style="height:50px; width:100%; border:1px dashed red")
                  p.font-weight-black(style="font-size:1rem; color:red") Unpaid
        v-divider.my-5
        v-row.mb-5
          v-col(cols="6")
            p(style="font-size:12px; color:#ababab") Name:
            p {{ mainOrder?.customers.name }}
          v-col(cols="6")
            p(style="font-size:12px; color:#ababab") Phone Number:
            p {{ mainOrder?.customers.phone }}
        div.pa-4.rounded(style="background-color: #ececec; font-size:12px")
          template(v-for="(product, index) in products" :key="index")
            div.d-flex.flex-row.w-100.justify-space-between()
              div.d-flex.flex-row.flex-grow-1
                v-img.mr-3( :src="product.image"
                  max-width="50"
                  width="100%"
                  cover
                  style="aspect-ratio:1"
                  )
                div
                  p.font-weight-medium {{ product.name }}
                  p.font-weight-light(style="font-size:12px") {{ product.base_weight/1000 }}KG
              //- v-spacer
              div.d-flex.flex-row.justify-space-between(style="width: 120px")
                p 
                  span.font-weight-light x
                  |  {{ product.quantity }}
                p.font-weight-medium {{ fCurrency(product.base_price) }}
          v-divider.my-5
          .d-flex.flex-row.align-center
            p.title Subtotal
            v-spacer
            p {{ fCurrency(subTotal) }}
          .d-flex.flex-row.align-center
            p.title Shipping
            v-spacer
            p(v-if="mainOrder?.shipping_fee" ) {{ fCurrency(mainOrder?.shipping_fee) }}
            p.font-italic(style="font-size:12px; color:#ababab" v-else) Please complete your order
          v-divider.my-5
          .d-flex.flex-row.align-center
            p.font-weight-bold Total
            v-spacer
            p.font-weight-bold {{ fCurrency(subTotal+mainOrder?.shipping_fee) }}
    v-btn.w-100.text-capitalize.bg-primary.mt-5(v-if="!mainOrder?.customers.paid" variant="outlined" color="black" append-icon="mdi-cart-check" @click="$router.push(`/checkout/${orderID}`)") Checkout
</template>

<script setup>
const route = useRoute();
const supabase = useSupabaseAuthClient()

const company_id = ref("")
const customer_id = ref("")
const orderID = ref("");
const loading = ref(false)
const gettingData = ref(true)
const stateList = ref([])
const region = ref('')
const products = ref([])
const totalWeight = ref(0)
const subTotal = ref(0)
const total = ref(0)
const paymentChannel = ref([])
const mainOrder = ref(null)
const company_slug = ref('')

const paymentOptions = ref([
  {
    id: 1,
    name: "toyyibPay",
  },
  {
    id: 2,
    name: "billPlz",
  },
  {
    id: 3,
    name: "Bank Transfer",
  },
  {
    id: 4,
    name: "Cash on Delivery",
  }
])

onMounted(async () => {
  const host = window.location.host
  company_slug.value = host.split('.')[0]
  orderID.value = route.params.id;
  await getOrder()
});

const getOrder = async () => {
  // gettingData.value = true
  let { data: order, error } = await supabase
    .from('order')
    .select('*, customers(*, pages(paymentOptions, shippingOptions)), company!inner(*)')
    .eq('order_id', orderID.value)
    .eq('company.subdomain', company_slug.value)
    .single()

  // console.log(order);
  mainOrder.value = order

  for (let index = 0; index < paymentOptions.value.length; index++) {
    const option = paymentOptions.value[index];
    if (order.customers.pages.paymentOptions.includes(option.id)) {
      paymentChannel.value.push(option)
    }
  }

  await getProducts(order.customers.products)
  gettingData.value = false
}

const getProducts = async (data) => {
  let temp = []
  for (let index = 0; index < data.length; index++) {
    const prod = data[index];
    let { data: product } = await supabase
      .from('product')
      .select('*')
      .eq('id', prod.id)
      .single()

    product.quantity = prod.quantity
    temp.push(product)
  }
  products.value = temp
  getTotalWeight(temp)
  getSubTotal(temp)
}

const getTotalWeight = (products) => {
  let weight = 0
  for (let index = 0; index < products.length; index++) {
    const prod = products[index]
    weight += (prod.base_weight * prod.quantity)
  }
  totalWeight.value = weight
}

const getSubTotal = (products) => {
  let total = 0
  for (let index = 0; index < products.length; index++) {
    const prod = products[index]
    total += (prod.base_price * prod.quantity)
  }
  subTotal.value = total
}

const fCurrency = (cent) => {
  const amount = cent / 100
  return amount.toLocaleString('en-MY', { style: 'currency', currencyDisplay: 'symbol', currency: 'myr' });
}

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

const removePhonePrefix = (phoneNumber) => {
  // Check if the number starts with "+60"
  if (phoneNumber.startsWith('+60')) {
    // Remove the "+60" prefix
    return phoneNumber.slice(3);
  } else if (phoneNumber.startsWith('0')) {
    // Remove the leading '0'
    return phoneNumber.slice(1);
  } else {
    return phoneNumber;
  }
}
</script>

<style lang="scss" scoped>
p.title {
  color: #767676
}

:deep(.v-radio)>* {
  opacity: 1;
}
</style>
