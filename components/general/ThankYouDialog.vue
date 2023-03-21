<template lang="pug">
v-card.rounded-lg
  v-card-text.text-center
    v-icon.mt-6(color='success', size='100') mdi-check-circle
    .success--text.mt-2.text-h6 
      b Success!
    div Thank you for your submission.
    div Please wait for our response.
    v-btn.text-capitalize.my-2(
      color='primary',
      text,
      rounded,
      @click='$emit("close")'
    )
      b 
        b Close
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style ></style>
