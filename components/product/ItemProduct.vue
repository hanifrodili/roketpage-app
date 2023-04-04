<template lang="pug">
div
  v-card(variant="text")
    v-card-text.pa-1
      div.d-flex.flex-row 
        v-img( src="/img/logo.svg" width="100%" max-width="90px" :aspect-ratio="1")
        div.d-flex.flex-column.pa-2.flex-grow-1
          p.font-weight-bold(style="font-size:14px") {{ product.name }}
          p.flex-wrap.my-2(style="font-size:12px; color:#767676; line-height:16px;") {{ truncateText(product.description) }}
          p.font-weight-bold(style="font-size:13px; color:#767676;") {{ fCurrency(product.base_price) }}
        div.d-flex.flex-column.flex-shrink-1
          v-switch.align-self-end.pr-2(
              inset
              hide-details="auto"
              color="primary"
              value="true"
              v-model="productPublished"
            )
          div.d-flex.flex-row.justify-end
            v-btn(icon="mdi-trash-can-outline" variant="text" size="small" color="red")
            v-btn(icon="mdi-file-edit-outline" variant="text" size="small")
  v-divider.py-1
    
</template>

<script setup>
import { useDisplay } from "vuetify/lib/framework.mjs"

const props = defineProps(['product'])
const display = useDisplay()
const productPublished = ref(true)

onMounted(() => {
  console.log(props.product.status);
  productPublished.value = props.product.status
})

function truncateText(text) {
  const limit = 35
  let truncated = text
  if (display.width.value > 430) {
    return text
  }
  if (text.length > limit) {
    truncated = `${text.substring(0, limit)}...`
  }
  return truncated
}

function fCurrency(amount) {
  return amount.toLocaleString('en-MY', { style: 'currency', currency: 'myr' });
}
</script>
<style lang="scss" scoped></style>
