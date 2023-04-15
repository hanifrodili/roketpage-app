<template lang="pug">
.main-customer
  customer-filter-customer#customer-filter.mb-2(
    @search="search",
    @filter="filter",
    @sort="sort")
  v-card.card
    v-card-text.d-flex.flex-column.justify-space-between.pa-0
      template(v-for="(customer, index) in customers", :key="customer.id")
        customer-item-customer(:customer="customer")
      general-pagination.mt-5(
        v-model="page",
        @limit="limit",
        :limit="queryLimit",
        :maxPage="maxPage")
</template>

<script setup>
import axios from "axios";

const config = useRuntimeConfig();

const page = ref(1);
const maxPage = ref(1);
const customers = ref([]);
const totalOrders = ref(0);
const searchKeyword = ref(null);
const filters = ref([]);
const queryLimit = ref(10);
const sortOrder = ref("id");
const orderfilter = ref(null);
const sticky = ref(0);

onMounted(async () => {
  await getData();
  orderfilter.value = document.getElementById("customer-filter");
  sticky.value = orderfilter.value.offsetTop;
  window.addEventListener("scroll", stickyScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", stickyScroll);
});

watch(page, async (updatedPage) => {
  await getData();
});

function stickyScroll() {
  const parent = document.querySelector(".main-customer");
  if (window.pageYOffset > sticky.value - 10) {
    orderfilter.value.classList.add("sticky");
    orderfilter.value.style.maxWidth = `${parent.clientWidth + 2}px`;
  } else {
    orderfilter.value.classList.remove("sticky");
  }
}

async function getData() {
  let url = `${config.public.apiUrl}/items/order_test?limit=${queryLimit.value}&fields[]=*&sort[]=${sortOrder.value}&page=${page.value}`;

  if (searchKeyword.value) {
    url += `&search=${searchKeyword.value}`;
  }

  if (filters.value) {
    filters.value.forEach((filter) => {
      if (filter.value) {
        url += `&filter[${filter.field}]=${filter.value}`;
      }
    });
  }

  await axios
    .get(url)
    .then((response) => {
      // Handle successful response
      customers.value = response.data.data;
    })
    .catch((error) => {
      // Handle error
      console.log(error);
    });

  // Get total customers
  if (page.value === 1) {
    await axios
      .get(url + "&aggregate[countDistinct]=id")
      .then((response) => {
        // Handle successful response
        totalOrders.value = response.data.data[0].countDistinct.id;
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });

    maxPage.value = Math.ceil(totalOrders.value / queryLimit.value);
  }
}

async function search(e) {
  searchKeyword.value = e;
  page.value = 1;
  await getData();
}

async function filter(e) {
  let filterExist = 1;
  filters.value.forEach((filter) => {
    if (filter.field === e.field) {
      filter.value = e.value;
      filterExist *= 0;
    }
  });

  if (filterExist) {
    filters.value.push({
      field: e.field,
      value: e.value,
    });
  }
  page.value = 1;
  await getData();
}

async function limit(e) {
  queryLimit.value = e;
  await getData();
}

async function sort(e) {
  sortOrder.value = e;
  await getData();
}
</script>
<style lang="scss" scoped>
.card {
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
  border: 0.5px solid #ababab;
  border-radius: 8px;
}

.sticky {
  position: fixed;
  margin: 0 -1px;
  padding-top: 20px;
  padding-bottom: 10px;
  top: 63px;
  width: 100%;
  z-index: 9;
}
</style>
