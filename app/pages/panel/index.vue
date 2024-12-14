<script setup lang="ts">
  import ChatStatsTile from '~/components/panel/tiles/ChatStatsTile.vue'
  import EducationTile from '~/components/panel/tiles/EducationTile.vue'
  import VisitorsStatsTile from '~/components/panel/tiles/VisitorsStatsTile.vue'
  import { usePanelStore } from '~/stores/panel.store'

  definePageMeta({
    layout: 'panel',
    middleware: ['panel'],
  })

  const panelStore = usePanelStore()

  onMounted(async () => {
    if (import.meta.client) {
      const accessToken = localStorage.getItem('accessToken')
      if (accessToken) {
        await panelStore.fetchUserData()
      }
    }
  })
</script>

<template>
  <div v-if="!panelStore.isLoading" class="flex min-h-screen flex-col">
    <div class="grid h-full grid-cols-7 gap-4">
      <PanelTile :cols="3">
        <EducationTile />
      </PanelTile>

      <PanelTile :cols="2">
        <ChatStatsTile />
      </PanelTile>

      <PanelTile :cols="2">
        <VisitorsStatsTile />
      </PanelTile>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
