<template lang="pug">
v-card.d-flex.flex-column.elevation-0(style="gap: 10px")
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
    v-slide-group-item(v-for="(item, index) in statusList", :key="index")
      v-btn.mx-1.text-capitalize(
        flat,
        size="small",
        rounded,
        :color="status == item.value ? 'primary' : ''",
        :class="status == item.value ? 'bg-primary' : 'bg-grey-lighten-2'",
        @click="(status = item.value), $emit('filter', { field: 'status', value: status })")
        b {{ item.label }}
  .d-flex.flex-row(style="gap: 8px")
    v-text-field.w-100(
      v-model="searchInput",
      color="secondary",
      placeholder="Search",
      variant="outlined",
      clearable,
      type="search",
      prepend-inner-icon="mdi-magnify",
      hide-details="auto",
      density="compact",
      @keyup="$emit('search', searchInput)",
      @click:clear="$emit('search', searchInput)")
    v-btn#sort.px-0(
      @click="sortDialog = true",
      variant="outlined",
      rounded="lg",
      color="#ababab",
      height="auto",
      min-width="40px")
      v-icon(style="font-size: 24px") mdi-sort
    v-menu(activator="#sort")
      v-list.pa-0(rounded="lg")
        v-list-item(
          v-for="(item, index) in sortList",
          :key="index",
          @click="$emit('sort', item.value), (sort = item.value)",
          :class="sort == item.value ? 'bg-primary' : ''")
          template(v-slot:append)
            v-icon.mr-2 {{ `mdi-${item.mdi}` }}
          v-list-item-title {{ item.label }}
    product-create-product(@add-product="addProduct")
</template>

<script setup>
const emits = defineEmits(["addProduct", "search", "sort", "filter"]);

const status = ref("");
const searchInput = ref("");
const sortDialog = ref(false);
const sort = ref("id");

const sortList = ref([
  {
    label: "Newest",
    value: "id",
    mdi: "sort-ascending",
  },
  {
    label: "Oldest",
    value: "-id",
    mdi: "sort-descending",
  },
  {
    label: "Name: A-Z",
    value: "name",
    mdi: "sort-alphabetical-ascending",
  },
  {
    label: "Name: Z-A",
    value: "-name",
    mdi: "sort-alphabetical-descending",
  },
]);

const statusList = ref([
  {
    label: "All",
    value: "",
  },
  {
    label: "Draft",
    value: "false",
  },
  {
    label: "Published",
    value: "true",
  },
]);

function addProduct(e) {
  emits("addProduct", e);
}
</script>
<style lang="scss" scoped>
:deep(.v-slide-group__content) {
  justify-content: flex-start;
}

:deep(.v-slide-group__next),
:deep(.v-slide-group__prev) {
  min-width: 30px !important;
}

// @media(max-width: 650px) {
//   :deep(.v-slide-group__content) {
//     justify-content: center;
//   }
// }
</style>
