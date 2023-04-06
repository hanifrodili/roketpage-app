<template lang="pug">
v-card.elevation-0
  div.d-flex.flex-column.justify-space-between(style="gap:10px")
    v-slide-group.w-100(show-arrows="")
      v-slide-group-item(
          v-for="(item, index) in statusList"
          :key="index"
        )
        v-btn(
            variant="outlined"
            class="mx-1"
            size="small"
            rounded
            :color="status == item.value ? 'secondary' : undefined"
            :class="status == item.value ? 'bg-primary' : undefined"
            @click="status = item.value, $emit('filter',{field:'status', value:status})"
          ) {{ item.label }}
    div.d-flex.flex-row(style="gap:8px")
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
      v-btn.px-0(id="sort" @click="sortDialog = true" variant="outlined" rounded="lg" color="#ababab" height="auto" min-width="40px" )
        v-icon(style="font-size:24px") mdi-sort 
      v-menu(activator="#sort")
        v-list.pa-0(rounded="lg")
          v-list-item(v-for="(item, index) in sortList" :key="index" @click="$emit('sort', item.value), sort = item.value" :class="sort == item.value ? 'bg-primary' : ''")
            template(v-slot:append)
              v-icon.mr-2 {{ `mdi-${item.mdi}` }}
            v-list-item-title {{ item.label }}
      order-create-order()
</template>

<script setup>
const emit = defineEmits(['search', 'sort', 'filter'])

const status = ref('')
const searchInput = ref('')
const sortDialog = ref(false)
const sort = ref('id')

const sortList = ref([
  {
    label: "Newest",
    value: "id",
    mdi: "sort-ascending"
  },
  {
    label: "Oldest",
    value: "-id",
    mdi: "sort-descending"
  },
  {
    label: "Name: A-Z",
    value: "name",
    mdi: "sort-alphabetical-ascending"
  },
  {
    label: "Name: Z-A",
    value: "-name",
    mdi: "sort-alphabetical-descending"
  }
])

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
  justify-content: flex-start;
}

:deep(.v-slide-group__next), :deep(.v-slide-group__prev){
  min-width: 20px !important;
  max-width: 20px !important;

  .v-icon{
    font-size: 20px;
  }
}

@media(max-width: 650px){
  :deep(.v-slide-group__content){
    justify-content: center;
  }
}
</style>