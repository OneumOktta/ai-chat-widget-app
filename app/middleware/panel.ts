import type { MeResponse } from '~/types/auth.types'

export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) {
    return
  }

  if (to.path === '/login') {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      try {
        const { data, error } = await useAuthFetch<MeResponse>('/auth/me')
        if (!error.value && data.value?.success) {
          return navigateTo('/panel', { replace: true })
        }
      } catch {
        localStorage.removeItem('accessToken')
      }
    }
    return
  }

  if (to.path.startsWith('/panel')) {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) {
      return navigateTo('/login', { replace: true })
    }

    try {
      const { data, error } = await useAuthFetch<MeResponse>('/auth/me')
      if (error.value || !data.value?.success) {
        localStorage.removeItem('accessToken')
        return navigateTo('/login', { replace: true })
      }
    } catch (err) {
      localStorage.removeItem('accessToken')
      return navigateTo('/login', { replace: true })
    }
  }
})
