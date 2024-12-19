<script setup lang="ts"></script>

<template>
  <div
    class="flex max-h-screen flex-col items-center justify-center space-y-10 px-4"
  >
    <div class="max-w-3xl text-center">
      <h1
        class="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-5xl"
      >
        Чат для сайта или приложения на основе GPT
      </h1>
    </div>

    <div class="mx-auto w-full max-w-2xl">
      <p class="text-start text-sm sm:text-lg md:text-xl">
        Расширьте свои возможности с помощью автоматизации и искусственного
        интеллекта в одном окне:
      </p>

      <ul
        class="mt-4 items-start space-y-4 text-sm sm:text-base md:text-lg lg:text-lg"
      >
        <li class="flex items-center gap-2">
          <Icon
            name="lets-icons:done-ring-round"
            class="h-6 w-6 text-lightBlue"
          />
          Продажи
        </li>
        <li class="flex items-center gap-2">
          <Icon
            name="lets-icons:done-ring-round"
            class="h-6 w-6 text-lightBlue"
          />
          Поддержка
        </li>
        <li class="flex items-center gap-2">
          <Icon
            name="lets-icons:done-ring-round"
            class="h-6 w-6 text-lightBlue"
          />
          Повышение качества обслуживания
        </li>
      </ul>
    </div>

    <div
      class="mx-auto flex w-full max-w-2xl flex-col gap-4 pt-6 sm:flex-row sm:gap-6 md:gap-8 lg:gap-12 xl:gap-[95px]"
    >
      <BlackButton
        class="flex-1 text-center"
        @click="() => navigateTo('/login')"
      >
        Войти
      </BlackButton>
      <GradientButton
        class="flex-1 text-center"
        @click="() => navigateTo('/registration')"
      >
        Создать аккаунт
      </GradientButton>
    </div>
  </div>
</template>
