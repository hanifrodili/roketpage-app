<template lang="pug">
v-layout.lighten-4.min-height.d-flex.justify-center.align-center 
  v-main
    v-card.rounded-lg.mx-auto(flat style="max-width:800px; width: 100%;")
      v-row(no-gutter, align='center')
        v-col.py-1(cols='12', sm='6') 
          v-card.grey.lighten-4.pt-5(
            flat,
            :class='xs ? "rounded-t-xl" : "rounded-l-xl"'
          ) 
            v-img(
              src="/icon.svg",
              :max-height='xs ? 100 : 500'
            )

        v-col.py-1(cols='12', sm='6')
          .ma-3.mx-md-6.ml-sm-0
            v-card.mt-4(flat) 
              v-card-text.px-0.px-md-4
                .text-h4 
                  b Welcome
                .text-body-2.mt-n1.text-grey Login to Continue

                v-form.mt-6(ref="form" fast-fail)
                  v-text-field.mb-4(
                    color='secondary'
                    v-model='signinForm.email'
                    label='Email'
                    variant="outlined"
                    :rules='rules.email'
                    type="email"
                    density="compact"
                    hide-details="auto"
                  )
                  v-text-field.mb-4(
                    color='secondary',
                    v-model='signinForm.password',
                    label='Password',
                    variant="outlined"
                    :append-inner-icon='showPasword ? "mdi-eye" : "mdi-eye-off"',
                    @click:append-inner='showPasword = !showPasword',
                    :type='showPasword ? "text" : "password"',
                    :rules='rules.password'
                    density="compact"
                    hide-details="auto"
                  )
                  v-btn.text-capitalize.text--primary.text-body-1.elevation-0(
                    width="100%"
                    color='primary',
                    rounded="lg",
                    @click="signin",
                    :loading='loading'
                  ) 
                    b.mr-2 Login
                    v-icon(right) mdi-arrow-right-bold
                  .text-center.my-1.text-decoration-underline.cursor-pointer.text-grey
                    a.text-body-2(@click='$router.push("/forgot")') Forgot password?
              v-card.mx-md-4.mb-6.rounded-lg(flat, color='#e8e8e8' style="color:#767676")
                v-card-text.text-center.text-body-2.py-2 New Merchant?&nbsp;
                  div
                    a.text-decoration-underline.cursor-pointer.text-info(
                      @click='$router.push("/signup")'
                    ) Create An Account
</template>

<script setup>
import { useDisplay } from 'vuetify'
import { useStoreUser } from '~/store/storeMerchant'
import { storeToRefs } from 'pinia'

definePageMeta({
  layout: "nonav",
})

const supabase = useSupabaseAuthClient();

const router = useRouter()
const { lgAndDown, xs } = useDisplay()
const userStore = useStoreUser()
const snackbar = useSnackbar()

onMounted(async () => {
  const isLoggedIn = await checkSignedIn()
  if (isLoggedIn) {
    router.push('/admin/dashboard')
  }
})

const form = ref(null)
const signinForm = ref({
  email: "",
  password: ""
})
const showPasword = ref(false)
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
  }
)

async function signin() {
  loading.value = true
  const validation = await form.value.validate()
  if (!validation.valid) {
    loading.value = false
    return
  }
  const { data, error } = await supabase.auth.signInWithPassword({
    email: signinForm.value.email,
    password: signinForm.value.password
  })
  
  if (data.session) {
    userStore.setUser(data.user)
    router.push('/companies')
    loading.value = false
  }
  if (error) {
    snackbar.add({
      type: 'error',
      text: error.toString().split(":")[1]
    })
    loading.value = false
  }
}

async function checkSignedIn() {
  const { data, error } = await supabase.auth.getSession()
  if (data.session) {
    return true
  }

  return false
};
</script>

<style lang="scss" scoped></style>
