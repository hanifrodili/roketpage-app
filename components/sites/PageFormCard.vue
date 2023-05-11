<template lang="pug">
v-card.page-card.h-100
  v-card-text.pa-3.d-flex.flex-column.h-100(style="gap:12px")
    div.d-flex.flex-row.align-center()
      v-chip.text-capitalize.font-weight-medium(style="max-width:fit-content; width:100%; height:20px; font-weight:bold; font-size:10px" :ripple="false" :color="data.formType === 'Payment' ? '#49AE53' : '#2B62A3'") {{ `${data.formType} Form`}}
      v-spacer
      v-btn.delete-button(variant="text" icon="mdi-share" size="small" height="28" width="28" @click="openShare = true")
    div.d-flex.flex-column(style="gap:4px")
      p.page-title {{ data.title }}
      p.page-description {{ data.description }}

    v-spacer

    div.d-flex.flex-column(style="gap:4px")
      p.sub-label Product
      div.d-flex.flex-row.product-card(v-for="(prod, index) in data.products" :key="index")
        img(:src="getProduct(prod)?.image" alt="product image" height="100" width="100" style="object-fit: cover; object-position: center;")
        div.d-flex.flex-column.product-info
          p.title {{ getProduct(prod)?.name }}
          p.description {{ getProduct(prod)?.description }}
      
    div.d-flex.flex-row.align-center(style="gap:10px; padding-top:10px")
      v-btn.delete-button(variant="text" icon="mdi-trash-can-outline" color="#DA4453" size="small" height="28" width="28" @click="dialogDelete=true")
      //- v-btn.delete-button(variant="text" icon="mdi-share-variant" size="small" height="28" width="28")
      v-btn.text-capitalize.flex-grow-1(variant="outlined" color="#4E4E4E" size="small" rounded="lg") Edit Form
      v-btn.text-capitalize.flex-grow-1(variant="outlined" color="#4E4E4E" size="small" rounded="lg" @click="$router.push(`/admin/pages/builder/${data.slug}`)") Edit Page

    v-btn.text-capitalize(variant="flat" color="#11ed9a" size="small" rounded="lg" @click="$router.push(`/admin/pages/preview/${data.slug}`)") Preview Page

    p.font-italic(style="font-size:10px; color:#ababab") Last update: {{ fTime(data.updated_at) }}

general-dialog-type-a(v-model="openShare")
  template(v-slot:title)
      p Share
  template(v-slot:content)
    general-share-dialog

v-dialog(v-model="dialogDelete" scrollable persistent max-width="300px")
  v-card()
    v-card-text.pa-4
      div
        p Confirm Delete?
        p.font-weight-bold This action can't be undo
    v-card-actions.pa-4
      v-spacer
      v-btn(variant="text" color="secondary" @click="$emit('delete',data.id), dialogDelete = false") Yes
      v-btn.elevation-0(color="red" variant="tonal" @click="dialogDelete=false") No
</template>

<script setup>
const dialogDelete = ref(false)
const props = defineProps(['data', 'products'])
const emit = defineEmits(['delete'])
const openShare = ref(false)

const getProduct = (id) => {
  return props.products.find(x => x.id === id)
}

function fTime(datetime) {
  const date = new Date(datetime);
  const options = { timeZone: 'Asia/Kuala_Lumpur', day: '2-digit', month: '2-digit', year: 'numeric', hour12: true, hour: '2-digit', minute: '2-digit' };
  const formattedTime = date.toLocaleTimeString('en-MY', options);

  return formattedTime
}
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
