<template lang="pug">
.toyyibpay
  v-form(ref="form")
    v-row
      v-col(cols="12")
        v-text-field(v-model="tpForm.secret_key" variant="outlined" label="Secret Key" density="compact" hide-details="auto" @update:model-value="updateForm" :rules="rules.not_empty")
    v-row
      v-col(cols="12")
        v-text-field(v-model="tpForm.category_code" variant="outlined" label="Category Code" density="compact" hide-details="auto" @update:model-value="updateForm" :rules="rules.not_empty")
    v-row
      v-col(cols="12")
        v-text-field(v-model="tpForm.bill_validity" variant="outlined" label="Bill Validity" density="compact" hide-details="auto" type="number" min="1" suffix="Day(s)" @update:model-value="updateForm" :rules="rules.not_zero")
    v-row
      v-col(cols="12")
        p Payment Chanel
        div.d-flex.flex-row
          v-checkbox(v-model="tpForm.fpx" label="FPX" :value="true" hide-details="auto" density="compact" @update:model-value="updateForm")
          v-checkbox(v-model="tpForm.card" label="Credit/Debit Card" :value="true" hide-details="auto" density="compact" @update:model-value="updateForm")
    v-row
      v-col(cols="12" md="6")
        v-select(v-model="tpForm.pass_tx_fee" variant="outlined" label="Pass Transaction Fee" :items="selectPassFee" item-title="label" item-value="value"  density="compact" hide-details="auto" hint="Only for transaction via FPX." persistent-hint @update:model-value="updateForm")
      v-col(cols="12" md="6")
        v-text-field(:model-value="tpForm.tx_fee/100" variant="outlined" label="Transaction Fee" density="compact" hide-details="auto" type="number" prefix="RM" disabled)
</template>

<script setup>
const props = defineProps(['company_id'])
const emit = defineEmits(['update'])
const supabase = useSupabaseAuthClient();

const rules = ref(
  {
    not_empty: [(val) => (val || '').length > 0 || 'This field is required'],
    not_zero: [(val) => val > 0 || 'Min. 1 day'],
  }
)

const selectPassFee = ref([
  {
    label: 'Yes',
    value: '0'
  },
  {
    label: 'No',
    value: ''
  },
])

const form = ref(null)

const tpForm = ref({
  secret_key: '',
  category_code: '',
  bill_validity: 1,
  fpx: true,
  card: false,
  pass_tx_fee: '',
  tx_fee: 100
})

onMounted( async () => {
  await getGateway()
})

const updateForm = async () => {
  const validation = await form.value.validate()
  if (!validation.valid) {
    return
  }
  emit('update', tpForm.value)
}

const getGateway = async () => {
  let { data: toyyibpay_gateway, error } = await supabase
    .from('toyyibpay_gateway')
    .select('*')
    .eq('company_id', props.company_id)
    .single()
  // console.log(toyyibpay_gateway);
  tpForm.value.secret_key = toyyibpay_gateway.secret_key
  tpForm.value.category_code = toyyibpay_gateway.category_code
  tpForm.value.bill_validity = toyyibpay_gateway.bill_validity
  tpForm.value.fpx = toyyibpay_gateway.fpx
  tpForm.value.card = toyyibpay_gateway.card
  tpForm.value.pass_tx_fee = toyyibpay_gateway.pass_tx_fee
  tpForm.value.tx_fee = toyyibpay_gateway.tx_fee
}
</script>

<style lang="scss" scoped>
:deep(input::-webkit-outer-spin-button),
:deep(input::-webkit-inner-spin-button) {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
:deep(input[type=number]) {
  -moz-appearance: textfield;
}
</style>
