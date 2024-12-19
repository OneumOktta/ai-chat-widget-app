<script setup lang="ts">
  defineProps<{
    icon: string
    title: string
  }>()
</script>

<template>
  <div
    class="group relative flex h-full flex-col items-center justify-center rounded-xl border border-paleViolet p-4 text-center transition-all hover:shadow-lg sm:rounded-2xl sm:p-6"
  >
    <div
      class="absolute -inset-1 rounded-xl bg-gradient-to-r from-lightPink to-lightBlue opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-50 sm:rounded-2xl"
    />

    <div
      class="absolute inset-[1px] rounded-xl bg-light-panels dark:bg-dark-panels sm:rounded-2xl"
    />

    <div class="relative z-10 flex flex-col items-center">
      <div
        class="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-paleViolet shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] transition-all group-hover:shadow-[inset_0_4px_6px_rgba(0,0,0,0.25)] sm:mb-4 sm:h-14 sm:w-14"
      >
        <Icon
          :name="icon"
          class="h-6 w-6 text-light-text transition-transform group-hover:scale-110 sm:h-7 sm:w-7"
        />
      </div>

      <span
        class="text-base font-bold text-light-text dark:text-dark-text sm:text-lg"
      >
        {{ title }}
      </span>
    </div>
  </div>
</template>
