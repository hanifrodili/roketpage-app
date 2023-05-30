<template lang="pug">
div
  template(v-for="bank in bankList" :key="bank.id")
    settings-item-bank.mb-5(:data="bank" @setManage="manageGateway")
  v-btn.text-capitalize(variant="tonal" rounded size="small" color="info" @click="addBankDialog = true")
    v-icon.mr-2 mdi-plus
    p Add Bank
  general-dialog-type-a(v-model="addBankDialog" :persistent="true")
    template( v-slot:title )
      p Add Bank
    template( v-slot:content )
      v-form(ref="form" fast-fail)
        v-row
          v-col(cols="12")
            v-select(v-model="bankForm.name" variant="outlined" label="Bank" :items="bank" item-title="name" item-value="name" density="compact" hide-details="auto")
        v-row
          v-col(cols="12")
            v-text-field(v-model="bankForm.account_number" variant="outlined" label="Account Number" density="compact" hide-details="auto" :rules="rules.not_empty")
        v-row
          v-col(cols="12")
            v-text-field(v-model="bankForm.account_holder_name" variant="outlined" label="Account Holder Name" density="compact" hide-details="auto" :rules="rules.not_empty")
    template( v-slot:action )
      v-btn( @click="addBankDialog = false" variant="text") Cancel
      v-btn( @click="addBank" variant="tonal" color="info" :loading="loading") Add

      
</template>

<script setup>
import bank from '@/src/bankList.json'

const supabase = useSupabaseAuthClient();
const snackbar = useSnackbar()
const userStore = useStoreUser()

const addBankDialog = ref(false)
const bankList = ref([])
const onEdit = ref(null)
const loading = ref(false)
const company_id = ref('')

const form = ref(null)

const bankForm = ref({
  name: null,
  account_number: '',
  account_holder_name: '',
})

const rules = ref(
  {
    not_empty: [(val) => (val || '').length > 0 || 'This field is required']
  }
)

onMounted( async () => {
  userStore.getUser()
  company_id.value = userStore.user.current_company.id
  await getBanks()
})

function manageGateway(e) {
  console.log(e);
  onEdit.value = e
  openManage.value = true
}

const getBanks = async () => {

  let { data: bank_details, error } = await supabase
    .from('bank_details')
    .select('*')
    .order('name', { ascending: true })
    .eq('company_id', company_id.value)

  bankList.value = bank_details
}

const addBank = async () => {
  loading.value = true
  const validation = await form.value.validate()
  if (!validation.valid) {
    loading.value = false
    return
  }

  // console.log(userStore.user);
  // console.log(bankForm.value.name);

  const resp = await supabase
    .from('bank_details')
    .insert([
      {
        name: bankForm.value.name,
        account_number: bankForm.value.account_number,
        account_holder_name: bankForm.value.account_holder_name,
        company_id: company_id.value
      },
    ])

  // console.log(resp);

  if (resp.status === 201) {
    snackbar.add({
      type: 'success',
      text: 'New bank account added !'
    })

    getBanks()
  }

  if (resp.error) {
    snackbar.add({
      type: 'error',
      text: resp.error.message
    })
  }
  form.value.reset()
  addBankDialog.value = false
  loading.value = false
}
</script>
<style lang="scss" scoped></style>