<template lang="pug">
div.pb-10
  v-select.ml-auto(v-model="statusRange" variant="outlined" hide-details="auto" :items="['Today','This month','This week','This year']" style="width:fit-content")
  div.d-flex.flex-row.justify-space-between.pt-5(:style="`gap:${$vuetify.display.width > 500 ? '30px' : '15px'}`" :class="$vuetify.display.width > 930 ? '' : 'flex-wrap'")
    v-card.status-card()
      p.status-number 200
      p.status-name Leads
      div.mt-2.d-flex.flex-row.align-center(style="gap:2px")
        img(src="/img/graph-down.svg" width="15")
        p.status-compare 
          span.graph-down -5%
          | from yesterday
    v-card.status-card()
      p.status-number RM 20,000
      p.status-name Sales
      div.mt-2.d-flex.flex-row.align-center(style="gap:2px")
        img(src="/img/graph-up.svg" width="15")
        p.status-compare 
          span.graph-up 20%
          | from yesterday
    v-card.status-card()
      p.status-number 150
      p.status-name Orders
      div.mt-2.d-flex.flex-row.align-center(style="gap:2px")
        img(src="/img/graph-up.svg" width="15")
        p.status-compare 
          span.graph-up 10%
          | from yesterday
  //- dashboard-bar-chart.mt-15
  v-card.status-card.mt-4(:class="$vuetify.display.width > 930 ? 'pa-10' : 'pa-3'" style="height: 300px")
    dashboard-line-chart
</template>

<script setup>
const statusRange = ref('Today')
</script>

<style lang="scss" scoped>
.status-card{
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 2px 4px -1px rgb(172 172 172 / 70%);
  min-height: 150px;
  height: 100%;
  border-radius: 16px;

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
