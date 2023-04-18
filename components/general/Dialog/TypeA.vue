<template lang="pug">
v-dialog(
  v-model="dialog",
  width="100%",
  max-width="500",
  scrollable,
  :persistent="persistent",
  :fullscreen="$vuetify.display.width < 450 ? true : false",
  :scrim="$vuetify.display.width < 450 ? false : true",
  transition="dialog-bottom-transition")
  v-card.rounded-lg
    v-card-title.d-flex.flex-row.align-center.justify-space-between.pa-5.font-weight-bold(
      style="font-size: 18px")
      slot(name="title")
      v-icon.cursor-pointer.ml-auto(@click="$emit('update:modelValue', false)") mdi-close-circle-outline
    v-card-text.pa-5
      slot(name="content")
    v-card-actions.pa-5
      v-spacer
      slot(name="action")
</template>

<script setup>
const props = defineProps({
  modelValue: Boolean,
  persistent: {
    type: Boolean,
    default: true,
  },
  fullscreen: {
    type: Boolean,
    default: true,
  },
  scrim: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(["update:modelValue"]);

const dialog = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>
