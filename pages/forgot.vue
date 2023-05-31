<template lang="pug">
v-layout.lighten-4.min-height  
  v-main.d-flex
    v-container.ma-auto(style='max-width: 450px')
      .text-center.grey--text
        .text-h4.primary--text 
          b Forgot Password?
        .text-body-2 Enter your account email address and we will send you a link to reset your password.
      v-card.mt-6.rounded-xl(outlined)
        v-card-text
          v-form.mt-5(v-if="!requested")
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
              @click='requestResetPassword',
              :loading='isLoading',
              :rules='rules.email'
            ) 
              b.mr-2 Request Password Reset
              v-icon(right) mdi-arrow-right-bold
          div.pa-3(v-else)
            h3.text-center Please check your email to reset password using given link.
            v-btn.mt-4.text-capitalize.primary--text.elevation-0(
              width="100%"
              size="large"
              color='primary',
              rounded="pill",
              @click='requested=false'
              :disabled="waitingCount > 0 ? true : false"
            ) 
              p.mr-2 Request Again
                span(v-if="waitingCount > 0" )  in {{ waitingCount }} seconds
      .my-2.text-center.text-body-2.text-decoration-underline
        a.cursor-pointer(@click='$router.push("/signin")') Back to Login
</template>

<script setup>
import { useDisplay } from 'vuetify'

definePageMeta({
  layout: "nonav",
})

const supabase = useSupabaseAuthClient();
const snackbar = useSnackbar();

const { lgAndDown, xs } = useDisplay()

const resetPasswordEmail = ref('')
const requested = ref(false)
const waitingCount = ref(0)
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

const requestResetPassword = async () => {
  isLoading.value = true
  let query = await supabase.auth.resetPasswordForEmail(resetPasswordEmail.value)
  if(!query.error){
    snackbar.add({
      type: "success",
      text: 'Password reset requested.',
    });
    requested.value = true
    oneMinuteWait()
  }
  isLoading.value = false
}

const oneMinuteWait = () => {
  waitingCount.value = 60
  const interval = setInterval(() => {
    waitingCount.value = waitingCount.value - 1;

    if (waitingCount.value < 0) {
      clearInterval(interval);
    }
  }, 1000);
}
</script>

<style lang="scss" scoped></style>
