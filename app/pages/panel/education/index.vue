<script setup>
  import DropdownFilter from '~/pages/panel/education/DropdownFilter.vue'
  import EducationCard from '~/pages/panel/education/EducationCard.vue'
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
        <img src="/left.svg" alt="" />
        <h1 class="text-3xl font-bold">Обучение</h1>
      </div>
      <div
        class="mr-[86px] w-1/4 rounded-2xl border border-purple-300 px-7 py-2 hover:border-[#3F00A2]"
      >
        <p class="mb-1 text-sm text-gray-500">Ваш прогресс</p>
        <div class="relative h-2 w-full rounded-full bg-gray-200">
          <div
            class="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
            style="width: 20%"
          ></div>
        </div>
        <span class="text-xs text-gray-600">20% Новичок</span>
      </div>
    </div>

    <!-- Фильтры -->
    <div class="flex items-start justify-between gap-4 p-6 px-[86px]">
      <!-- Список 1 -->
      <DropdownFilter title="Уровень сложности" :options="difficultyOptions" />

      <!-- Список 2 -->
      <DropdownFilter title="Время изучения" :options="timeOptions" />

      <!-- Список 3 -->
      <DropdownFilter title="Прогресс" :options="progressOptions" />
    </div>

    <!-- Grid карточек -->
    <div class="grid grid-cols-1 gap-6 px-[86px] md:grid-cols-2 lg:grid-cols-3">
      <EducationCard v-for="n in 6" :key="n" />
    </div>
  </PanelContent>
</template>
