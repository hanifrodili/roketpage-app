<template lang="pug">
div
  v-card(variant="text")
    v-card-text.pa-1()
      div.d-flex.flex-row.align-center.align-start
        div.d-flex.flex-row.flex-grow-1
          p.font-weight-bold Maybank
        div.d-flex.flex-row.align-center(style="gap:10px")
          v-btn.text-capitalize(variant="tonal" rounded size="x-small" color="info" @click="openManage = true" icon="mdi-file-cog-outline")
          v-switch(
            inset
            hide-details="auto"
            color="primary"
            value='true'
            density="compact"
            @update:modelValue=""
            )
  general-dialog-type-b(v-model="openManage" :persistent="true")
    template( v-slot:title )
      p Edit Bank
    template( v-slot:content )
      v-form
      v-row
        v-col(cols="12")
          v-text-field(variant="outlined" label="Bank" density="compact" hide-details="auto")
    template( v-slot:action )
      v-btn( @click="openManage = false" variant="text") Cancel
      v-btn( @click="" variant="tonal" color="info") Add
</template>

<script setup>
const props = defineProps(['data'])
const openManage = ref(false)
</script>
<style lang="scss" scoped>
:deep(.v-img__img) {
  object-position: left;
}
</style>