<template>
  <!-- Content -->
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="11" sm="8" md="6" lg="5">
        <v-card flat min-height="400" color="transparent" class="mt-16">
          <v-card-text>
            <v-img height="150" :src="logo" class="my-2" contain />
            <div class="text-h6 text-center mt-4">
              <b>Under Maintenance</b> <br />
              <small>{{ url }}</small>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const logo = require('static/icon.png')
export default {
  layout: 'noNavbar',
  data() {
    return {
      logo,
    }
  },
  computed: {
    url() {
      return this.$config.base
    },
  },
}
</script>

<style scoped></style>
