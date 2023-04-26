<template lang="pug">
.LayoutA(style="height: fit-content")
  v-row(style="min-height:200px")
    v-col.px-5(cols="12")
      component(v-if="components[0]"  :is="components[0].component" :data="components[0]")
      div.d-flex.align-center.addNew(v-else)
        sites-builder-add-block(:position="-1" @addBlock="addBlock" :blockList="Blocks")

</template>

<script setup>
import Blocks from "~/components/sites/components/blocks";

const props = defineProps({
  data: {
    type: Object,
    default: () => { }
  },
  pageId: {
    type: String,
    default: ''
  },
  pages: {
    type: Array,
    default: []
  }
})

const components = ref(props.data.childBlock)

const addBlock = (pos, block) => {
  const name = block.replace(" ", "")
  const newBlockID = randID(10)
  const reuseBlockID = randNum(5)
  let newBlock = {
    _uid: newBlockID,
    component: name,
    name: name,
    config: {}
  }
  components.value.splice(pos, 0, newBlock)
  props.pages.forEach(item => {
    if (item.id === props.pageId) {
      item.components.forEach(comp => {
        if (comp._uid === props.data._uid) {
          comp.childBlock = components.value
        }
      })
      const d = new Date()
      item.lastUpdate = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    }
  })
  console.log(props.pages);
  window.localStorage.setItem('userPages', JSON.stringify(props.pages))
}

const randID = (len) => {
  var length = len
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

const randNum = (len) => {
  var length = len
  var result = '#';
  var characters = '0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}
</script>
<script>
export default {
  components: { ...Blocks }
}
</script>

<style lang="scss" scoped>
.addNew{
  height:100%;
  border: 1px dashed rgb(var(--v-theme-secondary));
  opacity: .5;
  position:relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.addNew:hover){
  border: 1px dashed rgb(var(--v-theme-primary));
  opacity: 1;

  .addBlock{
    .btn-add{
      color: rgb(var(--v-theme-primary));
      border-color: rgb(var(--v-theme-primary));
    }
  }
}


.menuBtn{
  width: 100%;
  opacity: .5;
}

.menuBtn:hover{
  opacity: 1;
}
</style>
