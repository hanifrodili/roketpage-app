<template lang="pug">
div(style="min-height:100vh; background-color:#dfede8;")
  div.mx-auto(style="max-width:600px; width:100%;")
    p.mb-5
      span(style="color:#767676") Order
      |  {{ `#${orderID}` }}
    v-card.general-card.mb-5(  )
      v-card-text
        div.d-flex.flex-row.w-100.align-center.mb-4
          p.mb-4 Recipient Details
          v-spacer
          v-btn(v-if="recipient_completed"  @click="editRecipient = !editRecipient" :icon="editRecipient ? 'mdi-close' : 'mdi-pencil'" variant="outlined" size="x-small")
        div(v-if="gettingData")
          v-row.mb-3()
            v-col.py-0(cols="3")
              div.skeleton.skeleton-text()
            v-col.py-0(cols="9")
              div.skeleton.skeleton-text()
          v-row.mb-3()
            v-col.py-0(cols="3")
              div.skeleton.skeleton-text()
            v-col.py-0(cols="9")
              div.skeleton.skeleton-text()
          v-row()
            v-col.py-0(cols="3")
              div.skeleton.skeleton-text()
            v-col.py-0(cols="9")
              div.skeleton.skeleton-text()
        div(v-if="!editRecipient && recipient_completed && !gettingData")
          v-row.mb-3(no-gutters="")
            v-col(cols="3")
              p.title Name:
            v-col(cols="9")
              p {{ customerForm.name }}
          v-row.mb-3(no-gutters="")
            v-col(cols="3")
              p.title Phone:
            v-col(cols="9")
              p {{ `+60${customerForm.phone}` }}
          v-row(no-gutters="")
            v-col(cols="3")
              p.title Email:
            v-col(cols="9")
              p {{ customerForm.email }}
        v-form(ref="formCustomer" v-if="editRecipient || !recipient_completed && !gettingData" )
          v-row
            v-col.py-0(cols="12")
              v-text-field.mb-2(v-model="customerForm.name" variant="outlined" density="compact" hide-details="auto" placeholder="Name")
          v-row
            v-col.py-0(cols="12")
              v-text-field.mb-2(v-model="customerForm.phone" variant="outlined" density="compact" hide-details="auto" placeholder="Phone Number" type="tel" prefix="+60")
          v-row
            v-col.py-0(cols="12")
              v-text-field.mb-2(v-model="customerForm.email" variant="outlined" density="compact" hide-details="auto" placeholder="Email" type="email")
          v-row
            v-col.py-0(cols="12")
              v-btn.w-100.text-capitalize.bg-primary(variant="outlined" color="black" @click="submitRecipient") Save

    v-card.general-card.mb-5(  )
      v-card-text
        div.d-flex.flex-row.w-100.align-center.mb-4
          p.mb-4 Shipping Address
          v-spacer
          v-btn(v-if="shipping_completed"  @click="editShipping = !editShipping" :icon="editShipping ? 'mdi-close' : 'mdi-pencil'" variant="outlined" size="x-small")
        div(v-if="gettingData")
          v-row.mb-3()
            v-col.py-0(cols="3")
              div.skeleton.skeleton-text()
            v-col.py-0(cols="9")
              div.skeleton.skeleton-text()
          v-row.mb-3()
            v-col.py-0(cols="3")
              div.skeleton.skeleton-text()
            v-col.py-0(cols="9")
              div.skeleton.skeleton-text()
          v-row()
            v-col.py-0(cols="3")
              div.skeleton.skeleton-text()
            v-col.py-0(cols="9")
              div.skeleton.skeleton-text()

        div(v-if="!editShipping && shipping_completed && !gettingData")
          v-row.mb-3(no-gutters="")
            v-col(cols="3")
              p.title Address:
            v-col(cols="9")
              p {{ shippingForm.address_1 }}
                br(v-if="shippingForm.address_2" )
                |{{ shippingForm.address_2 }}
                br
                |{{ shippingForm.postcode }}, {{ shippingForm.city }}
                br
                |{{ shippingForm.state }}, {{ shippingForm.country }}
          v-row.mb-3(no-gutters="")
            v-col(cols="3")
              p.title Courier:
            v-col(cols="9")
              p {{ shippingForm.courier }} - {{ fCurrency(shippingForm.shipping_fee) }}
        v-form(ref="formShipping" v-if="editShipping || !shipping_completed && !gettingData")
          v-row
            v-col.py-0(cols="12")
              v-text-field.mb-2(v-model="shippingForm.address_1" hide-details="auto" variant="outlined" placeholder="Address 1" density="compact" :rules='rules.not_empty')
          v-row
            v-col.py-0(cols="12")
              v-text-field.mb-2(v-model="shippingForm.address_2" hide-details="auto" variant="outlined" placeholder="Address 2" density="compact")
          v-row
            v-col.py-0(cols="12" md="4")
              v-text-field.mb-2(v-model="shippingForm.postcode" hide-details="auto" variant="outlined" placeholder="Postcode" density="compact" :rules='rules.not_empty' @update:model-value="getCityState")
            v-col.py-0(cols="12" md="4")
              v-text-field.mb-2(v-model="shippingForm.city" hide-details="auto" variant="outlined" placeholder="City" density="compact" :rules='rules.not_empty')
            v-col.py-0(cols="12" md="4")
              v-text-field.mb-2(v-model="shippingForm.state" hide-details="auto" variant="outlined" placeholder="State" density="compact" :rules='rules.not_empty' @update:model-value="getCourier()")
          v-divider.my-8
          v-row(v-if="shippingForm.state")
            v-col.py-0(cols="12")
              p Shipping Courier
              v-radio-group(v-model="shippingForm.courier")
                v-radio(v-for="(courier, index) in courierList" :key="index" :value="courier.name" @click="shippingForm.shipping_fee = courier.rate")
                  template(v-slot:label)
                    div.d-flex.flex-row.w-100
                      p {{ courier.name }}
                      v-spacer
                      p {{ fCurrency(courier.rate) }}
          v-row()
            v-col.py-0(cols="12")
              v-btn.w-100.text-capitalize.bg-primary(variant="outlined" color="black" @click="submitShipping") Save

    v-card.general-card.mb-5(  )
      v-card-text
        div.d-flex.flex-row.w-100.align-center.mb-4
          p.mb-4 Payment Channel
        //- p {{ paymentChannel }}
        v-radio-group(v-model="selectedPayment" @update:model-value="submitPaymentMethod")
          v-radio(v-for="(channel, index) in paymentChannel" :key="index" :value="channel.id")
            template(v-slot:label)
              v-img(v-if="channel.id === 1" src="/img/gateway/toyyibpay.svg" max-width="100")
              div.d-flex.flex-row(v-if="channel.id === 3")
                p.mr-3(style="color: black") {{ channel.name }}
                v-icon mdi-bank-transfer
            

    v-card.general-card.mb-5(  )
      v-card-text
        div.d-flex.flex-row.w-100.align-center.mb-4
          p.mb-4 Order Details
          v-spacer
          v-btn(@click="editProduct = !editProduct" :icon="editProduct ? 'mdi-close' : 'mdi-pencil'" variant="outlined" size="x-small")
        
        template(v-for="(product, index) in products" :key="index")
          div.d-flex.flex-row.w-100.justify-space-between
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
            div.d-flex.flex-row.justify-space-between(style="width: 120px" v-if="!editProduct")
              p 
                span.font-weight-light x
                |  {{ product.quantity }}
              p.font-weight-medium {{ fCurrency(product.base_price) }}
            general-count-input-normal(
              v-if="editProduct" 
              v-model="customerForm.products[index].quantity"
              min="1"
              @update:model-value="updateProduct(product)"
            )
        v-divider.my-5
        .d-flex.flex-row.align-center
          p.title Subtotal
          v-spacer
          p {{ fCurrency(subTotal) }}
        .d-flex.flex-row.align-center
          p.title Shipping
          v-spacer
          p {{ fCurrency(shippingForm.shipping_fee) }}
        v-divider.my-5
        .d-flex.flex-row.align-center
          p.font-weight-bold Total
          v-spacer
          p.font-weight-bold {{ fCurrency(subTotal+shippingForm.shipping_fee) }}
    v-btn.w-100.text-capitalize.bg-primary(variant="outlined" color="black" append-icon="mdi-progress-check" @click="proceedPayment") Proceed to Pay
</template>

<script setup>
import axios from "axios"
import postcode from '@/src/postcode'

const route = useRoute();
const supabase = useSupabaseAuthClient()
const snackbar = useSnackbar()

const company_id = ref("")
const customer_id = ref("")
const orderID = ref("");
const loading = ref(false)
const gettingData = ref(true)
const editRecipient = ref(false)
const editShipping = ref(false)
const editProduct = ref(false)
const stateList = ref([])
const recipient_completed = ref(false)
const shipping_completed = ref(false)
const region = ref('')
const products = ref([])
const totalWeight = ref(0)
const subTotal = ref(0)
const total = ref(0)
const courierList = ref([])
const paymentChannel = ref([])
const mainOrder = ref(null)
const selectedPayment = ref(null)
const toyyibPay_details = ref(null)
const company_slug = ref('')
const rules = ref(
  {
    not_empty: [(val) => (val || '').length > 0 || 'This field is required']
  }
)

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

const customerForm = ref(
  {
    name: '',
    phone: '',
    email: '',
    products: []
  }
)

const shippingForm = ref(
  {
    address_1: '',
    address_2: '',
    postcode: '',
    city: '',
    state: '',
    country: 'Malaysia',
    courier: '',
    shipping_fee: ''
  }
)

watch(
  () => shippingForm.value.state,
  async (state) => {
    if ((['Sabah', 'Sarawak']).includes(state)) {
      region.value = 'ss'
    }else{
      region.value = 'sm'
    }
    
    if (state) {
      await getCourier()
    }
  }
)

onMounted(async () => {
  console.log(window.location);
  const host = window.location.host
  company_slug.value = host.split('.')[0]
  orderID.value = route.params.id;
  await getOrder()
  stateList.value = postcode.getStates()
});

const getOrder = async () => {
  // gettingData.value = true
  let { data: order, error } = await supabase
    .from('order')
    .select('*, customers(*, pages(paymentOptions, shippingOptions))')
    .eq('order_id', orderID.value)
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

    selectedPayment.value = order.payment_method

    customer_id.value = order.customers.id
    company_id.value = order.company_id
  
    customerForm.value.name = order.customers.name
    customerForm.value.phone = removePhonePrefix(order.customers.phone)
    customerForm.value.email = order.customers.email
    customerForm.value.products = order.customers.products

    if (customerForm.value.name && customerForm.value.phone && customerForm.value.email) {
      recipient_completed.value = true
    }else{
      editRecipient.value = true
    }
    
    shippingForm.value.address_1 = order.address_1
    shippingForm.value.address_2 = order.address_2
    shippingForm.value.postcode = order.postcode
    shippingForm.value.city = order.city
    shippingForm.value.state = order.state
    shippingForm.value.courier = order.courier
    shippingForm.value.shipping_fee = order.shipping_fee

    if ((['Sabah', 'Sarawak']).includes(order.state)) {
      region.value = 'ss'
    } else {
      region.value = 'sm'
    }

    if (order.state) {
      await getCourier()
    }

    if (shippingForm.value.address_1 && shippingForm.value.postcode && shippingForm.value.city && shippingForm.value.state) {
      shipping_completed.value = true
    }else{
      editShipping.value = true
    }
  gettingData.value = false
}

const submitRecipient = async () => {
  // console.log(customerForm.value); 
  const resp = await supabase
    .from('customers')
    .update([
      {
        name: customerForm.value.name,
        phone: sanitizePhoneNumber(customerForm.value.phone),
        email: customerForm.value.email
      }
    ])
    .eq('id', customer_id.value)
  // console.log(resp);
  if (resp.status === 204) {
    editRecipient.value = false
    if (customerForm.value.name && customerForm.value.phone && customerForm.value.email) {
      recipient_completed.value = true
    }
  }
}

const submitShipping = async () => {
  const resp = await supabase
    .from('order')
    .update([
      {
        address_1: shippingForm.value.address_1,
        address_2: shippingForm.value.address_2,
        postcode: shippingForm.value.postcode,
        city: shippingForm.value.city,
        state: shippingForm.value.state,
        country: shippingForm.value.country,
        courier: shippingForm.value.courier,
        shipping_fee: shippingForm.value.shipping_fee,
        payment: subTotal.value + shippingForm.value.shipping_fee
      }
    ])
    .eq('order_id', orderID.value)
  // console.log(resp);
  if (resp.status === 204) {
    editShipping.value = false
    if (shippingForm.value.address_1 && shippingForm.value.postcode && shippingForm.value.city && shippingForm.value.state) {
      shipping_completed.value = true
    }
  }
}

const submitPaymentMethod = async () => {
  // console.log(customerForm.value); 
  const resp = await supabase
    .from('order')
    .update([
      {
        payment_method: selectedPayment.value,
        payment: subTotal.value + shippingForm.value.shipping_fee
      }
    ])
    .eq('order_id', orderID.value)
}

const updateProduct = async (current) => {
  for (let index = 0; index < customerForm.value.products.length; index++) {
    const prod = customerForm.value.products[index];
    if (prod.id === current.id) {
      if (prod.quantity && prod.quantity !== current.quantity) {
        products.value[index].quantity = prod.quantity
        getSubTotal(products.value)
        const resp = await supabase
          .from('customers')
          .update([
            {
              products: customerForm.value.products
            }
          ])
          .eq('id', customer_id.value)
        // console.log(resp);
        if (resp.status === 204) {
          getTotalWeight(products.value)
          await getCourier()
          for (let index = 0; index < courierList.value.length; index++) {
            const courier = courierList.value[index];
            if (courier.name === shippingForm.value.courier) {
              shippingForm.value.shipping_fee = courier.rate
            }
          }

          const resp = await supabase
            .from('order')
            .update([
              {
                shipping_fee: shippingForm.value.shipping_fee,
              }
            ])
            .eq('order_id', orderID.value)
          if (resp.status === 204) {
            snackbar.add({
              type: 'success',
              text: `${current.name} updated!`
            })
          }
        }
      }
    }
  }
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

const getCourier = async () => {
  let { data: courier, error } = await supabase
    .from('shipping_details')
    .select('*')
    .eq('company_id', company_id.value)
    .eq('region', region.value)
    .eq('enabled', true)
  courierList.value  = []
  for (let index = 0; index < courier.length; index++) {
    const item = courier[index];
    if (mainOrder.value.customers.pages.shippingOptions.includes(item.id)) {
      for (let index = 0; index < item.rates.length; index++) {
        const rate = item.rates[index];
        if (rate.min <= totalWeight.value && totalWeight.value <= rate.max) {
          courierList.value.push({
            name: item.courier_name,
            rate: rate.rate
          })
        }
      }
    }
  }
}

const proceedPayment = async () => {
  console.log(selectedPayment.value);
  if (selectedPayment.value === 1) {
    let { data: toyyibpay } = await supabase
      .from('toyyibpay_gateway')
      .select('*')
      .eq('company_id', company_id.value)
      .single()

    console.log(toyyibpay);
    let headersList = {
      "Accept": "*/*",
      "Content-Type": "application/x-www-form-urlencoded"
    }

    let bodyContent = `userSecretKey=${toyyibpay.secret_key}`
    bodyContent +=`&categoryCode=${toyyibpay.category_code}`
    bodyContent += `&billName=Product Payment`
    bodyContent += `&billDescription=Payment by ${customerForm.value.name}`
    bodyContent += `&billPriceSetting=1`
    bodyContent += `&billPayorInfo=1`
    bodyContent += `&billAmount=${subTotal.value + shippingForm.value.shipping_fee}`
    bodyContent += `&billReturnUrl=${window.location.origin}/payment_complete`
    bodyContent += `&billCallbackUrl=${window.location.origin}/payment_complete`
    bodyContent += `&billExternalReferenceNo=${customer_id.value}`
    bodyContent += `&billTo=${customerForm.value.name}`
    bodyContent += `&billEmail=${customerForm.value.email}`
    bodyContent += `&billPhone=0${customerForm.value.phone}`
    bodyContent += `&billSplitPayment=0`
    bodyContent += `&billSplitPaymentArgs=`
    let c = null
    if (toyyibpay.fpx) {
      c = 0
    }
    else if (!toyyibpay.fpx && toyyibpay.card) {
      c = 1
    }
    else if(toyyibpay.fpx && toyyibpay.card) {
      c = 2
    }
    bodyContent += `&billPaymentChannel=${c}`
    bodyContent += `&billContentEmail=Thank you for purchasing our product!`
    bodyContent += `&billChargeToCustomer=${toyyibpay.pass_tx_fee}`
    bodyContent += `&billExpiryDate=`
    bodyContent += `&billExpiryDays=${toyyibpay.bill_validity}`

    let reqOptions = {
      url: "https://dev.toyyibpay.com/index.php/api/createBill",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    }

    let response = await axios.request(reqOptions);
    console.log(response);
    if (response.status === 200) {
      await supabase
        .from('customers')
        .update([
          {
            bill_code: response.data[0].BillCode
          }
        ])
        .eq('id', customer_id.value)
      window.location.replace(`https://dev.toyyibpay.com/${response.data[0].BillCode}`)
    }
  }
}

const getCityState = (e) => {
  if (e.length === 5) {
    shippingForm.value.city = postcode.findPostcode(e).city
    shippingForm.value.state = postcode.findPostcode(e).state
  }else{
    shippingForm.value.city = ''
    shippingForm.value.state = ''
  }
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

:deep(.v-radio) > * {
  opacity: 1;
}
</style>
