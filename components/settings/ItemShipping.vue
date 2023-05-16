<template lang="pug">
div
  v-card(variant="text")
    v-card-text.pa-1()
      div.d-flex.flex-row.align-center.align-start
        div.d-flex.flex-row.flex-grow-1
          p.font-weight-bold {{ data.name }}
        div.d-flex.flex-row.align-center(style="gap:10px")
          v-btn.text-capitalize(variant="tonal" rounded size="x-small" color="info" @click="openManage = true" icon="mdi-file-cog-outline")
          v-switch(
            v-model="bankForm.enabled"
            inset
            hide-details="auto"
            color="primary"
            :value='true'
            density="compact"
            @update:modelValue="toggleBank"
            )
  general-dialog-type-b(v-model="openManage" :persistent="true")
    template( v-slot:title )
      p Edit Shipping
    template( v-slot:content )
      v-form(ref="form" fast-fail)
        v-row
          v-col(cols="12")
            v-select(v-model="bankForm.name" variant="outlined" label="Bank" :items="bank" item-title="name" item-value="name" density="compact" hide-details="auto")
        v-row
          v-col(cols="12")
            v-text-field(v-model="bankForm.account_number" variant="outlined" label="Account Number" density="compact" hide-details="auto" :rules="rules.not_empty")
        v-row
          v-col(cols="12")
            v-text-field(v-model="bankForm.account_holder_name" variant="outlined" label="Account Holder Name" density="compact" hide-details="auto" :rules="rules.not_empty")
    template( v-slot:action )
      v-btn( @click="openManage = false" variant="text") Cancel
      v-btn( @click="" variant="tonal" color="info") Update
</template>

<script setup>
import bank from '@/src/bankList.json'

const supabase = useSupabaseAuthClient();

const props = defineProps(['data'])
const openManage = ref(false)

const rules = ref(
  {
    not_empty: [(val) => (val || '').length > 0 || 'This field is required']
  }
)

const bankForm = ref({
  name: props.data.name,
  account_number: props.data.account_number,
  account_holder_name: props.data.account_holder_name,
  enabled: props.data.enabled,
})

const toggleBank = async () => {
  let { data:bank, error } = await supabase
    .from('bank_details')
    .update({ enabled: bankForm.value.enabled })
    .eq('account_number', bankForm.value.account_number)
}
</script>
<style lang="scss" scoped>
:deep(.v-img__img) {
  object-position: left;
}
</style>