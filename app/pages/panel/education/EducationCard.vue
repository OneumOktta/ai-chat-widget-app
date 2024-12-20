<script setup lang="ts"></script>

<template>
  <div
    class="group relative flex h-[200px] flex-col justify-between rounded-xl border border-light-text/5 bg-light-panels p-6 transition-all duration-200 hover:border-lightPink dark:border-dark-text/5 dark:bg-dark-panels"
  >
    <div>
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-medium text-light-text dark:text-dark-text">
          Нейросеть
        </h2>
        <div
          class="flex items-center gap-4 text-xs text-light-text/40 dark:text-dark-text/40"
        >
          <span class="flex flex-col items-center gap-1.5">
            <Icon
              name="heroicons:clock"
              class="h-4 w-4 transition-colors group-hover:text-lightPink"
            />
            <span>30 мин</span>
          </span>
          <span class="flex flex-col items-center gap-1.5">
            <Icon
              name="heroicons:signal"
              class="h-4 w-4 transition-colors group-hover:text-lightPink"
            />
            <span>Средний</span>
          </span>
        </div>
      </div>
      <p class="mt-3 text-sm text-light-text/60 dark:text-dark-text/60">
        Как обучить нейросеть продавать товары без менеджера
      </p>
    </div>

    <NuxtLink to="/panel/neuronet" class="block">
      <GradientButton class="w-full">Начать</GradientButton>
    </NuxtLink>
  </div>
</template>
