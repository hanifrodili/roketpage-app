<template lang="pug">
div
  v-card(variant="text")
    v-card-text.pa-1
      div.d-flex.flex-row.align-center.align-start
        div.d-flex.flex-row.flex-grow-1
          v-img(:src="data.logo" height="20")
        div.d-flex.flex-row.align-center(style="gap:10px")
          v-btn.text-capitalize(variant="tonal" rounded size="x-small" color="info" @click="$emit('setManage', data)" icon="mdi-file-cog-outline")
          v-switch(
            inset
            hide-details="auto"
            color="primary"
            value='true'
            density="compact"
            @update:modelValue=""
            )
</template>

<script setup>
const props = defineProps(['data'])
const emit = defineEmits(['setManage'])
</script>
<style lang="scss" scoped>
:deep(.v-img__img) {
  object-position: left;
}
</style>
