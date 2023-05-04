<template lang="pug">
h1.mx-auto(:id="data._uid" title="heading" style="text-align:center; max-width:31rem; text-wrap:balance;" :style="{fontFamily:css?.font.family, fontSize:css?.font.size,fontWeight:css?.font.weight, color:css?.font.color}" :contenteditable="editable") {{ content }}
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
const css = ref(null)

onMounted(() => {
  if (props.data.config.content && props.data.config.content !== '') {
    content.value = props.data.config.content
  }
  if (props.data.config.css) {
    css.value = props.data.config.css
  }
})
</script>

<style lang="scss" scoped></style>
