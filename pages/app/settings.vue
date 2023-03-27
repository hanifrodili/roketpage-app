<template lang="pug">
div.page-content
  h2.pa-0.mb-3 {{ $t('settings') }}
  v-expansion-panels
    settings-main-settings
    settings-company-settings
    settings-payment-settings
    settings-shipping-settings
    settings-notification-settings
    settings-subscription
</template>

<script setup></script>
<style lang="scss" scoped></style>
