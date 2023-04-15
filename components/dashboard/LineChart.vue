<template lang="pug">
Line#my-chart-id(:options="options", :data="data")
</template>

<script setup>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = ref({
  labels: [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
  ],
  datasets: [
    {
      label: "Orders",
      backgroundColor: "#13ED9A",
      borderColor: "#13ED9A",
      data: [
        0, 1, 1, 0, 0, 0, 0, 0, 5, 5, 3, 2, 0, 5, 4, 2, 6, 10, 0, 2, 8, 3, 5, 1,
      ],
    },
    {
      label: "Leads",
      backgroundColor: "#666666",
      borderColor: "#666666",
      data: [
        0, 2, 1, 0, 0, 0, 0, 0, 10, 9, 6, 5, 0, 8, 6, 4, 10, 18, 5, 10, 11, 10,
        5, 3,
      ],
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
        text: "Time (24 Hours)",
        align: "end",
      },
    },
  },
});
</script>

<style lang="scss" scoped></style>
