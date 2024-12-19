<script setup lang="ts">
  defineProps<{
    isOpen: boolean
  }>()

  const emit = defineEmits<{
    close: []
  }>()

  const showFeedbackModal = ref(false)
</script>

<template>
  <div>
    <div
      v-if="isOpen"
      class="absolute bottom-full left-0 z-[100] mb-2 w-full rounded-xl border border-light-text/5 bg-light-panels p-4 shadow-lg backdrop-blur-sm dark:border-dark-text/5 dark:bg-dark-panels/95 lg:bottom-8 lg:left-[125px] lg:mb-0 lg:w-[320px]"
    >
      <div class="space-y-1">
        <NuxtLink
          to="/panel/support"
          class="block rounded-lg px-4 py-2 text-sm text-light-text transition-colors hover:bg-light-text/5 dark:text-dark-text dark:hover:bg-dark-text/5"
          @click="emit('close')"
        >
          Справочный центр
        </NuxtLink>

        <button
          class="w-full rounded-lg px-4 py-2 text-left text-sm text-light-text transition-colors hover:bg-light-text/5 dark:text-dark-text dark:hover:bg-dark-text/5"
          @click="emit('close')"
        >
          Чат с поддержкой
        </button>

        <div
          class="flex items-center justify-between rounded-lg px-4 py-2 text-light-text transition-colors hover:bg-light-text/5 dark:text-dark-text dark:hover:bg-dark-text/5"
        >
          <span class="text-sm">Виджет поддержки</span>
          <label class="switch">
            <input type="checkbox" checked />
            <span class="slider"></span>
          </label>
        </div>

        <button
          class="w-full rounded-lg px-4 py-2 text-left text-sm text-light-text transition-colors hover:bg-light-text/5 dark:text-dark-text dark:hover:bg-dark-text/5"
          @click="showFeedbackModal = true"
        >
          Оставить отзыв
        </button>
      </div>
    </div>

    <!-- Модальное окно -->
    <FeedbackModal
      v-if="showFeedbackModal"
      @close="showFeedbackModal = false"
    />
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
