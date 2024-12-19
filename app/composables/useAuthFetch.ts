import { defu } from 'defu'
import type { UseFetchOptions } from 'nuxt/app'

interface RefreshTokenResponse {
  success: boolean
  data: {
    accessToken: string
    refreshToken: string
  }
}

export function useAuthFetch<T>(url: string, options: UseFetchOptions<T> = {}) {
  const accessToken = import.meta.client
    ? localStorage.getItem('accessToken')
    : null

  const defaults: UseFetchOptions<T> = {
    baseURL: '/proxy',
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    async onResponseError({ response }) {
      if (response.status === 401) {
        const refreshToken = useCookie('refreshToken')

        if (refreshToken) {
          try {
            const response = await $fetch<RefreshTokenResponse>(
              '/proxy/auth/refresh',
              {
                method: 'POST',
                body: { refreshToken },
              }
            )

            if (response.success) {
              localStorage.setItem('accessToken', response.data.accessToken)
              options.headers = {
                Authorization: `Bearer ${response.data.accessToken}`,
              }

              return useFetch(url, options as UseFetchOptions<T>)
            }
          } catch {
            localStorage.removeItem('accessToken')
            navigateTo('/login')
          }
        }
      }
    },
  }

  const params = defu(options, defaults)

  return useFetch(url, params as UseFetchOptions<T>)
}
