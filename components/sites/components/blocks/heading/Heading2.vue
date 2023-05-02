<template lang="pug">
h2.mx-auto(:id="data._uid" title="heading" style="text-align:center; max-width:31rem; text-wrap:balance;" :contenteditable="editable") {{ content }}
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => { }
  },
  editable: {
    type: Boolean,
    default: false
  }
})

const content = ref('Lorem ipsum dolor sit amet')

onMounted(() => {
  if (props.data.config.content && props.data.config.content !== '') {
    content.value = props.data.config.content
  }
})
</script>

<style lang="scss" scoped></style>
