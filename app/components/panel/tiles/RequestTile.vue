<script setup lang="ts">
  import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
  } from 'chart.js'
  import { Bar } from 'vue-chartjs'
  import { useApiKeyStore } from '~/stores/apiKey.store'

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  )

  const apiKeyStore = useApiKeyStore()

  const chartData = computed(() => {
    if (!apiKeyStore.hourlyStats?.hours) return null

    const lastTenHours = apiKeyStore.hourlyStats.hours.slice(-10)

    return {
      labels: lastTenHours.map((hour) => `${hour.hour}:00`),
      datasets: [
        {
          label: 'Количество запросов',
          data: lastTenHours.map((hour) => hour.requestsCount),
          backgroundColor: '#A393FC',
          borderRadius: 8,
          maxBarThickness: 40,
        },
      ],
    }
  })

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#E5E7EB20',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  }
</script>

<template>
  <div class="flex flex-col p-4">
    <h3 class="mb-4 text-xl font-bold text-light-text dark:text-dark-text">
      Аналитика по запросам в чаты
    </h3>
    <div class="h-[324px]">
      <Bar
        v-if="chartData"
        :data="chartData"
        :options="chartOptions"
        class="h-full w-full"
      />
    </div>
  </div>
</template>
