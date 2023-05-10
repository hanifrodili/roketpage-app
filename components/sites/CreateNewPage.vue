<template lang="pug">
.CreatePageDialog
  //- v-card.new-card.d-flex(@click="formFields = defaultFormFields, dialogAdd=true, newPageID = `page-${randID(5)}`")
  //-   v-card-text.text-center.ma-auto
  //-     .mt-6
  //-       v-icon.text-secondary mdi-plus
  //-       p.mb-0.text-secondary(style="font-size: 12px") {{ $t("create") }}
  v-btn.px-0.outlined-1( @click="formFields = defaultFormFields, dialogAdd=true, newPageID = `page-${randID(5)}`" variant="tonal" rounded="lg" color="info" height="100%" min-width="40px" )
    v-icon(style="font-size:24px") mdi-plus 
  //- add dialog
  general-dialog-type-a(v-model="dialogAdd", persistent)
    template(#title)
      | {{ $t("createnewpage") }}
    template(#content)
      div
        v-text-field.mb-5(
          v-model="newPageID",
          label="Site Url",
          variant="outlined",
          hide-details="auto",
          density="compact"
          clearable)
        v-text-field.mb-5(
          v-model="newPageTitle",
          label="Site Title",
          variant="outlined",
          hide-details="auto",
          density="compact"
          clearable)
        v-textarea.mb-5(
          v-model="newPageDescription",
          label="Site Description",
          variant="outlined",
          hide-details="auto",
          density="compact"
          clearable)
        //- v-checkbox.mb-1(v-model="hasForm", label="With form" density="compact" hide-details="auto")
        v-select.mb-5(
          v-model="formType",
          label="Form Type",
          :items="formTypeList"
          hide-details="auto"
          density="compact"
          variant="outlined")
        v-select.mb-5(
          v-model="pageProducts",
          chips,
          label="Choose Product",
          :items="products"
          item-title="name"
          item-value="id"
          hide-details="auto"
          density="compact"
          variant="outlined")
        //- div(v-if="hasForm" )
        //- v-checkbox.mb-1(v-model="hasPayment", label="Allow payment" density="compact" hide-details="auto")
        v-select.mb-5(
          v-if="formType === 'Payment'",
          v-model="pagePayments",
          chips,
          label="Choose Payment Options",
          :items="paymentOptions"
          item-title="name"
          item-value="id"
          hide-details="auto"
          density="compact"
          multiple
          variant="outlined")
        //- v-checkbox.mb-1(v-model="hasShipping", label="Has shipping" density="compact" hide-details="auto")
        v-select.mb-5(
          v-if="formType === 'Payment'",
          v-model="pageShipping",
          chips,
          label="Choose Shipping Options",
          :items="shippingOptions"
          item-title="name"
          item-value="id"
          hide-details="auto"
          density="compact"
          multiple
          variant="outlined")
        div(v-if="formType === 'Leads'",)
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
const supabase = useSupabaseAuthClient()
const snackbar = useSnackbar()
const userStore = useStoreUser()
const router = useRouter()

const company_id = ref('')
const dialogAdd = ref(false)
const newPageID = ref('')
const newPageTitle = ref('')
const newPageDescription = ref('')
const pageProducts = ref([])
const pagePayments = ref([])
const pageShipping = ref([])
const formType = ref(null)
const products = ref([])
const formTypeList = ref([
  'Payment',
  'Leads',
])
const paymentOptions = ref([
  {
    id: 1,
    name: "FPX",
  },
  {
    id: 2,
    name: "Bank Transfer",
  },
  {
    id: 3,
    name: "Cash on Delivery",
  }
])
const shippingOptions = ref([
  {
    id: 1,
    name: "PosLaju",
  },
  {
    id: 2,
    name: "NinjaVan",
  },
  {
    id: 3,
    name: "J&T",
  }
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

onMounted(async () => {
  userStore.getUser()
  company_id.value = userStore.user.current_company.id
  getProducts()
})

const getProducts = async () => {
  let { data: product, error, count } = await supabase
    .from('product')
    .select('*', { count: "exact" })
    .eq('company_id', company_id.value)
    .eq('published', true)

  products.value = product
}

const createNewPage = async () => {
  let id = newPageID.value.split(" ").join("-");
  id = id.split(".").join("-");
  const title = newPageTitle.value;
  const description = newPageDescription.value;
  const products = [pageProducts.value]

  const defaultComponent = [
    {
      "_uid": randID(10),
      "component": "OneColumn",
      "name": "OneColumn",
      "config": {
        "css": {
          "padding": {
            "top": 0,
            "right": 0,
            "bottom": 0,
            "left": 0
          },
          "backgroundColor": "#ffffff"
        }
      },
      "childBlock": [
        {
          "_uid": randID(10),
          "component": "HeadingH1",
          "name": "HeadingH1",
          "config": {
            "content": "Tajuk Laman Anda",
            "css": {
              "padding": {
                "top": 0,
                "right": 0,
                "bottom": 0,
                "left": 0
              },
              "font": {
                "family": "Open Sans",
                "size": "32px",
                "weight": "revert",
                "color": "black",
              }
            }
          }
        }
      ]
    },
    {
      "_uid": randID(10),
      "component": "OneColumn",
      "name": "OneColumn",
      "config": {
        "css": {
          "padding": {
            "top": 0,
            "right": 0,
            "bottom": 0,
            "left": 0
          },
          "backgroundColor": "#ffffff"
        }
      },
      "childBlock": [
        {
          "_uid": randID(10),
          "component": "Paragraph",
          "name": "Paragraph",
          "config": {
            "content": "Nikmati pengalaman unik minum kopi dengan Biji Kopi Single Origin Premium kami! Kopi asli dari satu kawasan sahaja, yang memberikan rasa yang terbaik. Biji kopi kami dipilih dengan teliti, dipanggang dengan penuh kasih sayang, dan dihasilkan dalam kuantiti terhad setiap musim. Rasa kopi kami yang unik dan istimewa pasti memuaskan penikmat kopi sejati. Dapatkan sekarang dan rasai kenikmatan kopi yang premium ini!",
            "css": {
              "padding": {
                "top": 0,
                "right": 0,
                "bottom": 0,
                "left": 0
              },
              "font": {
                "family": "Open Sans",
                "size": "16px",
                "weight": "revert",
                "color": "black",
              }
            }
          }
        }
      ]
    },
    {
      "_uid": randID(10),
      "component": "OneColumn",
      "name": "OneColumn",
      "config": {
        "css": {
          "padding": {
            "top": 0,
            "right": 0,
            "bottom": 0,
            "left": 0
          },
          "backgroundColor": "#ffffff"
        }
      },
      "childBlock": [
        {
          "_uid": randID(10),
          "component": "Image",
          "name": "Image",
          "config": {
            "content": "/img/your-image.svg",
            "css": {
              "padding": {
                "top": 0,
                "right": 0,
                "bottom": 0,
                "left": 0
              },
              "font": {
                "family": "Open Sans",
                "size": "16px",
                "weight": "revert",
                "color": "black",
              }
            }
          }
        }
      ]
    },
    {
      "_uid": randID(10),
      "component": "OneColumn",
      "name": "OneColumn",
      "config": {
        "css": {
          "padding": {
            "top": 0,
            "right": 0,
            "bottom": 0,
            "left": 0
          },
          "backgroundColor": "#ffffff"
        }
      },
      "childBlock": [
        {
          "_uid": randID(10),
          "component": "CtaButton",
          "name": "CtaButton",
          "config": {
            "content": "",
            "css": {
              "padding": {
                "top": 0,
                "right": 0,
                "bottom": 0,
                "left": 0
              },
              "font": {
                "family": "Open Sans",
                "size": "16px",
                "weight": "revert",
                "color": "black",
              }
            }
          }
        }
      ]
    },
    {
      "_uid": randID(10),
      "component": "OneColumn",
      "name": "OneColumn",
      "config": {
        "css": {
          "padding": {
            "top": 0,
            "right": 0,
            "bottom": 0,
            "left": 0
          },
          "backgroundColor": "#ffffff"
        }
      },
      "childBlock": [
        {
          "_uid": randID(10),
          "component": "Paragraph",
          "name": "Paragraph",
          "config": {
            "content": "Anda pasti terpikat dengan Biji Kopi Single Origin Premium kami! Ditanam dengan penuh kasih sayang di ladang terpilih, biji kopi kami dihasilkan dari satu varieti kopi tunggal yang unik dan mempunyai ciri-ciri yang istimewa. Anda akan teruja dengan kepekatannya yang kaya dan aroma yang memukau. Kami memastikan kualiti yang terbaik dengan memproses biji kopi secara tradisional dengan tangan dan menjalani proses pengeringan yang berhemah karbon. Nikmatilah secawan kopi yang memuaskan dan nikmati pengalaman minum kopi yang tidak terlupakan dengan Biji Kopi Single Origin Premium kami!",
            "css": {
              "padding": {
                "top": 0,
                "right": 0,
                "bottom": 0,
                "left": 0
              },
              "font": {
                "family": "Open Sans",
                "size": "16px",
                "weight": "revert",
                "color": "black",
              }
            }
          }
        }
      ]
    }
  ]

  // console.log(formFields.value);

  const resp = await supabase
    .from('pages')
    .insert([
      {
        company_id: company_id.value,
        slug: id,
        title: title,
        description: description,
        formType: formType.value,
        products: products,
        paymentOptions: pagePayments.value,
        shippingOptions: pageShipping.value,
        components: defaultComponent
      },
    ])

  // console.log(resp);

  if (resp.status === 201) {
    formFields.value.forEach(async (field) => {
      await supabase
        .from('page_form')
        .insert([
          {
            company_id: company_id.value,
            page_slug: id,
            field_name: field.name,
            field_type: field.type,
            field_option: field.options,
            published: field.enabled
          },
        ])
    });

    snackbar.add({
      type: 'success',
      text: `Page ${title} created !`
    })
  }

  if (resp.error) {
    snackbar.add({
      type: 'error',
      text: resp.error.message
    })
  }
  newPageID.value = ''
  newPageTitle.value = ''
  dialogAdd.value = false
  router.push(`/admin/pages/builder/${id}`)
}

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

function updateField(e) {
  let obj = e
  obj.enabled = true
  formFields.value.push(obj)
}

function deleteField(index) {
  formFields.value.splice(index, 1)
}
</script>

<style lang="scss" scoped>
.new-card{
  border: 1px solid rgb(var(--v-theme-secondary)) !important;
  /* background-color: transparent; */
  box-shadow: none !important;
  border-radius: 8px;
  height: 100%;
}

.new-card:hover {
  background-color: rgba(var(--v-theme-primary),0.2);
}
</style>
