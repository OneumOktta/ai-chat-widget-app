<script setup lang="ts">
  import {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
  } from '@headlessui/vue'
  import { useApiKeyStore } from '~/stores/apiKey.store'

  interface BotFormData {
    id: string
    title: string
    description?: string
    role?: string
    tasks?: string
    emotionalProfile?: string
    context?: string
    example?: string
    notes?: string
    categories?: string[]
  }

  interface BotSubmitData {
    apiKeyId?: string
    role?: string
    tasks?: string
    emotionalProfile?: string
    context?: string
    example?: string
    notes?: string
    categories?: string[]
  }

  const props = defineProps<{
    preset: BotFormData
    isOpen: boolean
  }>()

  const emit = defineEmits<{
    close: []
    submit: [data: BotSubmitData]
  }>()

  const apiKeyStore = useApiKeyStore()

  const formData = ref<BotFormData>({
    id: props.preset.id,
    title: props.preset.title,
    description: props.preset.description || '',
    role: props.preset.role || '',
    tasks: props.preset.tasks || '',
    emotionalProfile: props.preset.emotionalProfile || '',
    context: props.preset.context || '',
    example: props.preset.example || '',
    notes: props.preset.notes || '',
    categories: props.preset.categories || [],
  })

  watch(
    () => props.preset,
    (newPreset) => {
      formData.value = {
        id: newPreset.id,
        title: newPreset.title,
        description: newPreset.description || '',
        role: newPreset.role || '',
        tasks: newPreset.tasks || '',
        emotionalProfile: newPreset.emotionalProfile || '',
        context: newPreset.context || '',
        example: newPreset.example || '',
        notes: newPreset.notes || '',
        categories: newPreset.categories || [],
      }
    },
    { deep: true }
  )

  const submitForm = () => {
    const botData = {
      apiKeyId: apiKeyStore.apiKeyInfo?.id,
      role: formData.value.role,
      tasks: formData.value.tasks,
      emotionalProfile: formData.value.emotionalProfile,
      context: formData.value.context,
      example: formData.value.example,
      notes: formData.value.notes,
      categories: formData.value.categories,
    }

    emit('submit', botData)
  }

  const newCategory = ref('')

  const addCategory = () => {
    if (
      newCategory.value &&
      !formData.value.categories?.includes(newCategory.value)
    ) {
      formData.value.categories = [
        ...(formData.value.categories || []),
        newCategory.value,
      ]
      newCategory.value = ''
    }
  }

  const removeCategory = (category: string) => {
    formData.value.categories =
      formData.value.categories?.filter((c) => c !== category) || []
  }
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-50" @close="emit('close')">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <TransitionChild>
            <DialogPanel
              class="flex h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-light-panels p-8 text-left shadow-xl transition-all dark:bg-dark-panels"
            >
              <DialogTitle
                as="h3"
                class="flex-none text-base font-medium text-light-text dark:text-dark-text"
              >
                {{
                  preset.id === 'custom' ? 'Создание бота' : 'Настройка бота'
                }}
              </DialogTitle>

              <div class="scrollbar-hidden mt-6 flex-1 overflow-y-auto pr-2">
                <div class="grid h-full grid-cols-2 gap-8">
                  <div class="space-y-6">
                    <div>
                      <label
                        class="mb-2 block text-xs text-light-text/60 dark:text-dark-text/60"
                      >
                        Название бота
                      </label>
                      <input
                        v-model="formData.title"
                        type="text"
                        class="w-full rounded-xl border border-light-text/10 bg-transparent px-4 py-3 text-sm text-light-text outline-none transition-colors placeholder:text-light-text/40 focus:border-lightPink dark:border-dark-text/10 dark:text-dark-text dark:placeholder:text-dark-text/40"
                      />
                    </div>

                    <div>
                      <label
                        class="mb-2 block text-xs text-light-text/60 dark:text-dark-text/60"
                      >
                        Описание
                      </label>
                      <textarea
                        v-model="formData.description"
                        rows="5"
                        class="w-full rounded-xl border border-light-text/10 bg-transparent px-4 py-3 text-sm text-light-text outline-none transition-colors placeholder:text-light-text/40 focus:border-lightPink dark:border-dark-text/10 dark:text-dark-text dark:placeholder:text-dark-text/40"
                      />
                    </div>

                    <div>
                      <label
                        class="mb-2 block text-xs text-light-text/60 dark:text-dark-text/60"
                      >
                        Роль
                      </label>
                      <textarea
                        v-model="formData.role"
                        rows="3"
                        class="w-full rounded-xl border border-light-text/10 bg-transparent px-4 py-3 text-sm text-light-text outline-none transition-colors placeholder:text-light-text/40 focus:border-lightPink dark:border-dark-text/10 dark:text-dark-text dark:placeholder:text-dark-text/40"
                      />
                    </div>

                    <div>
                      <label
                        class="mb-2 block text-xs text-light-text/60 dark:text-dark-text/60"
                      >
                        Задачи
                      </label>
                      <textarea
                        v-model="formData.tasks"
                        rows="5"
                        class="w-full rounded-xl border border-light-text/10 bg-transparent px-4 py-3 text-sm text-light-text outline-none transition-colors placeholder:text-light-text/40 focus:border-lightPink dark:border-dark-text/10 dark:text-dark-text dark:placeholder:text-dark-text/40"
                      />
                    </div>

                    <div>
                      <label
                        class="mb-2 block text-xs text-light-text/60 dark:text-dark-text/60"
                      >
                        Эмоциональный профиль
                      </label>
                      <textarea
                        v-model="formData.emotionalProfile"
                        rows="4"
                        class="w-full rounded-xl border border-light-text/10 bg-transparent px-4 py-3 text-sm text-light-text outline-none transition-colors placeholder:text-light-text/40 focus:border-lightPink dark:border-dark-text/10 dark:text-dark-text dark:placeholder:text-dark-text/40"
                      />
                    </div>
                  </div>

                  <div class="space-y-6">
                    <div>
                      <label
                        class="mb-2 block text-xs text-light-text/60 dark:text-dark-text/60"
                      >
                        Контекст
                      </label>
                      <textarea
                        v-model="formData.context"
                        rows="3"
                        class="w-full rounded-xl border border-light-text/10 bg-transparent px-4 py-2 text-sm text-light-text outline-none transition-colors placeholder:text-light-text/40 focus:border-lightPink dark:border-dark-text/10 dark:text-dark-text dark:placeholder:text-dark-text/40"
                      />
                    </div>

                    <div>
                      <label
                        class="mb-2 block text-xs text-light-text/60 dark:text-dark-text/60"
                      >
                        Пример диалога
                      </label>
                      <textarea
                        v-model="formData.example"
                        rows="3"
                        class="w-full rounded-xl border border-light-text/10 bg-transparent px-4 py-2 text-sm text-light-text outline-none transition-colors placeholder:text-light-text/40 focus:border-lightPink dark:border-dark-text/10 dark:text-dark-text dark:placeholder:text-dark-text/40"
                      />
                    </div>

                    <div>
                      <label
                        class="mb-2 block text-xs text-light-text/60 dark:text-dark-text/60"
                      >
                        Заметки
                      </label>
                      <textarea
                        v-model="formData.notes"
                        rows="2"
                        class="w-full rounded-xl border border-light-text/10 bg-transparent px-4 py-2 text-sm text-light-text outline-none transition-colors placeholder:text-light-text/40 focus:border-lightPink dark:border-dark-text/10 dark:text-dark-text dark:placeholder:text-dark-text/40"
                      />
                    </div>

                    <div>
                      <label
                        class="mb-1 block text-xs text-light-text/60 dark:text-dark-text/60"
                      >
                        Категории
                      </label>
                      <div class="mb-2 flex flex-wrap gap-2">
                        <span
                          v-for="category in formData.categories"
                          :key="category"
                          class="flex items-center gap-1 rounded-lg bg-light-background/50 px-2 py-1 text-xs text-light-text/60 dark:bg-dark-background/50 dark:text-dark-text/60"
                        >
                          {{ category }}
                          <button
                            class="text-light-text/40 hover:text-light-text dark:text-dark-text/40 dark:hover:text-dark-text"
                            @click.stop="removeCategory(category)"
                          >
                            <Icon
                              name="material-symbols:close"
                              class="h-3 w-3"
                            />
                          </button>
                        </span>
                      </div>
                      <div class="flex gap-2">
                        <input
                          v-model="newCategory"
                          type="text"
                          placeholder="Добавить категорию"
                          class="flex-1 rounded-xl border border-light-text/10 bg-transparent px-4 py-2 text-sm text-light-text outline-none transition-colors placeholder:text-light-text/40 focus:border-lightPink dark:border-dark-text/10 dark:text-dark-text dark:placeholder:text-dark-text/40"
                          @keyup.enter="addCategory"
                        />
                        <button
                          class="rounded-xl bg-light-background px-4 py-2 text-sm text-light-text/60 transition-colors hover:text-light-text dark:bg-dark-background dark:text-dark-text/60 dark:hover:text-dark-text"
                          @click="addCategory"
                        >
                          Добавить
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-6 flex flex-none justify-end gap-3">
                <button
                  type="button"
                  class="rounded-xl px-4 py-2 text-sm text-light-text/60 transition-colors hover:text-light-text dark:text-dark-text/60 dark:hover:text-dark-text"
                  @click="emit('close')"
                >
                  Отмена
                </button>
                <GradientButton @click="submitForm">Создать</GradientButton>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped>
  .scrollbar-hidden,
  textarea {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .scrollbar-hidden::-webkit-scrollbar,
  textarea::-webkit-scrollbar {
    display: none;
  }

  textarea {
    scrollbar-width: thin;
    scrollbar-color: rgba(var(--color-light-text), 0.1) transparent;
  }

  textarea::-webkit-scrollbar {
    width: 4px;
  }

  textarea::-webkit-scrollbar-track {
    background: transparent;
  }

  textarea::-webkit-scrollbar-thumb {
    background-color: rgba(var(--color-light-text), 0.1);
    border-radius: 20px;
  }

  .dark textarea {
    scrollbar-color: rgba(var(--color-dark-text), 0.1) transparent;
  }

  .dark textarea::-webkit-scrollbar-thumb {
    background-color: rgba(var(--color-dark-text), 0.1);
  }
</style>
