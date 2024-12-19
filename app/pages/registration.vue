<script setup lang="ts">
  import { ref } from 'vue'
  import { z } from 'zod'
  import { registerSchema } from '~/schemas/auth.schema'
  import { useAuthStore } from '~/stores/auth.store'
  import type { RegisterCredentials } from '~/types/auth.types'

  const auth = useAuthStore()
  const router = useRouter()

  const formData = ref<RegisterCredentials>({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
  })

  const acceptTerms = ref(false)

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
  <div
    class="mx-auto w-full max-w-[400px] px-4 sm:max-w-[450px] sm:px-0 md:max-w-[500px] lg:max-w-[550px]"
  >
    <h2 class="mb-10 text-center text-3xl font-semibold">Создайте аккаунт</h2>

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

          <GradientButton type="button" class="w-full" @click="handleRegister">
            Зарегистрироваться
          </GradientButton>

          <div class="text-center">
            <p class="mb-4 text-light-text/60 dark:text-dark-text/60">
              Вы можете зарегистрироваться с помощью:
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
              У вас уже есть аккаунт?
              <NuxtLink
                to="/login"
                class="text-lightPink transition-colors hover:text-lightBlue"
              >
                Вход
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </form>

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
        <GradientButton class="w-full" @click="router.push('/login')">
          Перейти к входу
        </GradientButton>
      </div>
    </div>
  </div>
</template>
