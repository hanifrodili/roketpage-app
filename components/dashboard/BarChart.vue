<template lang="pug">
Bar(
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  )
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const chartData = ref({
  labels: ['January', 'February', 'March'],
  datasets: [
    { 
      label: 'Data One',
      backgroundColor: '#f87979',
      data: [40, 20, 12]
    }
  ]
})

const chartOptions = ref({
  responsive: true
})
</script>

<style lang="scss" scoped></style>
