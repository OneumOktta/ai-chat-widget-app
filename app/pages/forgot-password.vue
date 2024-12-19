<script setup lang="ts">
  import type { FetchError } from 'ofetch'
  import { ref } from 'vue'
  import { z } from 'zod'
  import { translateError } from '~/schemas/auth.schema'

  const email = ref('')
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)

  const emailSchema = z
    .string({
      required_error: 'Email обязателен для заполнения',
    })
    .email('Введите корректный email')

  const handleSubmit = async () => {
    try {
      loading.value = true
      error.value = null
      success.value = false

      emailSchema.parse(email.value)

      const response = await $fetch<{ success: boolean; message: string }>(
        `${useRuntimeConfig().public.apiBaseUrl}/users/forgot-password`,
        {
          method: 'POST',
          body: { email: email.value },
        }
      )

      if (response.success) {
        success.value = true
        email.value = ''
      }
    } catch (err) {
      if (err instanceof z.ZodError && err.errors[0]?.message) {
        error.value = err.errors[0].message
      } else {
        const fetchError = err as FetchError<{ message: string }>
        error.value =
          translateError(fetchError.data?.message) ||
          'Ошибка при отправке запроса'
      }
    } finally {
      loading.value = false
    }
  }
</script>

<template>
  <div
    class="mx-auto w-full max-w-[400px] px-4 sm:max-w-[450px] sm:px-0 md:max-w-[500px] lg:max-w-[550px]"
  >
    <h1 class="mb-10 text-center text-3xl font-semibold">
      Восстановление пароля
    </h1>

    <form class="space-y-4" @submit.prevent="handleSubmit">
      <BaseInput
        id="email"
        v-model="email"
        type="email"
        label="Электронная почта"
        icon="basil:envelope-outline"
        required
      />

      <div class="space-y-10 pt-8">
        <div v-if="error" class="text-center text-red-500">
          {{ error }}
        </div>

        <div v-if="success" class="text-center text-green-500">
          Инструкции по восстановлению пароля отправлены на ваш email
        </div>

        <GradientButton type="submit" class="w-full" :disabled="loading">
          {{ loading ? 'Отправка...' : 'Отправить' }}
        </GradientButton>

        <div class="text-center">
          <p class="text-light-text/60 dark:text-dark-text/60">
            Вспомнили пароль?
            <NuxtLink
              to="/login"
              class="text-lightPink transition-colors hover:text-lightBlue"
            >
              Вход
            </NuxtLink>
          </p>
        </div>
      </div>
    </form>
  </div>
</template>
