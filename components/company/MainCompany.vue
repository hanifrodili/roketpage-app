<template lang="pug">
div.mx-auto(style="max-width:800px; width:100%; height:100vh")
  .d-flex.flex-row.align-center
    h1.page-title.mb-4 Choose company
    v-spacer
    p.cursor-pointer.text-decoration-underline(@click="logout" style="color:#ababab") Logout
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
        company-create-company(@add-company="getCompany()" :user="userStore.user")
  
</template>

<script setup>
import Stripe from 'stripe';
import { useStoreUser } from '~/store/storeMerchant'
const supabase = useSupabaseAuthClient();
const userStore = useStoreUser()
const router = useRouter()
const route = useRoute()
const config = useRuntimeConfig()
const snackbar = useSnackbar()

const stripe = Stripe(config.public.stripeSK)

const companies = ref([])
const isLoading = ref(false)

onMounted(async () => {
  userStore.getUser()
  await getCompany()
  if (route.query.session_id) {
    await addCompany(route.query.session_id)
  }
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

async function logout() {
  let { error } = await supabase.auth.signOut();
  if (!error) {
    userStore.setUser();
    router.push("/signin");
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

const addCompany = async (session_id) => {
  const session = await stripe.checkout.sessions.retrieve(session_id);
  if (session) {
    // console.log(session);
    const customer = await stripe.customers.retrieve(session.customer);
    if (session.client_reference_id === userStore.user.id) {
      const resp = await supabase
        .from('company')
        .insert([
          { name: session.metadata.company_name, subdomain: session.metadata.company_subdomain, owner_id: userStore.user.id, active: true, package_price: session.metadata.package_price },
        ])

      if (resp.status === 201) {
        snackbar.add({
          type: 'success',
          text: `${session.metadata.company_name} succesfully created!`
        })

        await getCompany()
      }
      if (resp.error) {
        snackbar.add({
          type: 'error',
          text: resp.error.message
        })
      }
    }

  }
}
</script>
<style lang="scss" scoped></style>