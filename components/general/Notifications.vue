<template>
  <div>
    <!-- snackbar -->
    <v-snackbar
      v-model="snackbar.show"
      top
      app
      :timeout="snackbar.timeout"
      :color="snackbar.color"
    >
      <div class="d-flex flex-wrap justify-space-between align-center my-n2">
        {{ snackbar.message }}
        <v-btn small icon @click="snackbar.show = false">
          <v-icon small> mdi-close </v-icon>
        </v-btn>
      </div>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      snackbar: {
        show: false,
        color: '',
        message: '',
      },
    }
  },
  created() {
    this.$store.subscribeAction({
      after: (payload, state) => {
        if (payload.type === 'snackbar/snackbar') {
          this.snackbar.show = state.snackbar.show
          this.snackbar.message = state.snackbar.message
          this.snackbar.color = state.snackbar.color
          this.snackbar.timeout = state.snackbar.timeout
        }
      },
    })
  },
}
</script>

<style></style>
