<template lang="pug">
.toyyibpay
  v-form
    v-row
      v-col(cols="12")
        v-text-field(variant="outlined" label="Secret Key" density="compact" hide-details="auto")
    v-row
      v-col(cols="12")
        v-text-field(variant="outlined" label="Collection ID" density="compact" hide-details="auto")
    v-row
      v-col(cols="12")
        v-text-field(variant="outlined" label="Bill Validity" density="compact" hide-details="auto" type="number" suffix="Day(s)")
    v-row
      v-col(cols="12" md="6")
        v-select( variant="outlined" label="Pass Transaction Fee" :items="selectPassFee" item-title="label" item-value="value"  density="compact" hide-details="auto")
      v-col(cols="12" md="6")
        v-text-field(variant="outlined" label="Transaction Fee" density="compact" hide-details="auto" type="number" prefix="RM")
</template>

<script setup>
const selectPassFee = ref([
  {
    label: 'Yes',
    value: '0'
  },
  {
    label: 'No',
    value: ''
  },
])
</script>

<style lang="scss" scoped>
:deep(input::-webkit-outer-spin-button),
:deep(input::-webkit-inner-spin-button) {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
:deep(input[type=number]) {
  -moz-appearance: textfield;
}
</style>
