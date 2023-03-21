<template>
  <client-only>
    <v-card color="transparent" flat min-height="200" class="my-6 text-center">
      <v-card-text>
        <v-progress-circular
          width="10"
          :size="size"
          indeterminate
          color="primary"
        />
        <div class="mt-2 primary--text text-body-2 font-weight-bold">
          Loading, please wait...
        </div>
      </v-card-text>
    </v-card>
  </client-only>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: '100'
    }
  },
  data () {
    return {}
  }
}
</script>
