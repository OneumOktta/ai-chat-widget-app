<script setup lang="ts">
  import { useApiKeyStore } from '~/stores/apiKey.store'
  import BotForm from './BotForm.vue'

  interface BotPreset {
    id: string
    icon: string | null
    title: string
    description: string
    isPublic: boolean
    role: string
    tasks: string
    emotionalProfile: string
    context: string
    example: string
    notes: string
    categories: string[]
    customization: Record<string, unknown>
    prompts: Record<string, unknown>
    createdAt: string
    updatedAt: string
  }

  interface PresetResponse {
    success: boolean
    data: BotPreset[]
  }

  interface BotData {
    apiKeyId: string
    role?: string
    tasks?: string
    emotionalProfile?: string
    context?: string
    example?: string
    notes?: string
    categories?: string[]
  }

  const apiKeyStore = useApiKeyStore()
  const botName = ref('')
  const error = ref('')
  const isLoading = ref(true)
  const presets = ref<BotPreset[]>([])
  const selectedPreset = ref<BotPreset | null>(null)
  const showForm = ref(false)
  const selectedPresetData = ref<BotPreset | null>(null)

  const fetchPresets = async () => {
    isLoading.value = true
    error.value = ''

    try {
      if (!apiKeyStore.apiKeyInfo?.id) {
        await apiKeyStore.fetchApiKeyData()
      }

      const { data } = await useAuthFetch<PresetResponse>(
        '/proxy/bot-presets/list'
      )
      if (data.value?.success) {
        presets.value = data.value.data
      } else {
        throw new Error('Failed to load presets')
      }
    } catch (e) {
      console.error('Error loading presets:', e)
      error.value = 'Не удалось загрузить шаблоны ботов'
    } finally {
      isLoading.value = false
    }
  }

  onMounted(fetchPresets)
  onActivated(fetchPresets)

  const createBot = async (preset: BotPreset) => {
    error.value = ''
    isLoading.value = true

    try {
      const { data, error: fetchError } = await useAuthFetch(
        '/proxy/bots/create',
        {
          method: 'POST',
          body: {
            name: preset.title,
            apiKeyId: apiKeyStore.apiKeyInfo?.id,
            presetId: preset.id,
          },
        }
      )

      if (fetchError.value) {
        throw new Error('Не удалось создать бота')
      }

      await apiKeyStore.fetchApiKeyData(apiKeyStore.apiKeyInfo?.id as string)
    } catch (e) {
      error.value =
        e instanceof Error ? e.message : 'Произошла ошибка при создании бота'
    } finally {
      isLoading.value = false
    }
  }

  const handlePresetSelect = (preset: BotPreset) => {
    selectedPresetData.value = {
      ...preset,
      apiKeyId: apiKeyStore.apiKeyInfo?.id,
    }
    showForm.value = true
  }

  const handleFormSubmit = async (formData: BotData) => {
    error.value = ''
    isLoading.value = true

    try {
      const { data, error: fetchError } = await useAuthFetch(
        '/proxy/bots/create',
        {
          method: 'POST',
          body: {
            apiKeyId: apiKeyStore.apiKeyInfo?.id,
            role: formData.role,
            tasks: formData.tasks,
            emotionalProfile: formData.emotionalProfile,
            context: formData.context,
            example: formData.example,
            notes: formData.notes,
            categories: formData.categories,
          },
        }
      )

      if (fetchError.value) {
        throw new Error('Не удалось создать бота')
      }

      await apiKeyStore.fetchApiKeyData(apiKeyStore.apiKeyInfo?.id as string)
      showForm.value = false
    } catch (e) {
      error.value =
        e instanceof Error ? e.message : 'Произошла ошибка при создании бота'
    } finally {
      isLoading.value = false
    }
  }
</script>

<template>
  <div class="flex h-full flex-col">
    <!-- Заголовок -->
    <div class="px-8 py-6">
      <h2 class="text-2xl font-bold text-light-text dark:text-dark-text">
        Создание бота
      </h2>
      <p class="mt-2 text-light-text/60 dark:text-dark-text/60">
        Выберите шаблон бота для быстрого старта
      </p>
    </div>

    <!-- Прокручиваемая сетка карточек -->
    <div class="scrollbar-hidden flex-1 overflow-y-auto">
      <div v-if="isLoading" class="flex h-full items-center justify-center">
        <div class="text-light-text/60 dark:text-dark-text/60">
          Загрузка шаблонов...
        </div>
      </div>

      <div v-else-if="error" class="flex h-full items-center justify-center">
        <div class="text-red-500">{{ error }}</div>
      </div>

      <div
        v-else
        class="grid grid-cols-1 gap-6 p-8 md:grid-cols-2 lg:grid-cols-3"
      >
        <!-- Карточка создания своего бота -->
        <div
          class="group relative overflow-hidden rounded-2xl border border-light-text/5 bg-light-panels p-6 transition-all hover:-translate-y-1 hover:shadow-xl dark:border-dark-text/5 dark:bg-dark-panels"
          @click="handlePresetSelect({ id: 'custom', title: 'Мой бот' })"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-lightPink/5 to-lightBlue/5 opacity-0 transition-opacity group-hover:opacity-100"
          />

          <div class="relative">
            <div class="mb-4 flex items-center gap-4">
              <div
                class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-lightPink to-lightBlue p-[2px]"
              >
                <div
                  class="h-[46px] w-[46px] rounded-full bg-light-panels dark:bg-dark-panels"
                >
                  <div class="flex h-full w-full items-center justify-center">
                    <Icon
                      name="material-symbols:add-rounded"
                      class="h-6 w-6 text-lightPink"
                    />
                  </div>
                </div>
              </div>
              <h3
                class="text-sm font-semibold text-light-text dark:text-dark-text"
              >
                Создать своего бота
              </h3>
            </div>

            <p class="text-sm text-light-text/60 dark:text-dark-text/60">
              Создайте бота с нуля и настройте его под свои задачи
            </p>
          </div>
        </div>

        <!-- Существующие пресеты -->
        <div
          v-for="preset in presets"
          :key="preset.id"
          class="group relative overflow-hidden rounded-2xl border border-light-text/5 bg-light-panels p-6 transition-all hover:-translate-y-1 hover:shadow-xl dark:border-dark-text/5 dark:bg-dark-panels"
          @click="handlePresetSelect(preset)"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-lightPink/5 to-lightBlue/5 opacity-0 transition-opacity group-hover:opacity-100"
          />

          <div class="relative">
            <div class="mb-4 flex items-center gap-4">
              <div
                class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-lightPink to-lightBlue p-[2px]"
              >
                <div
                  class="h-[46px] w-[46px] rounded-full bg-light-panels dark:bg-dark-panels"
                >
                  <div class="flex h-full w-full items-center justify-center">
                    <Icon
                      name="material-symbols:smart-toy-outline-rounded"
                      class="h-6 w-6 text-lightPink"
                    />
                  </div>
                </div>
              </div>
              <h3
                class="text-sm font-semibold text-light-text dark:text-dark-text"
              >
                {{ preset.title }}
              </h3>
            </div>

            <p class="text-sm text-light-text/60 dark:text-dark-text/60">
              {{ preset.description }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Форма создания/редактирования бота -->
    <BotForm
      v-if="selectedPresetData"
      :preset="selectedPresetData"
      :is-open="showForm"
      @close="showForm = false"
      @submit="handleFormSubmit"
    />
  </div>
</template>

<style scoped>
  .scrollbar-hidden {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
  }

  .scrollbar-hidden::-webkit-scrollbar {
    display: none; /* Chrome, Safari and Opera */
  }
</style>
