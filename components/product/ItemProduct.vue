<template lang="pug">
div
  v-card(variant="text")
    v-card-text.pa-1
      div.d-flex.flex-row
        v-img( :src="product.image === '#' ? '/img/logo.svg' : product.image"
          max-width="90"
          width="100%"
          cover
          style="aspect-ratio:1"
        )
        div.d-flex.flex-column.pa-1.px-2.px-md-5.flex-grow-1
          p.font-weight-bold(style="font-size:14px") {{ product.name }}
          p.flex-wrap.my-1(style="font-size:12px; color:#767676; line-height:16px;") {{ truncateText(product.description) }}
          p.font-weight-bold(style="font-size:13px; color:#767676;") {{ fCurrency(product.base_price) }}
        div.d-flex.flex-column.flex-shrink-1
          v-switch.align-self-end.pr-2(
              inset
              hide-details="auto"
              hide-error
              color="primary"
              :value="true"
              density="compact"
              v-model="productPublished"
              @update:modelValue="$emit('updatePublish',{id:product.id, value: productPublished })"
            )
          div.d-flex.flex-row.justify-end
            v-btn(icon="mdi-trash-can-outline" variant="text" size="small" color="red" @click="dialogDelete = true")
            //- v-btn(icon="mdi-file-edit-outline" variant="text" size="small")
            product-edit-product(:product="product" @update-product="$emit('update')")
  v-divider.py-1

  general-dialog-delete(v-model="dialogDelete" @delete="$emit('delete', product.id)")
    
</template>

<script setup>
import { useDisplay } from "vuetify/lib/framework.mjs"

const props = defineProps(['product'])
const emits = defineEmits(['updatePublish', 'delete', 'update'])
const display = useDisplay()
const productPublished = ref(false)
const dialogDelete = ref(false)

onMounted(() => {
  productPublished.value = props.product.published
})

function truncateText(text) {
  const limit = 25
  let truncated = text
  if (display.width.value > 430) {
    return text
  }
  if (text.length > limit) {
    truncated = `${text.substring(0, limit)}...`
  }
  return truncated
}

function fCurrency(cent) {
  const amount = cent/100
  return amount.toLocaleString('en-MY', { style: 'currency', currencyDisplay: 'symbol', currency: 'myr' });
}
</script>
<style lang="scss" scoped>
:deep(.v-img .v-img__img){
  object-position: top;
}
</style>
