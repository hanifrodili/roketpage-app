<template lang="pug">
div()
  v-bottom-navigation(
      :active="sheet"
      color="indigo"
      height="300"
  )
    v-card.w-100.pa-4
      v-card-title.d-flex.flex-row.align-center.justify-space-between.font-weight-bold(
      style="font-size: 18px")
        p Edit - 
          span.text-capitalize {{ getBlock(comp?.childBlock[0]._uid) }} 
          |  {{ '#'+comp?.childBlock[0]._uid}}
        v-icon.cursor-pointer.ml-auto(@click="$emit('update:modelValue', false)") mdi-close-circle-outline
      v-card-text
        //- p {{ comp?.config.css.padding }}
        v-row()
          v-col(cols='12' md='3')
            p.mb-1.label Layout Padding
            v-row.ma-0
              v-col.pa-2(cols="6")
                v-text-field(v-model="padding.top" variant="outlined" label="Top" type="number" density="compact" hide-details="auto" suffix="px" @update:model-value="updateCss")
              v-col.pa-2(cols="6")
                v-text-field(v-model="padding.bottom" variant="outlined" label="Bottom" type="number" 
                density="compact" hide-details="auto" suffix="px" @update:model-value="updateCss")
            v-row.ma-0
              v-col.pa-2(cols="6")
                v-text-field(v-model="padding.right" variant="outlined" label="Right" type="number" density="compact" hide-details="auto" suffix="px" @update:model-value="updateCss")
              v-col.pa-2(cols="6")
                v-text-field(v-model="padding.left" variant="outlined" label="Left" type="number" 
                density="compact" hide-details="auto" suffix="px" @update:model-value="updateCss")
          v-col(cols='12' md='4')
          v-col(cols='12' md='4')

</template>

<script setup>
const props = defineProps({
  modelValue: Boolean,
  data: Object
})
const emit = defineEmits(["update:modelValue", "updateCSS"]);

const comp = ref(null)
const padding = ref({
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
})

const sheet = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

watch(
  () => props.data,
  (data) => {
    comp.value = data
    padding.value = data.config.css.padding
  }
)

function getBlock(id) {
  if (id) {
    const el = document.getElementById(id)
    return el.title
  }
}

function updateCss() {
  comp.value.config.css.padding = padding.value
  emit('updateCSS', comp.value)
}
</script>

<style lang="scss" scoped>
.label{
  font-weight: 600;
}
</style>
