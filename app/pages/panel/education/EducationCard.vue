<script setup lang="ts"></script>
<template>
  <div
    class="relative h-[200px] cursor-pointer rounded-2xl border border-purple-300 bg-light-panels p-[25px] shadow-sm transition hover:scale-105 hover:border-[#3F00A2] hover:shadow-md dark:bg-dark-panels"
  >
    <div>
      <div class="flex items-center justify-between">
        <h2 class="mb-2 text-lg font-bold">Нейросеть</h2>
        <div class="flex items-center gap-2 text-xs text-gray-400">
          <span class="flex items-center gap-1">
            <span class="flex flex-col items-center gap-1">
              <img src="/time.svg" alt="" />
              30 мин
            </span>
          </span>
          <span class="flex items-center gap-1">
            <span class="flex flex-col items-center gap-1">
              <img src="/level.svg" alt="" />
              Средний
            </span>
          </span>
        </div>
      </div>
      <p class="text-sm text-gray-500">
        Как обучить нейросеть продавать товары без менеджера
      </p>
    </div>
    <NuxtLink to="/panel/neuronet">
      <div
        class="mt-4 w-full rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 p-3 text-center text-white shadow-lg transition duration-200 hover:scale-105"
      >
        Начать
      </div>
    </NuxtLink>
  </div>
</template>
