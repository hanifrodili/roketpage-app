<template lang="pug">
div.d-flex.flex-column(style="gap:10px")
  v-btn.text-caption.text-capitalize(
    variant="tonal"
    rounded="xl"
    color='secondary',
    @click='copy'
    append-icon="mdi-content-copy"
    style="border:1px solid "
  ) 
    b Copy Link
  v-btn.text-caption.text-capitalize(
    variant="tonal"
    rounded="xl"
    color='#25d366',
    @click='whatsapp'
    append-icon="mdi-whatsapp"
    style="border:1px solid #25d366"
  ) 
    b WhatsApp
  v-btn.text-caption.text-capitalize(
    variant="tonal"
    rounded="xl"
    color='#0088cc',
    @click='telegram'
    append-icon="mdi-send-variant"
    style="border:1px solid #0088cc"
  ) 
    b Telegram
</template>

<script setup>
const snackbar = useSnackbar()
const props = defineProps(['url'])
const emit = defineEmits(['close'])
const shareDialog = ref(false)
const msg = ref("")

const close = () => {
  emit('close')
}
const copy = () => {
  navigator.clipboard.writeText(props.url)
  snackbar.add({
    type: 'info',
    text: 'Link copied!'
  })
  close()
}
const whatsapp = () => {
  const url = `https://wa.me/send?text=${props.url}`
  window.open(url, '_blank')
  close()
}
const telegram = () => {
  const url = `https://t.me/share/url?url=${props.url}`
  window.open(url, '_blank')
  close()
}
</script>
  
  <style>
</style>