<template lang="pug">
div.main-order
  order-filter-order.mb-2(id="order-filter" @search="search" @filter="filter" @sort="sort")
  v-card.card
    v-card-text.d-flex.flex-column.justify-space-between.pa-0
      template(v-for="(order, index) in orders" :key="order.id")
        order-item-order-v2(:order="order" :productList="productList" @cancel="cancelOrder" @update="getData()")
      general-pagination.mt-5(v-model="page" @limit="limit" :limit="queryLimit" :maxPage="maxPage")
</template>

<script setup>
const userStore = useStoreUser()
const supabase = useSupabaseAuthClient();
const snackbar = useSnackbar()


const page = ref(1)
const maxPage = ref(1)
const orders = ref([])
const totalOrders = ref(0)
const searchKeyword = ref(null)
const filters = ref([])
const queryLimit = ref(10)
const sortOrder = ref({
  column: 'id',
  ascending: false
})
const orderfilter =ref(null)
const sticky = ref(0)
const company_id = ref('')
const productList = ref([])

onMounted(async () => {
  userStore.getUser()
  company_id.value = userStore.user.current_company.id
  await getData()
  await getProducts()
  orderfilter.value = document.getElementById("order-filter");
  const main = document.querySelector('.main-content')
  sticky.value = orderfilter.value.getBoundingClientRect().top
  main.addEventListener('scroll', stickyScroll)
})

onUnmounted(() => {
  const main = document.querySelector('.main-content')
  main.removeEventListener('scroll', stickyScroll)
})


watch(page, async (updatedPage) => {
  await getData()
})

const stickyScroll = () => {
  const parent = document.querySelector('.index')
  if (parent.getBoundingClientRect().top < (sticky.value)) {
    orderfilter.value.classList.add("sticky");
    orderfilter.value.style.maxWidth = `${parent.clientWidth + 2}px`
  } else {
    orderfilter.value.classList.remove("sticky");
  }
}

async function getData() {
  const from = (page.value - 1) * queryLimit.value
  const to = page.value * (queryLimit.value - 2)
  let query = supabase
    .from('order')
    .select('customers!inner(*, customers_extra_field(*), pages(title)), *', { count: "exact" })
    .order(sortOrder.value.column, { ascending: sortOrder.value.ascending })
    .eq('company_id', company_id.value)
    .eq('customers.paid', true)
    .eq('customers.status','closed')

  if (filters.value.length) {
    filters.value.forEach(filter => {
      query.in(filter.field, filter.value)
    });
  }

  if (searchKeyword.value && searchKeyword.value !== "") {
    let search = ''
    const col_name = `customers.name.ilike.%${searchKeyword.value}%`
    const col_phone = `customers.phone.ilike.%${searchKeyword.value}%`
    const col_email = `customers.email.ilike.%${searchKeyword.value}%`
    query.or(search.concat(col_name, ',', col_phone, ',', col_email))
  }

  let { data: order, error, count } = await query.range(from, to)
  orders.value = order

  // Get total order
  if (page.value === 1) {
    totalOrders.value = count
    maxPage.value = Math.ceil(totalOrders.value / queryLimit.value) ? Math.ceil(totalOrders.value / queryLimit.value) : 1
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

const cancelOrder = async (id) => {
  // console.log(id);

  const { status, error } = await supabase
    .from('order')
    .update(
      {
        status: "cancelled"
      }
    )
    .eq('id', id)

  if (status === 204) {
    snackbar.add({
      type: 'warning',
      text: 'Order cancelled!'
    })
    await getData()
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
  min-height: 140px;
  height: fit-content;
  height: 100%;
  border: .5px solid #ababab;
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
