<template lang="pug">
.addBlock
  v-dialog(v-model="dialog" scrollable persistent max-width="500px")
    template(v-slot:activator="{ props }")
      v-btn.btn-add.add-icon(:class="{'btn-add--active':dialog}"  v-bind="props" variant="outlined" icon="mdi-plus")
    v-card()
      v-card-title.d-flex.flex-row.justify-space-between.align-center
        | Add Block
        v-btn.rounded-circle(variant="plain" @click="dialog = false" icon="mdi-close")
      v-card-text.pa-4
        v-row
          v-col(cols="6" md="4" v-for="(block, index) in blocks" :key="index")
            v-btn.text-capitalize.bg-primary(variant="outlined" color="black" style="width:100%" @click="addBlock(position+1, block), dialog=false") {{ block }}
          //- v-col(cols="6" md="4")
          //- div(v-if="usedBlock.length > 0")
          //-   hr.mt-6.mb-3(style="width:100%")
          //-   h4.mb-3 Reuse Block
          //-   v-row
          //-     v-col(cols="12" md="6" v-for="(block, index) in usedBlock" :key="index")
          //-       v-btn(style="width:100%" @click="reuseBlock(position+1, usedBlock[index]), dialog=false") {{block.name}} {{block.reuseBlockID}}
</template>

<script setup>
const dialog = ref(false)

const emits = defineEmits(['addBlock'])

const props = defineProps({
  blockList: {
    type: Object
  },
  position: {
    type: Number
  },
  usedBlock: {
    type: Array
  }
})
const blocks = ref([])

onMounted(() => {
  // console.log(props.blockList); 
  blocks.value = Object.keys(props.blockList).map((block) => {
    return block.replace(/([A-Z]+)/g, ",$1").replace(/^,/, "").split(",").join(" ")
  })
})

function addBlock(pos, block) {
  emits('addBlock', pos, block)
}
</script>

<style lang="scss" scoped>
.addBlock{
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-add{
  // display: block;
  // position: absolute;
  // transform: translateY(-50%) translateX(-50%);
  z-index: 2;
  opacity: 1;
  background-color: rgb(var(--v-theme-bodyBg));
  height: 20px;
  width: 20px;
  color: #d0d0d0;
  border-color: #d0d0d0;
}
.add-icon{
  transform: rotate(0deg);
  font-size: inherit;
}
.btn-add:hover.add-icon,.btn-add--active.add-icon{
  transform: rotate(45deg) scale(1.2);
  color: rgb(48, 168, 48);
  border-color: rgb(48, 168, 48);
}

:deep(.v-icon--size-default){
  font-size: inherit;
}
</style>