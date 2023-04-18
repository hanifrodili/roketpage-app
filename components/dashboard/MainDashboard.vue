<template lang="pug">
div
  v-select.ml-auto(v-model="statusRange" variant="outlined" hide-details="auto" density="compact" :items="['Today','This month','This week','This year']" style="width:fit-content")
  div.d-flex.flex-row.justify-space-between.pt-5(:style="`gap:${$vuetify.display.width > 500 ? '30px' : '15px'}`" :class="$vuetify.display.width > 930 ? '' : 'flex-wrap'")
    v-card.status-card()
      p.status-number 200
      p.status-name Leads
      div.mt-2.d-flex.flex-row.align-center(style="gap:2px")
        img(src="/img/graph-down.svg" width="15")
        p.status-compare 
          span.graph-down -5%
          | from {{ previousRange }}
    v-card.status-card()
      p.status-number RM 20,000
      p.status-name Sales
      div.mt-2.d-flex.flex-row.align-center(style="gap:2px")
        img(src="/img/graph-up.svg" width="15")
        p.status-compare 
          span.graph-up 20%
          | from {{ previousRange }}
    v-card.status-card()
      p.status-number 150
      p.status-name Orders
      div.mt-2.d-flex.flex-row.align-center(style="gap:2px")
        img(src="/img/graph-up.svg" width="15")
        p.status-compare 
          span.graph-up 10%
          | from {{ previousRange }}
  //- dashboard-bar-chart.mt-15
  v-card.status-card.mt-4(:class="$vuetify.display.width > 930 ? 'pa-10' : 'pa-3'" style="height: 300px")
    dashboard-line-chart
</template>

<script setup>
// import { useStoreUser } from '~/store/storeMerchant'
// const supabase = useSupabaseAuthClient();
// const userStore = useStoreUser()

const statusRange = ref('Today')
const previousRange = ref('yesterday')

watch(statusRange, () => {
  switch (statusRange.value) {
    case 'Today':
      previousRange.value = 'yesterday'
      break;
    case 'This week':
      previousRange.value = 'last week'
      break;
    case 'This month':
      previousRange.value = 'last month'
      break;
    case 'This year':
      previousRange.value = 'last year'
      break;
  
    default:
      break;
  }
})
</script>

<style lang="scss" scoped>
.status-card{
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 150px;
  height: 100%;
  box-shadow: none;
  border: .5px solid #ababab;
  border-radius: 8px;

  .status-number{
    font-size: 40px;
    font-weight: bold;
    line-height: 45px;
  }
  .status-name{
    font-size: 16px;
    color: grey;
  }

  div{
    .status-compare{
      font-size: 12px;

      .graph-up{
        color: #009F63;
        font-weight: bold;
        margin-right: 5px;
      }

      .graph-down{
        color: #F9595F;
        font-weight: bold;
        margin-right: 5px;
      }
    }
  }
}
</style>
