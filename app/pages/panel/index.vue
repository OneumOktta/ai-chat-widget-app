<script setup lang="ts">
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
    <PanelContent>
      <h1 class="mb-6 text-2xl font-semibold">
        С возвращением, {{ panelStore.user?.name || 'путник' }}!
      </h1>
    </PanelContent>
  </div>
</template>

<style lang="scss" scoped></style>
