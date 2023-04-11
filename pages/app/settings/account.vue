<template lang="pug">
div.page-content
  .d-flex.flex-row.align-center
    v-btn(variant="text" icon="mdi-arrow-left" @click.stop="$router.push('/settings')")
    h1.page-title {{ $t('account') }}
  v-card.general-card
    v-form.pa-4
        p.mb-3(style="font-size:14px; font-weight:600; color: #767676") User Info
        v-row
          v-col.py-2(cols="12")
            v-text-field( label="Name" variant="outlined" density="compact" hide-details="auto" )
        v-row
          v-col.py-2(cols="12" md="6" )
            v-text-field( label="Email" variant="outlined" density="compact" hide-details="auto" )
          v-col.py-2(cols="12" md="6" )
            v-text-field( label="Phone Number" variant="outlined" density="compact" hide-details="auto" prefix="+60")
        v-divider.mb-4.mt-7
        p.mb-3(style="font-size:14px; font-weight:600; color: #767676") Password
        v-row
          v-col.py-2(cols="12")
            div.d-flex.flex-row.align-center(style="gap:20px")
              p.font-italic(style="font-size:14px; font-weight:300; color: #767676") Last update: 04/03/2023 at 09:39 PM
              v-btn( @click="editPasswordDialog = true" color="info" variant="text" icon="mdi-lock-reset" )
              
  

  general-dialog-type-a(v-model="editPasswordDialog" :persistent='true')
    template(v-slot:title)
      p Change Password
    template(v-slot:content)
      v-form
        v-row
          v-col.py-2(cols="12")
            v-text-field( label="Current Password" :type="showCurrent ? 'text' : 'password'" variant="outlined" density="compact" hide-details="auto" :append-inner-icon="showCurrent ? 'mdi-eye' : 'mdi-eye-off'" @click:append-inner="showCurrent = !showCurrent")
        v-row
          v-col.py-2(cols="12")
            v-text-field( label="New Password" :type="showNew ? 'text' : 'password'" variant="outlined" density="compact" hide-details="auto" :append-inner-icon="showNew ? 'mdi-eye' : 'mdi-eye-off'" @click:append-inner="showNew = !showNew")
        
    template(v-slot:action)
      v-btn.text-capitalize(variant="text" @click="editPasswordDialog = false") Cancel
      v-btn.text-capitalize(variant="tonal" color="info") Update
</template>

<script setup>
const editPasswordDialog = ref(false)
const showCurrent = ref(false)
const showNew = ref(false)
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
</style>
