<template lang="pug">
div.d-flex.align-start.justify-space-between.py-4.px-md-4(style="gap: 20px;" :class="$vuetify.display.width < 1020 ? 'flex-column' : 'flex-row'")
  div.d-flex.flex-column(style="width:100%; heigth:100%; padding:0px; gap:4px;" :style="`max-width:${$vuetify.display.width < 1020 ? '100%' : '350px'}`")
    div.d-flex.flex-row(style="gap: 10px; font-weight:bold; font-size:14px" )
      p #123
      p Mohd Hanif Bin Mohamod Rodili
    div.d-flex.flex-row(style="gap:10px; font-size:14px" )
      p +60 13 471 4296
      img(src="/img/ver-divider.svg" )
      p hanifrodili@gmail.com
  div.d-flex.flex-column(style="width:100%; heigth:100%; padding:0px; gap:4px; font-size:14px" :style="`max-width:${$vuetify.display.width < 1020 ? '100%' : '290px'}`")
    p.font-weight-bold.text-decoration-underline Item(s)
    div
      div.d-flex.flex-row.justify-space-between.w-100
        p.font-weight-bold Susu Kurma
        div.d-flex.flex-row(style="gap:8px;")
          p x1
          p.font-weight-bold RM10
      hr(style="border: 0.5px solid #cecece; margin-top:4px")
    div
      div.d-flex.flex-row.justify-space-between.w-100
        p.font-weight-bold Susu Badam
        div.d-flex.flex-row(style="gap:8px;")
          p x1
          p.font-weight-bold RM10
      hr(style="border: 0.5px solid #cecece; margin-top:4px")
    p(style="color:#7d7d7d") +2 more item(s)
  div.d-flex.flex-column(style="width:100%; height:100%; padding:0px; gap:10px; font-size:14px" :style="`max-width:${$vuetify.display.width < 1020 ? '100%' : '200px'}`")
    div.d-flex.flex-row.justify-end(style="gap:4px")
      p Status:
      p.font-weight-bold.text-green Paid
    div.d-flex.flex-row.justify-end(style="gap:4px")
      p Total Paid:
      p.font-weight-bold RM50
    div.d-flex.flex-row.justify-end()
      v-btn(icon="mdi-trash-can-outline" variant="text" size="small" color="red")
      v-btn(icon="mdi-file-edit-outline" variant="text" size="small")
      v-btn(icon="mdi-open-in-new" variant="text" size="small")
        


</template>

<script setup></script>
<style lang="scss" scoped></style>
