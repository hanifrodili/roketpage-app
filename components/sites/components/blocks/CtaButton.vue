<template lang="pug">
button.mx-auto(:id="data._uid" title="button" :style="{fontFamily:css?.font.family, fontSize:css?.font.size,fontWeight:css?.font.weight, color:css?.font.color}")
  span(:contenteditable="editable") {{ content }}
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

const content = ref('Edit me')
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

<style lang="scss" scoped>
button{
  min-width: 80px;
  min-height: 35px;
  padding: 8px 16px;
  background-color: red;
  border-radius: 8px;
}
</style>
