<template lang="pug">
.toyyibpay
  div.mb-5
    a(href="https://toyyibpay.com/e/9168067289452871" target="_blank" style="color:#767676; font-size:12px; letter-spacing:0em") Click here to register
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
        p Payment Channel
        div.d-flex.flex-row
          v-checkbox(v-model="tpForm.fpx" label="FPX" :value="true" hide-details="auto" density="compact" @update:model-value="updateForm")
          div.d-flex.flex-row
            v-checkbox(v-model="tpForm.card" label="Credit/Debit Card" :value="true" hide-details="auto" density="compact" @update:model-value="updateForm")
            v-btn(icon="mdi-help-circle-outline" variant="text" size="small" @click="cardDetails=true")
            general-dialog-type-a(v-model="cardDetails")
              template(#title)
                p About card payment
              template(#content)
                settings-gateway-toyyibpay-card-details
              
    v-row
      v-col(cols="12" md="6")
        v-select(v-model="tpForm.pass_tx_fee" variant="outlined" label="Pass Transaction Fee" :items="selectPassFee" item-title="label" item-value="value"  density="compact" hide-details="auto" hint="Only for transaction via FPX." persistent-hint @update:model-value="updateForm")
      v-col(cols="12" md="6")
        v-text-field(:model-value="tpForm.tx_fee/100" variant="outlined" label="Transaction Fee" density="compact" hide-details="auto" type="number" prefix="RM" disabled)
</template>

<script setup>
const props = defineProps(['data'])
const emit = defineEmits(['update'])
const supabase = useSupabaseAuthClient();

const cardDetails = ref(false)

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
  id: props.data.id,
  secret_key: props.data?.secret_key,
  category_code: props.data?.category_code,
  bill_validity:  props.data?.bill_validity,
  fpx: props.data?.fpx ,
  card: props.data?.card ,
  pass_tx_fee: props.data?.pass_tx_fee ,
  tx_fee: props.data?.tx_fee || 100
})

onMounted( async () => {
  // await getGateway()
})

const updateForm = async () => {
  const validation = await form.value.validate()
  if (!validation.valid) {
    return
  }
  emit('update', tpForm.value)
}

// const getGateway = async () => {
//   let { data: toyyibpay_gateway, error } = await supabase
//     .from('toyyibpay_gateway')
//     .select('*')
//     .eq('company_id', props.company_id)
//     .single()
//   // console.log(toyyibpay_gateway);
//   tpForm.value.secret_key = toyyibpay_gateway.secret_key
//   tpForm.value.category_code = toyyibpay_gateway.category_code
//   tpForm.value.bill_validity = toyyibpay_gateway.bill_validity
//   tpForm.value.fpx = toyyibpay_gateway.fpx
//   tpForm.value.card = toyyibpay_gateway.card
//   tpForm.value.pass_tx_fee = toyyibpay_gateway.pass_tx_fee
//   tpForm.value.tx_fee = toyyibpay_gateway.tx_fee
//   tpForm.value.id = toyyibpay_gateway.id
// }
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
