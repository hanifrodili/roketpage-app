<template lang="pug">
v-layout.lighten-4.min-height.d-flex.justify-center.align-center 
  v-main
    v-container.d-flex.flex-column.justify-center.pa-0()
      v-card.rounded-lg.mx-auto(flat style="max-width:800px; width: 100%;")
        v-row(no-gutter, align='center')
          v-col.py-1(cols='12', sm='6') 
            v-card.grey.lighten-4.pt-5(
              flat,
              :class='xs ? "rounded-t-xl" : "rounded-l-xl"'
            ) 
              v-img.rounded-circle.mx-auto(
                :src="registerForm.avatar_url ? registerForm.avatar_url : '/icon.svg'",
                :width='xs ? 150 : 300'
                aspect-ratio="1/1"
              )

          v-col.py-1(cols='12', sm='6')
            .ma-4.mx-md-6.ml-sm-0
              v-card.mt-4(flat) 
                v-card-text.px-0.px-md-4
                  .text-h4 
                    b Register
                  .text-body-2.mt-n1.mb-2.text-grey Get Access to Your Dashboard

                  v-form.mt-4(ref="form" fast-fail)
                    v-text-field.mb-4(
                      v-model='registerForm.avatar_url',
                      color='secondary',
                      label='Profile Image URL',
                      :rules='rules.not_empty',
                      variant="outlined"
                      rounded
                      density="compact"
                      hide-details="auto"
                    )
                    v-text-field.mb-4(
                      v-model='registerForm.full_name',
                      color='secondary',
                      label='Your Name',
                      :rules='rules.not_empty',
                      variant="outlined"
                      density="compact"
                      hide-details="auto"
                    )
                    v-text-field.mb-4(
                      v-model='registerForm.email',
                      color='secondary',
                      label='E-mail address',
                      variant="outlined",
                      :rules='rules.email'
                      density="compact"
                      hide-details="auto"
                    )
                    v-text-field.mb-4(
                      v-model='registerForm.password',
                      color='secondary',
                      label='Password',
                      variant="outlined",
                      :append-inner-icon='showPassword ? "mdi-eye" : "mdi-eye-off"',
                      @click:append-inner='showPassword = !showPassword',
                      :type='showPassword ? "text" : "password"',
                      :rules='rules.password'
                      density="compact"
                      hide-details="auto"
                    )
                    v-text-field.mb-4(
                      v-model='registerForm.repeat_password',
                      color='secondary',
                      label='Repeat Password',
                      variant="outlined",
                      :append-inner-icon='showPassword2 ? "mdi-eye" : "mdi-eye-off"',
                      @click:append-inner='showPassword2 = !showPassword2',
                      :type='showPassword2 ? "text" : "password"',
                      :rules='rules.repeat_password'
                      density="compact"
                      hide-details="auto"
                    )
                    v-btn.text-capitalize.text--secondary.elevation-0(
                      width="100%"
                      color='primary',
                      rounded="lg",
                      @click='signup',
                      :loading='loading'
                    ) 
                      b.mr-2 Create Acount
                      v-icon(right) mdi-account-plus

                    .text-center.my-2.text-caption.text-grey
                      div By signing up, you agree to the
                      .mt-n1
                        a.text-info(
                          style='text-decoration: underline',
                          href='',
                          target='_blank'
                        ) TERMS OF SERVICE
                        span &nbsp;&&nbsp;
                        a.text-info(
                          style='text-decoration: underline',
                          href='',
                          target='_blank'
                        ) PRIVACY POLICY

                  v-card.mb-6.rounded-lg(flat, color='#e8e8e8' style="color:#767676")
                    v-card-text.text-center.text-body-2.py-2 Registered?&nbsp;
                      a.text-decoration-underline.cursor-pointer.text-info(
                        @click='$router.push("/signin")'
                      ) Login Here
  //- dialogs
  //- div 
    v-dialog(v-model='successDialog', max-width='450', persistent)
      register-success-dialog(@signin='signIn')
</template>

<script setup>
import { useDisplay } from 'vuetify'
const supabase = useSupabaseAuthClient();

const { xs } = useDisplay()
const router = useRouter()
const snackbar = useSnackbar()

const form = ref(null)
const registerForm = ref({
  avatar_url: '',
  full_name: '',
  email: '',
  password: '',
  repeat_password: '',
})
const showDialog = ref(false)
const showPassword = ref(false)
const showPassword2 = ref(false)
const loading = ref(false)
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
      (v) => v === registerForm.value.password || 'Password is not match',
    ],
  }
)

async function signup() {
  loading.value = true
  const validation = await form.value.validate()
  if (!validation.valid) {
    return
  }

  
  let { data:profiles, error_profile } = await supabase
    .from('profiles')
    .select("email")
    .eq('email', registerForm.value.email)

  if (profiles.length) {
    snackbar.add({
      type: 'error',
      text: "Email already exist."
    })
    loading.value = false
    return
  }
 
  const { data, error_signup } = await supabase.auth.signUp({
    email: registerForm.value.email,
    password: registerForm.value.password,
    options: {
      data: {
        full_name: registerForm.value.full_name,
        avatar_url: registerForm.value.avatar_url
      },
    },
  })

  // console.log(data);

  loading.value = false
  router.push('/welcome?user='+JSON.stringify(data.user))
}
</script>

<style lang="scss" scoped></style>