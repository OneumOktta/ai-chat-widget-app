<script setup>
  import EducationCard from './EducationCard.vue'
  definePageMeta({
    layout: 'panel',
  })
  // Опции для каждого списка
  const difficultyOptions = ['Легкий', 'Средний', 'Сложный']
  const timeOptions = ['30 минут', 'Час', 'Два часа']
  const progressOptions = ['Начато', 'В процессе', 'Завершенно']
</script>

<template>
  <PanelContent>
    <!-- Заголовок -->
    <div class="mb-6 flex items-center justify-between">
      <div class="flex items-center gap-10">
        <Icon name="heroicons:arrow-left" class="h-6 w-6" />
        <h1 class="text-3xl font-bold">Обучение</h1>
      </div>
      <div
        class="w-80 rounded-xl border border-light-text/5 bg-light-panels p-4 transition-colors hover:border-lightPink dark:border-dark-text/5 dark:bg-dark-panels"
      >
        <p class="mb-1 text-sm text-light-text/60 dark:text-dark-text/60">
          Ваш прогресс
        </p>
        <div
          class="relative h-2 w-full overflow-hidden rounded-full bg-light-text/5 dark:bg-dark-text/5"
        >
          <div
            class="h-2 rounded-full bg-gradient-to-br from-lightPink to-lightBlue"
            style="width: 20%"
          ></div>
        </div>
        <span class="text-xs text-light-text/40 dark:text-dark-text/40">
          20% Новичок
        </span>
      </div>
    </div>

    <!-- Фильтры -->
    <div class="mb-6 flex items-start gap-4">
      <!-- Список 1 -->
      <DropdownFilter title="Уровень сложности" :options="difficultyOptions" />

      <!-- Список 2 -->
      <DropdownFilter title="Время изучения" :options="timeOptions" />

      <!-- Список 3 -->
      <DropdownFilter title="Прогресс" :options="progressOptions" />
    </div>

    <!-- Grid карточек -->
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <EducationCard v-for="n in 6" :key="n" />
    </div>
  </PanelContent>
</template>
