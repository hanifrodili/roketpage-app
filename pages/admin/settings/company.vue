<template lang="pug">
div.page-content
  .d-flex.flex-row.align-center.mb-5
    v-btn(variant="text" icon="mdi-arrow-left" @click.stop="$router.push('/admin/settings')")
    h1.page-title {{ $t('company') }}
  v-card.general-card
    v-btn.text-capitalize( @click="edit = true" rounded size="small" variant="tonal" color="info" style="position:absolute; top:10px; right:10px;" )
      v-icon mdi-pencil-box-outline
      p Edit
    v-card-text.pa-2.pa-md-4
      div.content
        p.label Name
        p.text {{ company?.name }}
      div.content
        p.label SSM Reg. Number
        p.text {{ company?.reg_number || 'n/a'}}
      div.content
        p.label Email
        p.text {{ company?.email || 'n/a' }}
      div.content
        p.label Phone
        p.text {{ company?.phone_number || 'n/a' }}
      div.content
        p.label Address
        p.text {{ company?.address || 'n/a' }}<br>{{ company?.postcode }}, {{ company?.city }},<br>{{ company?.state }} {{ company?.country }}
      

  

  general-dialog-type-a(v-model="edit" :persistent='true')
    template(v-slot:title)
      p Edit Company
    template(v-slot:content)
      v-form()
        v-row
          v-col.py-2(cols="12")
            v-text-field(v-model="company.name" label="Name" variant="outlined" density="compact" hide-details="auto" disabled)
        v-row
          v-col.py-2(cols="12" md="4" )
            v-text-field(v-model="company.reg_number" label="SSM Reg. Number" variant="outlined" density="compact" hide-details="auto" )
          v-col.py-2(cols="12" md="4" )
            v-text-field(v-model="company.email" label="Email" variant="outlined" density="compact" hide-details="auto" )
          v-col.py-2(cols="12" md="4" )
            v-text-field(v-model="company.phone_number" label="Phone" variant="outlined" density="compact" hide-details="auto" )
        v-row
          v-col.py-2(cols="12")
            v-textarea(v-model="company.address" label="Address" variant="outlined" density="compact" hide-details="auto" )
        v-row
          v-col.py-2(cols="12" md="4" )
            v-text-field(v-model="company.postcode" label="Postcode" variant="outlined" density="compact" hide-details="auto" )
          v-col.py-2(cols="12" md="4" )
            v-text-field(v-model="company.city" label="City" variant="outlined" density="compact" hide-details="auto" )
          v-col.py-2(cols="12" md="4" )
            v-text-field(v-model="company.state" label="State" variant="outlined" density="compact" hide-details="auto" )
    template(v-slot:action)
      v-btn.text-capitalize(variant="text" @click="edit = false") Cancel
      v-btn.text-capitalize(variant="tonal" color="info" @click="save") Save
</template>

<script setup>
import { useStoreUser } from '~/store/storeMerchant'

definePageMeta({
  middleware: 'auth',
  name: 'settings-company'
})

const snackbar = useSnackbar()
const userStore = useStoreUser()
const supabase = useSupabaseAuthClient();

const company = ref({
  name: "",
  phone_number: "",
  reg_number: "",
  address: "",
  postcode: "",
  city: "",
  state: "",
  country: "",
  email: ""
})
const edit = ref(false)

onMounted( async () => {
  await userStore.getUser()
  company.value = userStore.user.current_company.company
})

const save = async () => {
  const { status, error } = await supabase
    .from('company')
    .update({ 
      phone_number: company.value.phone_number,
      reg_number: company.value.reg_number,
      address: company.value.address,
      postcode: company.value.postcode,
      city: company.value.city,
      state: company.value.state,
      country: company.value.country,
      email: company.value.email
    })
    .eq('id', userStore.user.current_company.id)

    if (status === 204) {
      snackbar.add({
        type: 'success',
        text: `Company successfully updated!`
      })
    }
    if (error) {
      snackbar.add({
        type: 'error',
        text: error.message
      })
    }
  edit.value = false
}
</script>

<style lang="scss" scoped>

.content{
  margin-bottom: 10px;
  .label{
    font-size: 12px;
    font-weight: 400;
    color: #767676;
  }
  .text{
    font-size: 14px;
    font-weight: 600;
  }
}
</style>
