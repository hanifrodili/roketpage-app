<template lang="pug">
div.py-8
  //- h2.pa-0.mb-3 {{ $t('dashboard') }}
  v-card.card
    div.d-flex.flex-row.align-center.mb-3
      h2.pa-0(style="font-size:20px") {{ $t('latestorder',{number: 5}) }}
      v-btn(icon="mdi-open-in-new" variant="text" size="small" @click="$router.push(`/admin/order`)")
    v-table(style="background-color:transparent")
      tbody
        tr(v-for="order in orders" :key="order.id")
          td.px-0.order-row
            order-item-order-simple(:order="order")
</template>

<script setup>
const userStore = useStoreUser()
const supabase = useSupabaseAuthClient();

const orders = ref([])
const company_id = ref('')

onMounted(async () => {
  userStore.getUser()
  company_id.value = userStore.user.current_company.id
  await getData()
})

async function getData() {
  let query = await supabase
    .from('orders')
    .select('*, customers(name,phone,email,products)', { count: "exact" })
    .order('id', { ascending: false })
    .eq('company_id', company_id.value)
    .eq('status', 'new')
  orders.value = query.data
}
</script>
<style lang="scss" scoped>
.card{
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  min-height: 150px;
  height: 100%;
  box-shadow: none;
  border: .5px solid #ababab;
  border-radius: 8px;
}

.order-row:not(:last-of-type){
  border-bottom: 1px solid #7d7d7d;
}
</style>
