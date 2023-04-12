<template lang="pug">
div
  template(v-for="(item, index) in gatewayList" :key="index")
    settings-item-gateway(:data="item" @setManage="manageGateway")
  general-dialog-type-b(v-model="openManage" :persistent="true")
    template( v-slot:title )
      p {{ onEdit.name }}
    template( v-slot:content )
      settings-gateway-toyyibpay(v-if="onEdit.code === 'typ'")
      settings-gateway-billplz(v-if="onEdit.code === 'bpz'")
    template( v-slot:action )
      v-btn( @click="openManage = false" variant="text") Cancel
      v-btn( @click="" variant="tonal" color="info") Save

      
</template>

<script setup>
const openManage = ref(false)
const gatewayList = ref([
  {
    name: 'toyyibPay',
    code: 'typ',
    logo: '/img/gateway/toyyibpay.svg'
  },
  {
    name: 'Billplz',
    code: 'bpz',
    logo: '/img/gateway/billplz.svg'
  }
])

const onEdit = ref(null)

function manageGateway(e){
  onEdit.value = e
  openManage.value = true
}
</script>
<style lang="scss" scoped></style>
