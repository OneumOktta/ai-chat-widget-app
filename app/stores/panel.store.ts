import { defineStore } from 'pinia'

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
    setLoading(value: boolean) {
      this.isLoading = value
    },

    setError(error: string | null) {
      this.error = error
    },

    setUser(user: PanelState['user']) {
      this.user = user
    },

    setApiKeys(keys: PanelState['apiKeys']) {
      this.apiKeys = keys
    },

    clearStore() {
      this.isLoading = false
      this.error = null
      this.user = null
      this.apiKeys = []
    },

    async fetchUserData() {
      try {
        this.isLoading = true
        this.error = null

        const accessToken = localStorage.getItem('accessToken')
        if (!accessToken) {
          throw new Error('Нет токена доступа')
        }

        const { data, error } = await useFetch<{
          success: boolean
          data: { user: PanelState['user']; apiKeys: PanelState['apiKeys'] }
        }>('/auth/me', {
          baseURL: useRuntimeConfig().public.apiBaseUrl,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        if (error.value) {
          throw error.value
        }

        if (data.value?.success) {
          this.user = data.value.data.user
          this.apiKeys = data.value.data.apiKeys
        }
      } catch (err) {
        this.error = 'Ошибка при получении данных пользователя'
        localStorage.removeItem('accessToken')
        navigateTo('/panel/login')
      } finally {
        this.isLoading = false
      }
    },
  },
})
