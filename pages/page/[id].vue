<template lang="pug">
div
  div(style="height:100vh" v-if="loading")
    general-lottie-loading
  div(v-else)
    template(v-for="(component, index) in userComponents" :key="component._uid")
      component(:is="component.component" :data="component" :pageId="pageID" :editMode="editMode")
    sites-components-page-form(:form="pageForm" :products="pageProducts" :company="company_id" :type="formType")
    p.text-center.pb-5(style="font-size:10px; color:#ababab") Powered by 
      span(style="font-size:12px; color:#7777777") RoketPage
      |.com
</template>

<script setup>
const route = useRoute();
const supabase = useSupabaseAuthClient()
// const userStore = useStoreUser()

const company_id = ref("")
const editMode = ref(false)
const userComponents = ref([]);
const pageID = ref("");
const pageTitle = ref("");
const pageForm = ref([])
const pageProducts = ref([])
const formType = ref('')
const loading = ref(true)

definePageMeta({
  layout: "nonav",
})

onMounted(async () => {
  pageID.value = route.params.id;
  // await userStore.getUser()
  // company_id.value = userStore.user.current_company.id
  await getPage()
});

const getPage = async () => {
  let { data: page, error, count } = await supabase
    .from('pages')
    .select('*, page_form(*)')
    // .eq('company_id', company_id.value)
    .eq('slug', pageID.value)
    .single()
  pageForm.value = page.page_form
  pageProducts.value = page.products
  formType.value = page.formType
  userComponents.value = page.components;
  pageTitle.value = page.title;
  company_id.value = page.company_id
  loading.value = false
}
</script>
<script>
import Layouts from "~/components/sites/components/layouts";
export default {
  components: { ...Layouts },
};
</script>

<style lang="scss" scoped></style>
