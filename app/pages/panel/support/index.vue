<script setup lang="ts">
  import { supportCategories } from '~/constants/support-categories'

  definePageMeta({
    layout: 'panel',
  })

  const searchQuery = ref('')
</script>

<template>
  <div
    class="h-full rounded-2xl bg-light-panels p-4 dark:bg-dark-panels sm:p-5 md:p-6"
  >
    <div class="flex h-full flex-col space-y-6 sm:space-y-8">
      <div class="space-y-6 text-center sm:space-y-8 md:space-y-10">
        <h1
          class="pt-8 text-2xl font-bold text-paleViolet sm:text-3xl md:text-[40px]"
        >
          Справочный центр
        </h1>
        <p
          class="text-base text-light-text/60 dark:text-dark-text/60 sm:text-lg md:text-xl lg:text-2xl"
        >
          Подробная документация, которая поможет вам начать работу с Oneum
        </p>
        <div class="flex justify-center px-0 sm:px-4 md:px-8 lg:px-16">
          <div class="relative w-full sm:w-4/5 md:w-3/4 lg:w-2/3">
            <input
              v-model="searchQuery"
              type="text"
              class="h-12 w-full rounded-xl border border-paleViolet bg-transparent px-4 py-2 pl-10 text-sm text-light-text outline-none transition-colors placeholder:text-light-text/40 focus:border-lightPink dark:text-dark-text dark:placeholder:text-dark-text/40 sm:h-14 sm:rounded-2xl sm:py-3 sm:pl-11 sm:text-base md:h-16"
              placeholder="Поиск по ключевому слову"
            />
            <Icon
              name="material-symbols:search"
              class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-light-text/40 dark:text-dark-text/40 sm:left-4 sm:h-5 sm:w-5"
            />
          </div>
        </div>
      </div>

      <div class="flex-1 overflow-hidden">
        <div
          class="grid h-full gap-3 overflow-auto [-ms-overflow-style:none] [scrollbar-width:none] sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4 [&::-webkit-scrollbar]:hidden"
        >
          <SupportCategoryTile
            v-for="category in supportCategories"
            :key="category.title"
            :icon="category.icon"
            :title="category.title"
          />
        </div>
      </div>
    </div>
  </div>
</template>
