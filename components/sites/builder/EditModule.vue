<template lang="pug">
div()
  v-bottom-navigation.rounded-t-lg(
    :active="sheet"
    :height="display.mdAndUp ? '400' : '300'"
    style="border-top: 1px solid #ababab"
  )
    v-card.w-100.py-2.px-3(style="")
      v-card-title.pa-0.d-flex.flex-row.align-center.font-weight-bold(
      style="font-size: 18px")
        p Customize {{ getBlockTitle(comp?.childBlock[0]._uid) }} {{ display.mdAndUp }}
        v-spacer
        v-icon.cursor-pointer.ml-auto.mr-4(@click="dialogDelete = true" size="x-small" color="red") mdi-trash-can-outline
        v-icon.cursor-pointer.ml-auto(@click="$emit('update:modelValue', false)") mdi-close-circle-outline
      v-card-text.px-0.pt-0.pb-5(style="height:100%; overflow-y: scroll" v-if="comp")
        v-expansion-panels.mt-2.mb-5.pa-1.general-card
          //- Layout Panel
          v-expansion-panel(elevation="0")
            v-expansion-panel-title
              p Layout
            v-expansion-panel-text.px-3
              v-row.my-1(v-if="comp")
                v-col(cols='12' md='9')
                  p.mb-1.label Background
                  v-row
                    v-col(cols='12' md='3')
                      v-checkbox(v-model="showSwatch", label="Show Swatches" density="compact" hide-details="auto")
                      v-checkbox(v-model="showCanvas", label="Show Canvas" density="compact" hide-details="auto")
                      v-checkbox(v-model="showInput", label="Show Code Input" density="compact" hide-details="auto")
                    v-col(cols='12' md='9')
                      v-color-picker.mx-auto.mb-2.clr-picker(v-model="comp.config.css.backgroundColor" @update:model-value="updateCss" mode="hexa" hide-mode-switch hide-sliders :hide-inputs="!showInput" :show-swatches="showSwatch" :hide-canvas="!showCanvas" swatches-max-height="150" canvas-height="100" width="100%" elevation="0")
                v-col(cols='12' md='3')
                  p.mb-1.label Padding
                  v-row.ma-0
                    v-col.px-1.py-2(cols="6")
                      v-text-field(v-model="comp.config.css.padding.top" variant="outlined" label="Top" type="number" density="compact" hide-details="auto" suffix="px" @update:model-value="updateCss")
                    v-col.px-1.py-2(cols="6")
                      v-text-field(v-model="comp.config.css.padding.bottom" variant="outlined" label="Bottom" type="number" 
                      density="compact" hide-details="auto" suffix="px" @update:model-value="updateCss")
                  v-row.ma-0
                    v-col.px-1.py-2(cols="6")
                      v-text-field(v-model="comp.config.css.padding.left" variant="outlined" label="Left" type="number" 
                      density="compact" hide-details="auto" suffix="px" @update:model-value="updateCss")
                    v-col.px-1.py-2(cols="6")
                      v-text-field(v-model="comp.config.css.padding.right" variant="outlined" label="Right" type="number" density="compact" hide-details="auto" suffix="px" @update:model-value="updateCss")
          //- Font Panel
          v-expansion-panel(elevation="0" v-if="getBlockTitle(comp.childBlock[0]._uid) !== 'image'")
            v-expansion-panel-title
              p Font
            v-expansion-panel-text.px-3
              v-row.my-1()
                v-col(cols='12' md='3')
                  p.mb-4.label Style
                  v-row
                    v-col(cols="12")
                      v-select(v-model="comp.childBlock[0].config.css.font.family" :items="fontList" label="Family" variant="outlined" density="compact" hide-details="auto" @update:model-value="updateCss")
                  v-row
                    v-col(cols="6")
                      v-select(v-model="comp.childBlock[0].config.css.font.size" :items="getFontSize(comp.childBlock[0]._uid)" label="Size" variant="outlined" density="compact" hide-details="auto" @update:model-value="updateCss")
                    v-col(cols="6")
                      v-select(v-model="comp.childBlock[0].config.css.font.weight" :items="['300', '400', '500', '600', '700', '800', '900']" label="Weight" variant="outlined" density="compact" hide-details="auto" @update:model-value="updateCss")
                v-col(cols='12' md='9')
                  p.mb-1.label Color
                  v-row
                    v-col(cols='12' md='3')
                      v-checkbox(v-model="showSwatch", label="Show Swatches" density="compact" hide-details="auto")
                      v-checkbox(v-model="showCanvas", label="Show Canvas" density="compact" hide-details="auto")
                      v-checkbox(v-model="showInput", label="Show Code Input" density="compact" hide-details="auto")
                    v-col(cols='12' md='9')
                      v-color-picker.mx-auto.mb-2.clr-picker(v-model="comp.childBlock[0].config.css.font.color" @update:model-value="updateCss" mode="hexa" hide-mode-switch hide-sliders :hide-inputs="!showInput" :show-swatches="showSwatch" :hide-canvas="!showCanvas" swatches-max-height="150" canvas-height="100" width="100%" elevation="0")
          //- Button Panel  
          v-expansion-panel(elevation="0" v-if="getBlockTitle(comp.childBlock[0]._uid) === 'button'")
            v-expansion-panel-title
              p Button
            v-expansion-panel-text.px-3
              v-row.my-1()
                v-col(cols="12" md="3")
                  p.mb-1.label Padding
                  v-row.ma-0
                    v-col.px-1.py-2(cols="6")
                      v-text-field(v-model="comp.childBlock[0].config.css.padding.top" variant="outlined" label="Top" type="number" density="compact" hide-details="auto" suffix="px" @update:model-value="updateCss")
                    v-col.px-1.py-2(cols="6")
                      v-text-field(v-model="comp.childBlock[0].config.css.padding.bottom" variant="outlined" label="Bottom" type="number" 
                      density="compact" hide-details="auto" suffix="px" @update:model-value="updateCss")
                  v-row.ma-0
                    v-col.px-1.py-2(cols="6")
                      v-text-field(v-model="comp.childBlock[0].config.css.padding.left" variant="outlined" label="Left" type="number" 
                      density="compact" hide-details="auto" suffix="px" @update:model-value="updateCss")
                    v-col.px-1.py-2(cols="6")
                      v-text-field(v-model="comp.childBlock[0].config.css.padding.right" variant="outlined" label="Right" type="number" density="compact" hide-details="auto" suffix="px" @update:model-value="updateCss")
                  p.mt-2.mb-1.label Size
                  v-row.ma-0
                    v-col.px-1.py-2(cols="6")
                      v-text-field(v-model="comp.childBlock[0].config.css.width" variant="outlined" label="Width" type="number" 
                      density="compact" hide-details="auto" suffix="px" @update:model-value="updateCss")
                    v-col.px-1.py-2(cols="6")
                      v-text-field(v-model="comp.childBlock[0].config.css.height" variant="outlined" label="Height" type="number" density="compact" hide-details="auto" suffix="px" @update:model-value="updateCss")
                v-col(cols='12' md='9')
                  p.mb-1.label Color
                  v-row
                    v-col(cols='12' md='3')
                      v-checkbox(v-model="showSwatch", label="Show Swatches" density="compact" hide-details="auto")
                      v-checkbox(v-model="showCanvas", label="Show Canvas" density="compact" hide-details="auto")
                      v-checkbox(v-model="showInput", label="Show Code Input" density="compact" hide-details="auto")
                    v-col(cols='12' md='9')
                      v-color-picker.mx-auto.mb-2.clr-picker(v-model="comp.childBlock[0].config.css.backgroundColor" @update:model-value="updateCss" mode="hexa" hide-mode-switch hide-sliders :hide-inputs="!showInput" :show-swatches="showSwatch" :hide-canvas="!showCanvas" swatches-max-height="110" canvas-height="100" width="100%" elevation="0")

          //- Image Panel
          v-expansion-panel(elevation="0" v-if="getBlockTitle(comp.childBlock[0]._uid) === 'image'")
            v-expansion-panel-title
              p Image
            v-expansion-panel-text.px-3
              v-row.my-3
                v-col.pa-2(cols="8")
                  v-text-field(v-model="comp.childBlock[0].config.content" type="url" label="URL" variant="outlined" density="compact" hide-details="auto" @update:model-value="updateImage(comp.childBlock[0]._uid, comp.childBlock[0].config.content)" clearable)
                v-col.pa-2(cols="2")
                  v-text-field(v-model="comp.childBlock[0].config.css.width" type="number" label="Width" variant="outlined" density="compact" hide-details="auto" @update:model-value="updateCss" suffix="px")
                v-col.pa-2(cols="2")
                  v-text-field(v-model="comp.childBlock[0].config.css.borderRadius" type="number" label="Corner" variant="outlined" density="compact" hide-details="auto" @update:model-value="updateCss" suffix="px")
                //- v-col.pa-2(cols="6")
                //-   v-text-field(v-model="comp.childBlock[0].config.css.height" type="number" label="Height" variant="outlined" density="compact" hide-details="auto" @update:model-value="" suffix="px")

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
import { useDisplay } from "vuetify/lib/framework.mjs";

const display = useDisplay()
const props = defineProps({
  modelValue: Boolean,
  data: Object
})
const emit = defineEmits(["update:modelValue", "updateCSS", "deleteBlock", "updateContent", "updateImage"]);

const comp = ref(null)
const showSwatch = ref(true)
const showInput = ref(false)
const showCanvas = ref(false)
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
  'Brush Script MT',
  `"Roboto", sans-serif`,
  'Poppins'
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
    const tag = el.tagName
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

function updateImage(id, img) {
  emit('updateImage', { parentId: props.data._uid, elementId: id, content: img })
}

function deleteLayout(id) {
  dialogDelete.value = false
  comp.value = null
  emit('deleteBlock', id)
  emit('update:modelValue', false)
}
</script>

<style lang="scss" scoped>
.label {
  font-weight: 600;
}

.clr-picker {
  border: 1px solid rgba(0, 0, 0, .38);
  background-color: rgba(255, 255, 255, 0.5);
}

.btn-pickcolor>.v-btn__content>span {
  background-color: rgba(255, 255, 255, .5);
  border-radius: 15px;
  padding: 3px;
}

:deep(.v-expansion-panel-title) {
  padding: 8px 16px;
}

:deep(.v-expansion-panel--active)>.v-expansion-panel-title {
  min-height: 48px;
}

:deep(.v-expansion-panel-text__wrapper) {
  padding: 0;
}

// :deep(.color-picker) input {
//   padding: 0 2px;
// }
</style>