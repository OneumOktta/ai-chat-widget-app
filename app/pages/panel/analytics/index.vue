<script setup lang="ts">
  import {
    ArcElement,
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
  } from 'chart.js'
  import { Doughnut, Line } from 'vue-chartjs'

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
    ArcElement
  )
  definePageMeta({
    layout: 'panel',
  })

  const selectedPeriod = ref('week')
  const periods = [
    { value: 'day', label: 'День' },
    { value: 'week', label: 'Неделя' },
    { value: 'month', label: 'Месяц' },
    { value: 'year', label: 'Год' },
  ]

  const selectedPlatform = ref('all')
  const platforms = [
    { value: 'all', label: 'Все платформы' },
    { value: 'telegram', label: 'Telegram' },
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'vk', label: 'VK' },
  ]

  // Моковые данные для графиков
  const usageData = {
    labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    datasets: [
      {
        label: 'Запросы',
        data: [150, 230, 180, 290, 200, 140, 320],
        borderColor: '#8B5CF6',
        backgroundColor: '#8B5CF650',
        fill: true,
      },
    ],
  }

  const platformData = {
    labels: ['Telegram', 'WhatsApp', 'VK'],
    datasets: [
      {
        data: [45, 30, 25],
        backgroundColor: ['#0088cc', '#25D366', '#0077FF'],
      },
    ],
  }

  const tokensData = {
    labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    datasets: [
      {
        label: 'Использовано токенов',
        data: [5000, 7500, 6200, 8900, 7200, 4800, 9100],
        borderColor: '#EC4899',
        backgroundColor: '#EC489950',
        fill: true,
      },
    ],
  }
</script>

<template>
  <PanelContent>
    <div
      class="flex h-full flex-col rounded-2xl bg-light-panels dark:bg-dark-panels"
    >
      <div class="p-4 sm:p-6">
        <div
          class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <h1
            class="text-2xl font-bold text-light-text dark:text-dark-text sm:text-3xl md:text-4xl"
          >
            Аналитика
          </h1>
          <div class="flex flex-wrap gap-3">
            <select
              v-model="selectedPeriod"
              class="rounded-xl border border-light-text/10 bg-transparent px-4 py-2 text-sm text-light-text outline-none transition-colors hover:border-paleViolet dark:border-dark-text/10 dark:text-dark-text"
            >
              <option
                v-for="period in periods"
                :key="period.value"
                :value="period.value"
              >
                {{ period.label }}
              </option>
            </select>
            <select
              v-model="selectedPlatform"
              class="rounded-xl border border-light-text/10 bg-transparent px-4 py-2 text-sm text-light-text outline-none transition-colors hover:border-paleViolet dark:border-dark-text/10 dark:text-dark-text"
            >
              <option
                v-for="platform in platforms"
                :key="platform.value"
                :value="platform.value"
              >
                {{ platform.label }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div
        class="flex-1 overflow-auto p-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:p-6 [&::-webkit-scrollbar]:hidden"
      >
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="stat in [
              { label: 'Всего запросов', value: '1,520', change: '+12.5%' },
              { label: 'Активных чатов', value: '342', change: '+5.2%' },
              {
                label: 'Использовано токенов',
                value: '48,750',
                change: '+8.7%',
              },
            ]"
            :key="stat.label"
            class="rounded-xl border border-light-text/10 bg-light-panels p-4 dark:border-dark-text/10 dark:bg-dark-panels"
          >
            <h3 class="text-sm text-light-text/60 dark:text-dark-text/60">
              {{ stat.label }}
            </h3>
            <div class="mt-2 flex items-end justify-between">
              <span
                class="text-2xl font-bold text-light-text dark:text-dark-text"
              >
                {{ stat.value }}
              </span>
              <span
                class="text-sm font-medium text-emerald-500"
                :class="{
                  'text-emerald-500': stat.change.startsWith('+'),
                  'text-red-500': stat.change.startsWith('-'),
                }"
              >
                {{ stat.change }}
              </span>
            </div>
          </div>
        </div>

        <div class="mt-6 grid gap-6">
          <div
            class="rounded-xl border border-light-text/10 bg-light-panels p-4 dark:border-dark-text/10 dark:bg-dark-panels sm:p-6"
          >
            <h3
              class="mb-4 text-lg font-medium text-light-text dark:text-dark-text"
            >
              Использование по дням
            </h3>
            <div class="h-[300px]">
              <Line
                :data="usageData"
                :options="{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }"
              />
            </div>
          </div>

          <div class="grid gap-6 sm:grid-cols-2">
            <div
              class="rounded-xl border border-light-text/10 bg-light-panels p-4 dark:border-dark-text/10 dark:bg-dark-panels sm:p-6"
            >
              <h3
                class="mb-4 text-lg font-medium text-light-text dark:text-dark-text"
              >
                Распределение по платформам
              </h3>
              <div class="h-[300px]">
                <Doughnut
                  :data="platformData"
                  :options="{
                    responsive: true,
                    maintainAspectRatio: false,
                  }"
                />
              </div>
            </div>

            <div
              class="rounded-xl border border-light-text/10 bg-light-panels p-4 dark:border-dark-text/10 dark:bg-dark-panels sm:p-6"
            >
              <h3
                class="mb-4 text-lg font-medium text-light-text dark:text-dark-text"
              >
                Использование токенов
              </h3>
              <div class="h-[300px]">
                <Line
                  :data="tokensData"
                  :options="{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PanelContent>
</template>
