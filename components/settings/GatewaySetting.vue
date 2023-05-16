<template lang="pug">
div
  template(v-for="(item, index) in gatewayList" :key="index")
    settings-item-gateway(:data="item" @setManage="manageGateway" :company_id="company_id")
  general-dialog-type-b(v-model="openManage" :persistent="true")
    template( v-slot:title )
      p {{ onEdit.name }}
    template( v-slot:content )
      settings-gateway-toyyibpay(v-if="onEdit.code === 'typ'" @update="(e)=>{typSettings = e}" :company_id="company_id")
      settings-gateway-billplz(v-if="onEdit.code === 'bpz'")
    template( v-slot:action )
      v-btn( @click="openManage = false" variant="text") Cancel
      v-btn( @click="updateGateway" variant="tonal" color="info") Save

      
</template>

<script setup>
const supabase = useSupabaseAuthClient();
const snackbar = useSnackbar()
const userStore = useStoreUser()

const openManage = ref(false)
const company_id = ref('')
const gatewayList = ref([
  {
    name: 'toyyibPay',
    code: 'typ',
    logo: '/img/gateway/toyyibpay.svg'
  },
  {
    name: 'Billplz',
    code: 'bpz',
    logo: '/img/gateway/billplz.svg'
  }
])

const onEdit = ref(null)
const typSettings = ref({})
const bpzSettings = ref({})

onMounted(() => {
  userStore.getUser()
  company_id.value = userStore.user.current_company.id
})

function manageGateway(e){
  onEdit.value = e
  openManage.value = true
}

const updateGateway = async () => {
  if (onEdit.value.code === 'typ') {
    console.log(typSettings.value);

    const { status, error } = await supabase
      .from('toyyibpay_gateway')
      .insert([
        {
          company_id: company_id.value,
          category_code: typSettings.value.category_code,
          bill_validity: typSettings.value.bill_validity,
          fpx: typSettings.value.fpx,
          card: typSettings.value.card,
          pass_tx_fee: typSettings.value.pass_tx_fee,
          tx_fee: typSettings.value.tx_fee,
          secret_key: typSettings.value.secret_key,
          enabled: true
        },
    ])

    if (status === 201) {
      snackbar.add({
        type: 'success',
        text: 'toyyibPay account added !'
      })
    }

    openManage.value = false
  }
}
</script>
<style lang="scss" scoped></style>
