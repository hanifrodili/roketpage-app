<template lang="pug">
div
  settings-item-bank.mb-5(:data="item" @setManage="manageGateway")
  v-btn.text-capitalize(variant="tonal" rounded size="small" color="info" @click="addBank = true")
    v-icon.mr-2 mdi-plus
    p Add Bank
  general-dialog-type-a(v-model="addBank" :persistent="true")
    template( v-slot:title )
      p Add Bank
    template( v-slot:content )
      v-form
        v-row
          v-col(cols="12")
            v-select(variant="outlined" label="Bank" :items="bank" item-title="name" item-value="name" density="compact" hide-details="auto")
        v-row
          v-col(cols="12")
            v-text-field(variant="outlined" label="Account Number" density="compact" hide-details="auto")
        v-row
          v-col(cols="12")
            v-text-field(variant="outlined" label="Account Holder Name" density="compact" hide-details="auto")
    template( v-slot:action )
      v-btn( @click="addBank = false" variant="text") Cancel
      v-btn( @click="" variant="tonal" color="info") Add

      
</template>

<script setup>
import bank from '@/src/bankList.json'
const addBank = ref(false)

const onEdit = ref(null)

function manageGateway(e) {
  onEdit.value = e
  openManage.value = true
}
</script>
<style lang="scss" scoped></style>