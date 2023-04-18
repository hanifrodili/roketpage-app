<template lang="pug">
div.main-product
  product-filter-product.mb-2(id="product-filter" @search="search" @filter="filter" @sort="sort" @add-product="getProducts()")
  v-card.general-card
    v-card-text.d-flex.flex-column.justify-space-between.pa-0
      template(v-for="(product, index) in products" :key="product.id")
        product-item-product(:product="product" @update-publish="updatePublish")
      general-pagination.mt-5(v-model="page" @limit="limit" :limit="queryLimit" :maxPage="maxPage")
</template>

<script setup>
const userStore = useStoreUser()
const supabase = useSupabaseAuthClient();
const snackbar = useSnackbar()

const products = ref([])
const page = ref(1)
const maxPage = ref(1)
const totalProducts = ref(0)
const searchKeyword = ref(null)
const filters = ref([])
const queryLimit = ref(10)
const sortProduct = ref({
  column: 'id',
  ascending: true
})
const productfilter = ref(null)
const sticky = ref(0)
const company_id = ref('')

onMounted(async () => {
  userStore.getUser()
  company_id.value = userStore.user.current_company.id
  await getProducts()
  productfilter.value = document.getElementById("product-filter");
  sticky.value = productfilter.value.offsetTop
  window.addEventListener('scroll', stickyScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', stickyScroll)
})


watch(page, async (updatedPage) => {
  await getProducts()
})

function stickyScroll() {
  const parent = document.querySelector('.main-product')
  if (window.pageYOffset > (sticky.value - 10)) {
    productfilter.value.classList.add("sticky");
    productfilter.value.style.maxWidth = `${parent.clientWidth + 2}px`
  } else {
    productfilter.value.classList.remove("sticky");
  }
}

async function getProducts() {
  const from = (page.value - 1) * queryLimit.value
  const to = page.value * (queryLimit.value - 2)
  let { data: product, error, count } = await supabase
    .from('product')
    .select('*', { count: "exact" })
    .order(sortProduct.value.column, { ascending: sortProduct.value.ascending })
    .eq('company_id', company_id.value)
    .in('published', [true, false])
    .range(from, to) 

  products.value = product
  console.log('Error:',error);

  // Get total products
  if (page.value === 1) {
    totalProducts.value = count
    maxPage.value = Math.ceil(totalProducts.value / queryLimit.value) ? Math.ceil(totalProducts.value / queryLimit.value) : 1
  }
}

async function search(e) {
  searchKeyword.value = e
  page.value = 1
  await getProducts()
}

async function filter(e) {
  let filterExist = 1
  filters.value.forEach(filter => {
    if (filter.field === e.field) {
      filter.value = e.value
      filterExist *= 0
    }
  });

  if (filterExist) {
    filters.value.push(
      {
        field: e.field,
        value: e.value
      }
    )
  }
  page.value = 1
  await getProducts()
}

async function limit(e) {
  queryLimit.value = e
  await getProducts()
}

async function sort(e) {
  sortProduct.value = e
  await getProducts()
}

function addProduct(e){
  e.status = 'true'
  // console.log(e);
  products.value.push(e)
}

async function updatePublish(e) {
  
  const { data, error, status } = await supabase
    .from('product')
    .update({ published: e.value })
    .eq('id', e.id)
    .eq('company_id', company_id.value)
    .select()

  let text

  if (e.value) {
    text = 'published'
  } else {
    text = 'changed to draft'
  }
  
  if(status === 200 ) {
    snackbar.add({
      type: 'success',
      text:`${data[0].name} ${text}.`
    })
  }

  // await axios.patch(url, { status: e.value })
  //   .then(response => {
  //     // Handle successful response
  //     snackbar.add({
  //       type: 'success',
  //       text:`${response.data.data.name} ${text}.`
  //     })
  //   })
  //   .catch(error => {
  //     // Handle error
  //     console.log(error);
  //   });
}
</script>
<style lang="scss" scoped>
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
