<script setup lang="ts">
  defineProps<{
    error: {
      statusCode: number
      message?: string
    }
  }>()
</script>

<template>
  <div
    class="font-Roboto relative overflow-hidden bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text"
  >
    <div
      class="animate-float fixed -right-[200px] -top-[200px] h-[450px] w-[360px] rounded-full bg-primary-gradient blur-[150px]"
    />
    <div
      class="animate-float fixed -bottom-[200px] -left-[200px] h-[450px] w-[450px] rounded-full bg-primary-gradient-alt blur-[150px]"
    />
    <div class="relative z-10">
      <ThemeToggle />
      <div class="flex min-h-screen flex-col items-center justify-center px-4">
        <div class="text-center">
          <h1
            class="mb-4 text-[120px] font-bold leading-none text-lightPink opacity-20 md:text-[200px]"
          >
            404
          </h1>
          <div class="mb-8">
            <h2
              class="mb-2 text-2xl font-semibold text-light-text dark:text-dark-text md:text-3xl"
            >
              Упс! Страница не найдена
            </h2>
            <p class="text-light-text/60 dark:text-dark-text/60">
              Возможно, она была перемещена или удалена
            </p>
          </div>
          <NuxtLink
            to="/"
            class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-lightPink to-lightBlue px-6 py-3 text-dark-text shadow-lg transition-all duration-300 hover:opacity-90 hover:shadow-xl"
          >
            Вернуться на главную
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  @keyframes float {
    0% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(-10px, 10px);
    }
    100% {
      transform: translate(0, 0);
    }
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
</style>
