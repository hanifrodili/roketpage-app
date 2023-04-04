<template lang="pug">
div.d-flex.flex-column(style="gap:10px" )
  //- v-select(
  //-   v-model="status"
  //-   color='secondary',
  //-   variant="outlined"
  //-   hide-details="auto"
  //-   density="compact"
  //-   :items="statusList"
  //-   item-title="label"
  //-   item-value="value"
  //-   @update:modelValue="$emit('filter',{field:'status', value:status})"
  //-   style="width:fit-content;"
  //-   )
  
  v-slide-group.w-100(show-arrows="")
    v-slide-group-item(
        v-for="(item, index) in statusList"
        :key="index"
      )
      v-btn(
          variant="outlined"
          class="ma-2"
          size="small"
          rounded
          :color="status == item.value ? 'secondary' : undefined"
          :class="status == item.value ? 'bg-primary' : undefined"
          @click="status = item.value, $emit('filter',{field:'status', value:status})"
        ) {{ item.label }}
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
<style lang="scss" scoped>
:deep(.v-slide-group__content){
  justify-content: flex-end;
}

:deep(.v-slide-group__next), :deep(.v-slide-group__prev){
  min-width: 30px !important;
}

@media(max-width: 650px){
  :deep(.v-slide-group__content){
    justify-content: center;
  }
}
</style>