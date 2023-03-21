<template lang="pug">
.signin.lighten-4.min-height
  v-container.d-flex.flex-column.justify-center(style="height:100%")
    v-card.rounded-xl.mx-auto(flat style="max-width:800px; width: 100%;")
      v-row(no-gutter, align='center')
        v-col(cols='12', sm='6') 
          v-card.grey.lighten-4(
            flat,
            :class='xs ? "rounded-t-xl" : "rounded-l-xl"'
          ) 
            v-img(
              src="/icon.svg",
              :max-height='xs ? 200 : 500'
            )

        v-col(cols='12', sm='6')
          .ma-4.mx-6.ml-sm-0
            v-card.mt-4(flat) 
              v-card-text.grey--text
                .text-h4 
                  b Welcome
                .text-body-2.mt-n1 Login to Continue

                v-form.mt-6()
                  v-text-field(
                    color='secondary'
                    v-model='form.email'
                    label='Email'
                    variant="outlined"
                    :rules='rules.not_empty'
                    type="email"
                  )
                  v-text-field(
                    color='secondary',
                    v-model='form.password',
                    label='Password',
                    variant="outlined"
                    :append-inner-icon='showPasword ? "mdi-eye" : "mdi-eye-off"',
                    @click:append-inner='showPasword = !showPasword',
                    :type='showPasword ? "text" : "password"',
                    :rules='rules.not_empty'
                  )
                  v-btn.text-capitalize.text--primary.text-body-1.mt-2.elevation-0(
                    width="100%"
                    color='primary',
                    rounded="pill",
                    size="large",
                    @click='',
                    :loading='loading'
                  ) 
                    b.mr-2 Login
                    v-icon(right) mdi-arrow-right-bold
                  .text-center.my-1.text-decoration-underline.cursor-pointer
                    a.text-body-2(@click='$router.push("/forgot")') Forgot password?
              v-card.mx-2.mb-6.rounded-lg(flat, color='grey lighten-4')
                v-card-text.text-center.text-body-2.py-2 New Merchant?&nbsp;
                  div
                    a.text-decoration-underline.info--text(
                      @click='$router.push("/signup")'
                    ) Create An Account
</template>

<script setup>
import { useDisplay } from 'vuetify'

const { lgAndDown, xs } = useDisplay()

const form = ref({
  email: '',
  password: ''
})
const showPasword = ref(false)
const loading = ref(false)
const rules = ref(
  {
    not_empty: [(val) => (val || '').length > 0 || 'This field is required'],
  }
)
</script>

<style lang="scss" scoped></style>
