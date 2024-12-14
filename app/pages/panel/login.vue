<script setup lang="ts">
  import { useAuthStore } from '~/stores/auth.store'
  import type { LoginCredentials } from '~/types/auth.types'

  definePageMeta({
    layout: 'auth',
    middleware: ['panel'],
  })

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
      // Ошибка уже обработана в сторе
    }
  }
</script>

<template>
  <div class="mx-auto w-1/3 min-w-[400px]">
    <h1 class="mb-10 text-center text-3xl font-semibold">
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
        <BaseCheckbox v-model="rememberMe">Запомнить меня</BaseCheckbox>

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
          <div class="flex justify-center gap-4">
            <button
              class="flex items-center gap-2 rounded-xl border-2 border-light-text/10 px-4 py-2 transition-colors hover:border-lightBlue dark:border-dark-text/10"
            >
              <Icon name="basil:telegram-outline" class="h-5 w-5" />
              <span>Telegram</span>
            </button>
            <button
              class="flex items-center gap-2 rounded-xl border-2 border-light-text/10 px-4 py-2 transition-colors hover:border-lightBlue dark:border-dark-text/10"
            >
              <Icon name="basil:vk-outline" class="h-5 w-5" />
              <span>VKontakte</span>
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
