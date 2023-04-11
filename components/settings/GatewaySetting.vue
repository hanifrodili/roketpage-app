<template lang="pug">
.GatewaySetting
  v-card(variant="text")
    v-card-text.pa-1
      div.d-flex.flex-row.align-center
        div.d-flex.flex-column.flex-grow-1
          v-img(src="/img/gateway/toyyibpay.svg" width="80px")
        div.d-flex.flex-row.align-center(style="gap:10px")
          v-btn.text-capitalize(variant="tonal" rounded size="small" color="info")
            v-icon.mr-2 mdi-file-cog-outline
            p Manage
          v-switch(
              inset
              hide-details="auto"
              color="primary"
              value='true'
              density="compact"
              @update:modelValue=""
            )
</template>

<script setup></script>
<style lang="scss" scoped></style>
