<script setup lang="ts">
  import type { MaybeElementRef } from '@vueuse/core'
  import { onClickOutside } from '@vueuse/core'
  import { groupedNotifications } from '~/constants/notifications'

  defineProps<{
    isOpen: boolean
  }>()

  const emit = defineEmits<{
    close: []
  }>()

  const showDetails = ref(false)
  const notificationsPanelRef = ref(null)
  const detailsPanelRef = ref(null)

  const openDetails = () => {
    showDetails.value = true
  }

  onClickOutside(notificationsPanelRef as MaybeElementRef, () => {
    emit('close')
    showDetails.value = false
  })
</script>

<template>
  <div
    v-if="isOpen"
    ref="notificationsPanelRef"
    class="absolute bottom-full left-0 z-[100] mb-2 w-full translate-y-4 rounded-xl border border-light-text/5 bg-light-panels shadow-lg backdrop-blur-sm dark:border-dark-text/5 dark:bg-dark-panels/95 sm:w-[400px] lg:bottom-8 lg:left-[125px] lg:mb-0 lg:h-[calc(100vh-theme(spacing.40))]"
  >
    <div class="flex h-full flex-col p-3 sm:p-4">
      <div class="mb-4 flex items-center justify-between sm:mb-8">
        <h2
          class="text-2xl font-medium text-light-text dark:text-dark-text sm:text-3xl"
        >
          Уведомления
        </h2>
        <button
          class="text-xs text-light-text/60 transition-colors hover:text-lightPink dark:text-dark-text/60 dark:hover:text-lightPink sm:text-sm"
        >
          Очистить все
        </button>
      </div>

      <div class="flex-1 overflow-y-auto">
        <div class="space-y-4 sm:space-y-6">
          <div
            v-for="(notifications, group) in groupedNotifications"
            :key="group"
            class="space-y-2"
          >
            <h3
              class="px-3 text-xs font-medium text-light-text/60 dark:text-dark-text/60 sm:px-4 sm:text-sm"
            >
              {{
                {
                  today: 'Сегодня',
                  yesterday: 'Вчера',
                  week: 'На этой неделе',
                }[group]
              }}
            </h3>
            <div class="space-y-0.5 sm:space-y-1">
              <div
                v-for="notification in notifications"
                :key="notification.id"
                class="group relative flex cursor-pointer items-start rounded-lg px-6 py-2.5 transition-colors hover:bg-light-text/5 dark:hover:bg-dark-text/5 sm:px-8 sm:py-3"
                @click="openDetails"
              >
                <div
                  v-if="notification.isNew"
                  class="absolute left-2 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-paleViolet sm:left-3 sm:h-2 sm:w-2"
                />
                <div class="flex-1">
                  <p
                    class="mb-1 text-xs text-light-text dark:text-dark-text sm:text-sm"
                    :class="{ 'font-medium': notification.isNew }"
                  >
                    {{ notification.text }}
                  </p>
                  <span
                    class="text-2xs text-light-text/60 dark:text-dark-text/60 sm:text-xs"
                    :class="{
                      'text-light-text/40 dark:text-dark-text/40':
                        !notification.isNew,
                    }"
                  >
                    {{ notification.date }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <NotificationDetailsPanel
    ref="detailsPanelRef"
    :is-open="showDetails"
    @close="showDetails = false"
  />
</template>
