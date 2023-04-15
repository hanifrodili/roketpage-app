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
    v-card-title.d-flex.flex-row.align-center.justify-start.pa-5.font-weight-bold(
      style="font-size: 18px")
      v-icon.cursor-pointer.mr-2(@click="$emit('update:modelValue', false)") mdi-arrow-left
      slot(name="title")
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
    default: false,
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
