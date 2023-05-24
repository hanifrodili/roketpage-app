<template lang="pug">
div
  v-btn.px-0.outlined-1(
    @click="dialog = true",
    variant="tonal",
    rounded="lg",
    color="info",
    height="100%",
    min-width="40px")
    v-icon(style="font-size: 24px") mdi-plus
  general-dialog-type-a(v-model="dialog", persistent)
    template(v-slot:title)
      p Add Customer
    template(v-slot:content)
      v-form(ref="form", fast-fail)
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
            v-select.mb-4(
              v-model="customerForm.page_slug",
              hide-details="auto",
              variant="outlined",
              :items="pages",
              item-title="title",
              item-value="slug",
              density="compact",
              placeholder="Select page"
              @update:model-value="attachProduct"
            )
        //- v-row
        //-   v-col.py-0(cols="12")
        //-     v-select(
        //-       v-if="selectedProduct.length < 1"
        //-       v-model="product",
        //-       hide-details="auto",
        //-       variant="outlined",
        //-       :items="products",
        //-       item-title="name",
        //-       item-value="id",
        //-       return-object,
        //-       density="compact",
        //-       placeholder="Select product",
        //-       @update:model-value="addProduct(product)")
        v-row
          v-col.py-0(cols="12")
            .d-flex.flex-row.justify-space-between.align-center.pa-2.px-md-5(
              v-for="(item, index) in selectedProduct",
              :key="item.id")
              p {{ item.name }}
              general-count-input-normal(
                v-model="selectedProduct[index].quantity",
                min="1",
              )
        
    template(v-slot:action)
      v-btn(@click="dialog = false", variant="text") Cancel
      v-btn(
        @click="addCustomer",
        variant="tonal",
        color="info",
        :loading="loading") Add
</template>

<script setup>
const emits = defineEmits(["addCustomer"]);

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

const company_id = ref("")

const customerForm = ref({
  name: "",
  phone: "",
  email: "",
  page_slug: null
});

const rules = ref({
  not_empty: [(val) => (val || "").length > 0 || "This field is required"],
});

onMounted(async () => {
  userStore.getUser()
  company_id.value = userStore.user.current_company.id
  await getProducts();
  await getPages();
});

// watch(dialog, (updatedDialog) => {
//   selectedProduct.value = [];
// });

// function addProduct(e) {
//   e.quantity = 0;
//   selectedProduct.value.push(e);
//   products.value = products.value.filter((prod) => prod.id != e.id);
//   product.value = null;
// }

// function removeProduct(e) {
//   selectedProduct.value = selectedProduct.value.filter(
//     (prod) => prod.id != e.id
//   );
//   const { quantity, ...obj } = e;
//   products.value.push(obj);
//   products.value.sort(function (a, b) {
//     return a.id - b.id;
//   });
// }

const getProducts = async () => {
  let { data: product, error, count } = await supabase
    .from('product')
    .select('*', { count: "exact" })
    .eq('company_id', company_id.value)
    .eq('published', true)

  products.value = product
}

const getPages = async () => {
  let { data: page, error, count } = await supabase
    .from('pages')
    .select('title, slug, products')
    .eq('company_id', company_id.value)
    // .eq('published', true)
  pages.value = page
}

const getProduct = (slug) => {
  const page = pages.value.find(x => x.slug === slug)
  let prod = []
  page.products.forEach(item => {
    prod.push(products.value.find(x => x.id === item))
  });
  return prod
}

const attachProduct = () => {
  if (customerForm.value.page_slug) {
    selectedProduct.value = getProduct(customerForm.value.page_slug)
    selectedProduct.value.quantity = 0
  }
}

const addCustomer = async () => {
  loading.value = true;
  const validation = await form.value.validate();
  if (!validation.valid) {
    return;
  }

  const product = []
  selectedProduct.value.forEach(prod => {
    product.push({
      id: prod.id,
      quantity: prod.quantity
    })
  });

  const resp = await supabase
    .from('customers')
    .insert([
      {
        created_at: 'now()',
        status: 'new',
        name: customerForm.value.name,
        phone: sanitizePhoneNumber(customerForm.value.phone),
        email: customerForm.value.email,
        page_slug: customerForm.value.page_slug,
        paid: false,
        company_id: company_id.value,
        products: product,
      }
    ])

  if (resp.status === 201) {
    emits('addCustomer')
  }
  form.value.reset();
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
</script>

<style lang="scss" scoped></style>
