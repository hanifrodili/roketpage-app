<template lang="pug">
.welcome.pa-0
  div.d-flex.flex-column.align-center.justify-center(style="width:100%; height:100vh")
    img.mb-5(width="200" height="auto" src="/icon.svg")
    h2.mb-5.text-secondary Email Confirmation
    p.text-center Welcome aboard! We've sent a confirmation email to your registered email <span class="text-decoration-underline">{{ email }}</span>.
    p Please follow the link provided in the email to verify your account.
    div.d-flex.flex-row.align-center.mt-10(style="gap:20px")
      a(href="https://gmail.com")
        v-btn( variant="tonal" color="#d14133" icon="mdi-gmail")
      a(href="https://yahoo.com")
        v-btn( variant="tonal" color="#5f01d2" icon="mdi-yahoo")
</template>

<script setup>
const supabase = useSupabaseAuthClient();
const route = useRoute()
const router = useRouter()

definePageMeta({
  layout: "nonav",
})

const email = ref('')
onMounted(async () => {
  if (!route.query.user) {
    router.push('/signin')
  }
  const data = JSON.parse(route.query.user)
  email.value = data.email
})
</script>

<style lang="scss" scoped></style>
