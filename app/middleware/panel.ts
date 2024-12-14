export default defineNuxtRouteMiddleware((to) => {
  // Проверяем только на клиенте
  if (import.meta.client) {
    const accessToken = localStorage.getItem('accessToken')

    if (to.path === '/panel/login') {
      if (accessToken) {
        return navigateTo('/panel')
      }
      return
    }

    if (to.path.startsWith('/panel') && !accessToken) {
      return navigateTo('/panel/login')
    }
  }
})
