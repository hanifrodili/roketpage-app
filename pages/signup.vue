<template lang="pug">
.signup.lighten-4.min-height
  v-container.d-flex.flex-column.justify-center(style="height:100vh")
    v-card.rounded-xl.mx-auto(flat style="max-width:800px; width: 100%;")
      v-row(no-gutter, align='center')
        v-col(cols='12', sm='6') 
          v-card.grey.lighten-4(
            flat,
            :class='xs ? "rounded-t-xl" : "rounded-l-xl"'
          ) 
            v-img(
              src="/icon.svg",
              :max-height='xs ? 200 : 600'
            )

        v-col(cols='12', sm='6')
          .ma-4.mx-6.ml-sm-0
            v-card.mt-4(flat) 
              v-card-text.grey--text
                .text-h4 
                  b Register
                .text-body-2.mt-n1.mb-2 Get Access to Your Dashboard

                v-form.mt-4()
                  v-text-field.mb-2(
                    v-model='form.company_name',
                    color='secondary',
                    label='Company Name',
                    :rules='rules.not_empty',
                    variant="outlined"
                    rounded
                  )
                  v-text-field.mb-2(
                    v-model='form.full_name',
                    color='secondary',
                    label='Your Name',
                    :rules='rules.not_empty',
                    variant="outlined"
                  )
                  v-text-field.mb-2(
                    v-model='form.email',
                    color='secondary',
                    label='E-mail address',
                    variant="outlined",
                    :rules='rules.email'
                  )
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
                  v-btn.text-capitalize.text--secondary.elevation-0(
                    width="100%"
                    color='primary',
                    rounded="pill",
                    size="large",
                    @click='',
                    :loading='isLoading'
                  ) 
                    b.mr-2 Create Acount
                    v-icon(right) mdi-account-plus

                  .text-center.my-2.text-caption
                    div By signing up, you agree to the
                    .mt-n1
                      a(
                        style='text-decoration: underline',
                        href='',
                        target='_blank'
                      ) TERMS OF SERVICE
                      span &nbsp;&&nbsp;
                      a(
                        style='text-decoration: underline',
                        href='',
                        target='_blank'
                      ) PRIVACY POLICY

                v-card.mx-2.my-4.rounded-lg(flat, color='grey lighten-4')
                  v-card-text.text-center.text-body-2.py-2 Registered?&nbsp;
                    a.text-decoration-underline.info--text.cursor-pointer(
                      @click='$router.push("/signin")'
                    ) Login Here
  //- dialogs
  //- div 
    v-dialog(v-model='successDialog', max-width='450', persistent)
      register-success-dialog(@signin='signIn')
</template>

<script setup>
import { useDisplay } from 'vuetify'

const { xs } = useDisplay()

const form = ref({
  company_name: '',
  full_name: '',
  email: '',
  password: '',
  repeat_password: '',
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

<style lang="scss" scoped></style>