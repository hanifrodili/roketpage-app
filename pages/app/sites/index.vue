<template lang="pug">
.builder-home.mx-auto.page-content(style="max-width:1240px;")
  h2.pa-0.mb-3 {{ $t('pagelist') }}
  v-row.ma-0
    v-col.px-1.py-2(cols="6" md="3" sm="4" v-for="page in userPages" :key="page.id")
      v-card.d-flex.flex-column.justify-space-between(flat style="height:100%")
        v-card-text.pa-4.pb-0
          div.d-flex.flex-column.justify-space-between(style="height:100%")
            h3 {{page.title}}
            p.mb-0(style="font-size:12px; line-height:15px")
              i {{ $t('lastupdate') }}:
              br
              |{{page.lastUpdate}}
        v-card-actions.pa-2
          v-spacer
          v-btn.mx-1(@click="dialogDelete=true" icon="mdi-trash-can" color="red" size="small")
          //- p.mb-0 |
          //- router-link(:to="{ name: 'MyPageBuilderPreview', params: { id: page.id }}" target="_blank")
            v-btn.mx-1(icon color="success" small)
              v-icon mdi-eye-outline
          a(@click="$router.push(`sites/builder/${page.id}`)")
            v-btn.mx-1(icon="mdi-pencil" color="primary" size="small")
        v-dialog(v-model="dialogDelete" scrollable persistent max-width="300px")
          v-card()
            v-card-text.pa-4
              div
                p Confirm Delete?
                p.font-weight-bold This action can't be undo
            v-card-actions.pa-4
              v-spacer
              v-btn(variant="text" color="secondary" @click="deletePage(page.id)") Yes
              v-btn.elevation-0(color="red" variant="tonal" @click="dialogDelete=false") No
    v-col.px-1.py-2(cols="6" md="3" sm="4")
      v-card.new-card.elevation-0.d-flex(@click="dialogAdd=true, newPageID = `site-${randID(5)}`" style="height:100%")
        v-card-text.text-center.ma-auto
          div.mt-6
            v-icon.text-secondary mdi-plus
            p.mb-0.text-secondary(style="font-size:12px") {{ $t('create') }}
  v-dialog(v-model="dialogAdd" scrollable persistent max-width="500px")
    v-card()
      v-card-title.d-flex.flex-row.justify-space-between
        | {{ $t('createnewpage') }}
        v-btn(color="secondary" variant="plain" icon="mdi-close" @click="dialogAdd = false")
      v-card-text.pa-4
        v-container()
          v-text-field(v-model="newPageID" label="Site Url" variant="outlined" hide-details="auto" clearable)
          v-text-field.mt-3(v-model="newPageTitle" label="Site Title" variant="outlined" hide-details="auto" clearable)
          v-textarea.mt-3(v-model="newPageDescription" label="Site Description" variant="outlined" hide-details="auto" clearable)
          v-checkbox(v-model="withForm" label="With form")
          v-select(
            v-if="withForm" 
            v-model="newPageProducts"
            chips
            label="Choose Product "
            :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
            multiple
            variant="outlined"
          )
            
      v-card-actions
        v-spacer
        v-btn(variant="text" color="secondary" @click="dialogAdd=false") Close
        v-btn(variant="tonal" color="primary" @click="createNewPage") {{ $t('create') }}
          
</template>

<script setup>
const dialogAdd = ref(false)
const dialogDelete = ref(false)
const newPageID = ref('')
const newPageTitle = ref('')
const newPageDescription = ref('')
const newPageProducts = ref([])
const withForm = ref(true)
const userPages = ref([])

const router = useRouter();

onMounted(() => {
  const savedPages = JSON.parse(window.localStorage.getItem('userPages'))
  if (savedPages === null) {
    window.localStorage.setItem('userPages', JSON.stringify(userPages.value))
  } else {
    userPages.value = savedPages
  }

  const browserID = window.localStorage.getItem('browserID')
  if (browserID == null || browserID == '') {
    window.localStorage.setItem('browserID', 'browser-' + randID(4))
  }
})

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

const createNewPage = () => {
  let id = newPageID.value.split(" ").join("-")
  id = id.split(".").join("-")
  const title = newPageTitle.value
  const description = newPageDescription.value
  let products = []
  console.log(withForm.value);
  console.log(newPageProducts.value);
  if (withForm.value) {
    products = newPageProducts.value
  }
  const d = new Date()
  let newpage = {}
  newpage['id'] = id
  newpage['title'] = title
  newpage['description'] = description
  newpage['products'] = products
  newpage['lastUpdate'] = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
  newpage['components'] = []
  userPages.value.push(newpage)
  window.localStorage.setItem('userPages', JSON.stringify(userPages.value))
  newPageID.value = ''
  newPageTitle.value = ''
  dialogAdd.value = false
  router.push(`/sites/builder/${id}`)
}

const deletePage = (id) => {
  userPages.value = userPages.value.filter((x) => x.id !== id)
  window.localStorage.setItem('userPages', JSON.stringify(userPages.value))
  dialogDelete.value = false
}
</script>
<style scoped>
a {
  text-decoration: none;
}

.new-card {
  border: 2px solid rgb(var(--v-theme-secondary)) !important;
  background-color: transparent;
}

.new-card:hover {
  background-color: rgba(0, 0, 0, 0.4);
}

/*:deep(.v-text-field--filled>.v-input__control>.v-input__slot) {
  background: #F7F7F7 !important;
  border: 1px solid #eaeaea !important;
  border-radius: 4px;
  max-height: 48px;
  min-height: 48px;
  padding-left: 16px;
}

:deep(.v-text-field.v-input--has-state>.v-input__control>.v-input__slot) {
  border: 1px solid red !important;
}

:deep(.v-text-field--filled:not(.v-text-field--single-line) input) {
  margin-top: 14px;
}

:deep(.v-text-field--filled .v-label) {
  top: 14px !important;
  color: #C1C1C1;
}

 :deep(.v-text-field--filled .v-label--active) {
  transform: translateY(-10px) scale(0.75);
  color: #C1C1C1;
}

:deep(.theme--light.v-input input),
.theme--light.v-input textarea {
  color: #2B2525;
  font-weight: 600 !important;
  font-size: 15px !important;
  line-height: 24px !important;
}

:deep(.v-input--has-state.error--text) {
  color: red;
} */
</style>