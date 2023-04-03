<template lang="pug">
div
  order-filter-order.mb-5(@search="search" @filter="filter")
  v-card.card
    v-card-text.d-flex.flex-column.justify-space-between
      v-table(style="background-color:transparent")
        tbody
          template(v-for="(order, index) in orders" :key="order.id")
            tr.px-0.order-row()
              td.px-0
                order-item-order(:order="order")
      general-pagination(v-if="maxPage > 1"  v-model="page" :maxPage="maxPage")
</template>

<script setup>
import axios from 'axios'

const page = ref(1)
const maxPage = ref(1)
const orders = ref([])
const totalOrders = ref(0)
const searchKeyword = ref(null)
const filters = ref([])

onMounted(async () => {
  await getData(1)
})

watch(page, async (updatedPage) => {
  await getData(updatedPage, searchKeyword.value, filters.value)
})

async function getData(page, keyword, filters) {
  let url = `https://api-test.roketpage.com/items/order_test?limit=5&fields[]=*&sort[]=id&page=${page}`

  if (keyword) {
    url += `&search=${keyword}`
  }

  if (filters) {
    filters.forEach(filter => {
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
  if (page === 1) {
    await axios.get(url + '&aggregate[countDistinct]=id')
      .then(response => {
        // Handle successful response
        totalOrders.value = response.data.data[0].countDistinct.id
      })
      .catch(error => {
        // Handle error
        console.log(error);
      });

    maxPage.value = Math.ceil(totalOrders.value / 5)
  }
}

async function search(e) {
  searchKeyword.value = e
  page.value = 1
  await getData(page.value, searchKeyword.value, filters.value)
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
  console.log(filters.value);
  page.value = 1
  await getData(page.value, searchKeyword.value ,filters.value)
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
  min-height: 400px;
  height: fit-content;
  height: 100%;
  border-radius: 16px;
}

.order-row:not(:last-of-type) > td{
  border-bottom: 1px solid #7d7d7d !important;
}
</style>
