<template lang="pug">
.FormField.d-flex.flex-row.justify-space-between
  div.d-flex.flex-column.pa-1.px-2.px-md-5.flex-grow-1
    p.font-weight-bold.text-capitalize(style="font-size:14px") {{ field.name }}
    p.flex-wrap.my-1(style="font-size:12px; color:#767676; line-height:16px;") Type: {{ field.type }}
  div.d-flex.flex-column.flex-shrink-1
    v-switch.align-self-end.pr-2(
        inset
        hide-details="auto"
        hide-error
        color="primary"
        :value="true"
        density="compact"
        v-model="enabled"
        @update:modelValue=""
      )
    div.d-flex.flex-row.justify-end(v-if="!['name', 'phone', 'email'].includes(field.name)" )
      v-btn(icon="mdi-trash-can-outline" variant="text" size="small" color="red" @click="$emit('delete')")
      v-btn(icon="mdi-file-edit-outline" variant="text" size="small")
</template>

<script setup>
const props = defineProps(['field'])
const emits = defineEmits(['delete'])

const enabled = ref(false)

onMounted(() => {
  enabled.value = props.field.enabled
})
</script>

<style lang="scss" scoped></style>
