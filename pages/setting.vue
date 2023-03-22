<template lang="pug">
.setting.mx-auto(style="max-width:1240px;")
  h2.pa-0.mb-3.mt-15 {{ $t('setting') }}
  v-expansion-panels
    v-expansion-panel(:title="$t('account')")
      v-expansion-panel-text.panel-body
        v-form.mt-4()
          v-text-field.mb-2(
            v-model='account.full_name',
            color='secondary',
            label='Your Name',
            :rules='rules.not_empty',
            variant="outlined"
          )
          v-text-field.mb-2(
            v-model='account.email',
            color='secondary',
            label='E-mail',
            variant="outlined",
            :rules='rules.email'
            type="email"
            disabled
          )
          v-text-field.mb-2(
            v-model='account.phone',
            color='secondary',
            label='Phone number',
            variant="outlined",
            type="tel"
          )
          v-text-field.mb-2(
            v-model='account.password',
            color='secondary',
            label='Password',
            variant="outlined",
            :append-inner-icon='showPasword ? "mdi-eye" : "mdi-eye-off"',
            @click:append='showPasword = !showPasword',
            :type='showPasword ? "text" : "password"',
            :rules='rules.password'
          )
          v-text-field.mb-2(
            v-model='account.repeat_password',
            color='secondary',
            label='Repeat Password',
            variant="outlined",
            :append-inner-icon='showPasword ? "mdi-eye" : "mdi-eye-off"',
            @click:append-inner='showPasword = !showPasword',
            :type='showPasword ? "text" : "password"',
            :rules='rules.repeat_password'
          )
          v-btn.text-capitalize.text--secondary.elevation-0(
            width="100%"
            color='primary',
            rounded="pill",
            size="large",
            @click='',
            :loading='isLoading'
          ) 
            b.mr-2 {{ $t('save') }}
            v-icon(right) mdi-content-save

    v-expansion-panel(:title="$t('company')")
      v-expansion-panel-text.panel-body
        v-form.mt-4()
          v-text-field.mb-2(
            v-model='company.company_name',
            color='secondary',
            label='Company name',
            :rules='rules.not_empty',
            variant="outlined"
          )
          v-text-field.mb-2(
            v-model='company.company_email',
            color='secondary',
            label='Company e-mail',
            variant="outlined",
            :rules='rules.email'
            type="email"
          )
          v-text-field.mb-2(
            v-model='company.company_phone',
            color='secondary',
            label='Company phone number',
            variant="outlined",
            :rules='rules.not_empty',
            type="tel"
          )
          v-text-field.mb-2(
            v-model='company.company_address',
            color='secondary',
            label='Company address',
            variant="outlined",
            :rules='rules.not_empty'
          )
          v-btn.text-capitalize.text--secondary.elevation-0(
            width="100%"
            color='primary',
            rounded="pill",
            size="large",
            @click='',
            :loading='isLoading'
          ) 
            b.mr-2 {{ $t('save') }}
            v-icon(right) mdi-content-save
</template>

<script setup>
import { useDisplay } from 'vuetify'

const { xs } = useDisplay()

const account = ref({
  full_name: '',
  email: '',
  phone: '',
  password: '',
  repeat_password: '',
})
const company = ref({
  company_name: '',
  company_email: '',
  company_phone: '',
  company_reg_no: '',
  comapny_address: '',
})
const showDialog = ref(false)
const showPasword = ref(false)
const isLoading = ref(false)
const rules = ref(
  {
    not_empty: [(val) => (val || '').length > 0 || 'This field is required'],
    email: [
      (v) => !!v || 'E-mail address is required',
      (v) =>
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || 'E-mail must be valid',
    ],
    password: [
      (v) => !!v || 'Password is required',
      (v) => (v || '').length >= 8 || 'Must be 8 characters and above',
    ],
    repeat_password: [
      (v) => !!v || 'Repeat Password is required',
      (v) => (v || '').length >= 8 || 'Must be 8 characters and above',
      (v) => v === form.value.password || 'Password is not match',
    ],
  }
)
</script>

<style lang="scss" scoped>
.panel-body{
  padding: 20px 40px;
}
</style>
