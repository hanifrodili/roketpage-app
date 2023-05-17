<template lang="pug">
div
  v-card(variant="text")
    v-card-text.pa-1
      div.d-flex.flex-row.align-center.align-start
        div.d-flex.flex-row.flex-grow-1
          v-img(:src="data.logo" height="20")
        div.d-flex.flex-row.align-center(style="gap:10px")
          v-btn.text-capitalize(variant="tonal" rounded size="x-small" color="info" @click="openManage = true" icon="mdi-file-cog-outline")
          v-switch(
            v-model="enabled"
            inset
            hide-details="auto"
            color="primary"
            :value='true'
            density="compact"
            @update:modelValue="toggleGateway"
            )
  
  general-dialog-type-b(v-model="openManage" :persistent="true")
    template( v-slot:title )
      p {{ data.name }}
    template( v-slot:content )
      settings-gateway-toyyibpay(v-if="data.code === 'typ'" @update="(e)=>{typSettings = e}" :data="typSettings")
      settings-gateway-billplz(v-if="data.code === 'bpz'")
    template( v-slot:action )
      v-btn( @click="openManage = false" variant="text") Cancel
      v-btn( @click="updateGateway" variant="tonal" color="info") Save
</template>

<script setup>
const props = defineProps(['data', 'company_id'])
const emit = defineEmits(['setManage'])

const supabase = useSupabaseAuthClient();
const snackbar = useSnackbar()
const userStore = useStoreUser()

const enabled = ref(false)
const company_id = ref('')
const openManage = ref(false)
const typSettings = ref({})
const bpzSettings = ref({})

onMounted( async () => {
  userStore.getUser()
  company_id.value = userStore.user.current_company.id
  if (props.data.code === 'typ') {
    await getToyyibPay()
  }
})

const getToyyibPay = async () => {
  let { data: toyyibpay_gateway, error } = await supabase
    .from('toyyibpay_gateway')
    .select('*')
    .eq('company_id', company_id.value)
    .single()

  if (!error) {
    typSettings.value = toyyibpay_gateway
    enabled.value = toyyibpay_gateway.enabled
  }

  
}

const updateGateway = async () => {
  if (props.data.code === 'typ') {
    console.log(typSettings.value);

    const { status, error } = await supabase
      .from('toyyibpay_gateway')
      .upsert(
        {
          id: typSettings.value.id,
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
      )

    if (status === 201) {
      snackbar.add({
        type: 'success',
        text: 'toyyibPay account saved !'
      })
    }

    openManage.value = false
    getToyyibPay()
  }
}

const toggleGateway = async () => {
  if (props.data.code === 'typ') {
    let { data: toyyibpay_gateway, error } = await supabase
      .from('toyyibpay_gateway')
      .update({ enabled: enabled.value })
      .eq('company_id', company_id.value)
  }
}

const getBillPlz = () => {

}
</script>
<style lang="scss" scoped>
:deep(.v-img__img) {
  object-position: left;
}
</style>
