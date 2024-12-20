<script setup lang="ts">
  import { useApiKeyStore } from '~/stores/apiKey.store'

  const apiKeyStore = useApiKeyStore()

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds.toFixed(0)} с`
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes} м ${remainingSeconds.toFixed(0)}с`
  }

  const stats = computed(() => {
    const data = apiKeyStore.statistics
    if (!data) return null

    const averageResponseTime =
      data.performance.averageResponseTime / data.performance.responseCount

    return {
      responses: data.performance.responseCount.toLocaleString('ru-RU'),
      avgResponseTime: formatTime(averageResponseTime),
      completedChats: data.totalChatsStarted.toLocaleString('ru-RU'),
      totalMessages: data.totalMessagesSent.toLocaleString('ru-RU'),
    }
  })
</script>

<template>
  <div class="flex flex-col gap-6 p-4">
    <div class="space-y-1">
      <h3 class="text-xl font-bold text-light-text dark:text-dark-text">
        Общая статистика
      </h3>
      <div class="text-xs text-light-text/40 dark:text-dark-text/40">
        ID ключа: {{ apiKeyStore.apiKeyInfo?.id }}
      </div>
    </div>

    <div v-if="stats" class="grid grid-cols-2 gap-6">
      <div class="flex flex-col gap-2">
        <span class="text-4xl font-medium text-light-text dark:text-dark-text">
          {{ stats.responses }}
        </span>
        <span class="text-sm text-light-text/60 dark:text-dark-text/60">
          Всего ответов
        </span>
      </div>

      <div class="flex flex-col gap-2">
        <span class="text-4xl font-medium text-light-text dark:text-dark-text">
          {{ stats.avgResponseTime }}
        </span>
        <span class="text-sm text-light-text/60 dark:text-dark-text/60">
          Среднее время ответа
        </span>
      </div>

      <div class="flex flex-col gap-2">
        <span class="text-4xl font-medium text-light-text dark:text-dark-text">
          {{ stats.completedChats }}
        </span>
        <span class="text-sm text-light-text/60 dark:text-dark-text/60">
          Чатов создано
        </span>
      </div>

      <div class="flex flex-col gap-2">
        <span class="text-4xl font-medium text-light-text dark:text-dark-text">
          {{ stats.totalMessages }}
        </span>
        <span class="text-sm text-light-text/60 dark:text-dark-text/60">
          Всего сообщений
        </span>
      </div>
    </div>
  </div>
</template>
