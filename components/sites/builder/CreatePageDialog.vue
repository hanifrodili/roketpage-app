<template lang="pug">
.CreatePageDialog
  v-stepper(v-model="step")
    v-stepper-header
      v-stepper-step(:complete="step > 1" step="1") Page Details
      v-divider
      v-stepper-step(:complete="step > 2" step="2") Form Details
      v-divider
      v-stepper-step(:complete="step > 3" step="3") Shipping Details
      v-divider
      v-stepper-step(:complete="step > 4" step="4") Payment Details
</template>

<script setup></script>

<style lang="scss" scoped></style>
