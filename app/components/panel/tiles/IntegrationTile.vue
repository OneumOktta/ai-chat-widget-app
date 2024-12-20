<script setup lang="ts">
  import { ref } from 'vue'

  interface Props {
    name: string
    icon: string
    username?: string
    apiKey?: string
  }

  defineProps<Props>()
  const isActive = ref(false)
</script>

<template>
  <div
    class="rounded-xl border border-light-text/10 bg-light-panels p-4 dark:border-dark-text/10 dark:bg-dark-panels sm:rounded-2xl sm:p-6"
  >
    <div class="mb-3 flex items-center justify-between sm:mb-4">
      <div class="flex items-center gap-2 sm:gap-3">
        <div
          class="flex h-8 w-8 items-center justify-center rounded-full bg-lightBlue sm:h-10 sm:w-10"
        >
          <Icon :name="icon" class="h-5 w-5 text-white sm:h-6 sm:w-6" />
        </div>
        <span
          class="text-base font-medium text-light-text dark:text-dark-text sm:text-lg"
        >
          {{ name }}
        </span>
      </div>
      <label class="switch">
        <input v-model="isActive" type="checkbox" />
        <span class="slider" />
      </label>
    </div>

    <template v-if="username">
      <div class="space-y-1.5 sm:space-y-2">
        <div>
          <span
            class="text-xs text-light-text/60 dark:text-dark-text/60 sm:text-sm"
          >
            Имя пользователя:
          </span>
          <span
            class="ml-1 text-xs text-light-text dark:text-dark-text sm:ml-2 sm:text-sm"
          >
            {{ username }}
          </span>
        </div>
        <div>
          <span
            class="text-xs text-light-text/60 dark:text-dark-text/60 sm:text-sm"
          >
            API key:
          </span>
          <span
            class="ml-1 text-xs text-light-text dark:text-dark-text sm:ml-2 sm:text-sm"
          >
            {{ apiKey || '••••••••' }}
          </span>
        </div>
      </div>
    </template>
    <template v-else>
      <a
        href="#"
        class="text-xs text-paleViolet underline hover:text-lightPink sm:text-sm"
      >
        Инструкция по подключению
      </a>
    </template>
  </div>
</template>

<style scoped>
  .switch {
    @apply relative inline-block h-5 w-9;
  }

  .switch input {
    @apply h-0 w-0 opacity-0;
  }

  .slider {
    @apply absolute inset-0 cursor-pointer rounded-full bg-light-text/10 transition-all dark:bg-dark-text/10;
  }

  .slider:before {
    content: '';
    @apply absolute bottom-1 left-1 h-3 w-3 rounded-full bg-light-text transition-all dark:bg-dark-text;
  }

  input:checked + .slider {
    @apply bg-paleViolet;
  }

  input:checked + .slider:before {
    @apply translate-x-4 bg-white;
  }
</style>
