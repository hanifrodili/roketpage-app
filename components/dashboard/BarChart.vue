<template lang="pug">
div( style="width:100%; height:200px")
  Bar(v-if="!loading" id="barchart" :options="options", :data="chartData")
    //- p {{ leads.length }}
  div(v-else)
    div.skeleton.skeleton-text.mb-5( style="height:150px")
    div.skeleton.skeleton-text( style="height:30px")
</template>

<script setup>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const props = defineProps(['leads', 'orders', 'range'])

onMounted(() => {
  setTimeout(() => {
    chartData.value.datasets[1].data = getCount(props.orders)
    chartData.value.datasets[0].data = getCount(props.leads)
  }, 1000);
})

watch(
  () => props.range,
  () => {
    loading.value = true
    setTimeout(() => {
      chartData.value.datasets[1].data = getCount(props.orders)
      chartData.value.datasets[0].data = getCount(props.leads)
    }, 500);
  }
)

const loading = ref(true)
const chartData = ref({
  labels: [],
  datasets: [
    {
      label: "Leads",
      backgroundColor: "#666666",
      borderColor: "#666666",
      data: [],
    },
    {
      label: "Orders",
      backgroundColor: "#13ED9A",
      borderColor: "#13ED9A",
      data: [],
    },
  ],
});

const options = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    xAxis: {
      ticks: {
        display: false,
      },
      title: {
        display: true,
        text: "",
        align: "end",
      },
    },
  },
});

const getCount = (data) => {
  loading.value = true
  let dataList = []
  chartData.value.labels = []
  const currentDate = new Date();
  
  if (props.range === 1) {
    options.value.scales.xAxis.title.text = "Time (24h)"
    for (let hour = 23; hour >= 0; hour--) {
      let targetHour = new Date(currentDate.getTime() - hour * 60 * 60 * 1000);
      chartData.value.labels.push(targetHour.getHours())
      const filteredDataCount = data.filter(obj => {
        let date = new Date(obj.created_at)
        return date.getHours() === targetHour.getHours()
      }).length
      dataList.push(filteredDataCount)
    }
  }

  if (props.range > 1) {
    options.value.scales.xAxis.title.text = "Date"
    for (let day = props.range-1; day >= 0; day--) {
      let targetDay = new Date(currentDate.getTime() - day * 24 * 60 * 60 * 1000);
      let fTargetDay = `${targetDay.getDate()}/${targetDay.getMonth()+1}`
      chartData.value.labels.push(fTargetDay)
      let filteredDataCount = 0
      for (let index = 0; index < data.length; index++) {
        const obj = data[index];
        let date = new Date(obj.created_at)
        let fDate = `${date.getDate()}/${date.getMonth()+1}`
        
        if(fDate === fTargetDay){
          filteredDataCount += 1
        }
      }
      dataList.push(filteredDataCount)
    }
  }
  
  setTimeout(() => {
    loading.value = false
  }, 500);
  return dataList
}
</script>

<style lang="scss" scoped></style>
