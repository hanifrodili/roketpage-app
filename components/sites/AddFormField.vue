<template lang="pug">
.AddFormField
  v-btn.w-100( @click="openDialog" variant="outlined" size="small" rounded-lg)
    v-icon mdi-plus
    p Add Field
  general-dialog-type-a(v-model="dialog", persistent)
    template(#title)
      | Add Field
    template(#content)
      v-text-field.mb-4(
        v-model="field.name",
        label="Field Name",
        variant="outlined",
        hide-details="auto",
        density="compact"
        clearable
      )
      v-select.mb-4(
        v-model="field.type",
        label="Field Type",
        variant="outlined",
        :items="fieldType"
        item-title="label"
        item-value="value"
        hide-details="auto",
        density="compact"
      )
      div(v-if="field.type && field.type === 'dropdown'" )
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
            v-for="(option, index) in optionsList"
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
        @click="addField",
        variant="tonal",
        color="info") Add
        
</template>

<script setup>
const emits = defineEmits(['updateField'])

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

const optionsList = ref([])
const newOption = ref(null)

const field = ref(null)

onMounted(() => {
  optionsList.value = []
  field.value = {
    name: '',
    type: null
  }
})

function openDialog() {
  dialog.value = true
  field.value = {
    name: '',
    type: null
  }
}

function addOption() {
  if (newOption.value) {
    optionsList.value.push(newOption.value)
    newOption.value = null
  }
}

function deleteOption(index) {
  optionsList.value.splice(index, 1)
}

function addField() {
  let obj = field.value
  if (field.value.type === 'dropdown') {
    obj.options = optionsList.value
  }
  emits('updateField', obj)
  dialog.value = false
}
</script>

<style lang="scss" scoped>
.option-item:not(:last-of-type){
  border-bottom: 0.5px solid #ababab;
}
</style>
