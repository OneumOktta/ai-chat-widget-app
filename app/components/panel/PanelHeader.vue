<script setup lang="ts">
  import { computed } from 'vue'
  import ProfileButton from '~/components/panel/ProfileButton.vue'
  import { useApiKeyStore } from '~/stores/apiKey.store'

  const apiKeyStore = useApiKeyStore()

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
</script>

<template>
  <header>
    <div
      class="flex items-center justify-between rounded-2xl bg-light-panels p-4 dark:bg-dark-panels"
    >
      <div class="flex items-center gap-4">
        <NuxtLink to="/panel" class="h-16">
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

      <div class="flex items-center">
        <div class="flex flex-col gap-1 text-base">
          <div class="text-light-text dark:text-dark-text">
            Количество токенов:
            <span>{{ apiKeyStore.apiKeyInfo?.tokenUsed || 0 }}</span>
            из
            <span>{{ apiKeyStore.apiKeyInfo?.tokenLimit || 0 }}</span>
          </div>
          <div class="text-light-text dark:text-dark-text">
            Срок действия до {{ formattedDate }}
          </div>
        </div>

        <ProfileButton class="ml-8" />
      </div>
    </div>
  </header>
</template>
