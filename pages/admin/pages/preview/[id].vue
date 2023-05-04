<template lang="pug">
div
  template(v-for="(component, index) in userComponents" :key="component._uid")
    component(:is="component.component" :data="component" :pages="userPages" :pageId="pageID" :editMode="editMode")
  .d-flex.flex-column(style="position:fixed; bottom: 10px; right:10px; gap:10px")
    a(@click="$router.push(`/admin/pages/builder/${pageID}`)")
      v-btn(style="background-color: rgb(255,255,255, 30%); backdrop-filter: blur(4px);" @click="" variant="outlined" icon="mdi-pencil" size="x-small")
    a(@click="$router.push(`/admin/pages`)")
      v-btn(style="background-color: rgb(255,255,255, 30%); backdrop-filter: blur(4px);" @click="" variant="outlined" icon="mdi-home" size="x-small")
    
</template>

<script setup>
const route = useRoute();

const editMode = ref(false)
const userPages = ref([]);
const userComponents = ref([]);
const pageID = ref("");
const pageTitle = ref("");

definePageMeta({
  middleware: 'auth',
  name: 'preview'
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
});
</script>
<script>
import Layouts from "~/components/sites/components/layouts";
export default {
  components: { ...Layouts },
};
</script>

<style lang="scss" scoped></style>
