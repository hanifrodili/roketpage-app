<template lang="pug">
.pa-2.pa-md-4
  .d-flex.flex-column
    .d-flex.flex-row.mb-2
      p.cursor-pointer(@click="openMore = true")
        span.text-decoration-none(style="color:#767676") {{ `#${customer.id}` }}
        |  
        span.text-decoration-underline.font-weight-bold {{ customer.name }}
      
      v-btn.ml-1(v-if="customer.status === 'new' && customer.thruWhatsapp" color="#25d366" size="x-small" variant="text" :ripple="false")
        v-icon mdi-message-badge
        v-tooltip(activator="parent" location="top") Customer contact thru WhatsApp
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
    a(:href="`https://wa.me/60${removePhonePrefix(customer.phone)}`" target="_blank") 
      v-btn(icon="mdi-whatsapp" variant="text" size="small" color="#25d366")
    customer-edit-customer(:customer="customer" :productList="productList" @updateCustomer="$emit('update')")
    v-menu()
      template(v-slot:activator="{ props }")
        v-btn(icon="mdi-dots-vertical" variant="text" size="small" v-bind="props")
      v-list(density="compact")
        v-list-item(v-if="orderID" @click="openInvoice=true")
          v-list-item-title( style="font-size:14px") View invoice
        v-list-item(@click="dialogDelete=true")
          v-list-item-title( style="font-size:14px; color:#ec3a3a") Delete customer
  v-divider

  general-dialog-delete(v-model="dialogDelete" @delete="$emit('delete',customer.id)")

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
      div.my-3(style="font-size:14px" v-if="customer.customers_extra_field.length")
        template(v-for="item in customer.customers_extra_field" :key="item.id")
          p.text-capitalize
            span(style="color:#767676") {{ item.field_name }}:
            | 
            span {{ item.field_value }}
      div.pa-4(style="background-color: #ececec; font-size:12px")
        template(v-for="(item, index) in customer.products" :key="index")
          div.d-flex.flex-row.justify-space-between.w-100
            //- p {{ item }}
            p.font-weight-medium {{ getProduct(item.id).name }}
            div.d-flex.flex-row.justify-space-between(style="width: 100px")
              p x{{ item.quantity }}
              p.font-weight-medium RM{{ getProduct(item.id).base_price/100 }}

  general-dialog-type-b(v-model="openInvoice" :persistent="false" :fullscreen="false" :scrim="true")
    template(#title)
      p Invoice
    template(#content)
      customer-invoice(:orderid="orderID")
    template(#action)
      v-btn.text-capitalize( @click="copyUrl" variant="outlined" append-icon="mdi-content-copy") Copy url
      v-btn.text-capitalize( @click="sendToCustomer" variant="outlined" append-icon="mdi-whatsapp") Send to customer
</template>

<script setup>
const props = defineProps(["customer","productList","subdomain"]);
const emit = defineEmits(['delete', 'update'])

const supabase = useSupabaseAuthClient();
const config = useRuntimeConfig();
const snackbar = useSnackbar()

const itemsToShow = ref(2);
const itemsLength = ref(1);
const products = ref([]);
const totalPrice = ref(0);
const openMore = ref(false)
const openInvoice = ref(false)
const dialogDelete = ref(false)
const orderID = ref('')

onMounted(async() => {
  products.value = props.customer.products;
  itemsLength.value = products.value.length;
  products.value.forEach((item) => {
    let sub = 0;
    sub = item.price * item.quantity;
    totalPrice.value += sub;
  });
  totalPrice.value += props.customer.delivery_fee;
  console.log(window.location.origin);
  await getOrder()
});

const getProduct = (id) => {
  return props.productList.find(x => x.id === id)
}

const getOrder = async () => {
  if (props.customer.pages.formType === "Leads") {
    return
  }
  let query = await supabase
    .from('orders')
    .select('*')
    .eq('customer_id', props.customer.id)
    .single()

  console.log(query);
  orderID.value = query.data?.order_id
}

const fDate = (datetime) => {
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

const fTime = (datetime) => {
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

const copyUrl = () => {
  navigator.clipboard.writeText(`${props.subdomain}.${config.public.publicUrl}/invoice/${orderID.value}`);

  snackbar.add({
    type: 'info',
    text: 'URL copied!'
  }) 
}

const sendToCustomer = () => {
  const url = `http://wa.me/${props.customer.phone}?text=Ini saya sertakan link invoice anda ${props.subdomain}.${config.public.publicUrl}/invoice/${orderID.value}.`
  window.open(url, '_blank'); 
}

const statusColor = (value) => {
  let color = "";
  switch (value) {
    case "new":
      color = "#FF9800";
      break;
    case "follow up":
      color = "#2196F3";
      break;
    case "rejected":
      color = "#ec3a3a";
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

const removePhonePrefix = (phoneNumber) => {
  // Check if the number starts with "+60"
  if (phoneNumber.startsWith('+60')) {
    // Remove the "+60" prefix
    return phoneNumber.slice(3);
  } else if (phoneNumber.startsWith('0')) {
    // Remove the leading '0'
    return phoneNumber.slice(1);
  } else {
    return phoneNumber;
  }
}
</script>
<style lang="scss" scoped></style>
