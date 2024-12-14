<script setup lang="ts">
  import {
    ArcElement,
    Chart as ChartJS,
    Legend,
    Title,
    Tooltip,
  } from 'chart.js'
  import { Doughnut } from 'vue-chartjs'
  import { useApiKeyStore } from '~/stores/apiKey.store'

  ChartJS.register(ArcElement, Title, Tooltip, Legend)

  const apiKeyStore = useApiKeyStore()

  const chartData = computed(() => {
    if (!apiKeyStore.statistics?.messages) return null

    const { bot, human, consultant } = apiKeyStore.statistics.messages

    return {
      labels: ['Бот', 'Пользователь', 'Консультант'],
      datasets: [
        {
          data: [bot, human, consultant],
          backgroundColor: ['#A393FC', '#CBB2FF', '#E5E7EB'],
          borderWidth: 0,
          borderRadius: 4,
        },
      ],
    }
  })

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
    },
  }
</script>

<template>
  <div class="flex flex-col p-4">
    <h3 class="mb-4 text-xl font-bold text-light-text dark:text-dark-text">
      Распределение сообщений
    </h3>
    <div class="h-[302px]">
      <Doughnut
        v-if="chartData"
        :data="chartData"
        :options="chartOptions"
        class="h-full w-full"
      />
    </div>
  </div>
</template>
