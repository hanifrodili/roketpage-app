<template lang="pug">
v-card(flat)
  v-slide-group.my-2(show-arrows)
    v-slide-group-item(v-for="(item, index) in statusList", :key="index")
      v-btn.mx-1.text-capitalize(
        flat,
        size="small",
        rounded,
        :color="status == item.label ? 'primary' : ''",
        :class="status == item.label ? 'bg-primary' : 'bg-grey-lighten-2'",
        @click="(status = item.label), $emit('filter', { field: 'status', value: item.value })")
        b {{ item.label }}
  .d-flex.flex-row(style="gap: 8px")
    v-text-field(
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
    v-btn.px-0(
      id="sort"
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
          @click="$emit('sort', item), (sort = item)",
          :class="sort == item ? 'bg-primary' : ''")
          template(v-slot:append)
            v-icon.mr-1 {{ item.icon }}
          small {{ item.label }}
    customer-create-customer(@add-customer="$emit('addCustomer')")
</template>

<script setup>
const emit = defineEmits(["search", "sort", "filter", "addCustomer"]);

const status = ref("All");
const searchInput = ref("");
const sortDialog = ref(false);
const sort = ref("id");

const sortList = ref([
  {
    label: "Newest",
    column: "id",
    ascending: false,
    mdi: "sort-descending"
  },
  {
    label: "Oldest",
    column: "id",
    ascending: true,
    mdi: "sort-ascending"
  },
  {
    label: "Name: A-Z",
    column: "name",
    ascending: true,
    mdi: "sort-alphabetical-ascending"
  },
  {
    label: "Name: Z-A",
    column: "name",
    ascending: false,
    mdi: "sort-alphabetical-descending"
  }
])

const statusList = ref([
  {
    label: "All",
    value: ['new', 'follow up', 'rejected', 'closed'],
  },
  {
    label: "New",
    value: ["new"],
  },
  {
    label: "Follow up",
    value: ["follow up"],
  },
  {
    label: "Rejected",
    value: ["rejected"],
  },
  {
    label: "Closed",
    value: ["closed"],
  },
]);
</script>
<style lang="scss" scoped>
:deep(.v-slide-group__content) {
  justify-content: flex-start;
}

:deep(.v-slide-group__next),
:deep(.v-slide-group__prev) {
  min-width: 20px !important;
  max-width: 20px !important;

  .v-icon {
    font-size: 20px;
  }
}

@media (max-width: 650px) {
  :deep(.v-slide-group__content) {
    justify-content: center;
  }
}
</style>
