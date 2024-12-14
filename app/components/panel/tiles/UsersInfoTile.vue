<script setup lang="ts">
  import { useApiKeyStore } from '~/stores/apiKey.store'

  const apiKeyStore = useApiKeyStore()

  const users = computed(() => {
    const data = apiKeyStore.users
    if (!data) return null

    return {
      owner: data.owner,
      managers: data.managers.slice(0, 3),
    }
  })
</script>

<template>
  <div class="flex flex-col gap-4 p-4">
    <h3 class="text-xl font-bold text-light-text dark:text-dark-text">
      Пользователи
    </h3>

    <div v-if="users" class="flex flex-col gap-6">
      <div class="flex flex-col gap-2">
        <span
          class="text-sm font-medium text-light-text/60 dark:text-dark-text/60"
        >
          Владелец
        </span>
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-full bg-paleViolet" />
          <div class="flex flex-col">
            <span
              class="text-sm font-medium text-light-text dark:text-dark-text"
            >
              {{ users.owner.name }}
            </span>
            <span class="text-xs text-light-text/60 dark:text-dark-text/60">
              {{ users.owner.email }}
            </span>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <span
          class="text-sm font-medium text-light-text/60 dark:text-dark-text/60"
        >
          Менеджеры
        </span>
        <div class="flex flex-col gap-3">
          <div
            v-for="manager in users.managers"
            :key="manager.id"
            class="flex items-center gap-3"
          >
            <div class="h-10 w-10 rounded-full bg-paleViolet/50" />
            <div class="flex flex-col">
              <span
                class="text-sm font-medium text-light-text dark:text-dark-text"
              >
                {{ manager.name }}
              </span>
              <span class="text-xs text-light-text/60 dark:text-dark-text/60">
                {{ manager.email }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
