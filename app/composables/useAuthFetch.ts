import { defu } from 'defu'
import type { UseFetchOptions } from 'nuxt/app'

export function useAuthFetch<T>(url: string, options: UseFetchOptions<T> = {}) {
  const accessToken = import.meta.client
    ? localStorage.getItem('accessToken')
    : null

  const defaults: UseFetchOptions<T> = {
    baseURL: '/proxy',
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
  }

  const params = defu(options, defaults)

  return useFetch(url, params)
}
