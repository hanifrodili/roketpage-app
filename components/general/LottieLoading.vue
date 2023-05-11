<template lang="pug">
div.d-flex.align-center.justify-center(style="height:-webkit-fill-available")
  lottie-player(
    autoplay
    loop
    style="width:300px"
    src="/lottie/rocket-in-space.json"
    speed="1"
    debug
  )
</template>

<script>
export default {
  name: 'LottieLoading'
}
</script>

<style lang="scss" scoped></style>
