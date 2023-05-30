<template lang="pug">
div
  v-select.ml-auto(
    v-model="statusRange",
    variant="outlined",
    hide-details="auto",
    density="compact",
    :items="rangeList",
    item-title="title",
    item-value="value"
    style="width: fit-content")

  //- chart
  v-card.status-card.mt-4.pa-5(max-height="300")
    dashboard-bar-chart(:leads="leads" :orders="orders" :range="dayRange")

  .d-flex.flex-row.justify-space-between.pt-5(
    :style="`gap:${$vuetify.display.width > 500 ? '20px' : '15px'}`",
    :class="$vuetify.display.width > 930 ? '' : 'flex-wrap'")
    v-card.status-card
      p.status-number {{ leads.length }}
      p.status-name Leads
      //- .mt-2.d-flex.flex-row.align-center(style="gap: 2px")
      //-   img(src="/img/graph-down.svg", width="15")
      //-   p.status-compare
      //-     span.graph-down -5% from {{ previousRange }}
    v-card.status-card
      p.status-number {{ fCurrency(sales) }}
      p.status-name Sales
      //- .mt-2.d-flex.flex-row.align-center(style="gap: 2px")
      //-   img(src="/img/graph-up.svg", width="15")
      //-   p.status-compare
      //-     span.graph-up 20% from {{ previousRange }}
    v-card.status-card
      p.status-number {{ ordersCount }}
      p.status-name Orders
      //- .mt-2.d-flex.flex-row.align-center(style="gap: 2px")
      //-   img(src="/img/graph-up.svg", width="15")
      //-   p.status-compare
      //-     span.graph-up 10%from {{ previousRange }}
</template>

<script setup>
const userStore = useStoreUser()
const supabase = useSupabaseAuthClient();

const company_id = ref('')
const statusRange = ref("day");
const previousRange = ref("yesterday");
const leads = ref([])
const leadsCount = ref(0)
const ordersCount = ref(0)
const sales = ref(0)
const orders = ref([])
const dayRange = ref(1)
const rangeList = ref([
  {
    title: "Last 24 hours",
    value: "day",
  },
  {
    title: "Last 7 days",
    value: "week",
  },
  {
    title: "Last 30 days",
    value: "month",
  },
  // {
  //   title: "This year",
  //   value: "year",
  // },
]);

onMounted(async() => {
  userStore.getUser()
  company_id.value = userStore.user.current_company.id
  await getLeads()
  await getOrders()
})

watch(statusRange, async () => {
  switch (statusRange.value) {
    case "day":
      previousRange.value = "yesterday";
      dayRange.value = 1
      break;
    case "week":
      previousRange.value= "last week";
      dayRange.value = 7
      break;
    case "month":
      previousRange.value = "last month";
      dayRange.value = 30
      break;
    case "year":
      previousRange.value = "last year";
      dayRange.value = 365
      break;

    default:
      break;
  }

  await getLeads()
  await getOrders()
});

const getLeads = async () => {
  const currentDate = new Date();
  const startDate = new Date(currentDate.getTime() - dayRange.value * 24 * 60 * 60 * 1000);
  
  const startDateString = startDate.toISOString().slice(0, 19).replace('T', ' ');
  const endDateString = currentDate.toISOString().slice(0, 19).replace('T', ' ');

  let query = await supabase
    .from('customers')
    .select('created_at', { count: "exact" })
    .eq('company_id', company_id.value)
    .gte('created_at', startDateString)
    .lte('created_at', endDateString)
    .neq('status', 'rejected')
  
  // console.log(query.data);
  leadsCount.value = query.count
  leads.value = query.data
}

const getOrders = async () => {
  const currentDate = new Date();
  const startDate = new Date(currentDate.getTime() - dayRange.value * 24 * 60 * 60 * 1000);

  const startDateString = startDate.toISOString().slice(0, 19).replace('T', ' ');
  const endDateString = currentDate.toISOString().slice(0, 19).replace('T', ' ');

  let query = await supabase
    .from('order')
    .select('created_at, payment', { count: "exact" })
    .eq('company_id', company_id.value)
    .gte('created_at', startDateString)
    .lte('created_at', endDateString)
    .neq('status', 'cancelled')
  sales.value = 0
  for (let index = 0; index < query.data.length; index++) {
    const order = query.data[index];
    sales.value += order.payment
  }

  // console.log(query.data);
  ordersCount.value = query.data.length
  orders.value = query.data
}

const fCurrency = (cent) => {
  const amount = cent / 100
  return amount.toLocaleString('en-MY', { style: 'currency', currencyDisplay: 'symbol', currency: 'myr'});
}
</script>

<style lang="scss" scoped>
.status-card {
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 150px;
  height: 100%;
  box-shadow: none;
  border: 0.5px solid #ababab;
  border-radius: 8px;

  .status-number {
    font-size: 40px;
    font-weight: bold;
    line-height: 45px;
  }
  .status-name {
    font-size: 16px;
    color: grey;
  }

  div {
    .status-compare {
      font-size: 12px;

      .graph-up {
        color: #009f63;
        font-weight: bold;
        margin-right: 5px;
      }

      .graph-down {
        color: #f9595f;
        font-weight: bold;
        margin-right: 5px;
      }
    }
  }
}
</style>
