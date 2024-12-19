<script setup lang="ts">
  const emit = defineEmits<{
    close: []
  }>()

  const feedback = ref('')
</script>

<template>
  <div
    class="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4"
  >
    <div
      class="relative w-full max-w-2xl rounded-2xl bg-light-panels p-6 dark:bg-dark-panels sm:p-8"
    >
      <button
        class="absolute right-4 top-4 text-light-text/60 transition-colors hover:text-light-text dark:text-dark-text/60 dark:hover:text-dark-text sm:right-6 sm:top-6"
        @click="emit('close')"
      >
        <Icon name="material-symbols:close" class="h-6 w-6" />
      </button>

      <h2 class="mb-2 text-xl font-bold text-light-text dark:text-dark-text">
        Поделитесь своим отзывом
      </h2>

      <p class="mb-6 text-light-text/60 dark:text-dark-text/60">
        Сообщите нам, что вы думаете о сервисе Oneum и помогите нам его
        улучшить.
      </p>

      <textarea
        v-model="feedback"
        rows="4"
        class="mb-6 w-full rounded-xl border border-light-text/10 bg-transparent p-4 text-light-text outline-none transition-colors placeholder:text-light-text/40 focus:border-lightPink dark:border-dark-text/10 dark:text-dark-text dark:placeholder:text-dark-text/40"
        placeholder="Введите ваш отзыв..."
      />

      <div class="flex justify-end">
        <button
          class="rounded-xl bg-gradient-to-r from-lightPink to-lightBlue px-8 py-2.5 text-sm font-medium text-white shadow-lg transition-shadow hover:shadow-xl"
          @click="emit('close')"
        >
          Отправить
        </button>
      </div>
    </div>
  </div>
</template>
