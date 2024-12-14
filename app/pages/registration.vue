<script setup lang="ts">
  import { ref } from 'vue'
  import { z } from 'zod'
  import { registerSchema } from '~/schemas/auth.schema'
  import { useAuthStore } from '~/stores/auth.store'
  import type { RegisterCredentials } from '~/types/auth.types'

  definePageMeta({
    layout: 'auth',
  })

  const auth = useAuthStore()
  const router = useRouter()

  const formData = ref<RegisterCredentials>({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
  })

  const acceptTerms = ref(false)

  const features = [
    {
      icon: 'material-symbols-light:task-alt',
      text: 'Продажи',
    },
    {
      icon: 'material-symbols-light:task-alt',
      text: 'Поддержка',
    },
    {
      icon: 'material-symbols-light:task-alt',
      text: 'Повышение качества обслуживания',
    },
  ]

  const showSuccessModal = ref(false)

  const handleRegister = () => {
    try {
      auth.error = null

      if (!acceptTerms.value) {
        auth.error = 'Необходимо принять условия использования'
        return
      }

      registerSchema.parse(formData.value)
      auth.register(formData.value).then((response) => {
        if (response?.success) {
          showSuccessModal.value = true
        }
      })
    } catch (err) {
      if (err instanceof z.ZodError) {
        auth.error =
          err.errors[0]?.message || 'Произошла ошибка при регистрации'
      }
    }
  }
</script>

<template>
  <div>
    <div
      class="mx-auto flex h-full max-w-7xl items-center justify-center gap-40"
    >
      <div class="flex-1">
        <h1 class="mb-10 text-3xl font-bold">
          Чат для сайта или приложения на основе GPT
        </h1>
        <p class="mb-8 text-lg text-light-text dark:text-dark-text">
          Расширьте свои возможности с помощью автоматизации
          <br />
          и искусственного интеллекта в одном окне:
        </p>

        <div class="space-y-6">
          <div
            v-for="feature in features"
            :key="feature.text"
            class="flex items-center gap-4"
          >
            <Icon
              :name="feature.icon"
              class="h-6 w-6 flex-shrink-0 text-lightBlue"
            />
            <span class="text-lg">{{ feature.text }}</span>
          </div>
        </div>
      </div>

      <div class="flex-1">
        <h2 class="mb-10 text-center text-3xl font-semibold">
          Создайте аккаунт
        </h2>

        <form class="space-y-4" novalidate @submit.prevent>
          <BaseInput
            id="name"
            v-model="formData.name"
            label="Ваше имя"
            icon="carbon:user-avatar"
            required
          />
          <BaseInput
            id="email"
            v-model="formData.email"
            type="email"
            label="Электронная почта"
            icon="basil:envelope-outline"
          />
          <BaseInput
            id="password"
            v-model="formData.password"
            type="password"
            label="Пароль"
            icon="basil:lock-outline"
            required
          />
          <BaseInput
            id="confirmPassword"
            v-model="formData.passwordConfirm"
            type="password"
            label="Подтвердите пароль"
            icon="basil:lock-outline"
            required
          />

          <div class="mt-8 space-y-4 pt-[24px]">
            <BaseCheckbox v-model="acceptTerms">
              Я согласен с
              <NuxtLink
                to="/terms"
                class="text-lightPink transition-colors hover:text-lightBlue"
              >
                Правилами и условиями
              </NuxtLink>
              Oneum и
              <NuxtLink
                to="/privacy"
                class="text-lightPink transition-colors hover:text-lightBlue"
              >
                Политикой конфиденциальности
              </NuxtLink>
            </BaseCheckbox>

            <div class="space-y-10">
              <div v-if="auth.error" class="text-center text-red-500">
                {{ auth.error }}
              </div>

              <GradientButton
                type="button"
                class="w-full"
                @click="handleRegister"
              >
                Зарегистрироваться
              </GradientButton>

              <div class="text-center">
                <p class="mb-4 text-light-text/60 dark:text-dark-text/60">
                  Вы можете зарегистрироваться с помощью:
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
                  У вас уже есть аккаунт?
                  <NuxtLink
                    to="/panel/login"
                    class="text-lightPink transition-colors hover:text-lightBlue"
                  >
                    Вход
                  </NuxtLink>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Модальное окно успешной регистрации -->
    <div
      v-if="showSuccessModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
    >
      <div
        class="w-full max-w-md rounded-2xl bg-light-background p-8 dark:bg-dark-background"
      >
        <h3
          class="mb-4 text-center text-2xl font-semibold text-light-text dark:text-dark-text"
        >
          Регистрация успешна!
        </h3>
        <p class="mb-6 text-center text-light-text/60 dark:text-dark-text/60">
          На ваш email отправлена ссылка для активации аккаунта.
        </p>
        <GradientButton class="w-full" @click="router.push('/panel/login')">
          Перейти к входу
        </GradientButton>
      </div>
    </div>
  </div>
</template>
