import { defineStore } from 'pinia'
import type { MeResponse } from '~/types/auth.types'
import { useApiKeyStore } from './apiKey.store'

interface PanelState {
  isLoading: boolean
  error: string | null
  user: {
    id: string
    email: string
    name: string
    role: string
    isActive: boolean
    companyName: string | null
  } | null
  apiKeys: Array<{
    id: string
    title: string
  }>
  currentApiKey: string | null
}

export const usePanelStore = defineStore('panel', {
  state: (): PanelState => ({
    isLoading: true,
    error: null,
    user: null,
    apiKeys: [],
    currentApiKey: null,
  }),

  getters: {
    isAdmin: (state) => state.user?.role === 'administrator',
    isBusiness: (state) => state.user?.role === 'business',
    isManager: (state) => state.user?.role === 'manager',
  },

  actions: {
    setCurrentApiKey(apiKeyId: string) {
      const exists = this.apiKeys.some((key) => key.id === apiKeyId)
      if (exists) {
        this.currentApiKey = apiKeyId
        // Загружаем данные при смене ключа
        const apiKeyStore = useApiKeyStore()
        apiKeyStore.fetchApiKeyData(apiKeyId)
      }
    },

    async fetchUserData() {
      if (!import.meta.client) return

      try {
        this.isLoading = true
        this.error = null

        const accessToken = localStorage.getItem('accessToken')
        if (!accessToken) {
          this.error = 'Нет токена доступа'
          return
        }

        const { data, error } = await useAuthFetch<MeResponse>('/auth/me')

        if (error.value) {
          throw error.value
        }

        if (data.value?.success) {
          this.user = data.value.data.user
          this.apiKeys = data.value.data.apiKeys

          // Устанавливаем первый ключ как текущий, если ключа еще нет
          if (!this.currentApiKey && this.apiKeys.length > 0) {
            this.currentApiKey = this.apiKeys[0]?.id || null
          }

          // Загружаем данные для текущего ключа
          if (this.currentApiKey) {
            const apiKeyStore = useApiKeyStore()
            await apiKeyStore.fetchApiKeyData(this.currentApiKey)
          }
        }
      } catch (err) {
        this.error = 'Ошибка при получении данных'
      } finally {
        this.isLoading = false
      }
    },

    clearStore() {
      this.isLoading = false
      this.error = null
      this.user = null
      this.apiKeys = []
      this.currentApiKey = null
    },
  },

  persist: true,
})
