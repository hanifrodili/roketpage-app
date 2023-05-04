<template lang="pug">
.mypage-builder
  sites-builder-menu-bar(@import="importData" :pageID="pageID" :pageData="userComponents" :pageTitle="pageTitle" @toggleAdd="toggleAdd" style="width:100%;")
  div.pb-3.ignored(id="builder" style="height:calc(100vh - 64px - 48px); overflow-y:scroll")
    template(v-for="(component, index) in userComponents" :key="component._uid")
      component(:is="component.component" :data="component" :pages="userPages" :pageId="pageID" :editMode="editMode" @updateContent="updateContent")
      //- .menuBtn.d-flex.flex-row()
      //-   sites-builder-speed-menu.ml-auto(style="margin-top:-55px; margin-right: 20px")
      //- sites-builder-add-block.ignored(
        v-if="showAdd" 
        :position="index",
        @addBlock="addBlock",
        :blockList="Layouts")
      .add-block.ignored(v-if="showAdd")
        v-btn.btn-add.ignored(@click="addBlock(index + 1, 'OneColumn')" variant="text" icon="mdi-plus-circle-outline")
    .pt-10.ignored(v-if="userComponents.length === 0")
      .d-flex.flex-column.align-center.justify-center.ignored(
        style="height: 100px; border: 0.5px dashed #d0d0d0;")
        //- hr(
          style="border: 0.5px dashed #d0d0d0; width: 100%")
        //- sites-builder-add-block(
          :position="-1",
          @addBlock="addBlock",
          :blockList="Layouts")
        .add-block()
          v-btn.btn-add.ignored(@click="addBlock(0, 'OneColumn')" variant="text" icon="mdi-plus-circle-outline")
  sites-builder-edit-module(v-model="openEdit" :data="onEditComponent" @updateCSS="updateCSS" @deleteBlock="removeBlock")
</template>
<script setup>
import { useDisplay } from "vuetify";
import Layouts from "~/components/sites/components/layouts";

const { width } = useDisplay();
const route = useRoute();
const editMode = ref(true)
const openEdit = ref(false)
const clickedEl = ref(null)
const onEditComponent = ref(null)
const showAdd = ref(true)

const userPages = ref([]);
const userComponents = ref([]);
const pageID = ref("");
const pageTitle = ref("");

definePageMeta({
  middleware: 'auth',
  name: 'builder'
})

onMounted(() => {
  pageID.value = route.params.id;
  userPages.value = JSON.parse(window.localStorage.getItem("userPages"));
  if (userPages.value.length > 0) {
    userPages.value.forEach((item) => {
      if (item.id === pageID.value) {
        userComponents.value = item.components;
        pageTitle.value = item.title;
      }
    });
  }
  document.getElementById("builder").addEventListener('click', (e) => {
    const el = e.target
    // const classList = el.classList.value.split(" ")
    // const tagName = el.tagName
    // console.log(el);
    let layout = null
    if (el.classList.contains('ignored') || el.classList.contains('v-icon')) {
      if (clickedEl.value) {
        clickedEl.value.classList.remove('editActive')
      }
      openEdit.value = false
      return
    }
    if (el.parentNode.parentNode.parentNode.parentNode.classList.contains('v-row')) {
      layout = el.parentNode.parentNode.parentNode.parentNode
    }
    if (el.parentNode.parentNode.parentNode.classList.contains('v-row')) {
      layout = el.parentNode.parentNode.parentNode
    }

    if (el.parentNode.parentNode.classList.contains('v-row')) {
      layout = el.parentNode.parentNode
    }

    if (el.parentNode.classList.contains('v-row')) {
      if (clickedEl.value) {
        clickedEl.value.classList.remove('editActive')
      }
      openEdit.value = false
      return
    }

    if (el.classList.contains('v-row')) {
      if (clickedEl.value) {
        clickedEl.value.classList.remove('editActive')
      }
      openEdit.value = false
      return
    }

    if (clickedEl.value && clickedEl.value !== el) {
      clickedEl.value.classList.remove('editActive')
    }

    userComponents.value.forEach(element => {
      // console.log(element._uid === layout.id);
      if (element._uid === layout.id) {
        onEditComponent.value = element
      }
    });
    if (!el.classList.contains('v-row') && !el.classList.contains('v-col')) {
      el.classList.add('editActive')
    }
    clickedEl.value = el
    openEdit.value = true
  })
});

watch(openEdit, (newOpenEdit) => {
  if (!newOpenEdit) {
    clickedEl.value.classList.remove('editActive')
  }
})

const removeDuplicateBlock = (e) => {
  const uniqueBlock = Array.from(
    e.reduce((map, obj) => map.set(obj.reuseBlockID, obj), new Map()).values()
  );
  return uniqueBlock;
};

const removeBlock = (id) => {
  userComponents.value = userComponents.value.filter((x) => x._uid !== id);
  userPages.value.forEach((item) => {
    if (item.id === pageID.value) {
      item.components = userComponents.value;
    }
  });
  window.localStorage.setItem("userPages", JSON.stringify(userPages.value));
};

const updateContent = (e) => {
  userComponents.value.forEach((component, index) => {
    if (component._uid === e.parentId) {
      const comps = userComponents.value[index].childBlock
      comps.forEach(child => {
        if (child._uid === e.elementId) {
          child.config.content = e.content
        }
      });
    }
  });
  // console.log(userComponents.value);
  userPages.value.forEach((item) => {
    if (item.id === pageID.value) {
      item.components = userComponents.value;
      const d = new Date();
      item.lastUpdate = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    }
  });
  window.localStorage.setItem("userPages", JSON.stringify(userPages.value));
};

const updateCSS = (e) => {
  userComponents.value.forEach((component, index) => {
    if (component._uid === e._uid) {
      component = e
    }
  });
  // console.log(userComponents.value);
  userPages.value.forEach((item) => {
    if (item.id === pageID.value) {
      item.components = userComponents.value;
      const d = new Date();
      item.lastUpdate = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    }
  });
  window.localStorage.setItem("userPages", JSON.stringify(userPages.value));
}

const toggleAdd = (e) => {
  showAdd.value = e
}

const addBlock = (pos, block) => {
  const name = block.replace(" ", "");
  const newBlockID = randID(10);
  // const reuseBlockID = randNum(5)
  let newBlock = {
    _uid: newBlockID,
    component: name,
    name: name,
    // reuseBlockID: reuseBlockID,
    config: {
      css: {
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      }
    },
    childBlock: [],
  };
  userComponents.value.splice(pos, 0, newBlock);
  userPages.value.forEach((item) => {
    if (item.id === pageID.value) {
      item.components = userComponents.value;
      const d = new Date();
      item.lastUpdate = `${d.getFullYear()}-${d.getMonth() + 1
        }-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    }
  });
  window.localStorage.setItem("userPages", JSON.stringify(userPages.value));
};

const deleteBlock = (id) => {
  const removeIndex = userComponents.value.map(item => item._uid).indexOf(id);
  openEdit.value = false
  if(removeIndex >= 0) {
    userComponents.value.splice(removeIndex, 1);
  }
  userPages.value.forEach((item) => {
    if (item.id === pageID.value) {
      item.components = userComponents.value;
    }
  });
  window.localStorage.setItem("userPages", JSON.stringify(userPages.value));
}

const reuseBlock = (pos, blockData) => {
  let block = JSON.parse(blockData);
  block._uid = randID(10);
  userComponents.value.splice(pos, 0, block);
  userPages.value.forEach((item) => {
    if (item.id === pageID.value) {
      item.components = userComponents.value;
      const d = new Date();
      item.lastUpdate = `${d.getFullYear()}-${d.getMonth() + 1
        }-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    }
  });
  window.localStorage.setItem("userPages", JSON.stringify(userPages.value));
};

const moveBlockUp = (id, index) => {
  if (index === 0) {
    alert("Already on top");
    return;
  }
  const element = userComponents.value[index];
  userComponents.value.splice(index, 1);
  userComponents.value.splice(index - 1, 0, element);
  userPages.value.forEach((item) => {
    if (item.id === pageID.value) {
      item.components = userComponents.value;
      const d = new Date();
      item.lastUpdate = `${d.getFullYear()}-${d.getMonth() + 1
        }-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    }
  });
  window.localStorage.setItem("userPages", JSON.stringify(userPages.value));
};

const moveBlockDown = (id, index) => {
  if (index === userComponents.value.length - 1) {
    alert("Already at bottom");
    return;
  }
  const element = userComponents.value[index];
  userComponents.value.splice(index, 1);
  userComponents.value.splice(index + 1, 0, element);
  userPages.value.forEach((item) => {
    if (item.id === pageID.value) {
      item.components = userComponents.value;
      const d = new Date();
      item.lastUpdate = `${d.getFullYear()}-${d.getMonth() + 1
        }-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    }
  });
  window.localStorage.setItem("userPages", JSON.stringify(userPages.value));
};

const randID = (len) => {
  var length = len;
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const randNum = (len) => {
  var length = len;
  var result = "#";
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const importData = (e) => {
  userComponents.value = JSON.parse(e);
  userPages.value.forEach((item) => {
    if (item.id === pageID.value) {
      item.components = JSON.parse(e);
      const d = new Date();
      item.lastUpdate = `${d.getFullYear()}-${d.getMonth() + 1
        }-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    }
  });
  window.localStorage.setItem("userPages", JSON.stringify(userPages.value));
};
</script>
<script>
export default {
  components: { ...Layouts },
};
</script>
<style lang="scss" scoped>
.my-pagebuilder {
  position: relative;
}

.add-block{
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-add{
  // display: block;
  // position: absolute;
  // transform: translateY(-50%) translateX(-50%);\
  height: 24px;
  width: 24px;
  z-index: 2;
  opacity: 1;
  color: #acacac;
  transform: rotate(0deg);
  font-size: inherit;
}
.btn-add:hover,.btn-add--active{
  transform: rotate(45deg) scale(1.2);
  color: rgb(48, 168, 48);
}
</style>
<style>
.editActive {
  border: 1.5px solid #18ed9a;
}
</style>