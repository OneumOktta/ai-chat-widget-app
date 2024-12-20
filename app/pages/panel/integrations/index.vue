<script setup lang="ts">
  definePageMeta({
    layout: 'panel',
  })

  const connectedIntegrations = [
    {
      id: 'vk',
      name: 'Вконтакте',
      username: 'Бешеная Лама',
      apiKey: '',
      icon: 'ion:logo-vk',
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      username: 'Бешеная Лама',
      apiKey: '',
      icon: 'ic:baseline-whatsapp',
    },
    {
      id: 'telegram',
      name: 'Telegram',
      username: 'Бешеная Лама',
      apiKey: '',
      icon: 'ri:telegram-2-fill',
    },
  ]

  const availableIntegrations = [
    {
      id: 'vk',
      name: 'Вконтакте',
      icon: 'ion:logo-vk',
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: 'ic:baseline-whatsapp',
    },
    {
      id: 'telegram',
      name: 'Telegram',
      icon: 'ri:telegram-2-fill',
    },
  ]
</script>

<template>
  <PanelContent>
    <div
      class="flex h-full flex-col rounded-2xl bg-light-panels dark:bg-dark-panels"
    >
      <div class="p-4 sm:p-6">
        <div
          class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <h1
            class="text-2xl font-bold text-light-text dark:text-dark-text sm:text-3xl md:text-4xl"
          >
            Интеграции
          </h1>
          <div class="relative w-full sm:w-1/2">
            <input
              type="text"
              class="h-10 w-full rounded-xl border border-paleViolet bg-transparent px-4 py-2 pl-10 text-sm text-light-text outline-none transition-colors placeholder:text-light-text/40 focus:border-lightPink dark:text-dark-text dark:placeholder:text-dark-text/40 sm:h-12 sm:text-base"
              placeholder="Поиск..."
            />
            <Icon
              name="material-symbols:search"
              class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-light-text/40 dark:text-dark-text/40 sm:h-5 sm:w-5"
            />
          </div>
        </div>
      </div>

      <div
        class="flex-1 overflow-auto p-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:p-6 [&::-webkit-scrollbar]:hidden"
      >
        <div class="space-y-6 sm:space-y-8">
          <div class="space-y-4">
            <h2
              class="text-xl font-bold text-light-text dark:text-dark-text sm:text-2xl"
            >
              Подключенные
            </h2>
            <div class="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              <IntegrationTile
                v-for="integration in connectedIntegrations"
                :key="integration.id"
                v-bind="integration"
              />
            </div>
          </div>

          <div class="space-y-4">
            <h2
              class="text-xl font-bold text-light-text dark:text-dark-text sm:text-2xl"
            >
              Доступные
            </h2>
            <div class="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              <IntegrationTile
                v-for="integration in availableIntegrations"
                :key="integration.id"
                v-bind="integration"
              />
            </div>
          </div>

          <div class="space-y-4">
            <div class="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              <div
                class="flex h-full flex-col items-center justify-center rounded-xl border border-light-text/10 bg-light-panels p-4 dark:border-dark-text/10 dark:bg-dark-panels sm:rounded-2xl sm:p-6"
              >
                <h3
                  class="mb-3 text-base font-medium text-light-text dark:text-dark-text sm:mb-4 sm:text-lg"
                >
                  Запрос на новую интеграцию
                </h3>
                <button
                  class="group relative flex h-8 w-8 items-center justify-center rounded-full bg-paleViolet shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] transition-all hover:shadow-[inset_0_4px_6px_rgba(0,0,0,0.25)] sm:h-10 sm:w-10"
                >
                  <div
                    class="absolute inset-0 scale-0 rounded-full bg-gradient-to-r from-lightPink to-lightBlue opacity-0 blur-sm transition-all group-hover:scale-150 group-hover:opacity-50"
                  />
                  <Icon
                    name="material-symbols:add"
                    class="relative z-10 h-5 w-5 text-white sm:h-6 sm:w-6"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PanelContent>
</template>

<style scoped>
  .switch-input {
    @apply sr-only;
  }

  .switch-slider {
    @apply relative h-6 w-12 cursor-pointer rounded-full bg-light-text/10 transition-colors before:absolute before:left-1 before:top-1 before:h-4 before:w-4 before:rounded-full before:bg-light-text before:transition-all dark:bg-dark-text/10 dark:before:bg-dark-text;
  }

  .switch-input:checked + .switch-slider {
    @apply bg-paleViolet before:translate-x-6 before:bg-white;
  }
</style>
