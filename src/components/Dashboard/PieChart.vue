<template>
  <apexchart type="pie" :options="chartOptions" :series="props.series" class="p-12"></apexchart>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps(['series'])
const chartOptions = ref({
  chart: {
    width: 380,
    type: 'pie'
  },
  labels: ['Completed', 'Draft', 'Expired', 'In-progress', 'Needs-Review', 'Sent'],
  fill: {
    colors: [
      'rgb(50, 195, 135)',
      'rgb(160, 160, 160)',
      'rgb(183, 75, 50)',
      'rgb(255, 205, 0)',
      'rgb(144, 79, 171)',
      'rgb(15, 169, 219)'
    ]
  },
  markers: {
    fillColors: [
      'rgb(50, 195, 135)',
      'rgb(160, 160, 160)',
      'rgb(183, 75, 50)',
      'rgb(255, 205, 0)',
      'rgb(144, 79, 171)',
      'rgb(15, 169, 219)'
    ]
  },
  legend: {
    labels: {
      colors: [
        'rgb(50, 195, 135)',
        'rgb(160, 160, 160)',
        'rgb(183, 75, 50)',
        'rgb(255, 205, 0)',
        'rgb(144, 79, 171)',
        'rgb(15, 169, 219)'
      ],
      useSeriesColors: false
    },
    markers: {
      fillColors: [
        'rgb(50, 195, 135)',
        'rgb(160, 160, 160)',
        'rgb(183, 75, 50)',
        'rgb(255, 205, 0)',
        'rgb(144, 79, 171)',
        'rgb(15, 169, 219)'
      ]
    }
  },

  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 150
        },
        legend: {
          position: 'bottom'
        }
      }
    }
  ]
})
</script>
<style scoped></style>
