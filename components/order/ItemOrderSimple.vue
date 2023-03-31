<template lang="pug">
div.d-flex.align-start.justify-space-between.py-4.px-md-4(style="gap: 20px;" :class="$vuetify.display.width < 1020 ? 'flex-column' : 'flex-row'")
  div.d-flex.flex-column(style="width:100%; heigth:100%; padding:0px; gap:4px;" :style="`max-width:${$vuetify.display.width < 1020 ? '100%' : '350px'}`")
    div.d-flex.flex-row(style="gap: 10px; font-weight:bold; font-size:14px" )
      p {{ `#123` }}
      p In progress
    div.d-flex.flex-row.flex-wrap.w-100(style="gap:5px; font-size:14px" )
      p +60123456789
      img(src="/img/ver-divider.svg" )
      p hanif@mail.test

  div.d-flex.flex-row.align-center(style="width:100%; height:100%; padding:0px; gap:10px; font-size:14px" :style="`max-width:${$vuetify.display.width < 1020 ? '100%' : '200px'}`")
    div.d-flex.flex-row(style="gap:4px" :class="$vuetify.display.width < 1020 ? 'justify-start' : 'justify-end'")
      p 2 items for
      p.font-weight-bold RM100
    v-btn(icon="mdi-open-in-new" variant="text" size="small" @click="$router.push(`/order/123`)")
        


</template>

<script setup>
// const props = defineProps(['order'])

// const itemsToShow = ref(2)
// const itemsLength = ref(props.order.products.length)

// function totalPrice(items) {
//   let total = 0
//   items.forEach(item => {
//     let sub = 0
//     sub = item.price * item.quantity
//     total += sub
//   });
//   return total
// }
</script>
<style lang="scss" scoped></style>
