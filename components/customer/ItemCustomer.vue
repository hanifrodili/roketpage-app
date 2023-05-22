<template lang="pug">
.pa-2.pa-md-4
  .d-flex.flex-column
    .d-flex.flex-row.mb-2
      p.cursor-pointer(@click="openMore = true")
        span.text-decoration-none(style="color:#767676") {{ `#${customer.id}` }}
        |  
        span.text-decoration-underline.font-weight-bold {{ customer.name }}
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
    p.mt-auto.mb-1(style="color: #767676; font-size: 12px") {{ fDate(customer.created_at) }} at {{ fTime(customer.created_at) }}

  .d-flex.justify-end
    v-btn(
      icon="mdi-trash-can-outline",
      variant="text",
      size="small",
      color="red"
      @click="dialogDelete = true"
    )
    v-btn(icon="mdi-file-edit-outline", variant="text", size="small")
  v-divider

  v-dialog(v-model="dialogDelete" scrollable persistent max-width="300px")
    v-card()
      v-card-text.pa-4
        div
          p Confirm Delete?
          p.font-weight-bold This action can't be undo
      v-card-actions.pa-4
        v-spacer
        v-btn(variant="text" color="secondary" @click="$emit('delete',customer.id), dialogDelete = false") Yes
        v-btn.elevation-0(color="red" variant="tonal" @click="dialogDelete=false") No

  general-dialog-type-b(v-model="openMore" :persistent="false" :fullscreen="false" :scrim="true")
    template(#title)
      .d-flex.flex-row.w-100.align-center
        p.font-weight-regular(style="color:#767676") {{ `#${customer.id}` }}
        v-spacer
        v-chip.text-capitalize(
          style="max-width: fit-content; width:100%; height: 20px; font-weight: bold; font-size: 10px",
          :ripple="false",
          :color="statusColor(customer.status)") {{ customer.status }}
    template(#content)
      p(style="font-size:12px; color:#767676") Page: {{ customer.pages.title }}
      div.my-3(style="font-size:14px")
        p 
          span(style="color:#767676") Name:
          | 
          span {{ customer.name }}
        p 
          span(style="color:#767676") Phone:
          | 
          span {{ customer.phone }}
        p 
          span(style="color:#767676") Email:
          | 
          span {{ customer.email }}
      //- p {{ productList }}
      div.pa-4(style="background-color: #ececec; font-size:12px")
        template(v-for="(item, index) in customer.products" :key="index")
          div.d-flex.flex-row.justify-space-between.w-100
            //- p {{ item }}
            p.font-weight-medium {{ getProduct(item.id).name }}
            div.d-flex.flex-row.justify-space-between(style="width: 100px")
              p x{{ item.quantity }}
              p.font-weight-medium RM{{ getProduct(item.id).base_price/100 }}
</template>

<script setup>
const props = defineProps(["customer","productList"]);
const emit = defineEmits(['delete'])

const itemsToShow = ref(2);
const itemsLength = ref(1);
const products = ref([]);
const totalPrice = ref(0);
const openMore = ref(false)
const dialogDelete = ref(false)

onMounted(() => {
  // console.log(props.customer);
  products.value = props.customer.products;
  itemsLength.value = products.value.length;
  products.value.forEach((item) => {
    let sub = 0;
    sub = item.price * item.quantity;
    totalPrice.value += sub;
  });
  totalPrice.value += props.customer.delivery_fee;
});

const getProduct = (id) => {
  return props.productList.find(x => x.id === id)
}

function fDate(datetime) {
  const date = new Date(datetime);
  const options = {
    timeZone: "Asia/Kuala_Lumpur",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-MY", options);

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
    case "follow up":
      color = "#2196F3";
      break;
    case "rejected":
      color = "#9C27B0";
      break;
    case "closed":
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
