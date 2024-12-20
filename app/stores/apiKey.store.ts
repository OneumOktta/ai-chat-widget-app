import type { FetchError } from 'ofetch'
import { defineStore } from 'pinia'
import type { ApiKeyState, HourlyStats } from '~/types/apiKey.types'

interface ApiResponse<T> {
  success: boolean
  data: T
}

export const useApiKeyStore = defineStore('apiKey', {
  persist: true,
  state: (): ApiKeyState => ({
    isLoading: false,
    error: null,
    apiKeyInfo: null,
    users: null,
    statistics: null,
    hourlyStats: null,
  }),

  actions: {
    async fetchApiKeyData(apiKeyId: string) {
      this.isLoading = true
      this.error = null

      try {
        const [
          infoResponse,
          usersResponse,
          statsResponse,
          hourlyStatsResponse,
        ] = await Promise.all([
          useAuthFetch<ApiResponse<ApiKeyState['apiKeyInfo']>>(
            `/proxy/api-keys/${apiKeyId}/info`
          ),
          useAuthFetch<ApiResponse<ApiKeyState['users']>>(
            `/proxy/api-keys/${apiKeyId}/users`
          ),
          useAuthFetch<ApiResponse<ApiKeyState['statistics']>>(
            `/proxy/api-keys/${apiKeyId}/statistics`
          ),
          useAuthFetch<ApiResponse<HourlyStats>>(
            `/proxy/api-keys/${apiKeyId}/hourly-stats`
          ),
        ])

        if (infoResponse.error.value || !infoResponse.data.value?.success) {
          throw new Error('Failed to fetch API key info')
        }

        if (usersResponse.error.value || !usersResponse.data.value?.success) {
          throw new Error('Failed to fetch API key users')
        }

        if (statsResponse.error.value || !statsResponse.data.value?.success) {
          throw new Error('Failed to fetch API key statistics')
        }

        if (
          hourlyStatsResponse.error.value ||
          !hourlyStatsResponse.data.value?.success
        ) {
          throw new Error('Failed to fetch hourly stats')
        }

        this.apiKeyInfo = infoResponse.data.value.data
        this.users = usersResponse.data.value.data
        this.statistics = statsResponse.data.value.data
        this.hourlyStats = hourlyStatsResponse.data.value.data
      } catch (err) {
        const fetchError = err as FetchError<{ message: string }>
        this.error = fetchError.data?.message || 'Failed to fetch API key data'
        this.clearStore()
      } finally {
        this.isLoading = false
      }
    },

    clearStore() {
      this.isLoading = false
      this.error = null
      this.apiKeyInfo = null
      this.users = null
      this.statistics = null
      this.hourlyStats = null
    },
  },
})
