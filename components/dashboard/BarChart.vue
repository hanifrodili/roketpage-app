<template lang="pug">
Bar#my-chart-id(:options="chartOptions", :data="chartData")
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

const chartData = ref({
  labels: ["January", "February", "March"],
  datasets: [
    {
      label: "Orders",
      backgroundColor: "#13ED9A",
      data: [40, 20, 12],
    },
    {
      label: "Sales",
      backgroundColor: "#7E7E7E",
      data: [40, 12, 12],
    },
  ],
});

const chartOptions = ref({
  responsive: true,
});
</script>

<style lang="scss" scoped></style>
