<template lang="pug">
div
  div.d-flex.pa-2.pa-md-4.flex-column(style="font-size:13px")
    div.d-flex.flex-row()
      div.d-flex.flex-column.w-100
        div.d-flex.flex-row.font-weight-bold.justify-space-between.mb-2(style="" )
          p {{ `#${order.id}` }} {{ order.name }}
          v-chip.text-capitalize(style="width:fit-content; height: 20px; font-weight:bold; font-size:10px" :ripple="false" :color="statusColor(order.status)") {{ order.status }}
        div.d-flex.flex-row.flex-wrap.w-100(style="gap:5px;" )
          p {{ order.phone }}
          img(src="/img/ver-divider.svg" )
          p {{ order.email }}

    div.d-flex.justify-space-between(:class="$vuetify.display.width < 1020 ? 'flex-column' : 'flex-row'")
      p.mt-auto.mb-1(style="color:#767676; font-size:12px") {{ fDate(order.date_created) }} at {{ fTime(order.date_created) }}
      div.d-flex.flex-column.flex-grow-1.justify-start()
        v-expansion-panels(variant="accordion" plain)
          v-expansion-panel(plain)
            v-expansion-panel-title.pa-0(expand-icon="" collapse-icon="" style="min-height:32px !important; width:fit-content !important;" :class="$vuetify.display.width < 1020 ? 'mr-auto' : 'ml-auto'")
              span.d-flex.flex-row.align-center.w-100(style="gap:4px; font-size:13px")
                v-icon.expand-icon mdi-chevron-down
                p {{ itemsLength }} {{ itemsLength > 1 ? 'items' : 'item' }} for
                p.font-weight-bold RM{{ totalPrice }}
            v-expansion-panel-text(style="background-color: #ececec; font-size:12px")
              p {{ products.length > 1 ? 'Items' : 'Item' }}
              template(v-for="(item, index) in products" :key="index")
                div.d-flex.flex-row.justify-space-between.w-100
                  p.font-weight-medium {{ item.name }}
                  div.d-flex.flex-row.justify-space-between(style="width: 100px")
                    p x{{ item.quantity }}
                    p.font-weight-medium RM{{ item.price }}
                hr(style="border: 0.5px solid #cecece; margin-top:4px")
              div.d-flex.flex-row.justify-space-between.w-100
                p.font-weight-medium {{ $t('deliveryfee') }}
                p.font-weight-medium RM{{ order.delivery_fee }}
        div.d-flex.flex-row.justify-end()
          v-btn(icon="mdi-trash-can-outline" variant="text" size="small" color="red")
          v-btn(icon="mdi-file-edit-outline" variant="text" size="small")
          v-btn(icon="mdi-open-in-new" variant="text" size="small" @click="$router.push(`/admin/order/${order.id}`)")
  v-divider     
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
   
    default:
      color = "secondary"
      break;
   }
  return color
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
