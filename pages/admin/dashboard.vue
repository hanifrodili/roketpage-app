<template lang="pug">
div.page-content
  dashboard-main-dashboard
  dashboard-latest-order
</template>

<script setup>
import { useStoreUser } from '~/store/storeMerchant'
const userStore = useStoreUser()
const router = useRouter()
const route = useRoute()

definePageMeta({
  middleware: ['auth'],
  name: 'dashboard'
})

onMounted(() => {
  userStore.getUser()
  if (!userStore.user.current_company) {
    router.push('/companies')
  }
})
</script>
<style lang="scss" scoped></style>