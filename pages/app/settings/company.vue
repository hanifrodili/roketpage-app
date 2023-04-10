<template lang="pug">
div.page-content.setting-content
  .d-flex.flex-row.align-center.mb-5
    v-btn(variant="text" icon="mdi-arrow-left" @click.stop="$router.push('/settings')")
    h1.page-title {{ $t('company') }}
  v-card.card
    v-btn.text-capitalize( @click="edit = true" rounded size="small" variant="tonal" color="info" style="position:absolute; top:10px; right:10px;" )
      v-icon mdi-pencil-box-outline
      p Edit
    v-card-text.pa-2.pa-md-4
      div.content
        p.label Name
        p.text HNFRDL Store
      div.content
        p.label SSM Reg. Number
        p.text 20230987654321
      div.content
        p.label Email
        p.text hnfrdl@mail.test
      div.content
        p.label Phone
        p.text +60123456789
      div.content
        p.label Address
        p.text 123, Jalan Raya,<br>123456, WP Kuala Lumpur,<br>WP Kuala Lumpur
      

  

  general-dialog-type-a(v-model="edit" :persistent='true')
    template(v-slot:title)
      p Edit Company
    template(v-slot:content)
      v-form
        v-row
          v-col.py-2(cols="12")
            v-text-field( label="Name" variant="outlined" density="compact" hide-details="auto" )
        v-row
          v-col.py-2(cols="12" md="4" )
            v-text-field( label="SSM Reg. Number" variant="outlined" density="compact" hide-details="auto" )
          v-col.py-2(cols="12" md="4" )
            v-text-field( label="Email" variant="outlined" density="compact" hide-details="auto" )
          v-col.py-2(cols="12" md="4" )
            v-text-field( label="Phone" variant="outlined" density="compact" hide-details="auto" )
        v-row
          v-col.py-2(cols="12")
            v-textarea( label="Address" variant="outlined" density="compact" hide-details="auto" )
        v-row
          v-col.py-2(cols="12" md="4" )
            v-text-field( label="Postcode" variant="outlined" density="compact" hide-details="auto" )
          v-col.py-2(cols="12" md="4" )
            v-text-field( label="City" variant="outlined" density="compact" hide-details="auto" )
          v-col.py-2(cols="12" md="4" )
            v-text-field( label="State" variant="outlined" density="compact" hide-details="auto" )
    template(v-slot:action)
      v-btn.text-capitalize(variant="text" @click="edit = false") Cancel
      v-btn.text-capitalize(variant="tonal" color="info") Save
</template>

<script setup>
const edit = ref(false)
</script>

<style lang="scss" scoped>
.card{
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 8px;
  position: relative;
  // align-items: center;
  // justify-content: center;
  // box-shadow: 0px 2px 4px -1px rgb(34 34 34 / 50%);
  box-shadow: none;
  min-height: 400px;
  height: fit-content;
  border: .5px solid #ababab;
  border-radius: 8px;
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
  }
}
</style>
