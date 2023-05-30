<template lang="pug">
div
  v-btn.text-capitalize( @click="dialog = true" variant="text" color="info") Create
  general-dialog-type-a(v-model="dialog" :persistent='true')
    template(v-slot:title)
      p Create Company
    template(v-slot:content)
      v-form(ref="form" fast-fail)
        v-row
          v-col.py-2(cols="12")
            v-text-field(v-model="companyForm.subdomain" label="Subdomain" variant="outlined" density="compact" hide-details="auto" suffix=".roketpage.com" :rules="rules.not_empty")
        v-row
          v-col.py-2(cols="12")
            v-text-field(v-model="companyForm.name" label="Name" variant="outlined" density="compact" hide-details="auto" :rules="rules.not_empty")
    template(v-slot:action)
      v-btn.text-capitalize(variant="text" @click="edit = false") Cancel
      v-btn.text-capitalize(variant="tonal" color="info" @click="addCompany") Create
</template>

<script setup>
import axios from 'axios'
import { useStoreUser } from '~/store/storeMerchant'

const supabase = useSupabaseAuthClient();

const emits = defineEmits(['addCompany'])

const snackbar = useSnackbar()
const userStore = useStoreUser()

const dialog = ref(false)
const imageHelpDialog = ref(false)
const descriptionHelpDialog = ref(false)
const loading =ref(false)
const form = ref(null)
const companyForm = ref({
  name: '',
  subdomain: '',
})

const rules = ref(
  {
    not_empty: [(val) => (val || '').length > 0 || 'This field is required']
  }
)

async function addCompany() {
  loading.value = true
  const validation = await form.value.validate()
  if (!validation.valid) {
    return
  }
  userStore.getUser()
  const user = userStore.user

  const resp = await supabase
    .from('company')
    .insert([
      { name: companyForm.value.name, subdomain: companyForm.value.subdomain, owner_id: user.id },
    ])
  
  console.log(resp);
  if (resp.status === 201) {
    userStore.getUser()
    emits('addCompany', true)
  }
  if (resp.error) {
    snackbar.add({
      type: 'error',
      text: error.message
    })
    return
  }

  form.value.reset()
  dialog.value = false
  loading.value = false
}
</script>

<style lang="scss" scoped></style>
