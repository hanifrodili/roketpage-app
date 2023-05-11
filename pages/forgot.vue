<template lang="pug">
v-layout.lighten-4.min-height  
  v-main
    v-container(style='max-width: 450px')
      v-card(
        flat,
        color='transparent',
        :min-height='lgAndDown ? 50 : 300'
      ) 
      .text-center.grey--text.mt-4
        .text-h4.primary--text 
          b Forgot Password?
        .text-body-2 Enter your account email address and we will send you a link to reset your password.
      v-card.mt-6.rounded-xl(outlined)
        v-card-text
          v-form.mt-5()
            v-text-field(
              color='secondary',
              v-model='resetPasswordEmail',
              label='Email',
              variant="outlined"
            )
            v-btn.mb-4.text-capitalize.primary--text.elevation-0(
              width="100%"
              size="large"
              color='primary',
              rounded="pill",
              @click='',
              :loading='isLoading',
              :rules='rules.email'
            ) 
              b.mr-2 Request Password Reset
              v-icon(right) mdi-arrow-right-bold
      .my-2.text-center.text-body-2.text-decoration-underline
        a(@click='$router.push("/signin")') Back to Login
</template>

<script setup>
import { useDisplay } from 'vuetify'

definePageMeta({
  layout: "nonav",
})

const { lgAndDown, xs } = useDisplay()

const resetPasswordEmail = ref('')
const isLoading = ref(false)
const rules = ref({
  email: [
    (v) => !!v || 'E-mail address is required',
    (v) =>
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        v
      ) || 'E-mail must be valid',
  ],
})
</script>

<style lang="scss" scoped></style>
