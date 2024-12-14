import { defineStore } from 'pinia'
import type { MeResponse } from '~/types/auth.types'

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
}

export const usePanelStore = defineStore('panel', {
  state: (): PanelState => ({
    isLoading: true,
    error: null,
    user: null,
    apiKeys: [],
  }),

  getters: {
    isAdmin: (state) => state.user?.role === 'administrator',
    isBusiness: (state) => state.user?.role === 'business',
    isManager: (state) => state.user?.role === 'manager',
  },

  actions: {
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
        }
      } catch (err) {
        this.error = 'Ошибка при получении данных'
        // localStorage.removeItem('accessToken')
      } finally {
        this.isLoading = false
      }
    },

    clearStore() {
      this.isLoading = false
      this.error = null
      this.user = null
      this.apiKeys = []
    },
  },

  persist: true,
})
