<template lang="pug">
client-only
  v-row
    v-col(cols='12', align='center')
      v-card(height='200', width='250', flat='', color='transparent')
        v-card-text
          v-icon.mt-6(color='primary', :size='size') mdi-folder-remove-outline
          .primary--text.text-h6.mt-n2
            b No Data...
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: '70',
    },
  },
  data() {
    return {}
  },
}
</script>

<style scoped></style>
