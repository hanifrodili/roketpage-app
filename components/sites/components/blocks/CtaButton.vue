<template lang="pug">
button.mx-auto(:id="data._uid")
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

onMounted(() => {
  if (props.data.config.content && props.data.config.content !== '') {
    content.value = props.data.config.content
  }
})
</script>

<style lang="scss" scoped>
button{
  min-width: 50px;
  min-height: 35px;
  padding: 8px 16px;
  background-color: red;
  border-radius: 8px;
}
</style>
