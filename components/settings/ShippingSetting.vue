<template lang="pug">
div
  template(v-for="bank in shippingList" :key="bank.id")
    settings-item-shipping.py-2(:data="bank" @setManage="manageGateway" style="border-bottom:0.5px solid #ababab")
  v-btn.text-capitalize.my-4(variant="tonal" rounded size="small" color="info" @click="addShippingDialog = true")
    v-icon.mr-2 mdi-plus
    p Add Shipping
  general-dialog-type-a(v-model="addShippingDialog" :persistent="true")
    template( v-slot:title )
      p Add Bank
    template( v-slot:content )
      v-form(ref="form" fast-fail)
        v-row
          v-col(cols="12")
            v-combobox(v-model="bankForm.courier_name" variant="outlined" label="Courier Name" :items="couriers" item-title="name" item-value="name" density="compact" hide-details="auto")
        v-row
          v-col(cols="12")
            v-textarea(v-model="bankForm.description" variant="outlined" label="Description" density="compact" hide-details="auto" :rules="rules.not_empty")
        v-row.my-4(v-for="(rate, index) in rateList" :key="index" dense)
          v-col(cols="4")
            v-text-field(v-model="rate.min" variant="outlined" label="Min (KG)" density="compact" hide-details="auto" :rules="rules.not_empty")
          v-col(cols="4")
            v-text-field(v-model="rate.max" variant="outlined" label="Max (KG)" density="compact" hide-details="auto" :rules="rules.not_empty")
          v-col(cols="4")
            v-text-field(v-model="rate.rate" variant="outlined" label="Rate (RM)" density="compact" hide-details="auto" :rules="rules.not_empty")
        v-btn.text-capitalize.my-4(variant="tonal" rounded size="small" color="info" prepend-icon="mdi-plus" @click="()=>{rateList.push({min:null, max:null, rate:null})}") Add Bank
    template( v-slot:action )
      v-btn( @click="addShippingDialog = false" variant="text") Cancel
      v-btn( @click="addShipping" variant="tonal" color="info" :loading="loading") Add

      
</template>

<script setup>
import couriers from '@/src/courierList.json'

const supabase = useSupabaseAuthClient();
const snackbar = useSnackbar()
const userStore = useStoreUser()

const addShippingDialog = ref(false)
const shippingList = ref([])
const onEdit = ref(null)
const loading = ref(false)
const company_id = ref('')
const ratesCount = ref(1)
const rateList = ref([
  {
    min: 0.1,
    max: 1,
    rate: 0,
  }
])

const form = ref(null)

const bankForm = ref({
  courier_name: '',
  description: '',
  rates_sm: [],
  rates_ss: []
})

const rules = ref(
  {
    not_empty: [(val) => (val || '').length > 0 || 'This field is required']
  }
)

onMounted(async () => {
  userStore.getUser()
  company_id.value = userStore.user.current_company.id
  await getShippings()
})

const getShippings = async () => {

  let { data: bank_details, error } = await supabase
    .from('shipping_details')
    .select('*')
    .order('courier_name', { ascending: true })
    .eq('company_id', company_id.value)

  shippingList.value = bank_details
}

const addShipping = async () => {
  loading.value = true
  const validation = await form.value.validate()
  if (!validation.valid) {
    loading.value = false
    return
  }

  // console.log(userStore.user);
  // console.log(bankForm.value.name);

  const resp = await supabase
    .from('shipping_details')
    .insert([
      {
        // name: bankForm.value.name,
        // account_number: bankForm.value.account_number,
        // account_holder_name: bankForm.value.account_holder_name,
        // company_id: company_id.value
      },
    ])

  // console.log(resp);

  if (resp.status === 201) {
    snackbar.add({
      type: 'success',
      text: 'New shipping service added !'
    })

    getShippings()
  }

  if (resp.error) {
    snackbar.add({
      type: 'error',
      text: resp.error.message
    })
  }
  form.value.reset()
  addShippingDialog.value = false
  loading.value = false
}
</script>
<style lang="scss" scoped></style>