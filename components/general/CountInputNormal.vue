<template lang="pug">
.CountInput.d-flex.flex-row.align-center(style="gap:10px")
  div
    v-icon(@click="decrease") mdi-minus
  div
    v-text-field(
      v-model="number" 
      variant="outlined" 
      density="compact" 
      type="number" 
      hide-details="auto"
      :min="minInput"
      :max="maxInput"
      :step="stepInput"
      style="width: 60px"
      @keyup="number = parseFloat(number)"
    )
  div
    v-icon(@click="increase") mdi-plus
</template>

<script setup>
const props = defineProps(
  {
    modelValue: Number,
    min: String,
    max: String,
    step: String
  }
)
const emit = defineEmits(['update:modelValue'])

const minInput = ref(0)
const maxInput = ref(0)
const stepInput = ref(0)
const number = ref(props.modelValue);

onMounted(() => {
  if (number.value < parseFloat(props.min)) {
    number.value = parseFloat(props.min)
  }
  minInput.value = props.min ? parseFloat(props.min) : 1
  maxInput.value = props.max ? parseFloat(props.max) : null
  stepInput.value = props.step ? parseFloat(props.step) : 1
})

// watch(number, (newNumber) => {
//   console.log(`x is ${newNumber}`)
// })


function increase() {
  if (maxInput.value && number.value < maxInput.value) {
    number.value += stepInput.value
  }

  if (!maxInput.value) {
    number.value += stepInput.value
  }
  emit('update:modelValue', number.value)
}

function decrease() {
  if (number.value > minInput.value) {
    number.value -= stepInput.value
  } 
  emit('update:modelValue', number.value)
}
</script>

<style lang="scss" scoped>
.v-icon{
  cursor: pointer;
}

:deep(input::-webkit-outer-spin-button),
:deep(input::-webkit-inner-spin-button) {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
:deep(input[type=number]) {
  -moz-appearance: textfield;
  text-align: center;
}
</style>
