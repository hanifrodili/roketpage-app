<template lang="pug">
.forgot.lighten-4.min-height
  v-container(style='max-width: 450px')
    v-card(
      flat,
      color='transparent',
      :min-height='lgAndDown ? 50 : 300'
    ) 
    .text-center.grey--text.mt-4
      .text-h4.primary--text 
        b Reset Password
      .text-body-2 Enter your new password.
    v-card.mt-6.rounded-xl(outlined)
      v-card-text
        v-form.mt-5()
          v-text-field.mb-2(
            v-model='form.password',
            color='secondary',
            label='Password',
            variant="outlined",
            :append-inner-icon='showPasword ? "mdi-eye" : "mdi-eye-off"',
            @click:append='showPasword = !showPasword',
            :type='showPasword ? "text" : "password"',
            :rules='rules.password'
          )
          v-text-field.mb-2(
            v-model='form.repeat_password',
            color='secondary',
            label='Repeat Password',
            variant="outlined",
            :append-inner-icon='showPasword ? "mdi-eye" : "mdi-eye-off"',
            @click:append-inner='showPasword = !showPasword',
            :type='showPasword ? "text" : "password"',
            :rules='rules.repeat_password'
          )
          v-btn.mb-4.text-capitalize.primary--text.elevation-0(
            width="100%"
            size="large"
            color='primary',
            rounded="pill",
            @click='',
            :loading='isLoading',
          ) 
            b.mr-2 Submit
            v-icon(right) mdi-arrow-right-bold
    .my-2.text-center.text-body-2.text-decoration-underline
      a(@click='$router.push("/signin")') Back to Login
</template>

<script setup>
import { useDisplay } from 'vuetify'

const { lgAndDown, xs } = useDisplay()

const form = ref({
  password: '',
  repeat_password: '',
})

const showPasword = ref(false)
const isLoading = ref(false)
const rules = ref({
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
})
</script>

<style lang="scss" scoped></style>
