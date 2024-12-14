<script setup lang="ts">
  import PanelHeader from '~/components/panel/PanelHeader.vue'
  import PanelSidebar from '~/components/panel/PanelSidebar.vue'
</script>

<template>
  <div
    class="grid h-screen grid-cols-1 grid-rows-[auto_1fr] gap-4 overflow-hidden p-6"
  >
    <header class="col-span-full row-start-1">
      <PanelHeader />
    </header>

    <div
      class="col-span-full row-start-2 grid grid-cols-[auto_1fr] gap-4 overflow-hidden"
    >
      <aside class="col-start-1 h-full">
        <PanelSidebar />
      </aside>

      <main class="col-start-2 overflow-hidden">
        <slot />
      </main>
    </div>
  </div>
</template>
