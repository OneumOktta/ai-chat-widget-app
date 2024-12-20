<script setup lang="ts">
  import ChatPreview from '~/components/panel/ChatPreview.vue'
  import CreateBot from '~/components/panel/CreateBot.vue'
  import { useApiKeyStore } from '~/stores/apiKey.store'
  import { usePanelStore } from '~/stores/panel.store'

  definePageMeta({
    layout: 'panel',
  })

  const apiKeyStore = useApiKeyStore()
  const panelStore = usePanelStore()

  // Состояние загрузки
  const isLoading = computed(
    () => apiKeyStore.isLoading || panelStore.isLoading
  )

  // Ждем загрузку данных перед отображением
  await Promise.all([
    panelStore.fetchUserData(),
    panelStore.currentApiKey
      ? apiKeyStore.fetchApiKeyData(panelStore.currentApiKey)
      : Promise.resolve(),
  ])

  const tabs = [
    { id: 'description', name: 'Описание' },
    { id: 'appearance', name: 'Внешний вид' },
    { id: 'training', name: 'Обучение' },
  ]

  const currentTab = ref('description')

  interface BotInfo {
    role: string
    tasks: string
    emotionalProfile: string
    context: string
    example: string
    notes: string
  }

  const botInfo = ref<BotInfo | null>(null)
  const isEditing = ref(false)
  const editedInfo = ref<BotInfo | null>(null)

  interface BotInfoResponse {
    success: boolean
    data: {
      id: string
      categories: string[]
      role: string
      tasks: string
      emotionalProfile: string
      context: string
      example: string
      notes: string
      createdAt: string
      updatedAt: string
    }
  }

  interface Prompt {
    id: string
    category: string
    content: string
    isActive: boolean
    createdAt: string
    updatedAt: string
  }

  interface PromptsResponse {
    success: boolean
    data: {
      prompts: Prompt[]
    }
  }

  const fetchBotInfo = async () => {
    try {
      const { data, error } = await useAuthFetch<BotInfoResponse>(
        `/proxy/bots/${apiKeyStore.apiKeyInfo?.botId}/info`
      )

      if (error.value) {
        throw new Error('Failed to fetch bot info')
      }

      if (data.value?.success) {
        botInfo.value = data.value.data
      }
    } catch (e) {
      console.error('Error fetching bot info:', e)
    }
  }

  const startEditing = () => {
    editedInfo.value = { ...botInfo.value! }
    isEditing.value = true
  }

  interface BotUpdateResponse {
    success: boolean
  }

  const saveChanges = async () => {
    try {
      const updateData = {
        role: editedInfo.value?.role,
        tasks: editedInfo.value?.tasks,
        emotionalProfile: editedInfo.value?.emotionalProfile,
        example: editedInfo.value?.example,
        notes: editedInfo.value?.notes,
      }

      const { data, error } = await useAuthFetch<BotUpdateResponse>(
        `/proxy/bots/${apiKeyStore.apiKeyInfo?.botId}/update`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData),
        }
      )

      if (error.value) {
        throw new Error('Failed to update bot')
      }

      if (data.value?.success) {
        await fetchBotInfo()
        isEditing.value = false
      }
    } catch (e) {
      console.error('Error updating bot:', e)
    }
  }

  watch(currentTab, async (newTab, oldTab) => {
    if (newTab === 'description' && oldTab !== 'description') {
      fetchBotInfo()
    } else if (newTab === 'appearance' && oldTab !== 'appearance') {
      fetchCustomization()
    } else if (newTab === 'training' && oldTab !== 'training') {
      const { data } = await useAuthFetch<BotInfoResponse>(
        `/proxy/bots/${apiKeyStore.apiKeyInfo?.botId}/info`
      )
      if (data.value?.success) {
        categories.value = data.value.data.categories
        if (categories.value.length > 0) {
          selectedCategory.value = categories.value[0]
        }
      }
      fetchPrompts()
    }
  })

  onMounted(async () => {
    if (apiKeyStore.apiKeyInfo?.botId) {
      if (currentTab.value === 'description') {
        fetchBotInfo()
      } else if (currentTab.value === 'appearance') {
        fetchCustomization()
      } else if (currentTab.value === 'training') {
        const { data } = await useAuthFetch<BotInfoResponse>(
          `/proxy/bots/${apiKeyStore.apiKeyInfo?.botId}/info`
        )
        if (data.value?.success) {
          categories.value = data.value.data.categories
          if (categories.value.length > 0) {
            selectedCategory.value = categories.value[0]
          }
        }
        fetchPrompts()
      }
    }
  })

  const orderedFields = [
    { key: 'role', label: 'Роль' },
    { key: 'tasks', label: 'Задачи' },
    { key: 'emotionalProfile', label: 'Эмоциональный профиль' },
    { key: 'example', label: 'Примеры' },
    { key: 'notes', label: 'Заметки' },
  ]

  interface Customization {
    greeting: string
    headerTitle: string
    headerColor: string
    headerTextColor: string
    backgroundColor: string
    userColor: string
    userBorderColor: string
    userTextColor: string
    botColor: string
    botBorderColor: string
    botTextColor: string
  }

  interface CustomizationResponse {
    success: boolean
    data: Customization
  }

  const customization = ref<Customization | null>(null)

  const colorFields = [
    {
      key: 'headerColor',
      label: 'Цвет заголовка',
      description: 'Фоновый цвет заголовка чата',
    },
    {
      key: 'headerTextColor',
      label: 'Цвет текста заголовка',
      description: 'Цвет текста в заголовке',
    },
    {
      key: 'backgroundColor',
      label: 'Цвет фона',
      description: 'Основной цвет фона чата',
    },
    {
      key: 'userColor',
      label: 'Цвет сообщений пользователя',
      description: 'Фон сообщений пользователя',
    },
    {
      key: 'userBorderColor',
      label: 'Цвет рамки пользователя',
      description: 'Цвет рамки сообщений пользователя',
    },
    {
      key: 'userTextColor',
      label: 'Цвет текста пользователя',
      description: 'Цвет текста в сообщениях пользователя',
    },
    {
      key: 'botColor',
      label: 'Цвет сообщений бота',
      description: 'Фон сообщений бота',
    },
    {
      key: 'botBorderColor',
      label: 'Цвет рамки бота',
      description: 'Цвет рамки сообщений бота',
    },
    {
      key: 'botTextColor',
      label: 'Цвет текста бота',
      description: 'Цвет текста в сообщениях бота',
    },
  ]

  const fetchCustomization = async () => {
    try {
      const { data, error } = await useAuthFetch<CustomizationResponse>(
        `/proxy/bots/${apiKeyStore.apiKeyInfo?.botId}/customization`
      )

      if (error.value) {
        throw new Error('Failed to fetch customization')
      }

      if (data.value?.success) {
        customization.value = data.value.data
      }
    } catch (e) {
      console.error('Error fetching customization:', e)
    }
  }

  const updateCustomization = async (field: string, value: string) => {
    if (customization.value) {
      customization.value = {
        ...customization.value,
        [field]: value,
      }
    }
  }

  const saveCustomization = async () => {
    try {
      const { error } = await useAuthFetch(
        `/proxy/bots/${apiKeyStore.apiKeyInfo?.botId}/customization`,
        {
          method: 'PATCH',
          body: JSON.stringify(customization.value),
        }
      )

      if (error.value) {
        throw new Error('Failed to update customization')
      }
    } catch (e) {
      console.error('Error updating customization:', e)
    }
  }

  // Состояния для таба обучения
  const categories = ref<string[]>([])
  const prompts = ref<Prompt[]>([])
  const selectedCategory = ref<string>('')
  const newPromptContent = ref('')
  const hasPDF = ref(false)
  const pdfFileName = ref('')
  const isUploading = ref(false)

  // Группировка промптов по категориям
  const promptsByCategory = computed(() => {
    const grouped: Record<string, Prompt[]> = {}
    categories.value.forEach((category) => {
      grouped[category] = prompts.value.filter((p) => p.category === category)
    })
    return grouped
  })

  const fetchTrainingData = async () => {
    try {
      const { data, error } = await useAuthFetch<BotInfoResponse>(
        `/proxy/bots/${apiKeyStore.apiKeyInfo?.botId}/info`
      )
      if (error.value) throw new Error('Failed to fetch bot info')
      if (data.value?.success) {
        categories.value = data.value.data.categories
        if (categories.value.length > 0) {
          selectedCategory.value = categories.value[0]
        }
      }
    } catch (e) {
      console.error('Error fetching training data:', e)
    }
  }

  const fetchPrompts = async () => {
    try {
      const { data, error } = await useAuthFetch<PromptsResponse>(
        `/proxy/bots/${apiKeyStore.apiKeyInfo?.botId}/prompts`
      )
      if (error.value) throw new Error('Failed to fetch prompts')
      if (data.value?.success) {
        prompts.value = data.value.data.prompts
      }
    } catch (e) {
      console.error('Error fetching prompts:', e)
    }
  }

  // Проверяем наличие PDF при загрузке
  const checkPDF = async () => {
    try {
      const { data, error } = await useAuthFetch<{
        success: boolean
        data: { hasFile: boolean; fileName: string }
      }>(`/proxy/bots/${apiKeyStore.apiKeyInfo?.botId}/pdf-info`)
      if (!error.value && data.value?.success) {
        hasPDF.value = data.value.data.hasFile
        pdfFileName.value = data.value.data.fileName
      }
    } catch (e) {
      console.error('Error checking PDF:', e)
    }
  }

  // Функция загрузки PDF
  const uploadPDF = async (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (!file) return

    isUploading.value = true
    const formData = new FormData()
    formData.append('botId', apiKeyStore.apiKeyInfo?.botId!)
    formData.append('file', file)

    try {
      const { error } = await useAuthFetch('/proxy/prompts/upload-pdf', {
        method: 'POST',
        body: formData,
      })
      if (error.value) throw new Error('Failed to upload PDF')
    } catch (e) {
      console.error('Error uploading PDF:', e)
    } finally {
      isUploading.value = false
      if (fileInput.value) {
        fileInput.value.value = '' // Сброс input после загрузки
      }
    }
  }

  // Функция скачивания PDF
  const downloadPDF = async () => {
    try {
      const { data } = await useAuthFetch(
        `/proxy/prompts/download-pdf/${apiKeyStore.apiKeyInfo?.botId}`,
        {
          responseType: 'blob',
        }
      )

      if (data.value) {
        const url = window.URL.createObjectURL(data.value)
        const a = document.createElement('a')
        a.href = url
        a.download = 'knowledge_base.pdf'
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (e) {
      console.error('Error downloading PDF:', e)
    }
  }

  // Обновляем watch для проверки PDF при переключении на таб обучения
  watch(currentTab, async (newTab) => {
    if (newTab === 'training') {
      await checkPDF()
    }
  })

  // Обновляем onMounted
  onMounted(async () => {
    if (apiKeyStore.apiKeyInfo?.botId && currentTab.value === 'training') {
      await checkPDF()
    }
  })

  const fileInput = ref<HTMLInputElement | null>(null)

  // Добавим интерфейс для ответа создания промпта
  interface CreatePromptResponse {
    success: boolean
    data: Prompt
  }

  // Функция создания промпта
  const createPrompt = async () => {
    if (!newPromptContent.value.trim()) return

    try {
      const { data, error } = await useAuthFetch<CreatePromptResponse>(
        '/proxy/prompts/create',
        {
          method: 'POST',
          body: JSON.stringify({
            botId: apiKeyStore.apiKeyInfo?.botId,
            category: selectedCategory.value,
            content: newPromptContent.value,
            isActive: true,
          }),
        }
      )

      if (error.value) throw new Error('Failed to create prompt')

      if (data.value?.success) {
        // Добавляем новый промпт в список
        prompts.value.push(data.value.data)
        // Очищаем поле ввода
        newPromptContent.value = ''
      }
    } catch (e) {
      console.error('Error creating prompt:', e)
    }
  }

  // Функция удаления промпта
  const deletePrompt = async (promptId: string) => {
    try {
      const { error } = await useAuthFetch('/proxy/prompts/delete', {
        method: 'POST',
        body: JSON.stringify({
          id: promptId,
        }),
      })

      if (error.value) throw new Error('Failed to delete prompt')

      // Удаляем промпт из списка
      prompts.value = prompts.value.filter((p) => p.id !== promptId)
    } catch (e) {
      console.error('Error deleting prompt:', e)
    }
  }
</script>

<template>
  <div v-if="isLoading" class="flex h-full items-center justify-center">
    <LoadingSpinner />
  </div>
  <div
    v-else
    class="flex h-full flex-col rounded-2xl bg-light-panels dark:bg-dark-panels"
  >
    <template v-if="apiKeyStore.apiKeyInfo?.botId">
      <div
        class="flex-none border-b border-light-text/5 dark:border-dark-text/5"
      >
        <div class="flex justify-center">
          <div class="flex gap-6">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              class="px-4 py-4 text-sm"
              :class="[
                currentTab === tab.id
                  ? 'text-light-text dark:text-dark-text'
                  : 'text-light-text/40 dark:text-dark-text/40',
              ]"
              @click="currentTab = tab.id"
            >
              {{ tab.name }}
            </button>
          </div>
        </div>
      </div>
    </template>

    <div class="scrollbar-hidden min-h-0 flex-1 overflow-y-auto p-8">
      <template v-if="!apiKeyStore.apiKeyInfo?.botId">
        <CreateBot />
      </template>

      <template v-else-if="currentTab === 'description' && botInfo">
        <div class="space-y-6">
          <div
            v-for="field in orderedFields"
            :key="field.key"
            class="group rounded-xl border border-light-text/5 bg-light-panels p-6 dark:border-dark-text/5 dark:bg-dark-panels"
          >
            <div class="mb-2 text-xs text-light-text/40 dark:text-dark-text/40">
              {{ field.label }}
            </div>
            <div
              v-if="!isEditing"
              class="whitespace-pre-wrap text-sm text-light-text dark:text-dark-text"
              @click="startEditing"
            >
              {{ botInfo[field.key as keyof BotInfo] }}
            </div>
            <textarea
              v-else
              v-model="editedInfo![field.key as keyof BotInfo]"
              rows="3"
              class="w-full rounded-xl border border-light-text/10 bg-transparent px-4 py-2 text-sm text-light-text outline-none transition-colors placeholder:text-light-text/40 focus:border-lightPink dark:border-dark-text/10 dark:text-dark-text dark:placeholder:text-dark-text/40"
            />
          </div>
        </div>

        <div v-if="isEditing" class="mt-6 flex justify-end gap-3">
          <button
            class="rounded-xl px-4 py-2 text-sm text-light-text/60 transition-colors hover:text-light-text dark:text-dark-text/60 dark:hover:text-dark-text"
            @click="isEditing = false"
          >
            Отмена
          </button>
          <GradientButton @click="saveChanges">Сохранить</GradientButton>
        </div>
      </template>

      <template v-else-if="currentTab === 'appearance' && customization">
        <div class="grid grid-cols-2 gap-8">
          <div class="space-y-6">
            <div
              class="rounded-xl border border-light-text/5 bg-light-panels p-6 dark:border-dark-text/5 dark:bg-dark-panels"
            >
              <div
                class="mb-4 text-sm font-medium text-light-text dark:text-dark-text"
              >
                Основные настройки
              </div>
              <div class="space-y-4">
                <div>
                  <div
                    class="mb-1 text-xs text-light-text/60 dark:text-dark-text/60"
                  >
                    Приветствие
                  </div>
                  <input
                    v-model="customization.greeting"
                    type="text"
                    class="w-full rounded-xl border border-light-text/10 bg-transparent px-4 py-2 text-sm text-light-text outline-none transition-colors placeholder:text-light-text/40 focus:border-lightPink dark:border-dark-text/10 dark:text-dark-text dark:placeholder:text-dark-text/40"
                  />
                </div>
                <div>
                  <div
                    class="mb-1 text-xs text-light-text/60 dark:text-dark-text/60"
                  >
                    Заголовок
                  </div>
                  <input
                    v-model="customization.headerTitle"
                    type="text"
                    class="w-full rounded-xl border border-light-text/10 bg-transparent px-4 py-2 text-sm text-light-text outline-none transition-colors placeholder:text-light-text/40 focus:border-lightPink dark:border-dark-text/10 dark:text-dark-text dark:placeholder:text-dark-text/40"
                  />
                </div>
              </div>
            </div>

            <div
              class="rounded-xl border border-light-text/5 bg-light-panels p-6 dark:border-dark-text/5 dark:bg-dark-panels"
            >
              <div
                class="mb-4 text-sm font-medium text-light-text dark:text-dark-text"
              >
                Цвета тона и заголовка
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div
                  v-for="field in colorFields.filter(
                    (f) =>
                      f.key.includes('header') || f.key === 'backgroundColor'
                  )"
                  :key="field.key"
                >
                  <div
                    class="mb-1 text-xs text-light-text/60 dark:text-dark-text/60"
                  >
                    {{ field.label }}
                  </div>
                  <div class="flex items-center gap-2">
                    <div
                      class="h-8 w-8 rounded-lg border border-light-text/10 dark:border-dark-text/10"
                      :style="{
                        backgroundColor:
                          customization[field.key as keyof Customization],
                      }"
                    />
                    <input
                      :value="customization[field.key as keyof Customization]"
                      type="color"
                      class="h-8 flex-1"
                      @input="
                        (e) =>
                          updateCustomization(
                            field.key,
                            (e.target as HTMLInputElement).value
                          )
                      "
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              class="rounded-xl border border-light-text/5 bg-light-panels p-6 dark:border-dark-text/5 dark:bg-dark-panels"
            >
              <div
                class="mb-4 text-sm font-medium text-light-text dark:text-dark-text"
              >
                Сообщения пользователя
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div
                  v-for="field in colorFields.filter((f) =>
                    f.key.includes('user')
                  )"
                  :key="field.key"
                >
                  <div
                    class="mb-1 text-xs text-light-text/60 dark:text-dark-text/60"
                  >
                    {{ field.label }}
                  </div>
                  <div class="flex items-center gap-2">
                    <div
                      class="h-8 w-8 rounded-lg border border-light-text/10 dark:border-dark-text/10"
                      :style="{
                        backgroundColor:
                          customization[field.key as keyof Customization],
                      }"
                    />
                    <input
                      :value="customization[field.key as keyof Customization]"
                      type="color"
                      class="h-8 flex-1"
                      @input="
                        (e) =>
                          updateCustomization(
                            field.key,
                            (e.target as HTMLInputElement).value
                          )
                      "
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              class="rounded-xl border border-light-text/5 bg-light-panels p-6 dark:border-dark-text/5 dark:bg-dark-panels"
            >
              <div
                class="mb-4 text-sm font-medium text-light-text dark:text-dark-text"
              >
                Сообщения бота
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div
                  v-for="field in colorFields.filter((f) =>
                    f.key.includes('bot')
                  )"
                  :key="field.key"
                >
                  <div
                    class="mb-1 text-xs text-light-text/60 dark:text-dark-text/60"
                  >
                    {{ field.label }}
                  </div>
                  <div class="flex items-center gap-2">
                    <div
                      class="h-8 w-8 rounded-lg border border-light-text/10 dark:border-dark-text/10"
                      :style="{
                        backgroundColor:
                          customization[field.key as keyof Customization],
                      }"
                    />
                    <input
                      :value="customization[field.key as keyof Customization]"
                      type="color"
                      class="h-8 flex-1"
                      @input="
                        (e) =>
                          updateCustomization(
                            field.key,
                            (e.target as HTMLInputElement).value
                          )
                      "
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="flex justify-end">
              <GradientButton @click="saveCustomization">
                Сохранить изменения
              </GradientButton>
            </div>
          </div>

          <div class="sticky top-0 w-[460px]">
            <ChatPreview :customization="customization" />
          </div>
        </div>
      </template>

      <template v-else-if="currentTab === 'training'">
        <div class="space-y-6">
          <!-- Категории -->
          <div class="flex gap-4">
            <button
              v-for="category in categories"
              :key="category"
              class="rounded-xl px-4 py-2 text-sm transition-colors"
              :class="[
                selectedCategory === category
                  ? 'bg-gradient-to-br from-lightPink to-lightBlue text-white'
                  : 'text-light-text/60 hover:text-light-text dark:text-dark-text/60 dark:hover:text-dark-text',
              ]"
              @click="selectedCategory = category"
            >
              {{ category }}
              <span
                v-if="promptsByCategory[category]?.length"
                class="ml-2 rounded-full bg-light-text/10 px-2 py-0.5 text-xs dark:bg-dark-text/10"
              >
                {{ promptsByCategory[category].length }}
              </span>
            </button>
          </div>

          <!-- Список промптов и форма создания -->
          <div v-if="selectedCategory" class="space-y-4">
            <!-- Форма создания промпта -->
            <div
              class="rounded-xl border border-light-text/5 bg-light-panels p-6 dark:border-dark-text/5 dark:bg-dark-panels"
            >
              <div
                class="mb-4 text-sm font-medium text-light-text dark:text-dark-text"
              >
                Новый промпт в категории "{{ selectedCategory }}"
              </div>
              <div class="space-y-4">
                <textarea
                  v-model="newPromptContent"
                  rows="4"
                  class="w-full rounded-xl border border-light-text/10 bg-transparent px-4 py-2 text-sm text-light-text outline-none transition-colors placeholder:text-light-text/40 focus:border-lightPink dark:border-dark-text/10 dark:text-dark-text dark:placeholder:text-dark-text/40"
                  placeholder="Введите текст промпта..."
                />
                <div class="flex justify-end">
                  <GradientButton
                    :disabled="!newPromptContent.trim()"
                    @click="createPrompt"
                  >
                    Создать
                  </GradientButton>
                </div>
              </div>
            </div>

            <!-- Список промптов -->
            <div
              v-for="prompt in promptsByCategory[selectedCategory] || []"
              :key="prompt.id"
              class="rounded-xl border border-light-text/5 bg-light-panels p-6 dark:border-dark-text/5 dark:bg-dark-panels"
            >
              <div class="flex items-start justify-between">
                <div>
                  <div
                    class="whitespace-pre-wrap text-sm text-light-text dark:text-dark-text"
                  >
                    {{ prompt.content }}
                  </div>
                  <div
                    class="mt-2 text-xs text-light-text/40 dark:text-dark-text/40"
                  >
                    Обновлено: {{ new Date(prompt.updatedAt).toLocaleString() }}
                  </div>
                </div>
                <button
                  class="ml-4 text-light-text/40 hover:text-light-text dark:text-dark-text/40 dark:hover:text-dark-text"
                  @click="deletePrompt(prompt.id)"
                >
                  <Icon name="heroicons:trash" class="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <!-- Загрузка PDF -->
          <div
            class="rounded-xl border border-light-text/5 bg-light-panels p-6 dark:border-dark-text/5 dark:bg-dark-panels"
          >
            <div
              class="mb-4 text-sm font-medium text-light-text dark:text-dark-text"
            >
              База знаний (PDF)
            </div>
            <div class="flex items-center gap-4">
              <input
                type="file"
                accept=".pdf"
                class="hidden"
                @change="uploadPDF"
                ref="fileInput"
              />
              <GradientButton
                :disabled="isUploading"
                @click="fileInput?.click()"
              >
                <div class="flex items-center gap-2">
                  <Icon
                    v-if="isUploading"
                    name="heroicons:arrow-path"
                    class="h-4 w-4 animate-spin"
                  />
                  {{ isUploading ? 'Загрузка...' : 'Загрузить PDF' }}
                </div>
              </GradientButton>
              <GradientButton variant="secondary" @click="downloadPDF">
                <div class="flex items-center gap-2">
                  <Icon name="heroicons:arrow-down-tray" class="h-4 w-4" />
                  Скачать PDF
                </div>
              </GradientButton>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .group {
    cursor: pointer;
    transition: all 0.2s;
  }

  .group:hover {
    border-color: rgb(var(--color-light-text) / 0.1);
  }

  .dark .group:hover {
    border-color: rgb(var(--color-dark-text) / 0.1);
  }

  .scrollbar-hidden {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .scrollbar-hidden::-webkit-scrollbar {
    display: none;
  }
</style>
