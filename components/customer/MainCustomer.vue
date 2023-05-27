<template lang="pug">
.main-customer
  customer-filter-customer.mb-2(
    id="customer-filter"
    @addCustomer="getData()"
    @search="search",
    @filter="filter",
    @sort="sort")
  v-card.card
    v-card-text.d-flex.flex-column.pa-0
      general-lottie-empty(v-if="customers.length === 0")
      template(v-for="(customer, index) in customers", :key="customer.id")
        customer-item-customer(:customer="customer" :productList="productList" @delete="deleteCutomer" @update="getData()")
      v-spacer
      general-pagination.mt-5(
        v-model="page",
        @limit="limit",
        :limit="queryLimit",
        :maxPage="maxPage")
</template>

<script setup>
const userStore = useStoreUser()
const supabase = useSupabaseAuthClient();
const snackbar = useSnackbar()

const customers = ref([])
const page = ref(1)
const maxPage = ref(1)
const totalCustomers = ref(0)
const searchKeyword = ref('')
const filters = ref([])
const queryLimit = ref(10)
const sortCustomer = ref({
  column: 'id',
  ascending: false
})
const customerfilter = ref(null)
const sticky = ref(0);
const company_id = ref('')
const productList = ref([])

onMounted(async () => {
  userStore.getUser()
  company_id.value = userStore.user.current_company.id
  await getData()
  await getProducts()
  customerfilter.value = document.getElementById("customer-filter");
  const main = document.querySelector('.main-content')
  sticky.value = customerfilter.value.getBoundingClientRect().top
  main.addEventListener('scroll', stickyScroll)
});

onUnmounted(() => {
  const main = document.querySelector('.main-content')
  main.removeEventListener('scroll', stickyScroll)
});

watch(page, async (updatedPage) => {
  await getData();
});

function stickyScroll() {
  const parent = document.querySelector('.index')
  if (parent.getBoundingClientRect().top < (sticky.value)) {
    customerfilter.value.classList.add("sticky");
    customerfilter.value.style.maxWidth = `${parent.clientWidth + 2}px`;
  } else {
    customerfilter.value.classList.remove("sticky");
  }
}

const getData =  async () => {
  const from = (page.value - 1) * queryLimit.value
  const to = page.value * (queryLimit.value - 2)
  let query = supabase
    .from('customers')
    .select('*, customers_extra_field(*), pages(title)', { count: "exact" })
    .order(sortCustomer.value.column, { ascending: sortCustomer.value.ascending })
    .eq('company_id', company_id.value)

  // console.log(filters.value.length);
  if (filters.value.length) {
    filters.value.forEach(filter => {
      query.in(filter.field, filter.value)
    });
  }

  if (searchKeyword.value && searchKeyword.value !== "") {
    let search = ''
    const col_name = `name.ilike.%${searchKeyword.value}%`
    const col_phone = `phone.ilike.%${searchKeyword.value}%`
    const col_email = `email.ilike.%${searchKeyword.value}%`
    query.or(search.concat(col_name, ',', col_phone, ',', col_email))
  }

  let { data: customer, error, count } = await query.range(from, to)
  customers.value = customer

  // Get total customers
  if (page.value === 1) {
    totalCustomers.value = count
    maxPage.value = Math.ceil(totalCustomers.value / queryLimit.value) ? Math.ceil(totalCustomers.value / queryLimit.value) : 1
  }
}

const getProducts = async () => {
  let { data: product, error, count } = await supabase
    .from('product')
    .select('*', { count: "exact" })
    .eq('company_id', company_id.value)
    .eq('published', true)

  productList.value = product
}

const deleteCutomer = async (id) => {
  // console.log(id);

  const { status, error } = await supabase
    .from('customers')
    .delete()
    .eq('id', id)

  if (status === 204) {
    snackbar.add({
      type: 'warning',
      text: 'Customer deleted!'
    })
    await getData()
  }

}

const getProduct = (id) => {
  return productList.value.find(x => x.id === id)
}

async function search(e) {
  searchKeyword.value = e;
  page.value = 1;
  if (e) {
    await getData();
  }
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
  sortCustomer.value = e;
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
