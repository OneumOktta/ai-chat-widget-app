<script setup lang="ts">
  import { useApiKeyStore } from '~/stores/apiKey.store'

  const apiKeyStore = useApiKeyStore()

  const totalVisitors = computed(() => {
    return apiKeyStore.statistics?.totalChatsStarted || 0
  })
</script>

<template>
  <div class="flex h-full cursor-pointer items-center py-4 pl-8">
    <div
      class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-paleViolet"
    >
      <Icon name="ph:users-bold" class="h-8 w-8 text-white" />
    </div>

    <div class="ml-8 flex flex-col justify-center">
      <h3
        class="text-5xl font-medium leading-none text-light-text dark:text-dark-text"
      >
        {{ totalVisitors }}
      </h3>
      <p class="mt-2 text-base text-light-text/60 dark:text-dark-text/60">
        Новых посетителей
      </p>
    </div>
  </div>
</template>
