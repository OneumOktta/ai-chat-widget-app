<script setup lang="ts">
  const router = useRouter()

  const navigateToEducation = () => {
    router.push('/panel/education')
  }
</script>

<template>
  <div
    class="flex h-full cursor-pointer items-center py-4 pl-8"
    @click="navigateToEducation"
  >
    <div
      class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-paleViolet"
    >
      <Icon name="ph:student-bold" class="h-8 w-8 text-white" />
    </div>

    <div class="ml-8 flex flex-col justify-center">
      <h3
        class="text-5xl font-medium leading-none text-light-text dark:text-dark-text"
      >
        Обучение
      </h3>
      <p class="mt-2 text-base text-light-text/60 dark:text-dark-text/60">
        Пройти обучение по нейросети
      </p>
    </div>
  </div>
</template>
