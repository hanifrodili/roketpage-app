<template lang="pug">
div.d-flex.align-start.justify-space-between.py-4.px-md-4(style="gap: 20px;" :class="$vuetify.display.width < 1020 ? 'flex-column' : 'flex-row'")
  div.d-flex.flex-column(style="width:100%; heigth:100%; padding:0px; gap:4px;" :style="`max-width:${$vuetify.display.width < 1020 ? '100%' : '350px'}`")
    p
      span.text-decoration-none(style="color:#767676") {{ `#${order.id}` }}
      |  
      span.text-decoration-underline.font-weight-medium {{ order.customers.name }}
    div.d-flex.flex-row.flex-wrap.w-100(style="gap:5px; font-size:14px" )
      p {{ order.customers.phone }}
      img(src="/img/ver-divider.svg" )
      p {{ order.customers.email }}

  div.d-flex.flex-row.align-center(style="width:100%; height:100%; padding:0px; gap:10px; font-size:14px" :style="`max-width:${$vuetify.display.width < 1020 ? '100%' : '180px'}`")
    div.d-flex.flex-row(style="gap:4px" :class="$vuetify.display.width < 1020 ? 'justify-start' : 'justify-end'")
      p {{ itemsLength }} item(s) for
      p.font-weight-bold {{ fCurrency(totalPrice) }}
    //- v-btn(icon="mdi-open-in-new" variant="text" size="small" @click="$router.push(`/admin/order/${order.id}`)")
        


</template>

<script setup>
const props = defineProps(['order'])

const itemsLength = ref(0)
const totalPrice = ref(0)

onMounted(() => {
  const products = props.order.customers.products
  itemsLength.value = products.length
  totalPrice.value = props.order.payment
})

const fCurrency = (cent) => {
  const amount = cent / 100
  return amount.toLocaleString('en-MY', { style: 'currency', currencyDisplay: 'symbol', currency: 'myr' });
}
</script>
<style lang="scss" scoped></style>
