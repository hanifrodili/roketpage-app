<template lang="pug">
div
  h1.page-title.mb-4 Choose company
  template(v-for="(item,index) in companies" :key="index")
    v-card.general-card.mb-3(style="min-height:40px")
      v-card-text.pa-4
        .d-flex.flex-row.justify-space-between.align-center
          p.font-weight-bold.text-secondary(style="font-size:16px") {{ item.company.name }}
          v-btn.text-capitalize( @click="selectCompany(item.company)" variant="tonal" color="success" :loading="isLoading") Select
  v-card.general-card.mb-3(style="min-height:40px;")
    v-card-text.pa-4
      .d-flex.flex-row.justify-space-between.align-center
        p.font-weight-medium(style="font-size:16px; color:#ababab") New company
        company-create-company(@add-company="getCompany()")
  
</template>

<script setup>
import { useStoreUser } from '~/store/storeMerchant'
const supabase = useSupabaseAuthClient();
const userStore = useStoreUser()
const router = useRouter()

const companies = ref([])
const isLoading = ref(false)

onMounted(async () => {
  if(!userStore.user.id){
    router.push('/signin')
  }
  userStore.getUser()
  await getCompany()
})

async function getCompany() {
  let resp = await supabase
    .from('company_team')
    .select(`*,
      company(
        id,
        name
      )
    `)
    .eq('user_id', userStore.user.id)
  
  if (resp.data) {
    companies.value = resp.data
  }
}

function selectCompany(data) {
  isLoading.value = true
  let user = userStore.user
  user.current_company = data
  userStore.setUser(user)
  router.push('/admin/dashboard')
  isLoading.value = false
}

</script>
<style lang="scss" scoped></style>
