<script setup lang="ts">
  import type { MaybeElementRef } from '@vueuse/core'
  import { onClickOutside } from '@vueuse/core'
  import { ref } from 'vue'
  import type { PanelLink } from '~/constants/panel-navigation'
  import {
    panelNavigationDown,
    panelNavigationMobile,
    panelNavigationUp,
  } from '~/constants/panel-navigation'
  const isSupportDropdownOpen = ref(false)
  const isNotificationsPanelOpen = ref(false)
  const supportMenuRef = ref(null)
  const notificationsPanelRef = ref(null)
  const handleLinkClick = (event: Event, link: PanelLink) => {
    if (link.isDropdown) {
      event.preventDefault()
      event.stopPropagation()
      isSupportDropdownOpen.value = !isSupportDropdownOpen.value
    }
  }
  const toggleNotifications = () => {
    isNotificationsPanelOpen.value = !isNotificationsPanelOpen.value
  }
  onClickOutside(
    [supportMenuRef, notificationsPanelRef] as MaybeElementRef[],
    () => {
      isSupportDropdownOpen.value = false
      isNotificationsPanelOpen.value = false
    }
  )
</script>

<template>
  <aside
    class="fixed bottom-2 left-2 right-2 z-50 h-16 rounded-2xl bg-light-panels dark:bg-dark-panels sm:bottom-3 sm:left-3 sm:right-3 md:bottom-4 md:left-4 md:right-4 lg:static lg:h-[calc(100vh-theme(spacing.40))] lg:w-[100px] lg:rounded-2xl"
  >
    <div
      class="flex h-full flex-row justify-around px-2 sm:px-4 md:px-6 lg:flex-col lg:justify-start lg:px-0 lg:py-4"
    >
      <nav class="hidden lg:flex lg:flex-col lg:gap-4">
        <SidebarLink
          v-for="link in panelNavigationUp"
          :key="link.to"
          v-bind="link"
        />
      </nav>

      <nav
        class="flex flex-row items-center justify-between gap-2 sm:gap-4 lg:hidden"
      >
        <template v-for="link in panelNavigationMobile" :key="link.to">
          <SidebarLink
            v-if="link.to !== '/panel/notifications'"
            v-bind="link"
            @click="(e) => handleLinkClick(e, link)"
          />
          <NotificationsButton
            v-else
            :is-active="isNotificationsPanelOpen"
            @click="toggleNotifications"
          />
        </template>
      </nav>

      <div class="hidden flex-1 lg:block"></div>

      <nav class="hidden lg:flex lg:flex-col lg:gap-4">
        <template v-for="link in panelNavigationDown" :key="link.to">
          <SidebarLink
            v-if="!link.isDropdown && link.to !== '/panel/notifications'"
            v-bind="link"
            @click="(e) => handleLinkClick(e, link)"
          />
          <NotificationsButton
            v-else-if="link.to === '/panel/notifications'"
            :is-active="isNotificationsPanelOpen"
            @click="toggleNotifications"
          />
          <SupportButton
            v-else
            :icon="link.icon"
            :text="link.text"
            @click="handleLinkClick($event, link)"
          />
        </template>

        <SupportMenu
          ref="supportMenuRef"
          :is-open="isSupportDropdownOpen"
          @close="isSupportDropdownOpen = false"
        />
      </nav>
    </div>

    <NotificationsPanel
      ref="notificationsPanelRef"
      :is-open="isNotificationsPanelOpen"
      @close="isNotificationsPanelOpen = false"
    />
  </aside>
</template>

<style scoped>
  .switch {
    @apply relative inline-block h-5 w-9;
  }

  .switch input {
    @apply h-0 w-0 opacity-0;
  }

  .slider {
    @apply absolute inset-0 cursor-pointer rounded-full bg-light-text/10 transition-all dark:bg-dark-text/10;
  }

  .slider:before {
    content: '';
    @apply absolute bottom-1 left-1 h-3 w-3 rounded-full bg-light-text transition-all dark:bg-dark-text;
  }

  input:checked + .slider {
    @apply bg-paleViolet;
  }

  input:checked + .slider:before {
    @apply translate-x-4 bg-white;
  }
</style>
