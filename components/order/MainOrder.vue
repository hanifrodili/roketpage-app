<template lang="pug">
div
  v-card.card
    v-tabs(v-model='tab', bg-color='secondary', color='primary', grow='')
      v-tab( value="Processing")
        | Processing
      v-tab( value="Shipping")
        | Shipping
      v-tab( value="Completed")
        | Completed
    v-window(v-model='tab')
      v-window-item(value="Processing")
        v-card(color='', flat='')
          v-card-text
            v-table(style="background-color:transparent")
              tbody
                template(v-for="(order, index) in orderProcessing" :key="order.order_id")
                  tr.px-0.order-row(v-if="index >= startProcess && index <= endProcess" )
                    td.px-0
                      order-item-order(:order="order")
            general-pagination(v-model="pageProcess" :maxPage="maxPageProcess")
      
      v-window-item(value="Shipping")
        v-card(color='', flat='')
          v-card-text
            v-table(style="background-color:transparent")
              tbody
                template(v-for="(order, index) in orderShipping" :key="order.order_id")
                  tr.px-0.order-row(v-if="index >= startShip && index <= endShip" )
                    td.px-0
                      order-item-order(:order="order")
            general-pagination(v-model="pageShip" :maxPage="maxPageShip")
      
      v-window-item(value="Completed")
        v-card(color='', flat='')
          v-card-text
            v-table(style="background-color:transparent")
              tbody
                template(v-for="(order, index) in orderCompleted" :key="order.order_id")
                  tr.px-0.order-row(v-if="index >= startComplete && index <= endComplete" )
                    td.px-0
                      order-item-order(:order="order")
            general-pagination(v-model="pageComplete" :maxPage="maxPageComplete")
</template>

<script setup>
const tab = ref(null)
const pageProcess = ref(1)
const pageShip = ref(1)
const pageComplete = ref(1)

const maxPageProcess = ref(1)
const maxPageShip = ref(1)
const maxPageComplete = ref(1)

const orderProcessing = ref([])
const orderShipping = ref([])
const orderCompleted = ref([])

const startProcess = ref(0)
const endProcess = ref(4)

const startShip = ref(0)
const endShip = ref(4)

const startComplete = ref(0)
const endComplete = ref(4)

onMounted(async () => {
  await getData()
  maxPageProcess.value = Math.ceil(orderProcessing.value.length / 5)
  maxPageShip.value = Math.ceil(orderShipping.value.length / 5)
  maxPageComplete.value = Math.ceil(orderCompleted.value.length / 5)
})

watch(pageProcess, (newValue, oldValue) => {
  if (newValue > oldValue) {
    startProcess.value += 5
    endProcess.value += 5 
  } else {
    startProcess.value -= 5
    endProcess.value -= 5
  }
})
watch(pageShip, (newValue, oldValue) => {
  if (newValue > oldValue) {
    startShip.value += 5
    endShip.value += 5
  } else {
    startShip.value -= 5
    endShip.value -= 5
  }
})
watch(pageComplete, (newValue, oldValue) => {
  if (newValue > oldValue) {
    startComplete.value += 5
    endComplete.value += 5
  } else {
    startComplete.value -= 5
    endComplete.value -= 5
  }
})

const items = ref([
  'Processing', 'Shipping', 'Completed',
])

async function getData() {
  const data = await $fetch('/dummy/orders.json')
  data.orders.forEach(order => {
    if (order.status === "processing") {
      orderProcessing.value.push(order)
    }
    if (order.status === "shipping") {
      orderShipping.value.push(order)
    }
    if (order.status === "completed") {
      orderCompleted.value.push(order)
    }
  })
}
</script>
<style lang="scss" scoped>
.card{
  width: 100%;
  display: flex;
  flex-direction: column;
  // align-items: center;
  // justify-content: center;
  box-shadow: 0px 2px 4px -1px rgb(34 34 34 / 50%);
  min-height: fit-content;
  height: 100%;
  border-radius: 16px;
}

.order-row:not(:last-of-type) > td{
  border-bottom: 1px solid #7d7d7d !important;
}
</style>
