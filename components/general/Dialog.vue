<template lang='pug'>
v-card.rounded-lg
  v-spacer
  .d-flex.justify-end
    v-btn(size="small"  rounded, flat, icon, @click="$emit('close')")
      v-icon mdi-close

  .mt-n8.pa-2
    slot
</template>

<script setup>
const emits = defineEmits(["close"]);

</script>

<style></style>
