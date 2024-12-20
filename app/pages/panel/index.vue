<script setup lang="ts">
  import Onboarding from '~/components/panel/Onboarding.vue'
  import ChatStatsTile from '~/components/panel/tiles/ChatStatsTile.vue'
  import EducationTile from '~/components/panel/tiles/EducationTile.vue'
  import MessagesDistributionTile from '~/components/panel/tiles/MessagesDistributionTile.vue'
  import PerformanceTile from '~/components/panel/tiles/PerformanceTile.vue'
  import TokenUsageTile from '~/components/panel/tiles/TokenUsageTile.vue'
  import UsersInfoTile from '~/components/panel/tiles/UsersInfoTile.vue'
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
  <div v-if="!panelStore.isLoading" class="h-full">
    <Onboarding v-if="!panelStore.apiKeys.length" />

    <div v-else class="grid h-full grid-cols-7 gap-4">
      <PanelTile :cols="3">
        <EducationTile />
      </PanelTile>

      <PanelTile :cols="2">
        <ChatStatsTile />
      </PanelTile>

      <PanelTile :cols="2">
        <VisitorsStatsTile />
      </PanelTile>

      <PanelTile :cols="4">
        <RequestTile />
      </PanelTile>

      <PanelTile :cols="3">
        <TokenUsageTile />
      </PanelTile>

      <PanelTile :cols="2">
        <PerformanceTile />
      </PanelTile>

      <PanelTile :cols="3">
        <MessagesDistributionTile />
      </PanelTile>

      <PanelTile :cols="2">
        <UsersInfoTile />
      </PanelTile>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
