<script setup lang="ts">
  import type { FetchError } from 'ofetch'
  import { z } from 'zod'
  import { resendActivationSchema, translateError } from '~/schemas/auth.schema'

  const route = useRoute()
  const router = useRouter()
  const loading = ref(true)
  const error = ref<string | null>(null)
  const success = ref(false)
  const showResendForm = ref(false)
  const email = ref('')
  const resendLoading = ref(false)
  const resendSuccess = ref(false)
  const resendError = ref<string | null>(null)

  onMounted(async () => {
    const token = route.query.token as string

    if (!token) {
      error.value = 'Отсутствует токен активации'
      loading.value = false
      return
    }

    try {
      const response = await $fetch<{ success: boolean }>(
        `${useRuntimeConfig().public.apiBaseUrl}/users/activation`,
        {
          method: 'GET',
          params: { token },
        }
      )

      if (response.success) {
        success.value = true
      }
    } catch (err) {
      error.value =
        'Ошибка при активации аккаунта. Возможно, ссылка устарела или недействительна.'
    } finally {
      loading.value = false
    }
  })

  const handleResend = async () => {
    try {
      resendError.value = null
      resendActivationSchema.parse({ email: email.value })

      resendLoading.value = true
      const response = await $fetch<{ success: boolean }>(
        `${useRuntimeConfig().public.apiBaseUrl}/users/resend-activation`,
        {
          method: 'POST',
          body: { email: email.value },
        }
      )

      if (response.success) {
        resendSuccess.value = true
        showResendForm.value = false
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      }
    } catch (err) {
      if (err instanceof z.ZodError && err.errors[0]?.message) {
        resendError.value = err.errors[0].message
      } else {
        const fetchError = err as FetchError<{ message: string }>
        resendError.value =
          translateError(fetchError.data?.message) ||
          'Ошибка при отправке ссылки активации'
      }
    } finally {
      resendLoading.value = false
    }
  }
</script>

<template>
  <div class="flex items-center justify-center px-4">
    <div
      class="w-full max-w-[400px] rounded-2xl bg-light-background p-8 dark:bg-dark-background sm:max-w-[450px] md:max-w-[500px] lg:max-w-[550px]"
    >
      <template v-if="loading">
        <div class="text-center">
          <h2
            class="mb-4 text-2xl font-semibold text-light-text dark:text-dark-text"
          >
            Активация аккаунта...
          </h2>
          <p class="text-light-text/60 dark:text-dark-text/60">
            Пожалуйста, подождите
          </p>
        </div>
      </template>

      <template v-else-if="error">
        <div class="text-center">
          <h2 class="mb-4 text-2xl font-semibold text-red-500">
            Ошибка активации
          </h2>
          <p class="mb-6 text-light-text/60 dark:text-dark-text/60">
            {{ error }}
          </p>

          <div v-if="!showResendForm" class="space-y-4">
            <GradientButton class="w-full" @click="showResendForm = true">
              Отправить ссылку повторно
            </GradientButton>
            <GradientButton
              class="w-full"
              @click="router.push('/registration')"
            >
              Вернуться к регистрации
            </GradientButton>
          </div>

          <div v-else class="space-y-4">
            <BaseInput
              id="resend-email"
              v-model="email"
              type="email"
              label="Email"
              icon="basil:envelope-outline"
              required
            />
            <div v-if="resendError" class="text-red-500">
              {{ resendError }}
            </div>
            <div v-if="resendSuccess" class="text-green-500">
              Новая ссылка активации отправлена на ваш email
            </div>
            <GradientButton
              class="w-full"
              :disabled="resendLoading"
              @click="handleResend"
            >
              {{ resendLoading ? 'Отправка...' : 'Отправить' }}
            </GradientButton>
            <button
              class="text-light-text/60 hover:text-light-text dark:text-dark-text/60 dark:hover:text-dark-text"
              @click="showResendForm = false"
            >
              Отмена
            </button>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="text-center">
          <h2 class="mb-4 text-2xl font-semibold text-green-500">
            Аккаунт успешно активирован!
          </h2>
          <p class="mb-6 text-light-text/60 dark:text-dark-text/60">
            Теперь вы можете войти в систему
          </p>
          <GradientButton class="w-full" @click="router.push('/login')">
            Перейти ко входу
          </GradientButton>
        </div>
      </template>
    </div>
  </div>
</template>
