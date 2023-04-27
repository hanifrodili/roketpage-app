<template lang="pug">
.page-content
  sites-filter-sites.mb-4
  v-row()
    v-col(cols="6" md="3", v-for="page in userPages", :key="page.id")
      v-card.d-flex.flex-column.justify-space-between.page-card()
        v-card-text.pa-4.pb-0
          .d-flex.flex-column.justify-space-between(style="height: 100%")
            p.font-weight-bold(style="font-size:15px") {{ page.title }}
            p.mb-0(style="font-size:10px; line-height: 14px; color:#767676")
              i {{ $t("lastupdate") }}: {{ fTime(page.lastUpdate) }}
        v-card-actions.pa-2
          v-spacer
          v-btn.mx-1(
            @click="dialogDelete = true",
            icon="mdi-trash-can",
            color="red",
            size="small")
          //- p.mb-0 |
          //- router-link(:to="{ name: 'MyPageBuilderPreview', params: { id: page.id }}" target="_blank")
            v-btn.mx-1(icon color="success" small)
              v-icon mdi-eye-outline
          a(@click="$router.push(`/admin/pages/builder/${page.id}`)")
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
    v-col(cols="6" md="3")
      v-card.new-card.d-flex(@click="formFields = defaultFormFields, dialogAdd=true, newPageID = `page-${randID(5)}`")
        v-card-text.text-center.ma-auto
          .mt-6
            v-icon.text-secondary mdi-plus
            p.mb-0.text-secondary(style="font-size: 12px") {{ $t("create") }}

  //- dialogs
  //- delete dialog
  v-dialog(v-model="dialogDelete", scrollable, persistent, max-width="300px")
    v-card
      v-card-text.pa-4
        div
          p Confirm Delete?
          p.font-weight-bold This action can't be undo
            
      v-card-actions
        v-spacer
        v-btn(variant="text", color="secondary", @click="deletePage(page.id)") Yes
        v-btn.elevation-0(
          color="red",
          variant="tonal",
          @click="dialogDelete = false") No

  //- add dialog
  general-dialog-type-a(v-model="dialogAdd", persistent)
    template(#title)
      | {{ $t("createnewpage") }}
    template(#content)
      v-container
        v-text-field(
          v-model="newPageID",
          label="Site Url",
          variant="outlined",
          hide-details="auto",
          density="compact"
          clearable)
        v-text-field.mt-3(
          v-model="newPageTitle",
          label="Site Title",
          variant="outlined",
          hide-details="auto",
          density="compact"
          clearable)
        v-textarea.my-3(
          v-model="newPageDescription",
          label="Site Description",
          variant="outlined",
          hide-details="auto",
          density="compact"
          clearable)
        v-checkbox.mb-1(v-model="hasForm", label="With form" density="compact" hide-details="auto")
        v-select.mb-3(
          v-if="hasForm",
          v-model="pageProducts",
          chips,
          label="Choose Product",
          :items="products"
          item-title="name"
          item-value="id"
          hide-details="auto"
          density="compact"
          variant="outlined")
        div(v-if="hasForm" )
          v-checkbox.mb-1(v-model="hasPayment", label="Allow payment" density="compact" hide-details="auto")
          v-select.mb-3(
            v-if="hasPayment",
            v-model="pagePayments",
            chips,
            label="Choose Payment Options",
            :items="paymentOptions"
            hide-details="auto"
            density="compact"
            multiple
            variant="outlined")
          v-checkbox.mb-1(v-model="hasShipping", label="Has shipping" density="compact" hide-details="auto")
          v-select.mb-3(
            v-if="hasShipping",
            v-model="pageShipping",
            chips,
            label="Choose Shipping Options",
            :items="shippingOptions"
            hide-details="auto"
            density="compact"
            multiple
            variant="outlined")
          p.font-weight-bold.mt-4.mb-1 Customer Info
          v-card.general-card
            v-card-text.pa-0
              template(v-for="(field, index) in formFields" :key="index")
                //- p {{ field }}
                sites-form-field(:field="field" @delete="deleteField(index)")
                v-divider(v-if="index < formFields.length-1")
              sites-add-form-field.mt-3(@updateField="updateField")
    template(#action)
      v-spacer
      v-btn(variant="text", color="secondary", @click="dialogAdd = false") Close
      v-btn(variant="tonal", color="info", @click="createNewPage") {{ $t("create") }}
</template>

<script setup>
const dialogAdd = ref(false)
const dialogDelete = ref(false)
const newPageID = ref('')
const newPageTitle = ref('')
const newPageDescription = ref('')
const pageProducts = ref([])
const pagePayments = ref([])
const pageShipping = ref([])
const hasForm = ref(true)
const hasPayment = ref(false)
const hasShipping = ref(false)
const userPages = ref([])
const products = ref([])
const paymentOptions = ref([
  'FPX',
  'Bank Transfer',
  'Cash on Delivery'
])
const shippingOptions = ref([
  'PosLaju',
  'NinjaVan',
  'J&T',
])
const defaultFormFields = ref([
  {
    name: 'name',
    type: 'text',
    options: null,
    enabled: true
  },
  {
    name: 'phone',
    type: 'tel',
    options: null,
    enabled: true
  },
  {
    name: 'email',
    type: 'email',
    options: null,
    enabled: true
  }
])
const formFields = ref([])
const company_id = ref('')

const router = useRouter()
const supabase = useSupabaseAuthClient()
const userStore = useStoreUser()

definePageMeta({
  middleware: 'auth',
  name: 'pages'
})

onMounted(async () => {
  const savedPages = JSON.parse(window.localStorage.getItem('userPages'))
  if (savedPages === null) {
    window.localStorage.setItem("userPages", JSON.stringify(userPages.value));
  } else {
    userPages.value = savedPages;
  }

  userStore.getUser()
  company_id.value = userStore.user.current_company.id

  let { data: product, error, count } = await supabase
    .from('product')
    .select('*', { count: "exact" })
    .eq('company_id', company_id.value)
    .eq('published', true)

  products.value = product
})

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

const createNewPage = () => {
  let id = newPageID.value.split(" ").join("-");
  id = id.split(".").join("-");
  const title = newPageTitle.value;
  const description = newPageDescription.value;
  console.log(hasForm.value);
  console.log(pageProducts.value);
  const d = new Date()
  let newpage = {}
  newpage['id'] = id
  newpage['title'] = title
  newpage['description'] = description
  newpage['hasForm'] = hasForm.value
  newpage['hasPayment'] = hasPayment.value
  newpage['hasShipping'] = hasShipping.value
  newpage['products'] = pageProducts.value
  newpage['paymentOptions'] = pagePayments.value
  newpage['shippingOptions'] = pageShipping.value
  newpage['lastUpdate'] = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
  newpage['components'] = [
    {
      "_uid": randID(10),
      "component": "OneColumn",
      "name": "OneColumn",
      "config": {},
      "childBlock": [
        {
          "_uid": randID(10),
          "component": "HeadingH1",
          "name": "HeadingH1",
          "config": {
            "content": "Biji Kopi Premium"
          }
        }
      ]
    },
    {
      "_uid": randID(10),
      "component": "OneColumn",
      "name": "OneColumn",
      "config": {},
      "childBlock": [
        {
          "_uid": randID(10),
          "component": "Paragraph",
          "name": "Paragraph",
          "config": {
            "content": "Nikmati pengalaman unik minum kopi dengan Biji Kopi Single Origin Premium kami! Kopi asli dari satu kawasan sahaja, yang memberikan rasa yang terbaik. Biji kopi kami dipilih dengan teliti, dipanggang dengan penuh kasih sayang, dan dihasilkan dalam kuantiti terhad setiap musim. Rasa kopi kami yang unik dan istimewa pasti memuaskan penikmat kopi sejati. Dapatkan sekarang dan rasai kenikmatan kopi yang premium ini!"
          }
        }
      ]
    },
    {
      "_uid": randID(10),
      "component": "OneColumn",
      "name": "OneColumn",
      "config": {},
      "childBlock": [
        {
          "_uid": randID(10),
          "component": "Image",
          "name": "Image",
          "config": {}
        }
      ]
    },
    {
      "_uid": randID(10),
      "component": "OneColumn",
      "name": "OneColumn",
      "config": {},
      "childBlock": [
        {
          "_uid": randID(10),
          "component": "CtaButton",
          "name": "CtaButton",
          "config": {}
        }
      ]
    },
    {
      "_uid": randID(10),
      "component": "OneColumn",
      "name": "OneColumn",
      "config": {},
      "childBlock": [
        {
          "_uid": randID(10),
          "component": "Paragraph",
          "name": "Paragraph",
          "config": {
            "content": "Anda pasti terpikat dengan Biji Kopi Single Origin Premium kami! Ditanam dengan penuh kasih sayang di ladang terpilih, biji kopi kami dihasilkan dari satu varieti kopi tunggal yang unik dan mempunyai ciri-ciri yang istimewa. Anda akan teruja dengan kepekatannya yang kaya dan aroma yang memukau. Kami memastikan kualiti yang terbaik dengan memproses biji kopi secara tradisional dengan tangan dan menjalani proses pengeringan yang berhemah karbon. Nikmatilah secawan kopi yang memuaskan dan nikmati pengalaman minum kopi yang tidak terlupakan dengan Biji Kopi Single Origin Premium kami!"
          }
        }
      ]
    }
  ]

  userPages.value.push(newpage)
  window.localStorage.setItem('userPages', JSON.stringify(userPages.value))
  newPageID.value = ''
  newPageTitle.value = ''
  dialogAdd.value = false
  router.push(`/admin/pages/builder/${id}`)
}

const deletePage = (id) => {
  userPages.value = userPages.value.filter((x) => x.id !== id);
  window.localStorage.setItem("userPages", JSON.stringify(userPages.value));
  dialogDelete.value = false;
};

function fTime(datetime) {
  const date = new Date(datetime);
  const options = { timeZone: 'Asia/Kuala_Lumpur', day: '2-digit', month: '2-digit', year: 'numeric',  hour12: true, hour: '2-digit', minute: '2-digit' };
  const formattedTime = date.toLocaleTimeString('en-MY', options);

  return formattedTime
}

function updateField(e){
  let obj = e
  obj.enabled = true
  formFields.value.push(obj)
}

function deleteField(index) {
  formFields.value.splice(index, 1)
}
</script>
<style scoped>
a {
  text-decoration: none;
}

.new-card, .page-card {
  border: 1px solid rgb(var(--v-theme-secondary)) !important;
  /* background-color: transparent; */
  box-shadow: none !important;
  border-radius: 8px;
  height: 100%;
}

.new-card:hover {
  background-color: rgb(var(--v-theme-primary));
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
