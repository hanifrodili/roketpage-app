<template lang="pug">
div
  v-btn(icon="mdi-file-edit-outline", variant="text", size="small" @click="dialog=true")
  general-dialog-type-a(v-model="dialog", persistent)
    template(v-slot:title)
      p Edit Customer
    template(v-slot:content)
      v-form(ref="form", fast-fail)
        v-row
          v-col.py-0(cols="12")
            v-select.mb-4(
              v-model="customerForm.status",
              hide-details="auto",
              variant="outlined",
              label="Status",
              density="compact",
              :items="statusList"
              item-title="label"
              item-value="value"
              chips
              )
        v-row
          v-col.py-0(cols="12")
            v-text-field.mb-4(
              v-model="customerForm.name",
              hide-details="auto",
              variant="outlined",
              label="Name",
              density="compact",
              :rules="rules.not_empty")
        v-row
          v-col.py-0(cols="12")
            v-text-field.mb-4(
              v-model="customerForm.phone",
              hide-details="auto",
              variant="outlined",
              label="Phone",
              density="compact",
              type="tel",
              prefix="+60"
              :rules="rules.not_empty")
        v-row
          v-col.py-0(cols="12")
            v-text-field.mb-4(
              v-model="customerForm.email",
              hide-details="auto",
              variant="outlined",
              label="Email",
              density="compact",
              type="email",
              :rules="rules.not_empty")
        v-row
          v-col.py-0(cols="12")
            .d-flex.flex-row.justify-space-between.align-center.pa-2.px-md-5(
              v-for="(item, index) in customerForm.products",
              :key="item.id")
              p {{ getProduct(item.id).name }}
              general-count-input-normal(
                v-model="customerForm.products[index].quantity",
                min="1"
              )

    template(v-slot:action)
      v-btn(@click="dialog = false", variant="text") Cancel
      v-btn(
        @click="updateCustomer",
        variant="tonal",
        color="info",
        :loading="loading") Save
</template>

<script setup>
const emits = defineEmits(["updateCustomer"]);
const props = defineProps(["customer", "productList"])

const supabase = useSupabaseAuthClient()
const userStore = useStoreUser()
const snackbar = useSnackbar()

const products = ref([]);
const pages = ref([]);
const product = ref(null);
const selectedProduct = ref([]);
const quantity = ref(null);
const dialog = ref(false);
const loading = ref(false);
const form = ref(null);
const statusList = ref([
  {
    label: "New",
    value: "new",
  },
  {
    label: "Follow up",
    value: "follow up",
  },
  {
    label: "Rejected",
    value: "rejected",
  },
  {
    label: "Closed",
    value: "closed",
  },
])
const company_id = ref("")

const customerForm = ref({
  name: '',
  phone: '',
  email: '',
  status: '',
  paid: false,
  products: []
});

const rules = ref({
  not_empty: [(val) => (val || "").length > 0 || "This field is required"],
});

onMounted(async () => {
  userStore.getUser()
  company_id.value = userStore.user.current_company.id
  customerForm.value = {
    name: props.customer.name,
    phone: removePhonePrefix(props.customer.phone),
    email: props.customer.email,
    status: props.customer.status,
    paid: props.customer.paid,
    products: props.customer.products
  }
});

const getProduct = (id) => {
  return props.productList.find(x => x.id === id)
}

const updateCustomer = async () => {
  loading.value = true;
  const validation = await form.value.validate();
  if (!validation.valid) {
    return;
  }

  const resp = await supabase
    .from('customers')
    .update([
      {
        updated_at: 'now()',
        status: customerForm.value.status,
        name: customerForm.value.name,
        phone: sanitizePhoneNumber(customerForm.value.phone),
        email: customerForm.value.email,
        paid: customerForm.value.paid,
        company_id: company_id.value,
        products: customerForm.value.products,
      }
    ])
    .eq('id', props.customer.id)

  if (resp.status === 204) {
    emits('updateCustomer')
  }
  dialog.value = false;
  loading.value = false;
}

const sanitizePhoneNumber = (phoneNumber) => {
  // Remove any non-digit characters
  const sanitizedNumber = phoneNumber.replace(/\D/g, '');

  // Check if the number starts with "+60"
  if (sanitizedNumber.startsWith('+60')) {
    return sanitizedNumber;
  } else if (sanitizedNumber.startsWith('0')) {
    // Remove the leading '0' and add "+60" to the beginning of the number
    return '+60' + sanitizedNumber.slice(1);
  } else {
    // Add "+60" to the beginning of the number
    return '+60' + sanitizedNumber;
  }
}

const removePhonePrefix = (phoneNumber) => {
  // Check if the number starts with "+60"
  if (phoneNumber.startsWith('+60')) {
    // Remove the "+60" prefix
    return phoneNumber.slice(3);
  } else if (phoneNumber.startsWith('0')) {
    // Remove the leading '0'
    return phoneNumber.slice(1);
  } else {
    return phoneNumber;
  }
}
</script>

<style lang="scss" scoped></style>
