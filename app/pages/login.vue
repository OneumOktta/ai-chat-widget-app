<script setup lang="ts">
  import { useAuthStore } from '~/stores/auth.store'
  import type { LoginCredentials } from '~/types/auth.types'

  const auth = useAuthStore()
  const router = useRouter()

  const formData = ref<LoginCredentials>({
    email: '',
    password: '',
  })

  const rememberMe = ref(false)

  const handleSubmit = async () => {
    try {
      const response = await auth.login(formData.value)
      if (response?.success) {
        router.push('/panel')
      }
    } catch (error) {
      // Ошибка обработана в сторе
    }
  }
</script>

<template>
  <div
    class="mx-auto w-full max-w-[400px] px-4 sm:max-w-[450px] sm:px-0 md:max-w-[500px] lg:max-w-[550px]"
  >
    <h1 class="mb-10 text-center text-2xl font-semibold sm:text-3xl">
      Рады видеть вас снова!
    </h1>

    <form class="space-y-4" @submit.prevent="handleSubmit">
      <BaseInput
        id="email"
        v-model="formData.email"
        type="email"
        label="Электронная почта"
        icon="basil:envelope-outline"
        required
      />
      <BaseInput
        id="password"
        v-model="formData.password"
        type="password"
        label="Пароль"
        icon="basil:lock-outline"
        required
      />

      <div class="flex items-center justify-between">
        <NuxtLink
          to="/forgot-password"
          class="text-lightPink transition-colors hover:text-lightBlue"
        >
          Забыли пароль?
        </NuxtLink>
      </div>

      <div class="space-y-10 pt-8">
        <div v-if="auth.error" class="text-center text-red-500">
          {{ auth.error }}
        </div>

        <GradientButton type="submit" class="w-full" :disabled="auth.loading">
          {{ auth.loading ? 'Вход...' : 'Войти' }}
        </GradientButton>

        <div class="text-center">
          <p class="mb-4 text-light-text/60 dark:text-dark-text/60">
            Вы можете войти с помощью:
          </p>
          <div class="flex justify-center gap-4 text-dark-text">
            <button
              class="flex items-center gap-2 rounded-full bg-lightBlue px-4 py-4 transition-colors"
            >
              <Icon name="basil:vk-solid" class="h-6 w-6" />
            </button>
            <button
              class="flex items-center gap-2 rounded-full bg-lightBlue px-4 py-4 transition-colors"
            >
              <Icon name="basil:telegram-solid" class="h-6 w-6" />
            </button>
          </div>
        </div>

        <div class="text-center">
          <p class="text-light-text/60 dark:text-dark-text/60">
            У Вас нет аккаунта?
            <NuxtLink
              to="/registration"
              class="text-lightPink transition-colors hover:text-lightBlue"
            >
              Регистрация
            </NuxtLink>
          </p>
        </div>
      </div>
    </form>
  </div>
</template>
