<template lang="pug">
.mypage-builder
  sites-builder-menu-bar(@import="importData" :pageID="pageID" :pageData="userComponents" :pageTitle="pageTitle" style="position:fixed; width:100%")
  div.pt-15
    template(v-for="(component, index) in userComponents" :key="component._uid")
      component(:is="component.component" :data="component" :pages="userPages" :pageId="pageID" :editMode="editMode" @updateContent="updateContent")
      //- .menuBtn.d-flex.flex-row()
      //-   sites-builder-speed-menu.ml-auto(style="margin-top:-55px; margin-right: 20px")
      .d-flex.flex-column.align-center.justify-center(
        style="height: 50px; position: relative")
        hr(
          style="border: 0.5px dashed rgb(var(--v-theme-secondary)); width: 100%")
        sites-builder-add-block(
          :position="index",
          @addBlock="addBlock",
          :blockList="Layouts")
    .pt-10(v-if="userComponents.length === 0")
      hr(style="border: 0.5px dashed rgb(var(--v-theme-secondary))")
      sites-builder-add-block(
        :position="-1",
        @addBlock="addBlock",
        :blockList="Layouts")
</template>
<script setup>
import { useDisplay } from "vuetify";
import Layouts from "~/components/sites/components/layouts";

const { width } = useDisplay();
const route = useRoute();
const editMode = ref(true)

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
  // console.log("Components:", userComponents.value);
});

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

const addBlock = (pos, block) => {
  const name = block.replace(" ", "");
  const newBlockID = randID(10);
  // const reuseBlockID = randNum(5)
  let newBlock = {
    _uid: newBlockID,
    component: name,
    name: name,
    // reuseBlockID: reuseBlockID,
    config: {},
    childBlock: [],
  };
  userComponents.value.splice(pos, 0, newBlock);
  userPages.value.forEach((item) => {
    if (item.id === pageID.value) {
      item.components = userComponents.value;
      const d = new Date();
      item.lastUpdate = `${d.getFullYear()}-${
        d.getMonth() + 1
      }-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    }
  });
  window.localStorage.setItem("userPages", JSON.stringify(userPages.value));
};

const reuseBlock = (pos, blockData) => {
  let block = JSON.parse(blockData);
  block._uid = randID(10);
  userComponents.value.splice(pos, 0, block);
  userPages.value.forEach((item) => {
    if (item.id === pageID.value) {
      item.components = userComponents.value;
      const d = new Date();
      item.lastUpdate = `${d.getFullYear()}-${
        d.getMonth() + 1
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
      item.lastUpdate = `${d.getFullYear()}-${
        d.getMonth() + 1
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
      item.lastUpdate = `${d.getFullYear()}-${
        d.getMonth() + 1
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
      item.lastUpdate = `${d.getFullYear()}-${
        d.getMonth() + 1
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
.menuBtn {
  width: 100%;
  opacity: 0.5;
}

.menuBtn:hover {
  opacity: 1;
}
</style>
