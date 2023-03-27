<template lang="pug">
.speed-menu.d-flex.flex-row(style="gap:10px")
  v-btn.btn-edit(icon="mdi-pencil" @click="editDialog(true)" size="x-small" color="success")
  v-btn.btn-edit(icon="mdi-trash-can" size="x-small" color="red" @click="editBlock(blockID,'delete')")
  v-btn.btn-edit(icon="mdi-arrow-down-thick" size="x-small" color="warning" @click="editBlock(blockIndex,'down')")
  v-btn.btn-edit(icon="mdi-arrow-up-thick" size="x-small" color="warning" @click="editBlock(blockIndex,'up')")
</template>
<script>
export default {
  name:"SpeedMenu",
  props:{
    editable:{
      type: Boolean,
      default: false
    },
    dialog:{
      type: Boolean,
      default: false
    },
    blockIndex:{
      type: Number
    },
    blockID:{
      type: String
    }
  },
  data:()=>({
    fab: false,
  }),
  methods:{
    editDialog(bool){
      this.$emit('openDialog',bool)
    },
    editBlock(ind,act){
      this.$emit('editBlock',ind,act)
    }
  }
}
</script>
<style scoped>
.btn-open{
  position: absolute;
  right: 5%;
  bottom: 5%;
  z-index: 99;
}
.btn-edit{
  border-radius: 99px;
  z-index: 2;
  height: 40px;
  width: 40px;
}
.btn-edit:hover{
  transform: scale(1.2);
  color: var(--v-primary) !important;
  background-color: white !important;
  border: 2px solid var(--v-primary) !important;
}
.btn-speeddial{
    opacity: .5;
}
.btn-speeddial:hover,
.btn-speeddial:active,
.btn-speeddial:focus{
    opacity: 1;
}
</style>
