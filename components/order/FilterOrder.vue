<template lang="pug">
div.d-flex.flex-column.align-end(style="gap:10px" )
  v-select(
    v-model="status"
    color='secondary',
    variant="outlined"
    hide-details="auto"
    density="compact"
    :items="statusList"
    item-title="label"
    item-value="value"
    @update:modelValue="$emit('filter',{field:'status', value:status})"
    style="width:fit-content;"
    )

  v-text-field.w-100(
    v-model="searchInput"
    color='secondary',
    placeholder='Search',
    variant="outlined",
    clearable
    type="search",
    prepend-inner-icon="mdi-magnify",
    hide-details="auto" density="compact"
    @keyup="$emit('search', searchInput)"
    @click:clear="$emit('search', searchInput)"
  )
</template>

<script setup>
const status = ref('')
const searchInput = ref('')

const statusList = ref([
  {
    label: 'All',
    value: ''
  },
  {
    label: 'New',
    value: 'new'
  },
  {
    label: 'Processing',
    value: 'processing'
  },
  {
    label: 'Shipping',
    value: 'shipping'
  },
  {
    label: 'Completed',
    value: 'completed'
  }
])
</script>
<style lang="scss" scoped></style>