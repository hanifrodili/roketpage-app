<template lang="pug">
.pa-2.pa-md-4
  .d-flex.flex-column
    .d-flex.flex-row.mb-2
      b {{ `#${customer.id}` }} {{ customer.name }}
      v-spacer
      v-chip.text-capitalize(
        style="max-width: fit-content; width:100%; height: 20px; font-weight: bold; font-size: 10px",
        :ripple="false",
        :color="statusColor(customer.status)") {{ customer.status }}
    .d-flex.flex-row.flex-wrap(style="gap: 5px")
      p {{ customer.phone }}
      .text-grey |
      p {{ customer.email }}

  .d-flex.justify-space-between(
    :class="$vuetify.display.width < 1020 ? 'flex-column' : 'flex-row'")
    p.mt-auto.mb-1(style="color: #767676; font-size: 12px") {{ fDate(customer.date_created) }} at {{ fTime(customer.date_created) }}

  .d-flex.justify-end
    v-btn(
      icon="mdi-trash-can-outline",
      variant="text",
      size="small",
      color="red")
    v-btn(icon="mdi-file-edit-outline", variant="text", size="small")
  v-divider
</template>

<script setup>
const props = defineProps(["customer"]);

const itemsToShow = ref(2);
const itemsLength = ref(1);
const products = ref([]);
const totalPrice = ref(0);

onMounted(() => {
  products.value = JSON.parse(props.customer.products);
  itemsLength.value = products.value.length;
  products.value.forEach((item) => {
    let sub = 0;
    sub = item.price * item.quantity;
    totalPrice.value += sub;
  });
  totalPrice.value += props.customer.delivery_fee;
});

function fDate(datetime) {
  const date = new Date(datetime);
  const options = {
    timeZone: "Asia/Kuala_Lumpur",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
}

function fTime(datetime) {
  const date = new Date(datetime);
  const options = {
    timeZone: "Asia/Kuala_Lumpur",
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  };
  const formattedTime = date.toLocaleTimeString("en-US", options);

  return formattedTime;
}

function statusColor(value) {
  let color = "";
  switch (value) {
    case "new":
      color = "#FF9800";
      break;
    case "processing":
      color = "#2196F3";
      break;
    case "shipping":
      color = "#9C27B0";
      break;
    case "completed":
      color = "#009688";
      break;

    default:
      color = "secondary";
      break;
  }
  return color;
}
</script>
<style lang="scss" scoped></style>
