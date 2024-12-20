<script setup lang="ts">
  import { computed, ref } from 'vue'
  import ProfileButton from '~/components/panel/ProfileButton.vue'
  import { useClickOutside } from '~/composables/useClickOutside'
  import { useApiKeyStore } from '~/stores/apiKey.store'
  import { usePanelStore } from '~/stores/panel.store'

  const panelStore = usePanelStore()
  const apiKeyStore = useApiKeyStore()
  const isInfoMenuOpen = ref(false)
  const menuRef = ref<HTMLElement | null>(null)

  useClickOutside(menuRef, () => {
    isInfoMenuOpen.value = false
  })

  const formattedDate = computed(() => {
    if (!apiKeyStore.apiKeyInfo?.expiredAt) return ''
    return new Date(apiKeyStore.apiKeyInfo.expiredAt).toLocaleDateString(
      'ru-RU',
      {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }
    )
  })

  const toggleInfoMenu = () => {
    isInfoMenuOpen.value = !isInfoMenuOpen.value
  }
</script>

<template>
  <header>
    <div
      class="flex items-center justify-between rounded-2xl bg-light-panels p-3 dark:bg-dark-panels sm:p-4"
    >
      <div class="flex items-center">
        <NuxtLink to="/panel" class="h-8 sm:h-10 lg:h-16">
          <NuxtImg
            src="logo-light.svg"
            alt="Logo"
            class="block h-full w-auto dark:hidden"
          />
          <NuxtImg
            src="logo-dark.svg"
            alt="Logo"
            class="hidden h-full w-auto dark:block"
          />
        </NuxtLink>
      </div>

      <div class="hidden items-center lg:flex">
        <div
          v-if="panelStore.apiKeys.length"
          class="flex flex-col gap-1 text-base"
        >
          <div class="text-light-text dark:text-dark-text">
            Количество токенов:
            <span class="font-medium">
              {{ apiKeyStore.apiKeyInfo?.tokenUsed || 0 }}
            </span>
            из
            <span class="font-medium">
              {{ apiKeyStore.apiKeyInfo?.tokenLimit || 0 }}
            </span>
          </div>
          <div class="text-light-text dark:text-dark-text">
            Срок действия до
            <span class="font-medium">{{ formattedDate }}</span>
          </div>
        </div>
        <ProfileButton class="ml-8" />
      </div>

      <div ref="menuRef" class="flex items-center gap-2 sm:gap-4 lg:hidden">
        <button
          v-if="panelStore.apiKeys.length"
          class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-lightPink to-lightBlue text-white sm:h-10 sm:w-10"
          @click="toggleInfoMenu"
        >
          <Icon
            name="material-symbols:info-outline"
            class="h-5 w-5 sm:h-6 sm:w-6"
          />
        </button>

        <div
          v-if="isInfoMenuOpen && panelStore.apiKeys.length"
          class="absolute right-2 top-16 z-50 w-[280px] rounded-xl border border-light-text/10 bg-light-panels p-3 shadow-lg dark:border-dark-text/10 dark:bg-dark-panels sm:right-4 sm:top-20 sm:w-[300px] sm:p-4"
        >
          <div class="space-y-2">
            <div class="text-light-text dark:text-dark-text">
              <div class="mb-2 text-sm font-medium sm:text-base">
                Информация о ключе:
              </div>
              <div class="space-y-1 text-xs sm:text-sm">
                <div>
                  Использовано:
                  <span class="font-medium">
                    {{ apiKeyStore.apiKeyInfo?.tokenUsed || 0 }}
                  </span>
                </div>
                <div>
                  Лимит:
                  <span class="font-medium">
                    {{ apiKeyStore.apiKeyInfo?.tokenLimit || 0 }}
                  </span>
                </div>
                <div>
                  Срок действия до:
                  <span class="font-medium">{{ formattedDate }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ProfileButton />
      </div>
    </div>
  </header>
</template>
