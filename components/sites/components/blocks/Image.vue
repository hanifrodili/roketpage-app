<template lang="pug">
img.mx-auto(title="image" :src="data.config.content || content" :id="data._uid" style="min-width:300px; width:100%; height:100%; display:flex; justify-content:center" :style="{maxWidth: `${css?.width}px`, borderRadius: `${css?.borderRadius}px`}")
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

const content = ref('/img/your-image.svg')

const css = ref(null)

onMounted(() => {
  if (props.data.config.css) {
    css.value = props.data.config.css
  }
})
</script>

<style lang="scss" scoped></style>