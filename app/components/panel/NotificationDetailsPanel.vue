<script setup lang="ts">
  defineProps<{
    isOpen: boolean
  }>()

  const emit = defineEmits<{
    close: []
  }>()
</script>

<template>
  <div
    v-if="isOpen"
    class="absolute bottom-full left-0 z-[100] mb-2 w-full translate-y-4 rounded-xl border border-light-text/5 bg-light-panels shadow-lg backdrop-blur-sm dark:border-dark-text/5 dark:bg-dark-panels/95 sm:w-[500px] lg:bottom-8 lg:left-[525px] lg:mb-0 lg:h-[calc(100vh-theme(spacing.40))] lg:w-[600px]"
  >
    <div class="flex h-full flex-col p-3 sm:p-4">
      <div class="mb-4 flex items-center justify-between sm:mb-8">
        <h2
          class="text-2xl font-medium text-light-text dark:text-dark-text sm:text-3xl"
        >
          Технические работы
        </h2>
        <button
          class="text-xs text-light-text/60 transition-colors hover:text-lightPink dark:text-dark-text/60 dark:hover:text-lightPink sm:text-sm"
          @click="emit('close')"
        >
          Закрыть
        </button>
      </div>

      <div class="flex-1 space-y-4 sm:space-y-6">
        <div>
          <h3
            class="mb-2 text-xs font-medium text-light-text/60 dark:text-dark-text/60 sm:text-sm"
          >
            Статус
          </h3>
          <p class="text-xs text-light-text dark:text-dark-text sm:text-base">
            Плановые технические работы
          </p>
        </div>

        <div>
          <h3
            class="mb-2 text-xs font-medium text-light-text/60 dark:text-dark-text/60 sm:text-sm"
          >
            Дата и время
          </h3>
          <p class="text-xs text-light-text dark:text-dark-text sm:text-base">
            25 марта 2024, с 02:00 до 04:00 (МСК)
          </p>
        </div>

        <div>
          <h3
            class="mb-2 text-xs font-medium text-light-text/60 dark:text-dark-text/60 sm:text-sm"
          >
            Описание работ
          </h3>
          <div
            class="space-y-3 text-xs text-light-text dark:text-dark-text sm:space-y-4 sm:text-base"
          >
            <p>
              В указанный период времени будут проводиться плановые технические
              работы по обновлению системы. В ходе работ будут внесены следующие
              изменения:
            </p>
            <ul
              class="list-inside list-disc space-y-1.5 pl-2 sm:space-y-2 sm:pl-4"
            >
              <li>
                Обновление алгоритмов нейросети для улучшения качества ответов
              </li>
              <li>Оптимизация работы базы данных</li>
              <li>Внедрение новых мер безопасности</li>
              <li>Улучшение производительности системы</li>
            </ul>
            <p>
              В период проведения работ возможны кратковременные перерывы в
              работе сервиса. Приносим извинения за возможные неудобства.
            </p>
          </div>
        </div>

        <div>
          <h3
            class="mb-2 text-xs font-medium text-light-text/60 dark:text-dark-text/60 sm:text-sm"
          >
            Действия
          </h3>
          <div class="flex flex-col gap-2 sm:flex-row sm:gap-4">
            <button
              class="rounded-xl bg-gradient-to-r from-lightPink to-lightBlue px-4 py-2 text-xs font-medium text-white shadow-lg transition-shadow hover:shadow-xl sm:px-6 sm:py-2.5 sm:text-sm"
            >
              Подробнее о работах
            </button>
            <button
              class="rounded-xl border border-light-text/10 px-4 py-2 text-xs font-medium text-light-text transition-colors hover:border-lightPink dark:border-dark-text/10 dark:text-dark-text sm:px-6 sm:py-2.5 sm:text-sm"
            >
              Скачать график работ
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
