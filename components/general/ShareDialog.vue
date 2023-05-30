<template lang="pug">
div.d-flex.flex-column(style="gap:10px")
  v-btn.text-caption.text-capitalize(
    rounded,
    small,
    depressed,
    block,
    color='secondary',
    @click='copy'
    append-icon="mdi-content-copy"
  ) 
    b Copy Link
  v-btn.text-caption.text-capitalize(
    rounded,
    small,
    depressed,
    block,
    color='success',
    @click='whatsapp'
    append-icon="mdi-whatsapp"
  ) 
    b WhatsApp
  v-btn.text-caption.text-capitalize(
    rounded,
    small,
    depressed,
    block,
    color='info',
    @click='telegram'
    append-icon="mdi-send-variant"
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
  navigator.clipboard.writeText(this.url)
  snackbar.add({
    type: 'info',
    text: 'Link copied!'
  })
  close()
}
const whatsapp = () => {
  const url = `https://wa.me/send?&text=${this.msg}${this.url}`
  window.open(url, '_blank')
  close()
}
const telegram = () => {
  const msg = this.msg ? `&text=${this.msg}` : ''
  const url = `https://t.me/share/url?url=${this.url}${msg}`
  window.open(url, '_blank')
  this.close()
}
</script>
  
  <script>
export default {
  computed: {},
  methods: {
    close() {
      this.$emit('close')
    },
    copy() {
      navigator.clipboard.writeText(this.url)
      this.$snackbar.show('Link copied!')
      this.close()
    },
    whatsapp() {
      const url = `https://wa.me/send?&text=${this.msg}${this.url}`
      window.open(url, '_blank')
      this.close()
    },
    telegram() {
      const msg = this.msg ? `&text=${this.msg}` : ''
      const url = `https://t.me/share/url?url=${this.url}${msg}`
      window.open(url, '_blank')
      this.close()
    },
  },
}
</script>
  
  <style>
</style>