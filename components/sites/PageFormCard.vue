<template lang="pug">
.PageFormCard.h-100
  v-card.page-card.h-100
    v-card-text.pa-3.d-flex.flex-column.h-100(style="gap:12px")
      v-chip.text-capitalize.font-weight-medium(style="width:fit-content; height: 20px; font-weight:bold; font-size:10px" :ripple="false" :color="data.formType === 'Payment' ? '#49AE53' : '#2B62A3'") {{ `${data.formType} Form`}}
      div.d-flex.flex-column(style="gap:4px")
        p.page-title {{ data.title }}
        p.page-description {{ data.description }}
      v-spacer
      div.d-flex.flex-column(style="gap:4px")
        p.sub-label Product
        div.d-flex.flex-row.product-card
          img(src="https://ik.imagekit.io/hanifrodili/coffee-bean.png?updatedAt=1683528093024" alt="product image" height="100" width="100")
          div.d-flex.flex-column.product-info
            p.title {{ data.products.name }}
            p.description {{ data.products.description }}
      div.d-flex.flex-row.align-center(style="gap:10px; padding-top:10px")
        v-btn.delete-button(variant="text" icon="mdi-trash-can-outline" color="#DA4453" size="small" height="28" width="28" @click="dialogDelete=true")
        div.d-flex.flex-row.justify-space-evenly.w-100(style="gap:10px")
          v-btn.text-capitalize.flex-grow-1(variant="outlined" color="#4E4E4E" size="small" rounded="lg") Edit Form
          v-btn.text-capitalize.flex-grow-1(variant="outlined" color="#4E4E4E" size="small" rounded="lg" @click="$router.push(`/admin/pages/builder/${data.id}`)") Edit Page
      v-btn.text-capitalize(variant="tonal" color="#624EC4" size="small" rounded="lg" @click="$router.push(`/admin/pages/preview/${data.id}`)") Preview Page
  
  v-dialog(v-model="dialogDelete" scrollable persistent max-width="300px")
    v-card()
      v-card-text.pa-4
        div
          p Confirm Delete?
          p.font-weight-bold This action can't be undo
      v-card-actions.pa-4
        v-spacer
        v-btn(variant="text" color="secondary" @click="$emit('delete',data.id)") Yes
        v-btn.elevation-0(color="red" variant="tonal" @click="dialogDelete=false") No
</template>

<script setup>
const dialogDelete = ref(false)
const props = defineProps(['data'])
const emit = defineEmits(['delete'])
</script>

<style lang="scss" scoped>
.page-card{
  border: 1px solid #ababab !important;
  /* background-color: transparent; */
  box-shadow: none !important;
  border-radius: 8px;
  height: 100%;
}

.page-title{
  font-size: 14px;
  font-weight: 700;
  line-height: normal;
}

.page-description{
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
}

.sub-label{
  font-size: 12px;
  font-weight: 600;
  line-height: normal;
}

.product-card{
  border: 1px solid rgba(171,171,171, 0.5);
  border-radius: 8px;
  overflow: hidden;
  gap: 0px;
  height: 100px;
}

.product-info{
  padding: 10px;
  gap:4px;

  .title{
    font-size: 12px;
    font-weight: 600;
    line-height: normal;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;  
    overflow: hidden;
  }

  .description{
    font-size: 10px;
    font-weight: 400;
    line-height: normal;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;  
    overflow: hidden;
  }
}

:deep(.delete-button) i {
  font-size: 24px;
}
</style>
