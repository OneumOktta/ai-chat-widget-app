<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue'
  import { useClickOutside } from '~/composables/useClickOutside'
  import { useAuthStore } from '~/stores/auth.store'
  import { usePanelStore } from '~/stores/panel.store'

  const panelStore = usePanelStore()
  const auth = useAuthStore()
  const isUserMenuOpen = ref(false)
  const isDark = ref(false)
  const menuRef = ref<HTMLElement | null>(null)

  useClickOutside(menuRef, () => {
    isUserMenuOpen.value = false
  })

  onMounted(() => {
    const savedTheme = localStorage.getItem('theme')
    isDark.value =
      savedTheme === 'dark' ||
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
  })

  const toggleTheme = () => {
    isDark.value = !isDark.value
    if (isDark.value) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const toggleUserMenu = () => {
    isUserMenuOpen.value = !isUserMenuOpen.value
  }

  const roleLetters = {
    administrator: 'А',
    business: 'Б',
    manager: 'М',
  }

  const roleNames = {
    administrator: 'Администратор',
    business: 'Бизнес',
    manager: 'Менеджер',
  }

  const currentApiKeyTitle = computed(() => {
    return panelStore.apiKeys.find((key) => key.id === panelStore.currentApiKey)
      ?.title
  })

  const handleKeySelect = (keyId: string) => {
    panelStore.setCurrentApiKey(keyId)
    isUserMenuOpen.value = false
  }
</script>

<template>
  <div ref="menuRef" class="relative">
    <button
      class="flex items-center gap-4 rounded-xl border border-lightBlue px-4 py-2 transition-colors hover:border-lightPink dark:border-dark-text/10 lg:w-auto"
      @click="toggleUserMenu"
    >
      <div
        class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-lightPink to-lightBlue text-lg font-bold text-white lg:h-14 lg:w-14 lg:text-xl"
      >
        {{ roleLetters[panelStore.user?.role as keyof typeof roleLetters] }}
      </div>

      <div class="hidden lg:flex lg:flex-col lg:items-start">
        <span class="text-sm font-medium">{{ currentApiKeyTitle }}</span>
        <span class="text-xs text-light-text/60 dark:text-dark-text/60">
          {{ panelStore.user?.email }}
        </span>
      </div>

      <Icon
        name="basil:caret-down-outline"
        class="ml-8 hidden h-4 w-4 lg:block"
        :class="{ 'rotate-180': isUserMenuOpen }"
      />
    </button>

    <div
      v-if="isUserMenuOpen"
      class="absolute right-0 top-full z-50 mt-2 w-[300px] rounded-xl border border-light-text/10 bg-light-panels p-4 shadow-lg dark:border-dark-text/10 dark:bg-dark-panels"
    >
      <div class="mb-2 flex items-center justify-between">
        <button
          class="group relative h-10 w-10 overflow-hidden rounded-full text-light-text/60 transition-all hover:text-white dark:text-dark-text/60"
          @click="toggleTheme"
        >
          <div
            class="absolute inset-0 scale-0 bg-gradient-to-r from-lightPink to-lightBlue opacity-0 blur-sm transition-all group-hover:scale-150 group-hover:opacity-50"
          />
          <div
            class="relative z-10 flex h-full w-full items-center justify-center"
          >
            <Icon
              :name="
                isDark
                  ? 'line-md:moon-to-sunny-outline-loop-transition'
                  : 'line-md:moon-rising-loop'
              "
              class="h-5 w-5"
            />
          </div>
        </button>

        <button
          class="group relative h-10 w-10 overflow-hidden rounded-full text-light-text/60 transition-all hover:text-white dark:text-dark-text/60"
          @click="auth.logout()"
        >
          <div
            class="absolute inset-0 scale-0 bg-gradient-to-r from-lightPink to-lightBlue opacity-0 blur-sm transition-all group-hover:scale-150 group-hover:opacity-50"
          />
          <div
            class="relative z-10 flex h-full w-full items-center justify-center"
          >
            <Icon name="material-symbols:logout-rounded" class="h-5 w-5" />
          </div>
        </button>
      </div>
      <div
        class="mb-4 border-b border-light-text/10 pb-4 dark:border-dark-text/10"
      >
        <div class="text-center">
          <div class="text-base font-medium">{{ panelStore.user?.name }}</div>
          <div class="mt-1 text-xs text-light-text/60 dark:text-dark-text/60">
            {{ roleNames[panelStore.user?.role as keyof typeof roleNames] }}
            | {{ panelStore.user?.email }}
          </div>
        </div>
      </div>
      <div class="mb-4 space-y-2">
        <div
          class="px-4 text-xs font-medium text-light-text/40 dark:text-dark-text/40"
        ></div>
        <div class="space-y-2">
          <button
            v-for="key in panelStore.apiKeys"
            :key="key.id"
            class="group relative mx-auto flex h-12 w-full items-center justify-center rounded-xl px-4 py-2 text-sm"
            @click="handleKeySelect(key.id)"
          >
            <div
              class="absolute inset-0 rounded-xl bg-gradient-to-r from-lightPink to-lightBlue opacity-0 blur-sm transition-opacity group-hover:opacity-50"
              :class="{ 'opacity-50': key.id === panelStore.currentApiKey }"
            />
            <div
              class="absolute inset-0 rounded-xl bg-light-panels dark:bg-dark-panels"
            />
            <span
              class="relative z-10 text-light-text transition-colors group-hover:text-lightPink dark:text-dark-text"
              :class="{ 'text-lightPink': key.id === panelStore.currentApiKey }"
            >
              {{ key.title }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
