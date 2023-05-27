<template lang="pug">
v-dialog(v-model="dialog" scrollable persistent max-width="300px")
  v-card()
    v-card-text.pa-4
      div
        p Confirm Cancel?
        p.font-weight-bold This action can't be undo
    v-card-actions.pa-4
      v-spacer
      v-btn(variant="text" color="secondary" @click="$emit('cancel'), dialog = false") Yes
      v-btn.elevation-0(color="red" variant="tonal" @click="dialog=false") No
</template>

<script setup>
const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue", "cancel"]);

const dialog = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<style lang="scss" scoped></style>
