<template lang="pug">
v-layout.lighten-4.min-height  
  v-main.d-flex
    v-container.ma-auto(style='max-width: 450px')
      v-card.general-card
        v-card-text
          //- p {{ query }}
          div.d-flex.flex-column.align-center.justify-center(v-if="query.status_id === '1'" style="height:-webkit-fill-available")
            lottie-player(
              loop
              autoplay
              style="width:300px"
              src="https://assets6.lottiefiles.com/packages/lf20_ufoeuntu.json"
              speed="1"
              debug
            )
            p Thank you for your order!
            a(:href="`https://dev.toyyibpay.com/${query.billcode}`" target="_blank") See receipt

          div.d-flex.flex-column.align-center.justify-center(v-if="query.status_id === '3'" style="height:-webkit-fill-available")
            lottie-player(
              loop
              autoplay
              style="width:300px"
              src="https://assets6.lottiefiles.com/packages/lf20_Dum1s3.json"
              speed="1"
              debug
            )
            p Your payment do not go through.
            a(:href="`https://dev.toyyibpay.com/${query.billcode}`") Try again
</template>

<script setup>
const route = useRoute()
const supabase = useSupabaseAuthClient()
definePageMeta({
  layout: "nonav",
})

const query = ref(route.query)
onMounted(async() => {
  await updatePayment()
})

const updatePayment = async () => {
  console.log(query.value.status_id);
  if (query.value.status_id === 1) {
    const resp = await supabase
      .from('customers')
      .update([
        {
          paid: true,
          tx_id: query.value.transaction_id,
          status: 'closed'
        }
      ])
      .eq('id', query.value.order_id)
    
    if (resp.status === 204) {
      await supabase
        .from('order')
        .update([
          {
            status: 'new'
          }
        ])
        .eq('customer_id', query.value.order_id)
    }
  }
}

</script>

<style lang="scss" scoped></style>
