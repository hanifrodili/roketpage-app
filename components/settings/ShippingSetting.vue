<template lang="pug">
div
  template(v-for="(shipping,index) in shippingList" :key="index")
    settings-item-shipping.py-2(:data="shipping" :couriers="couriers" @updated="getShippings" style="border-bottom:0.5px solid #ababab")
  v-btn.text-capitalize.my-4(variant="tonal" rounded size="small" color="info" @click="addShippingDialog = true")
    v-icon.mr-2 mdi-plus
    p Add Shipping
  general-dialog-type-a(v-model="addShippingDialog" :persistent="true")
    template( v-slot:title )
      p Add Shipping
    template( v-slot:content )
      v-form(ref="form" fast-fail)
        v-checkbox.mb-5(v-model="isCOD", label="Cash on Delivery (COD)" density="compact" hide-details="auto" @update:model-value="autoSetCourier" style="width:100%; max-width:fit-content")
        v-row(v-if="!isCOD")
          v-col(cols="12")
            v-select(v-model="courierForm.courier_name" variant="outlined" label="Courier Name" :items="couriers" item-title="name" item-value="name" density="compact" hide-details="auto")
        v-row(v-if="!isCOD")
          v-col(cols="12")
            v-select(v-model="courierForm.region" variant="outlined" label="Delivery Region" :items="regions" item-title="name" item-value="code" density="compact" hide-details="auto")
        v-row(v-if="isCOD")
          v-col(cols="6")
            v-combobox(v-model="state" :items="postcode.getStates()" variant="outlined" label="State" density="compact" hide-details="auto" single-line)
          v-col(cols="6")
            v-combobox(v-model="city" :items="postcode.getCities(state || '')" variant="outlined" label="City/Town" density="compact" hide-details="auto" @update:model-value="getLocation" single-line clearable)
          v-col(cols="12")
            v-combobox(v-model="courierForm.area" :items="locations" variant="outlined" label="COD Area" density="compact" hide-details="auto" multiple chips closable-chips)
        //- v-row
          v-col(cols="12")
            v-textarea(v-model="courierForm.description" variant="outlined" label="Description" density="compact" hide-details="auto" :rules="rules.not_empty")
        v-row.my-4(v-if="!isCOD"  v-for="(rate, index) in courierForm.rates" :key="index" dense)
          v-col(cols="4")
            v-text-field(v-model="courierForm.rates[index].min" variant="outlined" :label="`Min (${isCOD ? 'KM' : 'KG'})`" density="compact" hide-details="auto")
          v-col(cols="4")
            v-text-field(v-model="courierForm.rates[index].max" variant="outlined" :label="`Max (${isCOD ? 'KM' : 'KG'})`" density="compact" hide-details="auto")
          v-col(cols="4")
            v-text-field(v-model="courierForm.rates[index].rate" variant="outlined" label="Rate (RM)" density="compact" hide-details="auto")
        v-row.my-4(v-if="isCOD" dense)
          v-col(cols="4")
            v-text-field(v-model="courierForm.rates[0].rate" variant="outlined" label="Rate (RM)" density="compact" hide-details="auto" @update:model-value="courierForm.rates[0].min = 0, courierForm.rates[0].max = 0")
        v-btn.text-capitalize.my-1(v-if="!isCOD" variant="tonal" rounded size="small" color="info" prepend-icon="mdi-plus" @click="()=>{courierForm.rates.push({min:null, max:null, rate:null})}") Add Rate
    template( v-slot:action )
      v-btn( @click="addShippingDialog = false, form.reset()" variant="text") Cancel
      v-btn( @click="addShipping" variant="tonal" color="info" :loading="loading") Add

      
</template>

<script setup>
import couriers from '@/src/courierList.json'
import postcode from "@/src/postcode";
import axios from 'axios'

const supabase = useSupabaseAuthClient();
const snackbar = useSnackbar()
const userStore = useStoreUser()

const addShippingDialog = ref(false)
const shippingList = ref([])
const onEdit = ref(null)
const loading = ref(false)
const company_id = ref('')
const isCOD = ref(false)
const locations = ref([])
const state = ref(null)
const city = ref(null)
const regions = ref([
  {
    name: "Semenanjung Malaysia",
    code: "sm"
  },
  {
    name: "Sabah & Sarawak",
    code: "ss"
  }
])

const form = ref(null)

const courierForm = ref({
  courier_name:  null,
  description: '',
  region: null,
  area: [],
  rates: [
    {
      min: 0.1,
      max: 1,
      rate: 0,
    }
  ]
})

const rules = ref(
  {
    not_empty: [(val) => (val || '').length > 0 || 'This field is required']
  }
)

onMounted(async () => {
  userStore.getUser()
  company_id.value = userStore.user.current_company.id
  await getShippings()
  state.value = null
  city.value = null
})

const getShippings = async () => {

  let { data: shipping_details, error } = await supabase
    .from('shipping_details')
    .select('*')
    .order('courier_name', { ascending: true })
    .eq('company_id', company_id.value)

  shippingList.value = shipping_details
}

const getLocation = async ()=>{
  let { data: location, error } = await supabase
    .from('location')
    .select("location")
    .ilike('city', `%${city.value}%`)
    .ilike('state', `%${state.value}%`)
  
  // console.log(location);
  locations.value = []
  location.forEach(item => {
    if (!locations.value.includes(item.location)) {
      locations.value.push(item.location)
    }
  });
}

const addShipping = async () => {
  loading.value = true
  const validation = await form.value.validate()
  if (!validation.valid) {
    loading.value = false
    return
  }

  // console.log(userStore.user);
  // console.log(courierForm.value);

  const resp = await supabase
    .from('shipping_details')
    .insert([
      {
        company_id: company_id.value,
        courier_name: courierForm.value.courier_name,
        description: courierForm.value.description,
        region: courierForm.value.region,
        area: courierForm.value.area,
        rates: courierForm.value.rates,
        enabled: true
      },
    ])

  // console.log(resp);

  if (resp.status === 201) {
    snackbar.add({
      type: 'success',
      text: `${courierForm.value.courier_name} added !`
    })

    getShippings()
  }

  if (resp.error) {
    snackbar.add({
      type: 'error',
      text: resp.error.message
    })
  }
  form.value.reset()
  addShippingDialog.value = false
  loading.value = false
}

const autoSetCourier = ()=>{
  if (isCOD.value) {
    courierForm.value.courier_name = 'Cash on Delivery'
    courierForm.value.region = ''
  }else{
    courierForm.value.courier_name = null
    courierForm.value.region = null
  }
}
</script>
<style lang="scss" scoped></style>