<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { z } from 'zod'
  import { resetPasswordSchema } from '~/schemas/auth.schema'

  const route = useRoute()
  const router = useRouter()

  const formData = ref({
    newPassword: '',
    passwordConfirm: '',
  })

  const loading = ref(true)
  const error = ref<string | null>(null)
  const success = ref(false)

  watch(
    formData,
    () => {
      error.value = null
    },
    { deep: true }
  )

  onMounted(() => {
    const token = route.query.token as string

    if (!token) {
      error.value = 'Отсутствует токен для сброса пароля'
      router.push('/forgot-password')
    }
    loading.value = false
  })

  const handleSubmit = async () => {
    try {
      error.value = null

      if (!formData.value.passwordConfirm) {
        error.value = 'Подтвердите пароль'
        return
      }

      if (!formData.value.newPassword) {
        error.value = 'Введите новый пароль'
        return
      }

      if (formData.value.newPassword !== formData.value.passwordConfirm) {
        error.value = 'Пароли не совпадают'
        return
      }

      resetPasswordSchema.parse(formData.value)

      loading.value = true
      const response = await $fetch<{ success: boolean; message: string }>(
        `${useRuntimeConfig().public.apiBaseUrl}/users/reset-password`,
        {
          method: 'POST',
          body: {
            token: route.query.token,
            password: formData.value.newPassword,
            passwordConfirm: formData.value.passwordConfirm,
          },
        }
      )

      if (response.success) {
        success.value = true
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      }
    } catch (err) {
      if (err instanceof z.ZodError && err.errors[0]?.message) {
        error.value = err.errors[0].message
      } else {
        error.value = 'Ошибка при сбросе пароля'
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
    <template v-if="loading">
      <div class="text-center">
        <h2
          class="mb-4 text-2xl font-semibold text-light-text dark:text-dark-text"
        >
          Проверка токена...
        </h2>
        <p class="text-light-text/60 dark:text-dark-text/60">
          Пожалуйста, подождите
        </p>
      </div>
    </template>

    <template v-else>
      <template v-if="!success">
        <h1 class="mb-10 text-center text-3xl font-semibold">
          Установка нового пароля
        </h1>

        <form class="space-y-4" @submit.prevent="handleSubmit">
          <BaseInput
            id="newPassword"
            v-model="formData.newPassword"
            type="password"
            label="Новый пароль"
            icon="basil:lock-outline"
            required
          />
          <BaseInput
            id="passwordConfirm"
            v-model="formData.passwordConfirm"
            type="password"
            label="Подтвердите пароль"
            icon="basil:lock-outline"
            required
          />

          <div class="space-y-10 pt-8">
            <div v-if="error" class="text-center text-red-500">
              {{ error }}
            </div>

            <GradientButton type="submit" class="w-full" :disabled="loading">
              {{ loading ? 'Сохранение...' : 'Сохранить' }}
            </GradientButton>
          </div>
        </form>
      </template>

      <div v-else class="text-center">
        <h2 class="mb-4 text-2xl font-semibold text-green-500">
          Пароль успешно изменен!
        </h2>
        <p class="mb-6 text-light-text/60 dark:text-dark-text/60">
          Сейчас вы будете перенаправлены на страницу входа
        </p>
      </div>
    </template>
  </div>
</template>
