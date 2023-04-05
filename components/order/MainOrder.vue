<template lang="pug">
div
  order-filter-order.mb-5(@search="search" @filter="filter" @sort="sort")
  v-card.card
    v-card-text.d-flex.flex-column.justify-space-between.pa-0
      div.order-list()
        template(v-for="(order, index) in orders" :key="order.id")
          order-item-order-v2(:order="order")
      general-pagination.mt-5(v-model="page" @limit="limit" :limit="queryLimit" :maxPage="maxPage")
</template>

<script setup>
import axios from 'axios'

const page = ref(1)
const maxPage = ref(1)
const orders = ref([])
const totalOrders = ref(0)
const searchKeyword = ref(null)
const filters = ref([])
const queryLimit = ref(5)
const sortOrder = ref('id')

onMounted(async () => {
  await getData()
})

watch(page, async (updatedPage) => {
  await getData()
})

async function getData() {
  let url = `https://api-test.roketpage.com/items/order_test?limit=${queryLimit.value}&fields[]=*&sort[]=${sortOrder.value}&page=${page.value}`

  if (searchKeyword.value) {
    url += `&search=${searchKeyword.value}`
  }

  if (filters.value) {
    filters.value.forEach(filter => {
      if (filter.value) {
        url += `&filter[${filter.field}]=${filter.value}`
      }
    });
  }

  await axios.get(url)
    .then(response => {
      // Handle successful response
      orders.value = response.data.data
    })
    .catch(error => {
      // Handle error
      console.log(error);
    });
  
  // Get total orders
  if (page.value === 1) {
    await axios.get(url + '&aggregate[countDistinct]=id')
      .then(response => {
        // Handle successful response
        totalOrders.value = response.data.data[0].countDistinct.id
      })
      .catch(error => {
        // Handle error
        console.log(error);
      });

    maxPage.value = Math.ceil(totalOrders.value / queryLimit.value)
  }
}

async function search(e) {
  searchKeyword.value = e
  page.value = 1
  await getData()
}

async function filter(e) {
  let filterExist = 1
  filters.value.forEach(filter => {
    if (filter.field === e.field) {
      filter.value = e.value
      filterExist *= 0
    }
  });

  if(filterExist) {
    filters.value.push(
      {
        field: e.field,
        value: e.value
      }
    )
  }
  page.value = 1
  await getData()
}

async function limit(e){
  queryLimit.value = e
  await getData()
}

async function sort(e) {
  sortOrder.value = e
  await getData()
}
</script>
<style lang="scss" scoped>
.card{
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 8px;
  // align-items: center;
  // justify-content: center;
  // box-shadow: 0px 2px 4px -1px rgb(34 34 34 / 50%);
  box-shadow: none;
  min-height: 400px;
  height: fit-content;
  height: 100%;
  border: .5px solid #ababab;
  border-radius: 8px;
}

.order-row:not(:last-of-type) > td{
  border-bottom: 1px solid #7d7d7d !important;
}

.order-list{
  height:calc(100vh - 330px);
  overflow:scroll;
  scrollbar-width: none
}

.order-list::-webkit-scrollbar{
  display: none;
}
</style>
