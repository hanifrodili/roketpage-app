<template lang="pug">
div.page-content
  .d-flex.flex-row.align-center
    v-btn(variant="text" icon="mdi-arrow-left" @click.stop="$router.push('/admin/settings')")
    h1.page-title {{ $t('account') }}
  v-card.general-card
    v-form.pa-4
        v-row
          v-col.align-self-center.mb-3(cols="12" md="2")
            v-img.mx-auto.rounded-circle(:aspect-ratio="1/1" width="100" :src="account.avatar_url")
        p.mb-3(style="font-size:14px; font-weight:600; color: #767676") User Info
        v-row
          v-col.py-2(cols="12")
            v-text-field(v-model="account.avatar_url" label="Avatar URL" variant="outlined" density="compact" hide-details="auto" )
        v-row
          v-col.py-2(cols="12")
            v-text-field(v-model="account.name" label="Name" variant="outlined" density="compact" hide-details="auto" )
        v-row
          v-col.py-2(cols="12" md="6" )
            v-text-field(v-model="account.email" label="Email" variant="outlined" density="compact" hide-details="auto" disabled )
          v-col.py-2(cols="12" md="6" )
            v-text-field(v-model="account.phone_number" label="Phone Number" variant="outlined" density="compact" hide-details="auto" prefix="+60")
        v-row
          v-col.py-2(cols="12")
            v-btn.text-capitalize.w-100(variant="tonal" color="info" @click="save") Save
        v-divider.mb-4.mt-7
        p.mb-3(style="font-size:14px; font-weight:600; color: #767676") Password
        v-row
          v-col.py-2(cols="12")
            div.d-flex.flex-column.align-center(style="gap:20px")
              v-btn.w-100.text-capitalize( @click="editPasswordDialog = true" variant="tonal" color="info" ) Update Password
              p.font-italic(style="font-size:14px; font-weight:300; color: #767676") Last update: 04/03/2023 at 09:39 PM
              //- v-btn( @click="editPasswordDialog = true" color="info" variant="text" icon="mdi-lock-reset" )
              
  

  general-dialog-type-a(v-model="editPasswordDialog" :persistent='true')
    template(v-slot:title)
      p Update Password
    template(v-slot:content)
      v-form
        v-row
          v-col.py-2(cols="12")
            v-text-field( label="Current Password" :type="showCurrent ? 'text' : 'password'" variant="outlined" density="compact" hide-details="auto" :append-inner-icon="showCurrent ? 'mdi-eye' : 'mdi-eye-off'" @click:append-inner="showCurrent = !showCurrent")
        v-row
          v-col.py-2(cols="12")
            v-text-field( label="New Password" :type="showNew ? 'text' : 'password'" variant="outlined" density="compact" hide-details="auto" :append-inner-icon="showNew ? 'mdi-eye' : 'mdi-eye-off'" @click:append-inner="showNew = !showNew")
        
    template(v-slot:action)
      v-btn.text-capitalize(variant="text" @click="editPasswordDialog = false") Cancel
      v-btn.text-capitalize(variant="tonal" color="info") Update
</template>

<script setup>
import { useStoreUser } from '~/store/storeMerchant'

definePageMeta({
  middleware: 'auth',
  name: 'settings-account'
})

const snackbar = useSnackbar()
const userStore = useStoreUser()
const supabase = useSupabaseAuthClient();

const account = ref({
  name: "",
  phone_number: "",
  email: "",
  avatar_url: ""
})
const edit = ref(false)

onMounted(async () => {
  await userStore.getUser()
  account.value.name = userStore.user.profile.full_name
  account.value.email = userStore.user.email
  account.value.phone_number = userStore.user.profile.phone_number
  account.value.avatar_url = userStore.user.profile.avatar_url
})

const save = async () => {
  const { status, error } = await supabase
    .from('profiles')
    .update({
      full_name: account.value.name,
      phone_number: account.value.phone_number
    })
    .eq('id', userStore.user.id)

  if (status === 204) {
    snackbar.add({
      type: 'success',
      text: `Account successfully updated!`
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

const editPasswordDialog = ref(false)
const showCurrent = ref(false)
const showNew = ref(false)
</script>

<style lang="scss" scoped>
.card{
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 8px;
  position: relative;
  // align-items: center;
  // justify-content: center;
  // box-shadow: 0px 2px 4px -1px rgb(34 34 34 / 50%);
  box-shadow: none;
  min-height: 400px;
  height: fit-content;
  border: .5px solid #ababab;
  border-radius: 8px;
}
</style>
