<script setup lang="ts">
  import PanelHeader from '~/components/panel/PanelHeader.vue'
  import PanelSidebar from '~/components/panel/PanelSidebar.vue'
  import { useApiKeyStore } from '~/stores/apiKey.store'
  import { usePanelStore } from '~/stores/panel.store'

  definePageMeta({
    middleware: ['panel'],
  })

  const panelStore = usePanelStore()
  const apiKeyStore = useApiKeyStore()

  // Инициализация при монтировании
  onMounted(async () => {
    await panelStore.fetchUserData()
    // Если есть текущий ключ, загружаем его данные
    if (panelStore.currentApiKey) {
      await apiKeyStore.fetchApiKeyData(panelStore.currentApiKey)
    }
  })
</script>

<template>
  <div class="h-screen overflow-hidden">
    <div
      class="grid h-full grid-cols-1 grid-rows-[auto_1fr] gap-2 p-2 sm:gap-3 sm:p-3 md:gap-4 md:p-4 lg:gap-4 lg:p-6"
    >
      <header class="col-span-full row-start-1">
        <PanelHeader />
      </header>

      <div
        class="col-span-full row-start-2 grid grid-cols-[auto_1fr] gap-2 sm:gap-3 md:gap-4 lg:gap-4"
      >
        <aside class="col-start-1">
          <PanelSidebar />
        </aside>

        <main class="col-start-2 min-w-0">
          <div
            class="h-[calc(100vh-theme(spacing.40))] overflow-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <slot />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
