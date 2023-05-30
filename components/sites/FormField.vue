<template lang="pug">
.FormField.d-flex.flex-row.justify-space-between
  div.d-flex.flex-column.pa-1.px-2.px-md-5.flex-grow-1
    p.font-weight-bold.text-capitalize(style="font-size:14px") {{ field.field_name }}
    p.flex-wrap.my-1(style="font-size:12px; color:#767676; line-height:16px;") Type: {{ field.field_type }}
  div.d-flex.flex-column.flex-shrink-1
    v-switch.align-self-end.pr-2(
        inset
        hide-details="auto"
        hide-error
        color="primary"
        :value="true"
        density="compact"
        v-model="enabled"
        @update:modelValue=""
      )
    div.d-flex.flex-row.justify-end(v-if="!['name', 'phone', 'email'].includes(field.field_name)" )
      v-btn(icon="mdi-trash-can-outline" variant="text" size="small" color="red" @click="$emit('delete')")
      v-btn(icon="mdi-file-edit-outline" variant="text" size="small" @click="dialog=true")
  
  general-dialog-type-a(v-model="dialog", persistent)
    template(#title)
      | Update Field
    template(#content)
      v-text-field.mb-4(
        v-model="fieldForm.field_name",
        label="Field Name",
        variant="outlined",
        hide-details="auto",
        density="compact"
        clearable
      )
      v-select.mb-4(
        v-model="fieldForm.field_type",
        label="Field Type",
        variant="outlined",
        :items="fieldType"
        item-title="label"
        item-value="value"
        hide-details="auto",
        density="compact"
      )
      div(v-if="fieldForm.field_type && fieldForm.field_type === 'dropdown'" )
        .d-flex.flex-row
          v-text-field(
            v-model="newOption"
            label="Enter Option",
            variant="outlined",
            hide-details="auto",
            density="compact"
            clearable
          )
          v-btn( @click="addOption" variant="tonal" rounded="lg" height="40px") Add
        v-list()
          v-list-item.option-item(
            v-for="(option, index) in fieldForm.field_option"
            :key="index"
          )
            template(v-slot:title)
              p {{ `${index+1}. ${option}` }}
            template(v-slot:append)
              v-btn(
                color="red"
                icon="mdi-trash-can"
                variant="text"
                @click="deleteOption(index)"
              )
    template(#action)
      v-btn(@click="dialog = false", variant="text") Cancel
      v-btn(
        @click="updateField",
        variant="tonal",
        color="info") Update
</template>

<script setup>
const props = defineProps(['field'])
const emits = defineEmits(['delete', 'updateField'])

const enabled = ref(false)
const click = ref(false)
const newOption = ref(null)
const dialog = ref(false)
const fieldType = ref([
  {
    label: 'Single Line Text',
    value: 'text'
  },
  {
    label: 'Multi Line Text',
    value: 'textarea'
  },
  {
    label: 'Number',
    value: 'number'
  },
  {
    label: 'Dropdown',
    value: 'dropdown'
  }
])

const fieldForm = ref({
  id: props.field.id,
  field_name: props.field.field_name,
  field_type: props.field.field_type,
  field_option: props.field.field_option
})

onMounted(() => {
  enabled.value = props.field.enabled
})

function addOption() {
  if (newOption.value) {
    fieldForm.value.field_option.push(newOption.value)
    newOption.value = null
  }
}

function deleteOption(index) {
  fieldForm.value.field_option.splice(index, 1)
}

const updateField = () => {
  emits('updateField', fieldForm.value)
  dialog.value = false
}
</script>

<style lang="scss" scoped></style>
