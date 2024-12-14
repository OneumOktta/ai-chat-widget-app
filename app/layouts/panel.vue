<script setup lang="ts">
  import PanelHeader from '~/components/panel/PanelHeader.vue'
  import PanelSidebar from '~/components/panel/PanelSidebar.vue'
</script>

<template>
  <div>
    <PanelHeader />
    <div class="flex flex-1">
      <PanelSidebar />
      <main class="flex-1 pb-6 pl-2 pr-6 pt-2">
        <slot />
      </main>
    </div>
  </div>
</template>
