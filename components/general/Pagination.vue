<template lang="pug">
div.d-flex.flex-row.justify-space-between(ref="pagination")
  div
    v-select(
      v-model="limit"
      color='secondary',
      variant="outlined"
      hide-details="auto"
      density="compact"
      :items="[10, 20, 50, 100]"
      @update:modelValue="$emit('limit',limit)"
      style="width:70px;"
    )
      
  div.pagination
    v-btn( @click="toFirstPage()" :disabled="currentPage > 1 ? false : true"  rounded variant="text" icon="mdi-chevron-double-left" )
    v-btn( @click="toPrevious()" :disabled="currentPage > 1 ? false : true" rounded variant="text" icon="mdi-chevron-left" )
    p(style="font-size:15px; user-select: none")
      span(v-if="$vuetify.display.width > 650") Page 
      strong {{ currentPage }} {{ $vuetify.display.width > 650 ? 'of' : '/' }} {{ maxPage }}
    v-btn( @click="toNextPage()" :disabled="currentPage < maxPage ? false : true"  rounded variant="text" icon="mdi-chevron-right" )
    v-btn( @click="toLastPage()" :disabled="currentPage < maxPage ? false : true" rounded variant="text" icon="mdi-chevron-double-right" )
</template>

<script setup>
const props = defineProps(['modelValue', 'maxPage','limit'])
const emits = defineEmits(['update:modelValue', 'limit'])

const currentPage = ref(1)
const limit = ref(5)

onMounted(() => {
  currentPage.value = props.modelValue
  limit.value = props.limit
})


function toFirstPage() {
  if (currentPage.value > 1) {
    currentPage.value = 1
    emits('update:modelValue', currentPage.value)
  }
}

function toPrevious() {
  if (currentPage.value > 1) {
    currentPage.value -= 1
    emits('update:modelValue', currentPage.value)
  }
}

function toNextPage() {
  if (currentPage.value < props.maxPage) {
    currentPage.value += 1
    emits('update:modelValue', currentPage.value)
  }
}

function toLastPage() {
 if (currentPage.value < props.maxPage) {
  currentPage.value = props.maxPage
  emits('update:modelValue', currentPage.value)
 }
}
</script>

<style lang="scss" scoped>
.pagination{
  display: flex;
  flex-direction: row;
  gap: 1px;
  align-items: center;
  justify-content: center;

  .v-btn{
    height: 36px;
    min-height: 36px;
    width: 36px;
    min-width: 36px;
  }
}
</style>
