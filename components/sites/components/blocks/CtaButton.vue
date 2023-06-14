<template lang="pug">
button.mx-auto(:id="data._uid" title="button" :style="{fontFamily:css?.font.family, fontSize:css?.font.size,fontWeight:css?.font.weight, color:css?.font.color, paddingTop:`${css?.padding.top}px`, paddingRight:`${css?.padding.right}px`, paddingBottom:`${css?.padding.bottom}px`, paddingLeft:`${css?.padding.left}px`, backgroundColor:css?.backgroundColor, width:`${css?.width}px`, height:`${css?.height}px` }" @click="goTo()")
  span(:contenteditable="editable" spellcheck="false") {{ content }}
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

const goTo = () => {
  if (props.editable) {
    return
  }
  window.location.href = '#order_form'
}
</script>

<style lang="scss" scoped>
button {
  min-width: 80px;
  min-height: 35px;
  background-color: rgb(var(--v-theme-primary));
  border-radius: 8px;
}
</style>