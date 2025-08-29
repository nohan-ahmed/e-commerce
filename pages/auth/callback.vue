<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
      <p class="text-gray-600">Completing sign in...</p>
    </div>
  </div>
</template>

<script setup>
const { user } = useSupabaseAuth()

// Wait for auth state to be established
watchEffect(async () => {
  if (user.value) {
    await navigateTo('/')
  }
})

// Fallback redirect after timeout
setTimeout(() => {
  if (!user.value) {
    navigateTo('/auth/login')
  }
}, 5000)

useHead({
  title: 'Signing in...'
})
</script>