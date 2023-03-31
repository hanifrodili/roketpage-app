<template lang="pug">
.Pagination(ref="pagination")
  v-btn( @click="toFirstPage()" :disabled="currentPage > 1 ? false : true"  rounded variant="text" icon="mdi-chevron-double-left" )
  v-btn( @click="toPrevious()" :disabled="currentPage > 1 ? false : true" rounded variant="text" icon="mdi-chevron-left" )
  p.mx-3(style="font-size:15px; user-select: none") Page 
    strong {{ currentPage }}
    span  of 
    strong {{ maxPage }}
  v-btn( @click="toNextPage()" :disabled="currentPage < maxPage ? false : true"  rounded variant="text" icon="mdi-chevron-right" )
  v-btn( @click="toLastPage()" :disabled="currentPage < maxPage ? false : true" rounded variant="text" icon="mdi-chevron-double-right" )
</template>

<script setup>
const props = defineProps(['modelValue', 'maxPage'])
const emits = defineEmits(['update:modelValue'])

const currentPage = ref(1)

onMounted(() => {
  currentPage.value = props.modelValue
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
.Pagination{
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
