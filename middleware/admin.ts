export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser()
  
  if (!user.value) {
    return navigateTo('/auth/login')
  }
  
  if (user.value.user_metadata?.role !== 'admin') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Access denied. Admin privileges required.'
    })
  }
})