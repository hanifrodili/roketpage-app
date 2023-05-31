<template lang="pug">
.EditFormDialog
  general-dialog-type-a(v-model="dialog", persistent)
    template(#title)
      p Edit Form
    template(#content)
      div
        v-select.mb-5(
          v-model="pageForm.defaultPage",
          label="Set as Main Page",
          variant="outlined",
          hide-details="auto",
          density="compact"
          :items="boolOption"
          item-title="label"
          item-value="value"
          )
        v-text-field.mb-5(
          v-model="pageForm.slug",
          label="Site Url",
          variant="outlined",
          hide-details="auto",
          density="compact"
          disabled)
        v-text-field.mb-5(
          v-model="pageForm.title",
          label="Site Title",
          variant="outlined",
          hide-details="auto",
          density="compact"
          clearable)
        v-textarea.mb-5(
          v-model="pageForm.description",
          label="Site Description",
          variant="outlined",
          hide-details="auto",
          density="compact"
          clearable)
        //- v-checkbox.mb-1(v-model="hasForm", label="With form" density="compact" hide-details="auto")
        v-select.mb-5(
          v-model="pageForm.formType",
          label="Form Type",
          :items="formTypeList"
          hide-details="auto"
          density="compact"
          variant="outlined")
        v-select.mb-5(
          v-model="pageForm.products[0]",
          chips,
          label="Choose Product",
          :items="props.products"
          item-title="name"
          item-value="id"
          hide-details="auto"
          density="compact"
          variant="outlined")
        //- div(v-if="hasForm" )
        //- v-checkbox.mb-1(v-model="hasPayment", label="Allow payment" density="compact" hide-details="auto")
        v-select.mb-5(
          v-if="pageForm.formType === 'Payment'",
          v-model="pageForm.paymentOptions",
          chips,
          label="Choose Payment Channel",
          :items="paymentOptions"
          item-title="name"
          item-value="id"
          hide-details="auto"
          density="compact"
          multiple
          variant="outlined"
          closable-chips)
        //- v-checkbox.mb-1(v-model="hasShipping", label="Has shipping" density="compact" hide-details="auto")
        v-select.mb-5(
          v-if="pageForm.formType === 'Payment'",
          v-model="pageForm.shippingOptions",
          chips,
          label="Choose Shipping Options",
          :items="shippingList"
          item-title="courier_name"
          item-value="id"
          hide-details="auto"
          density="compact"
          multiple
          variant="outlined"
          closable-chips)
        div(v-if="pageForm.formType === 'Leads'",)
          p.font-weight-bold.mt-4.mb-1 Customer Info
          v-card.general-card
            v-card-text.pa-0
              template(v-for="(field, index) in formFields" :key="index")
                //- p {{ field }}
                sites-form-field(:field="field" @delete="deleteField(index)" @updateField="updateField")
                v-divider(v-if="index < formFields.length-1")
              sites-add-form-field.mt-3(@addField="addField")
    template(#action)
      v-spacer
      v-btn(variant="text", color="secondary", @click="dialog = false") Close
      v-btn(variant="tonal", color="info", @click="updateForm") Save
</template>

<script setup>
const supabase = useSupabaseAuthClient()
const snackbar = useSnackbar()

const props = defineProps({
  modelValue: Boolean,
  data: Object,
  products: Array
});
const emit = defineEmits(["update:modelValue","update"]);

const dialog = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

onMounted( async () => {
  await getShippings()
  await getFormField()
  await getPaymentChannel()
})

const pageProducts = ref([])
const pagePayments = ref([])
const pageShipping = ref([])
const formType = ref(null)
const products = ref([])
const shippingList = ref([])
const formFields = ref([])

const pageForm = ref({
  slug: props.data.slug,
  title: props.data.title,
  description: props.data.description,
  formType: props.data.formType,
  products: props.data.products,
  paymentOptions: props.data.paymentOptions,
  shippingOptions: props.data.shippingOptions,
  defaultPage: props.data.defaultPage
})

const formTypeList = ref([
  'Payment',
  'Leads',
])

const boolOption = ref([
  {
    label: "No",
    value: false,
  },
  {
    label: "Yes",
    value: true,
  },
])

const paymentOptions = ref([])

const getShippings = async () => {

  let { data: shipping_details, error } = await supabase
    .from('shipping_details')
    .select('*')
    .order('courier_name', { ascending: true })
    .eq('company_id', props.data.company_id)

  shippingList.value = shipping_details
}

const getPaymentChannel = async () => {

  let { data:toyyibpay } = await supabase
    .from('toyyibpay_gateway')
    .select('enabled')
    .eq('company_id', props.data.company_id)
    .single()

  if (toyyibpay.enabled) {
    paymentOptions.value.push(
      {
        id: 1,
        name: 'toyyibPay'
      }
    )
  }

  let { data: banks } = await supabase
    .from('bank_details')
    .select('enabled')
    .eq('company_id', props.data.company_id)
  
  if (banks.length) {
    paymentOptions.value.push(
      {
        id: 3,
        name: 'Bank Transfer'
      }
    )
  }

  paymentOptions.value.push(
    {
      id: 4,
        name: "Cash on Delivery",
    }
  )


  // {
  //   id: 3,
  //     name: "Bank Transfer",
  //       enabled: true
  // },
  // {
  //   id: 4,
  //     name: "Cash on Delivery",
  //       enabled: true
  // }
}

const getFormField = async () => {
  
  let { data: page_form, error } = await supabase
    .from('page_form')
    .select('*')
    .order('field_position', { ascending: true })
    .eq('company_id', props.data.company_id)
    .eq('page_slug', props.data.slug)

  formFields.value = page_form
}

const updateForm = async () => {
  if (pageForm.value.defaultPage) {
    await supabase
      .from('pages')
      .update(
        {
          defaultPage: false
        },
      )
      .eq('company_id', props.data.company_id)
  }
  const resp = await supabase
    .from('pages')
    .update(
      {
        title: pageForm.value.title,
        description: pageForm.value.description,
        formType: pageForm.value.formType,
        products: pageForm.value.products,
        paymentOptions: pageForm.value.paymentOptions,
        shippingOptions: pageForm.value.shippingOptions,
        defaultPage: pageForm.value.defaultPage
      },
    )
    .eq('id', props.data.id)

  // console.log(resp);

  if (resp.status === 204) {
    formFields.value.forEach(async (field, index) => {
      const resp = await supabase
        .from('page_form')
        .upsert(
          {
            id: field.id,
            company_id: props.data.company_id,
            page_slug: props.data.page_slug,
            field_name: field.field_name,
            field_position: index,
            field_type: field.field_type,
            field_option: field.field_option,
            enabled: field.enabled
          },
        )
    });

    emit('update')

    snackbar.add({
      type: 'success',
      text: `Page ${pageForm.value.title} updated !`
    })
  }

  if (resp.error) {
    snackbar.add({
      type: 'error',
      text: resp.error.message
    })
  }

  dialog.value = false
}

const addField = (e) => {
  let obj = e
  obj.enabled = true
  formFields.value.push(obj)
}

const updateField = (e) => {
  // console.log(e);
  formFields.value.forEach(field => {
    if (field.id === e.id) {
      field.field_name = e.field_name
      field.field_type = e.field_type
      field.field_option = e.field_option
    }
  });

  // console.log(formFields.value);
}

function deleteField(index) {
  formFields.value.splice(index, 1)
}
</script>

<style lang="scss" scoped></style>
