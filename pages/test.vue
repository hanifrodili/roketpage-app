<template lang="pug">
.test
  v-btn.mt-15( @click="dialogAdd = true" ) Open

  v-sheet
    flex-fill
      v-text-field(label="Page Slug" variant="outlined" hide-details="auto" clearable)
    
  v-dialog(v-model="dialogAdd" scrollable persistent max-width="500px")
    v-card(style="background-color:rgba(255,255,255,0.8); backdrop-filter: blur(4px);")
      v-card-title.d-flex.flex-row.justify-space-between
        | {{ $t('createnewpage') }}
        v-btn(color="secondary" variant="plain" icon="mdi-close" @click="dialogAdd = false")
      v-card-text.pa-4
        v-container()
          v-text-field(label="Page Slug" variant="outlined" hide-details="auto" clearable)
          v-text-field.mt-3(label="Page Title" variant="outlined" hide-details="auto" clearable)
      v-card-actions
        v-spacer
        v-btn(variant="outlined" @click="") {{ $t('create') }}
</template>

<script setup>
  const dialogAdd = ref(true)
</script>

<style lang="scss" scoped>

</style>
