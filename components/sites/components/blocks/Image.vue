<template lang="pug">
img.mx-auto(title="image" :src="content" :id="data._uid" style="min-height:300px; min-width:300px; display:flex; justify-content:center")
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

onMounted(() => {
  if (props.data.config.content && props.data.config.content !== '') {
    content.value = props.data.config.content
  }
})
</script>

<style lang="scss" scoped></style>
