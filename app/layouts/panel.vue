<script setup lang="ts">
  import PanelHeader from '~/components/panel/PanelHeader.vue'
  import PanelSidebar from '~/components/panel/PanelSidebar.vue'
</script>

<template>
  <div
    class="grid h-screen grid-cols-1 grid-rows-[auto_1fr] gap-2 overflow-hidden p-2 sm:gap-3 sm:p-3 md:gap-4 md:p-4 lg:gap-4 lg:p-6"
  >
    <header class="col-span-full row-start-1">
      <PanelHeader />
    </header>

    <div
      class="col-span-full row-start-2 grid grid-cols-[auto_1fr] gap-2 overflow-hidden sm:gap-3 md:gap-4 lg:gap-4"
    >
      <aside class="col-start-1 h-[calc(100vh-theme(spacing.24))] lg:h-full">
        <PanelSidebar />
      </aside>

      <main class="col-start-2 min-w-0">
        <div
          class="h-[calc(100vh-theme(spacing.24))] overflow-auto [-ms-overflow-style:none] [scrollbar-width:none] lg:h-full [&::-webkit-scrollbar]:hidden"
        >
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
