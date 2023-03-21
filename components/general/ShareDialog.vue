<template lang="pug">
v-card.rounded-lg 
  v-card-title
    .text-h6.secondary-text
      b 
        b Share
    v-spacer
    v-btn(text, icon, @click='close', height)
      v-icon mdi-close
  v-card-text
    div 
      v-btn.text-caption.text-capitalize.mr-1.mb-1(
        rounded,
        small,
        depressed,
        block,
        color='secondary',
        @click='copy'
      ) 
        b Copy Link
        v-icon(right) mdi-content-copy
      v-btn.text-caption.text-capitalize.mr-1.mb-1(
        rounded,
        small,
        depressed,
        block,
        color='success',
        @click='whatsapp'
      ) 
        b Whatsapp
        v-icon(right) mdi-whatsapp
      v-btn.text-caption.text-capitalize.mr-1.mb-1(
        rounded,
        small,
        depressed,
        block,
        color='info',
        @click='telegram'
      ) 
        b Telegram
        v-icon(right) mdi-send
</template>
  
  <script>
export default {
  props: ['url'],
  data() {
    return {
      shareDialog: false,
      msg: '',
    }
  },
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