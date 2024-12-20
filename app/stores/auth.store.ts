import type { FetchError } from 'ofetch'
import { defineStore } from 'pinia'
import { translateError } from '~/schemas/auth.schema'
import type {
  AuthError,
  AuthResponse,
  AuthState,
  LoginCredentials,
  RegisterCredentials,
  RegisterResponse,
} from '~/types/auth.types'

export const useAuthStore = defineStore('authStore', {
  persist: true,
  state: (): AuthState => ({
    user: null,
    tokens: null,
    loading: false,
    error: null,
  }),

  actions: {
    async getRole() {
      return this.user?.role
    },

    async getToken() {
      return this.tokens?.accessToken
    },

    async login(
      credentials: LoginCredentials
    ): Promise<AuthResponse | undefined> {
      try {
        this.loading = true
        this.error = null

        const response = await $fetch<AuthResponse>(
          `${useRuntimeConfig().public.apiBaseUrl}/auth/login`,
          {
            method: 'POST',
            body: credentials,
          }
        )

        if (response.success) {
          this.user = response.data.user
          this.tokens = response.data.tokens
          localStorage.setItem('accessToken', response.data.tokens.accessToken)
          navigateTo('/panel')
        }

        return response
      } catch (err) {
        const fetchError = err as FetchError<{ message: string }>
        this.error =
          translateError(fetchError.data?.message) || 'Ошибка при входе'
        return undefined
      } finally {
        this.loading = false
      }
    },

    async register(
      credentials: RegisterCredentials
    ): Promise<RegisterResponse | undefined> {
      try {
        this.loading = true
        this.error = null

        const response = await $fetch<RegisterResponse>(
          `${useRuntimeConfig().public.apiBaseUrl}/auth/registration`,
          {
            method: 'POST',
            body: credentials,
          }
        )

        return response
      } catch (error: unknown) {
        const err = error as FetchError<AuthError>
        this.error =
          translateError(err.data?.message) || 'Ошибка при регистрации'
        return undefined
      } finally {
        this.loading = false
      }
    },

    async logout() {
      try {
        await useAuthFetch('/auth/logout', {
          method: 'POST',
          body: {
            refreshToken: this.tokens?.refreshToken,
          },
        })
      } catch (error: unknown) {
        const err = error as FetchError<AuthError>
        console.error('Ошибка при выходе:', err.data?.message)
      } finally {
        this.user = null
        this.tokens = null
        localStorage.removeItem('accessToken')
        navigateTo('/login')
      }
    },
  },
})
