<template lang="pug">
div()
  v-bottom-navigation(
      :active="sheet"
      height="300"
      style="background-color:transparent;"
  )
    v-card.w-100.pa-4(style="background-color:rgb(255 255 255 / 70%); backdrop-filter:blur(10px);")
      v-card-title.d-flex.flex-row.align-center.font-weight-bold(
      style="font-size: 18px")
        p Customize {{ getBlockTitle(comp?.childBlock[0]._uid) }}
        v-spacer
        v-icon.cursor-pointer.ml-auto.mr-4(@click="dialogDelete = true" size="x-small" color="red") mdi-trash-can-outline
        v-icon.cursor-pointer.ml-auto(@click="$emit('update:modelValue', false)") mdi-close-circle-outline
      v-card-text(style="height:100%; overflow-y: scroll")
        //- p {{ comp?.config.css.padding }}
        //- p.text-capitalize {{ getBlockTitle(comp?.childBlock[0]._uid) }} 
        //-     |  {{ '#'+comp?.childBlock[0]._uid}}
        v-row(v-if="comp")
          v-col(cols='12' md='3')
            p.mb-1.label Layout Padding
            v-row.ma-0
              v-col.pa-2(cols="6")
                v-text-field(v-model="comp.config.css.padding.top" variant="outlined" label="Top" type="number" density="compact" hide-details="auto" suffix="px" @update:model-value="updateCss")
              v-col.pa-2(cols="6")
                v-text-field(v-model="comp.config.css.padding.bottom" variant="outlined" label="Bottom" type="number" 
                density="compact" hide-details="auto" suffix="px" @update:model-value="updateCss")
            v-row.ma-0
              v-col.pa-2(cols="6")
                v-text-field(v-model="comp.config.css.padding.left" variant="outlined" label="Left" type="number" 
                density="compact" hide-details="auto" suffix="px" @update:model-value="updateCss")
              v-col.pa-2(cols="6")
                v-text-field(v-model="comp.config.css.padding.right" variant="outlined" label="Right" type="number" density="compact" hide-details="auto" suffix="px" @update:model-value="updateCss")
          v-col(cols='12' md='5' v-if="getBlockTitle(comp.childBlock[0]._uid) !== 'image'")
            p.mb-1.label Font Style
            v-row.ma-0
              v-col.pa-2(cols="6")
                v-select(v-model="comp.childBlock[0].config.css.font.family" :items="fontList" label="Family" variant="outlined" density="compact" hide-details="auto" @update:model-value="updateCss")
              v-col.pa-2(cols="6")
                v-select(v-model="comp.childBlock[0].config.css.font.size" :items="getFontSize(comp.childBlock[0]._uid)" label="Size" variant="outlined" density="compact" hide-details="auto" @update:model-value="updateCss")
            v-row.ma-0
              v-col.pa-2(cols="6")
                v-text-field(type="color" label="Color" variant="outlined" density="compact" hide-details="auto" @update:model-value="updateCss")
              v-col.pa-2(cols="6")
                v-select(:items="['300', '400', '500', '600', '700', '800', '900']" label="Weight" variant="outlined" density="compact" hide-details="auto" @update:model-value="updateCss")
          v-col(cols='12' md='4')

  //- delete dialog
  v-dialog(v-model="dialogDelete", scrollable, persistent, max-width="300px")
    v-card
      v-card-text.pa-4
        div
          p Confirm Delete?
          p.font-weight-bold This action can't be undo
            
      v-card-actions
        v-spacer
        v-btn(variant="text", color="secondary", @click="deleteLayout(data._uid)") Yes
        v-btn.elevation-0(
          color="red",
          variant="tonal",
          @click="dialogDelete = false") No
</template>

<script setup>
const props = defineProps({
  modelValue: Boolean,
  data: Object
})
const emit = defineEmits(["update:modelValue", "updateCSS", "deleteBlock"]);

const comp = ref(null)
const dialogDelete = ref(false)
const fontList = ref([
  'Open Sans',
  'Arial',
  'Verdana',
  'Tahoma',
  'Trebuchet MS',
  'Times New Roman',
  'Georgia',
  'Garamond',
  'Courier New',
  'Brush Script MT'
])

const pFontSize = ref([
  '14px',
  '16px',
  '18px',
])
const h1FontSize = ref([
  '30px',
  '32px',
  '34px',
])

const h2FontSize = ref([
  '24px',
  '26px',
  '28px',
])

const h3FontSize = ref([
  '20px',
  '22px',
  '24px',
])

const defaultFontSize = ref([
  '8px',
  '10px',
  '12px',
  '14px',
  '16px',
  '18px',
  '20px',
  '22px',
  '24px',
  '26px',
  '28px',
  '30px',
  '32px',
  '34px',
  '36px',
  '38px',
  '40px',
])

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
  }
)

function getBlockTitle(id) {
  if (id) {
    const el = document.getElementById(id)
    return el?.title
  }
}

function getFontSize(id) {
  if (id) {
    const el = document.getElementById(id)
    const tag  = el.tagName
    if (tag === 'P') {
      return pFontSize.value
    }
    if (tag === 'H1') {
      return h1FontSize.value
    }
    if (tag === 'H2') {
      return h2FontSize.value
    }
    if (tag === 'H3') {
      return h3FontSize.value
    }

    return defaultFontSize.value
  }
}

function updateCss() {
  // comp.value.config.css = css.value
  emit('updateCSS', comp.value)
}

function deleteLayout(id) {
  dialogDelete.value = false
  comp.value = null
  emit('deleteBlock', id)
}
</script>

<style lang="scss" scoped>
.label{
  font-weight: 600;
}
</style>
