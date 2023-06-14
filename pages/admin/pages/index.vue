<template lang="pug">
.page-content
  sites-filter-sites.mb-4
  general-lottie-loading(v-if="loading")
  div(v-else)
    v-row(dense v-if="userPages.length")
      template(v-for="page in userPages", :key="page.id")
        v-col(cols="12" sm="6" md="4" v-if="page.defaultPage" )
          sites-page-form-card(:data="page" :products="products" :subdomain="company_subdomain" @delete="deletePage" @update="getPages()")
      template(v-for="page in userPages", :key="page.id")
        v-col(cols="12" sm="6" md="4" v-if="!page.defaultPage")
          sites-page-form-card(:data="page" :products="products" :subdomain="company_subdomain" @delete="deletePage" @update="getPages()")
    v-row.mt-10(v-else)
      v-col(cols="12")
        .d-flex.flex-row.align-center.justify-center(style="gap:4px; height:40px")
          p Click
          sites-create-new-page(style="height:100%")
          p to create new page.
</template>

<script setup>
import { useStoreUser } from '~/store/storeMerchant'

const supabase = useSupabaseAuthClient()
const userStore = useStoreUser()
const snackbar = useSnackbar()
const router = useRouter()

const userPages = ref([])
const products = ref([])
const company_id = ref('')
const company_subdomain = ref('')
const loading = ref(true)

definePageMeta({
  middleware: 'auth',
  name: 'pages'
})

onMounted(async () => {
  await userStore.getUser()
  company_id.value = userStore.user.current_company.id
  company_subdomain.value = userStore.user.current_company.company.subdomain
  await getProducts()
  await getPages()
})

const getPages = async () => {
  let { data: pages, error, count } = await supabase
    .from('pages')
    .select('*', { count: "exact" })
    .eq('company_id', company_id.value)
  // .eq('published', true)
  userPages.value = pages
  loading.value = false
}

const getProducts = async () => {
  let { data: product, error, count } = await supabase
    .from('product')
    .select('*', { count: "exact" })
    .eq('company_id', company_id.value)
    .eq('published', true)

  products.value = product
  console.log(products.value);
}

const deletePage = async (id) => {
  const resp = await supabase
    .from('pages')
    .delete()
    .eq('id', id)
    .eq('company_id', company_id.value)

  if (resp.status === 204) {
    snackbar.add({
      type: 'warning',
      text: `Page deleted !`
    })
    getPages()
  } else {
    snackbar.add({
      type: 'error',
      text: `${resp}`
    })
  }
  // dialogDelete.value = false;
};
</script>
<style scoped>
a {
  text-decoration: none;
}

/*:deep(.v-text-field--filled>.v-input__control>.v-input__slot) {
  background: #F7F7F7 !important;
  border: 1px solid #eaeaea !important;
  border-radius: 4px;
  max-height: 48px;
  min-height: 48px;
  padding-left: 16px;
}

:deep(.v-text-field.v-input--has-state>.v-input__control>.v-input__slot) {
  border: 1px solid red !important;
}

:deep(.v-text-field--filled:not(.v-text-field--single-line) input) {
  margin-top: 14px;
}

:deep(.v-text-field--filled .v-label) {
  top: 14px !important;
  color: #C1C1C1;
}

 :deep(.v-text-field--filled .v-label--active) {
  transform: translateY(-10px) scale(0.75);
  color: #C1C1C1;
}

:deep(.theme--light.v-input input),
.theme--light.v-input textarea {
  color: #2B2525;
  font-weight: 600 !important;
  font-size: 15px !important;
  line-height: 24px !important;
}

:deep(.v-input--has-state.error--text) {
  color: red;
} */
</style>