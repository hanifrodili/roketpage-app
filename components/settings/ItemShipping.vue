<template lang="pug">
div
  v-card(variant="text")
    v-card-text.pa-1()
      div.d-flex.flex-row.align-center.align-start
        div.d-flex.flex-row.flex-grow-1
          p.font-weight-bold {{ data.courier_name }}
            span.text-uppercase.font-weight-regular(v-if="data.region" style="color:#ababab")  | {{ data.region }}
          
        div.d-flex.flex-row.align-center(style="gap:10px")
          v-btn.text-capitalize(variant="tonal" rounded size="x-small" color="info" @click="openManage = true" icon="mdi-file-cog-outline")
          v-switch(
            v-model="courierForm.enabled"
            inset
            hide-details="auto"
            color="primary"
            :value='true'
            density="compact"
            @update:modelValue="toggleShipping"
            )
  general-dialog-type-b(v-model="openManage" :persistent="true")
    template( v-slot:title )
      p Edit Shipping
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
            v-combobox(v-model="state" :items="postcode.getStates()" variant="outlined" label="State" density="compact" hide-details="auto" @update:model-value="getLocation" single-line)
          v-col(cols="6")
            v-combobox(v-model="city" :items="postcode.getCities(state || '')" variant="outlined" label="City/Town" density="compact" hide-details="auto" @update:model-value="getLocation" single-line)
          v-col(cols="12")
            v-combobox(v-model="courierForm.area" :items="locations" variant="outlined" label="COD Area" density="compact" hide-details="auto" multiple chips closable-chips)
        v-row
          v-col(cols="12")
            v-textarea(v-model="courierForm.description" variant="outlined" label="Description" density="compact" hide-details="auto" :rules="rules.not_empty")
        v-row.my-4(v-for="(rate, index) in courierForm.rates" :key="index" dense)
          v-col(cols="4")
            v-text-field(v-model="courierForm.rates[index].min" variant="outlined" :label="`Min (${isCOD ? 'KM' : 'KG'})`" density="compact" hide-details="auto")
          v-col(cols="4")
            v-text-field(v-model="courierForm.rates[index].max" variant="outlined" :label="`Max (${isCOD ? 'KM' : 'KG'})`" density="compact" hide-details="auto")
          v-col(cols="4")
            v-text-field(v-model="courierForm.rates[index].rate" variant="outlined" label="Rate (RM)" density="compact" hide-details="auto")
        v-btn.text-capitalize.my-4(variant="tonal" rounded size="small" color="info" prepend-icon="mdi-plus" @click="()=>{courierForm.rates.push({min:null, max:null, rate:null})}") Add Rate
    template( v-slot:action )
      v-btn( @click="openManage = false" variant="text") Cancel
      v-btn( @click="updateShipping" variant="tonal" color="info") Update
</template>

<script setup>
import postcode from "@/src/postcode";

const supabase = useSupabaseAuthClient();
const snackbar = useSnackbar()

const props = defineProps(['data','couriers'])
const emit = defineEmits(['updated'])

const openManage = ref(false)
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

const rules = ref(
  {
    not_empty: [(val) => (val || '').length > 0 || 'This field is required']
  }
)

const courierForm = ref({
  courier_name: props.data.courier_name,
  description: props.data.description,
  region: props.data.region,
  area: props.data.area,
  rates: props.data.rates,
  enabled: props.data.enabled
})

onMounted( async () => {
  if(props.data.region !== 'sm' && props.data.region !== 'ss'){
    isCOD.value = true
  }
})

const getLocation = async ()=>{
  let { data:location, error } = await supabase
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

const toggleShipping = async () => {
  let resp = await supabase
    .from('shipping_details')
    .update({ enabled: courierForm.value.enabled })
    .eq('id', props.data.id)
}

const updateShipping = async () => {
  
  const resp = await supabase
    .from('shipping_details')
    .update(
      {
        courier_name: courierForm.value.courier_name,
        description: courierForm.value.description,
        region: courierForm.value.region,
        area: courierForm.value.area,
        rates: courierForm.value.rates
      }
    )
    .eq('id', props.data.id)

    if (resp.status === 204) {
    snackbar.add({
      type: 'success',
      text: `${courierForm.value.courier_name} updated!`
    })
  }

  if (resp.error) {
    snackbar.add({
      type: 'error',
      text: resp.error.message
    })
  }
  emit('updated')
  openManage.value = false
}

const autoSetCourier = () => {
  if (isCOD.value) {
    courierForm.value.courier_name = 'Cash on Delivery'
    courierForm.value.region = ''
  }else{
    courierForm.value.courier_name = props.data.courier_name
    courierForm.value.region = props.data.region
  }
}
</script>
<style lang="scss" scoped>
:deep(.v-img__img) {
  object-position: left;
}
</style>