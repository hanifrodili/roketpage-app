<template lang="pug">
div
  v-row.pa-3
    v-col.pa-2(cols="12" )
      v-row(style="position:relative")
        v-btn.text-capitalize( @click="$router.push('/settings/account')" rounded size="small" variant="tonal" color="info" style="position:absolute; top:10px; right:10px;" )
          v-icon mdi-account-edit
          p Edit
        v-col.align-self-center.mb-3(cols="12" md="2")
          div.pa-4.bg-primary.rounded-circle.overflow-hidden.mx-auto.mx-md-0(style="width:fit-content")
            v-img(:aspect-ratio="1/1" width="60" src="/img/logo.svg" )
        v-col(cols="12" md="5")
          div.d-flex.flex-column.w-100()
            .d-flex.flex-row.justify-space-between(style="gap:20px")
              div.content
                p.label Name
                p.text Mohd Hanif Bin Mohamod Rodili
              div.content
                p.label Role
                p.text Owner
            .d-flex.flex-row.justify-space-between(style="gap:20px")
              div.content
                p.label Email
                p.text hanif_rodili@yahoo.com
              div.content
                p.label Phone
                p.text +60123456789
          
    v-col.pa-0(cols="12")
      v-card.card()
        v-card-text.d-flex.flex-column.pa-0
          div.d-flex.flex-row.align-center.settings-item.pa-3.py-4.px-md-5(style="gap:20px" v-for="(setting, index) in settingsList" :key="index" @click="$router.push(setting.path)")
            v-icon mdi-{{ setting.mdi }}
            p.label {{ $t(setting.label) }}
            v-icon.ml-auto mdi-chevron-right
</template>

<script setup>
const settingsList = ref([
  {
    label: 'company',
    path: '/admin/settings/company',
    mdi: 'domain'
  },
  {
    label: 'payment',
    path: '/admin/settings/payment',
    mdi: 'cash-multiple'
  },
  {
    label: 'shipping',
    path: '/admin/settings/shipping',
    mdi: 'truck'
  },
  {
    label: 'notification',
    path: '/admin/settings/notification',
    mdi: 'bell-ring'
  },
  {
    label: 'subscription',
    path: '/admin/settings/subscription',
    mdi: 'account-credit-card'
  }
])
</script>

<style lang="scss" scoped>
.card{
  width: 100%;
  display: flex;
  flex-direction: column;
  // align-items: center;
  // justify-content: center;
  // box-shadow: 0px 2px 4px -1px rgb(34 34 34 / 50%);
  box-shadow: none;
  height: fit-content;
  height: 100%;
  border: .5px solid #ababab;
  border-radius: 8px;
}

.settings-item{
  cursor: pointer;
  p.label{
    font-size: 15px;
    font-weight: 500;
  }
}

.settings-item:not(:last-of-type){
  border-bottom: 0.5px #ababab solid;
}

.content{
  margin-bottom: 10px;
  .label{
    font-size: 12px;
    font-weight: 400;
    color: #767676;
  }
  .text{
    font-size: 14px;
    font-weight: 600;
    word-break:break-all;
  }
}
</style>
