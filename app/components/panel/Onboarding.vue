<script setup lang="ts">
  import {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
  } from '@headlessui/vue'
  import { useRouter } from 'vue-router'
  import { useAuthFetch } from '~/composables/useAuthFetch'
  import { useApiKeyStore } from '~/stores/apiKey.store'
  import { usePanelStore } from '~/stores/panel.store'

  const currentStep = ref(0)
  const showCreateKeyModal = ref(false)
  const keyTitle = ref('')
  const error = ref('')
  const isSuccess = ref(false)

  interface ApiResponse {
    success: boolean
    data: {
      apiKey: {
        id: string
        owner: string
        title: string
        tokenLimit: number
        isActive: boolean
        createdAt: string
        expiredAt: string
      }
    }
  }

  const createdKeyData = ref<ApiResponse | null>(null)

  const router = useRouter()
  const panelStore = usePanelStore()
  const apiKeyStore = useApiKeyStore()

  const steps = [
    {
      title: 'Добро пожаловать!',
      description:
        'Поздравляем вас с началом работы с нашим мощным инструментом для управления чат-ботами и анализа взаимодействий с клиентами. Давайте начнем с простого гида по основным функциям нашего сервиса.',
      buttonText: 'Начать',
    },
    {
      title: 'Ваша главная панель управления',
      description:
        'Здесь вы найдете всю необходимую информацию о ваших чат-ботах, клиентах и статистике. Вы можете отслеживать активность, создавать новые боты и настраивать существующие прямо отсюда.',
      buttonText: 'Продолжить',
      skipText: 'Пропустить обучение',
      image: {
        light: '/onboarding/onb-light-1.png',
        dark: '/onboarding/onb-dark-1.png',
      },
    },
    {
      title: 'Диалоги',
      description:
        'Здесь вы можете получить прямой доступ к переписке, отвечать на любые сообщения самостоятельно или просматривать ответы бота.',
      buttonText: 'Продолжить',
      skipText: 'Пропустить обучение',
      image: {
        light: '/onboarding/onb-light-2.png',
        dark: '/onboarding/onb-dark-2.png',
      },
    },
    {
      title: 'Готово!',
      description:
        'Отличная работа! Вы прошли через основные этапы платформы. Если у вас возникнут вопросы, всегда обращайтесь к нашим обучающим материалам или свяжитесь с нами для получения помощи.',
      buttonText: 'Начать пробный период',
      image: {
        light: '/onboarding/onb-light-1.png',
        dark: '/onboarding/onb-dark-1.png',
      },
    },
  ]

  const nextStep = () => {
    if (currentStep.value < steps.length - 1) {
      currentStep.value++
    } else {
      showCreateKeyModal.value = true
    }
  }

  const createTrialKey = async () => {
    error.value = ''

    try {
      const { data, error: fetchError } = await useAuthFetch<ApiResponse>(
        '/proxy/api-keys/create-trial-key',
        {
          method: 'POST',
          body: {
            title: keyTitle.value,
          },
        }
      )

      if (fetchError.value) {
        const err = fetchError.value as { data: { message: string } }
        throw new Error(err.data?.message || 'Не удалось создать пробный ключ')
      }

      if (data.value) {
        createdKeyData.value = data.value
        isSuccess.value = true
      }
    } catch (e) {
      error.value =
        e instanceof Error ? e.message : 'Произошла ошибка при создании ключа'
    }
  }

  const goToNeuronet = async () => {
    try {
      if (!createdKeyData.value?.data?.apiKey?.id) {
        throw new Error('No key data available')
      }

      await Promise.all([
        panelStore.fetchUserData(),
        apiKeyStore.fetchApiKeyData(createdKeyData.value.data.apiKey.id),
      ])
      router.push('/panel/neuronet')
    } catch (e) {
      console.error('Error updating stores:', e)
      router.push('/panel/neuronet')
    }
  }
</script>

<template>
  <div
    class="relative h-full w-full overflow-hidden rounded-2xl bg-light-panels dark:bg-dark-panels"
  >
    <!-- Градиентные пятна -->
    <div
      class="absolute left-0 top-0 h-[500px] w-[500px] -translate-x-1/3 -translate-y-1/3"
    >
      <div
        class="animate-pulse-slow h-full w-full rounded-full bg-gradient-to-br from-lightPink/80 to-lightBlue/80 blur-3xl"
      />
    </div>
    <div
      class="absolute bottom-0 right-0 h-[500px] w-[500px] translate-x-1/3 translate-y-1/3"
    >
      <div
        class="animate-pulse-slow h-full w-full rounded-full bg-gradient-to-tl from-paleViolet/80 to-lightPink/80 blur-3xl"
      />
    </div>

    <!-- Контент -->
    <div class="relative h-full w-full">
      <template v-if="currentStep === 0">
        <div
          class="flex h-full w-full flex-col items-center justify-center px-4"
        >
          <div class="w-full max-w-2xl text-center">
            <h2
              class="mb-6 text-2xl font-bold text-light-text dark:text-dark-text sm:text-3xl"
            >
              {{ steps[currentStep]?.title }}
            </h2>
            <p
              class="mb-8 text-base text-light-text/60 dark:text-dark-text/60 sm:text-lg"
            >
              {{ steps[currentStep]?.description }}
            </p>
            <GradientButton class="mx-auto w-full max-w-xs" @click="nextStep">
              {{ steps[currentStep]?.buttonText }}
            </GradientButton>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="grid h-full grid-cols-2">
          <!-- Левая колонка с текстом -->
          <div class="flex flex-col justify-center p-8 sm:p-12">
            <div class="max-w-xl">
              <h2
                class="mb-6 text-2xl font-bold text-light-text dark:text-dark-text sm:text-3xl"
              >
                {{ steps[currentStep]?.title }}
              </h2>
              <p
                class="mb-8 text-base text-light-text/60 dark:text-dark-text/60 sm:text-lg"
              >
                {{ steps[currentStep]?.description }}
              </p>
              <div class="flex flex-col gap-4">
                <div class="flex flex-col items-center gap-4">
                  <GradientButton class="w-full max-w-xs" @click="nextStep">
                    {{ steps[currentStep]?.buttonText }}
                  </GradientButton>
                  <button
                    class="text-light-text/60 hover:text-light-text dark:text-dark-text/60 dark:hover:text-dark-text"
                    @click="nextStep"
                  >
                    {{ steps[currentStep]?.skipText }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Правая колонка с изображением -->
          <div class="relative h-full overflow-hidden">
            <img
              :src="steps[currentStep]?.image?.light"
              class="h-full w-[120%] object-cover object-left dark:hidden"
              alt="Панель управления"
            />
            <img
              :src="steps[currentStep]?.image?.dark"
              class="hidden h-full w-[120%] object-cover object-left dark:block"
              alt="Панель управления"
            />
          </div>
        </div>
      </template>

      <!-- Индикатор прогресса -->
      <div
        class="absolute bottom-8 left-1/2 flex -translate-x-1/2 justify-center gap-2"
      >
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="h-2 w-2 rounded-full transition-colors"
          :class="[
            index === currentStep
              ? 'bg-paleViolet'
              : 'bg-light-text/20 dark:bg-dark-text/20',
          ]"
        />
      </div>
    </div>

    <!-- Модальное окно -->
    <TransitionRoot appear :show="showCreateKeyModal" as="template">
      <Dialog
        as="div"
        class="relative z-50"
        @close="showCreateKeyModal = false"
      >
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
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-light-panels p-6 text-left align-middle shadow-xl transition-all dark:bg-dark-panels"
              >
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-light-text dark:text-dark-text"
                >
                  {{ isSuccess ? 'Успех!' : 'Создание пробного ключа' }}
                </DialogTitle>

                <div v-if="!isSuccess" class="mt-4">
                  <input
                    v-model="keyTitle"
                    type="text"
                    placeholder="Название ключа"
                    class="w-full rounded-xl border border-light-text/10 bg-transparent px-4 py-2 text-light-text outline-none transition-colors placeholder:text-light-text/40 focus:border-lightPink dark:border-dark-text/10 dark:text-dark-text dark:placeholder:text-dark-text/40 dark:focus:border-lightPink"
                  />
                  <p v-if="error" class="mt-2 text-sm text-red-500">
                    {{ error }}
                  </p>
                </div>

                <div v-else class="mt-4">
                  <p class="text-light-text/60 dark:text-dark-text/60">
                    Пробный ключ успешно создан! Теперь вы можете перейти к
                    настройке нейросети.
                  </p>
                </div>

                <div class="mt-6 flex justify-end gap-3">
                  <button
                    v-if="!isSuccess"
                    type="button"
                    class="rounded-xl px-4 py-2 text-light-text/60 transition-colors hover:text-light-text dark:text-dark-text/60 dark:hover:text-dark-text"
                    @click="showCreateKeyModal = false"
                  >
                    Отмена
                  </button>
                  <GradientButton
                    v-if="!isSuccess"
                    :disabled="!keyTitle"
                    @click="createTrialKey"
                  >
                    Создать
                  </GradientButton>
                  <GradientButton v-else @click="goToNeuronet">
                    Перейти к настройке
                  </GradientButton>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>
