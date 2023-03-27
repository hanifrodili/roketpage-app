<template lang="pug">
v-expansion-panel()
    v-expansion-panel-title(style="" expand-icon="mdi-chevron-down" collapse-icon="mdi-chevron-up") {{ $t('company') }}
    v-expansion-panel-text.panel-body
      v-form.mt-4()
        v-text-field.mb-2(
          v-model='company.company_name',
          color='secondary',
          label='Company name',
          :rules='rules.not_empty',
          variant="outlined"
        )
        v-text-field.mb-2(
          v-model='company.company_email',
          color='secondary',
          label='Company e-mail',
          variant="outlined",
          :rules='rules.email'
          type="email"
        )
        v-text-field.mb-2(
          v-model='company.company_phone',
          color='secondary',
          label='Company phone number',
          variant="outlined",
          :rules='rules.not_empty',
          type="tel"
        )
        v-text-field.mb-2(
          v-model='company.company_address',
          color='secondary',
          label='Company address',
          variant="outlined",
          :rules='rules.not_empty'
        )
        v-btn.text-capitalize.text--secondary.elevation-0(
          width="100%"
          color='primary',
          rounded="pill",
          size="large",
          @click='',
          :loading='isLoading'
        ) 
          b.mr-2 {{ $t('save') }}
          v-icon(right) mdi-content-save
</template>

<script setup>
import { useDisplay } from 'vuetify'

const { xs } = useDisplay()

const company = ref({
  company_name: '',
  company_email: '',
  company_phone: '',
  company_reg_no: '',
  comapny_address: '',
})
const showPasword = ref(false)
const isLoading = ref(false)
const rules = ref(
  {
    not_empty: [(val) => (val || '').length > 0 || 'This field is required']
  }
)
</script>

<style lang="scss" scoped>
.panel-body {
  padding: 20px 80px;
}

@media(max-width: 500px) {
  .panel-body {
    padding: 20px 5px;
  }
}
</style>
