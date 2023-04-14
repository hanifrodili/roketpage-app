<template lang="pug">
div.d-flex.align-start.justify-space-between.py-4.px-md-4(style="gap: 20px;" :class="$vuetify.display.width < 1020 ? 'flex-column' : 'flex-row'")
  div.d-flex.flex-column(style="width:100%; heigth:100%; padding:0px; gap:4px;" :style="`max-width:${$vuetify.display.width < 1020 ? '100%' : '350px'}`")
    div.d-flex.flex-row(style="gap: 10px; font-weight:bold; font-size:14px" )
      p {{ `#${order.id}` }}
      p {{ order.name }}
    div.d-flex.flex-row.flex-wrap.w-100(style="gap:5px; font-size:14px" )
      p {{ order.phone }}
      img(src="/img/ver-divider.svg" )
      p {{ order.email }}
  div.d-flex.flex-column(style="width:100%; heigth:100%; padding:0px; gap:4px; font-size:14px" :style="`max-width:${$vuetify.display.width < 1020 ? '100%' : '290px'}`")
    p.font-weight-bold.text-decoration-underline Item(s)
    template(v-for="(item, index) in products" :key="index")
      div(v-if="index < itemsToShow" )
        div.d-flex.flex-row.justify-space-between.w-100
          p.font-weight-bold {{ item.name }}
          div.d-flex.flex-row.justify-space-between(style="width: 100px")
            p x{{ item.quantity }}
            p.font-weight-bold RM{{ item.price }}
        hr(style="border: 0.5px solid #cecece; margin-top:4px")
    p.cursor-pointer(style="color:#7d7d7d" v-if="itemsLength > 2 && itemsToShow < itemsLength-1" @click="itemsToShow = itemsLength") +{{ itemsLength - 2 }} more item(s)
    p.cursor-pointer(style="color:#7d7d7d" v-if="itemsLength > 2 && itemsToShow === itemsLength" @click="itemsToShow = 2") Show less

  div.d-flex.justify-space-between(style="width:100%; height:100%; padding:0px; gap:10px; font-size:14px" :style="`max-width:${$vuetify.display.width < 1020 ? '100%' : '200px'}`" :class="$vuetify.display.width < 1020 ? 'flex-row' : 'flex-column'")
    div.d-flex.flex-column
      div.d-flex.flex-row(style="gap:4px" :class="$vuetify.display.width < 1020 ? 'justify-start' : 'justify-end'")
        p {{ $t('status') }}:
        p.font-weight-bold.text-capitalize {{ order.status }}
      div.d-flex.flex-row(style="gap:4px" :class="$vuetify.display.width < 1020 ? 'justify-start' : 'justify-end'")
        p {{ $t('deliveryfee') }}:
        p.font-weight-bold RM{{ order.delivery_fee }}
      div.d-flex.flex-row(style="gap:4px" :class="$vuetify.display.width < 1020 ? 'justify-start' : 'justify-end'")
        p {{ $t('totalpaid') }}:
        p.font-weight-bold RM{{ totalPrice }}
    div.d-flex.flex-row.justify-end()
      v-btn(icon="mdi-trash-can-outline" variant="text" size="small" color="red")
      v-btn(icon="mdi-file-edit-outline" variant="text" size="small")
      v-btn(icon="mdi-open-in-new" variant="text" size="small" @click="$router.push(`/order/${order.id}`)")
        


</template>

<script setup>
const props = defineProps(['order'])

const itemsToShow = ref(2)
const itemsLength = ref(1)
const products = ref([])
const totalPrice = ref(0)

onMounted(() => {
  products.value = JSON.parse(props.order.products)
  itemsLength.value = products.value.length
  products.value.forEach(item => {
    let sub = 0
    sub = item.price * item.quantity
    totalPrice.value += sub
  });
  totalPrice.value += props.order.delivery_fee
})
</script>
<style lang="scss" scoped></style>
