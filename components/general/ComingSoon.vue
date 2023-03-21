<template lang="pug">
v-container
  v-row(style='position: relative; top: 10vh')
    v-col(cols='12', align='center')
      v-card.my-2(
        min-height='200',
        max-width='500',
        flat,
        tile,
        color='transparent'
      )
        v-img(:src='img', max-width='200',)
        .text-h4.text-secondary.my-4
          b 
            b Coming Soon
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    img() {
      return `${useRuntimeConfig().baseUrl}icon.png`;
    },
  },
  methods: {},
};
</script>

<style scoped></style>
