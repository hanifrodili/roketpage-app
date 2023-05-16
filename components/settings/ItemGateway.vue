<template lang="pug">
div
  v-card(variant="text")
    v-card-text.pa-1
      div.d-flex.flex-row.align-center.align-start
        div.d-flex.flex-row.flex-grow-1
          v-img(:src="data.logo" height="20")
        div.d-flex.flex-row.align-center(style="gap:10px")
          v-btn.text-capitalize(variant="tonal" rounded size="x-small" color="info" @click="$emit('setManage', data)" icon="mdi-file-cog-outline")
          v-switch(
            v-model="enabled"
            inset
            hide-details="auto"
            color="primary"
            :value='true'
            density="compact"
            @update:modelValue="toggleGateway"
            )
</template>

<script setup>
const props = defineProps(['data'])
const emit = defineEmits(['setManage'])

const supabase = useSupabaseAuthClient();
const snackbar = useSnackbar()
const userStore = useStoreUser()

const enabled = ref(false)
const company_id = ref('')

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
    .select('enabled')
    .eq('company_id', company_id.value)
    .single()

  enabled.value = toyyibpay_gateway.enabled
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
