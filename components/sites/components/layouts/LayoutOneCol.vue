<template lang="pug">
v-row.ma-0(style="height:fit-content;" :style="`padding:${padding?.top}px ${padding?.right}px ${padding?.bottom}px ${padding?.left}px; background-color:${background}`" :id="data._uid")
  v-col.d-flex.align-center.justify-center(v-if="components[0]" cols="12")
    component(:is="components[0].component" :data="components[0]" :editable="editMode" @input="updateContent(components[0]._uid)" data-placeholder="Your Text Here")
  v-col(v-if="!components[0] && editMode" cols="12")
    div.d-flex.align-center.addNew.ignored(style="position:relative")
      sites-builder-add-block(:position="-1" @addBlock="addBlock" :blockList="Blocks")
      v-icon.cursor-pointer.ml-auto.mr-4(@click="$emit('deleteBlock', data._uid)" size="x-small" color="red" style="position:absolute; bottom:10px; right:0") mdi-trash-can-outline

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
  editMode: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['updateContent', 'addChild', 'deleteBlock'])

const components = ref(props.data.childBlock)

const padding = ref(null)
const background = ref('#ffffff')

onMounted(() => {
  if (props.data.config.css.padding) {
    padding.value = props.data.config.css.padding
  }

  if (props.data.config.css.backgroundColor) {
    background.value = props.data.config.css.backgroundColor
  }
})

watch(
  () => props.data.config.css.backgroundColor,
  (backgroundColor) => {
    background.value = backgroundColor
  }
)

const addBlock = (pos, block) => {
  const name = block.replace(" ", "")
  const newBlockID = randID(10)
  const reuseBlockID = randNum(5)
  let cssSetup = {}
  if (name === 'Image') {
    cssSetup = {
      width: 600,
      borderRadius: 10
    }
  } else if (name === 'Button') {
    cssSetup = {
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      backgroundColor: "#1798bc",
      font: {
        family: 'Open Sans',
        size: '500',
      }
    }
  } else {
    cssSetup = {
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      font: {
        family: 'Open Sans',
        size: '500',
      }
    }
  }
  let newBlock = {
    _uid: newBlockID,
    component: name,
    name: name,
    config: {
      css: cssSetup
    }
  }
  components.value.splice(pos, 0, newBlock)
  emits('addChild', components.value)
}

const updateContent = (id) => {
  const el = document.getElementById(id)
  let content = el.innerHTML
  if (el.tagName === 'BUTTON') {
    content = el.children[0].innerHTML
  }

  // console.log(content);
  emits('updateContent', { parentId: props.data._uid, elementId: id, content: content })
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
.addNew {
  height: 100px;
  border: 1px dashed rgb(var(--v-theme-secondary));
  opacity: .5;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.addNew:hover) {
  border: 1px dashed rgb(var(--v-theme-primary));
  opacity: 1;

  .addBlock {
    .btn-add {
      color: rgb(var(--v-theme-primary));
      border-color: rgb(var(--v-theme-primary));
    }
  }
}


.menuBtn {
  width: 100%;
  opacity: .5;
}

.menuBtn:hover {
  opacity: 1;
}

:deep([contenteditable]):empty:after {
  content: attr(data-placeholder);
  color: rgb(212, 212, 212);
  // display: none;
}

:deep([contenteditable]):focus:empty:after {
  content: attr(data-placeholder);
  color: rgb(212, 212, 212);
  // display: unset;
}

:deep([contenteditable]) {
  -webkit-tap-highlight-color: transparent;
}

:deep([contenteditable]):focus-visible {
  outline: none;
}</style>