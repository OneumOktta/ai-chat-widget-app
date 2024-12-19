<script setup lang="ts">
  definePageMeta({
    layout: 'panel',
  })
</script>

<template>
  <div class="space-y-6 p-2 pb-20 sm:pb-28 lg:pb-2">
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div class="rounded-xl bg-light-panels p-6 dark:bg-dark-panels">
        <h2
          class="mb-6 text-lg font-medium text-light-text dark:text-dark-text"
        >
          Основная информация
        </h2>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <div
              class="h-20 w-20 overflow-hidden rounded-full bg-gradient-to-r from-lightPink to-lightBlue p-1"
            >
              <div
                class="h-full w-full rounded-full bg-light-panels dark:bg-dark-panels"
              >
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                  alt="Avatar"
                  class="h-full w-full"
                />
              </div>
            </div>
            <div>
              <button
                class="rounded-lg bg-gradient-to-r from-lightPink to-lightBlue px-4 py-2 text-sm font-medium text-white shadow-lg transition-shadow hover:shadow-xl"
              >
                Изменить фото
              </button>
            </div>
          </div>
          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                class="mb-1.5 block text-sm font-medium text-light-text/60 dark:text-dark-text/60"
              >
                Имя
              </label>
              <input
                type="text"
                class="w-full rounded-lg border border-light-text/10 bg-transparent px-4 py-2.5 text-light-text outline-none focus:border-lightPink dark:border-dark-text/10 dark:text-dark-text"
                placeholder="Введите имя"
              />
            </div>
            <div>
              <label
                class="mb-1.5 block text-sm font-medium text-light-text/60 dark:text-dark-text/60"
              >
                Email
              </label>
              <input
                type="email"
                class="w-full rounded-lg border border-light-text/10 bg-transparent px-4 py-2.5 text-light-text outline-none focus:border-lightPink dark:border-dark-text/10 dark:text-dark-text"
                placeholder="Введите email"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-xl bg-light-panels p-6 dark:bg-dark-panels">
        <h2
          class="mb-6 text-lg font-medium text-light-text dark:text-dark-text"
        >
          Настройки уведомлений
        </h2>
        <div class="space-y-4">
          <div
            v-for="(notification, i) in [
              'Email уведомления',
              'Push уведомления',
              'Уведомления в Telegram',
            ]"
            :key="i"
            class="flex items-center justify-between rounded-lg border border-light-text/10 p-4 dark:border-dark-text/10"
          >
            <span class="text-light-text dark:text-dark-text">
              {{ notification }}
            </span>
            <label class="switch">
              <input type="checkbox" checked />
              <span class="slider"></span>
            </label>
          </div>
        </div>
      </div>

      <div class="rounded-xl bg-light-panels p-6 dark:bg-dark-panels">
        <h2
          class="mb-6 text-lg font-medium text-light-text dark:text-dark-text"
        >
          Безопасность
        </h2>
        <div class="space-y-4">
          <div>
            <label
              class="mb-1.5 block text-sm font-medium text-light-text/60 dark:text-dark-text/60"
            >
              Текущий пароль
            </label>
            <input
              type="password"
              class="w-full rounded-lg border border-light-text/10 bg-transparent px-4 py-2.5 text-light-text outline-none focus:border-lightPink dark:border-dark-text/10 dark:text-dark-text"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label
              class="mb-1.5 block text-sm font-medium text-light-text/60 dark:text-dark-text/60"
            >
              Новый пароль
            </label>
            <input
              type="password"
              class="w-full rounded-lg border border-light-text/10 bg-transparent px-4 py-2.5 text-light-text outline-none focus:border-lightPink dark:border-dark-text/10 dark:text-dark-text"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label
              class="mb-1.5 block text-sm font-medium text-light-text/60 dark:text-dark-text/60"
            >
              Повторите новый пароль
            </label>
            <input
              type="password"
              class="w-full rounded-lg border border-light-text/10 bg-transparent px-4 py-2.5 text-light-text outline-none focus:border-lightPink dark:border-dark-text/10 dark:text-dark-text"
              placeholder="••••••••"
            />
          </div>
          <button
            class="w-full rounded-lg bg-gradient-to-r from-lightPink to-lightBlue px-4 py-2.5 text-sm font-medium text-white shadow-lg transition-shadow hover:shadow-xl"
          >
            Изменить пароль
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .switch {
    @apply relative inline-block h-6 w-11;
  }

  .switch input {
    @apply h-0 w-0 opacity-0;
  }

  .slider {
    @apply absolute inset-0 cursor-pointer rounded-full bg-light-text/10 transition-all dark:bg-dark-text/10;
  }

  .slider:before {
    @apply absolute bottom-1 left-1 h-4 w-4 rounded-full bg-light-text transition-all dark:bg-dark-text;
    content: '';
  }

  input:checked + .slider {
    @apply bg-gradient-to-r from-lightPink to-lightBlue;
  }

  input:checked + .slider:before {
    @apply translate-x-5 bg-white;
  }
</style>
