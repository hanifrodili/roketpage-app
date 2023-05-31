<template lang="pug">
div
  div.d-flex.pa-2.pa-md-4.flex-column(style="font-size:13px")
    div.d-flex.flex-row()
      div.d-flex.flex-column.w-100
        div.d-flex.flex-row.mb-2(style="" )
          p.cursor-pointer(@click="openMore = true")
            span.text-decoration-none(style="color:#767676") {{ `#${order.customer_id}` }}
            |  
            span.text-decoration-underline.font-weight-bold {{ order.customers.name }}
          v-spacer
          v-chip.text-capitalize(style="max-width:fit-content; width:100%; height: 20px; font-weight:bold; font-size:10px" :ripple="false" :color="statusColor(order.status)") {{ order.status }}
        div.d-flex.flex-row.flex-wrap.w-100(style="gap:5px;" )
          p {{ order.customers.phone }}
          img(src="/img/ver-divider.svg" )
          p {{ order.customers.email }}

    div.d-flex.justify-space-between.flex-column
      p.mb-1(style="color:#767676; font-size:12px") {{ fDate(order.created_at) }} at {{ fTime(order.created_at) }}
      div.d-flex.flex-column.flex-grow-1.justify-start()
        v-expansion-panels(variant="accordion" plain)
          v-expansion-panel(plain)
            v-expansion-panel-title.pa-0(expand-icon="" collapse-icon="" style="min-height:32px !important; width:fit-content !important;")
              span.d-flex.flex-row.align-center.w-100(style="gap:4px; font-size:13px")
                v-icon.expand-icon mdi-chevron-down
                p {{ itemsLength }} {{ itemsLength > 1 ? 'items' : 'item' }} for
                p.font-weight-bold {{ fCurrency(totalPrice) }}
            div.d-flex.flex-row.justify-end(style="margin-top: -38px;")
              v-btn(icon="mdi-trash-can" variant="text" size="small" color="#ec3a3a" @click="dialogCancel=true")
              a(:href="`https://wa.me/+60${removePhonePrefix(order.customers.phone)}`" target="_blank") 
                v-btn(icon="mdi-whatsapp" variant="text" size="small" color="#25d366")
              order-edit-order(:order="order" :productList="productList" @updateOrder="$emit('update')")
            v-expansion-panel-text.rounded-lg(style="background-color: #ececec; font-size:12px")
              p {{ products.length > 1 ? 'Items' : 'Item' }}
              template(v-for="(item, index) in products" :key="index")
                div.d-flex.flex-row.justify-space-between.w-100
                  p.font-weight-medium {{ getProduct(item.id).name }}
                  div.d-flex.flex-row.justify-space-between(style="width: 100px")
                    p
                      span.font-weight-light x
                      |  {{ item.quantity }}
                    p.font-weight-medium {{ fCurrency(getProduct(item.id).base_price) }}
                hr(style="border: 0.5px solid #cecece; margin-top:4px")
              div.d-flex.flex-row.justify-space-between.w-100
                p.font-weight-medium {{ $t('deliveryfee') }}
                p.font-weight-medium {{ fCurrency(order.shipping_fee) }}
  
  v-divider 

  general-dialog-cancel(v-model="dialogCancel" @cancel="$emit('cancel',order.id)")
  general-dialog-type-b(v-model="openMore" :persistent="false" :fullscreen="false" :scrim="true")
    template(#title)
      .d-flex.flex-row.w-100.align-center
        p.font-weight-regular(style="color:#767676") {{ `#${order.customer_id}` }}
        v-spacer
        v-chip.text-capitalize(
          style="max-width: fit-content; width:100%; height: 20px; font-weight: bold; font-size: 10px",
          :ripple="false",
          :color="statusColor(order.status)") {{ order.status }}
    template(#content)
      p(style="font-size:12px; color:#767676") Order items:
      div.pa-4(style="background-color: #ececec; font-size:12px")
        template(v-for="(item, index) in order.customers.products" :key="index")
          v-row(no-gutters)
            v-col(cols="7")
              p.font-weight-medium {{ getProduct(item.id).name }}
            v-col.text-right(cols="2")
              p x{{ item.quantity }}
            v-col.text-right(cols="3")
              p.font-weight-medium {{ fCurrency(getProduct(item.id).base_price) }}
        v-divider.my-2
        v-row(no-gutters)
          v-col(cols="7")
          v-col.text-right(cols="2")
            p(style="color:#767676") Subtotal
          v-col.text-right(cols="3")
            p.font-weight-medium {{ fCurrency(order.payment - order.shipping_fee) }}
        v-row(no-gutters)
          v-col(cols="7")
          v-col.text-right(cols="2")
            p(style="color:#767676") Shipping
          v-col.text-right(cols="3")
            p.font-weight-medium {{ fCurrency(order.shipping_fee) }}
        v-row(no-gutters)
          v-col(cols="7")
          v-col.text-right(cols="2")
            p.font-weight-bold(style="color:#767676") Total
          v-col.text-right(cols="3")
            p.font-weight-bold {{ fCurrency(order.payment) }}
      div.my-3(style="font-size:14px")
        p 
          span(style="color:#767676") Name:
          | 
          span {{ order.customers.name }}
        p 
          span(style="color:#767676") Phone:
          | 
          span {{ order.customers.phone }}
        p 
          span(style="color:#767676") Email:
          | 
          span {{ order.customers.email }}
      div.my-3(style="font-size:14px")
        p(style="color:#767676") Shipping address:
        p {{ order.address_1 }}
          br(v-if="order.address_2" )
          |{{ order.address_2 }}
          br
          |{{ order.postcode }}, {{ order.city }}
          br
          |{{ order.state }}, {{ order.country }}
      div.my-3(style="font-size:14px")
        p
          span(style="color:#767676") Courier:
          | 
          span  {{ order.courier }}
</template>

<script setup>
const props = defineProps(['order', "productList"])
const emit = defineEmits(['cancel', 'update'])

const itemsToShow = ref(2)
const itemsLength = ref(1)
const products = ref([])
const totalPrice = ref(0)
const dialogCancel = ref(false)
const openMore =ref(false)

onMounted(() => {
  products.value = props.order.customers.products
  itemsLength.value = products.value.length
  totalPrice.value = props.order.payment
})

const getProduct = (id) => {
  return props.productList.find(x => x.id === id)
}

const fCurrency = (cent) => {
  const amount = cent / 100
  return amount.toLocaleString('en-MY', { style: 'currency', currencyDisplay: 'symbol', currency: 'myr' });
}

function fDate(datetime){
  const date = new Date(datetime);
  const options = { timeZone: 'Asia/Kuala_Lumpur', day: '2-digit', month: '2-digit', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-MY', options);

  return formattedDate
}

function fTime(datetime) {
  const date = new Date(datetime);
  const options = { timeZone: 'Asia/Kuala_Lumpur', hour12: true, hour: '2-digit', minute: '2-digit' };
  const formattedTime = date.toLocaleTimeString('en-MY', options);

  return formattedTime
}

function statusColor(value) {
  let color = ""
   switch (value) {
    case 'new':
      color = "#FF9800"
      break;
    case 'processing':
      color = "#2196F3"
      break;
    case 'shipping':
      color = "#9C27B0"
      break;
    case 'completed':
      color = "#009688"
      break;
    case "cancelled":
      color = "#ec3a3a";
      break;
   
    default:
      color = "secondary"
      break;
   }
  return color
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
.expand-icon{
  color: #c4c4c4
}

:deep(.v-expansion-panel > .v-expansion-panel__shadow) {
  box-shadow: none !important;
}

:deep(.v-expansion-panel-title:hover > .v-expansion-panel-title__overlay),
:deep(.v-expansion-panel-title--active > .v-expansion-panel-title__overlay, .v-expansion-panel-title[aria-haspopup=menu][aria-expanded=true] > .v-expansion-panel-title__overlay){
  opacity: 0 !important;
}

:deep(.v-expansion-panel-title--active .expand-icon){
  transform: rotate(180deg);
  transition: all .2s ease-in-out;
}
</style>
