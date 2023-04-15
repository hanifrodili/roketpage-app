<template lang="pug">
v-card.elevation-0
  .d-flex.flex-column.justify-space-between(style="gap: 10px")
    v-slide-group.w-100(show-arrows="")
      v-slide-group-item.py-2(
        v-for="(item, index) in statusList",
        :key="index")
        v-btn.mx-1.text-capitalize(
          flat,
          size="small",
          rounded,
          :color="status == item.value ? 'primary' : ''",
          :class="status == item.value ? 'bg-primary' : 'bg-grey-lighten-2'",
          @click="(status = item.value), $emit('filter', { field: 'status', value: status })")
          b {{ item.label }}

    .d-flex.flex-row(style="gap: 10px")
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
      customer-create-customer
</template>

<script setup>
const emit = defineEmits(["search", "sort", "filter"]);

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
    label: "New",
    value: "new",
  },
  {
    label: "Closed",
    value: "closed",
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
