<template>
  <NuxtLayout name="auth">
    <UCard class="p-8">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-900">Sign in to your account</h2>
        <p class="mt-2 text-gray-600">
          Or 
          <NuxtLink to="/auth/register" class="text-primary-600 hover:text-primary-500">
            create a new account
          </NuxtLink>
        </p>
      </div>
      
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
          <UInput 
            id="email"
            v-model="form.email"
            type="email" 
            required
            placeholder="Enter your email"
            size="lg"
          />
        </div>
        
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <UInput 
            id="password"
            v-model="form.password"
            type="password" 
            required
            placeholder="Enter your password"
            size="lg"
          />
        </div>
        
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input 
              id="remember-me" 
              type="checkbox" 
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            >
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>
          
          <NuxtLink to="/auth/forgot-password" class="text-sm text-primary-600 hover:text-primary-500">
            Forgot your password?
          </NuxtLink>
        </div>
        
        <UAlert v-if="error" color="red" variant="soft">
          <template #description>
            {{ error }}
          </template>
        </UAlert>
        
        <UButton 
          type="submit" 
          :loading="loading"
          block
          size="lg"
        >
          Sign in
        </UButton>
      </form>
      
      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>
        
        <div class="mt-6">
          <UButton 
            @click="handleGoogleLogin"
            :loading="loading"
            variant="outline"
            block
            size="lg"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span class="ml-2">Continue with Google</span>
          </UButton>
        </div>
      </div>
    </UCard>
  </NuxtLayout>
</template>

<script setup>
const { signIn, signInWithGoogle } = useSupabaseAuth()

const form = reactive({
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const { error: authError } = await signIn(form.email, form.password)
    
    if (authError) {
      error.value = authError.message
    } else {
      await navigateTo('/')
    }
  } catch (err) {
    error.value = 'An unexpected error occurred'
  } finally {
    loading.value = false
  }
}

const handleGoogleLogin = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const { error: authError } = await signInWithGoogle()
    
    if (authError) {
      error.value = authError.message
    }
  } catch (err) {
    error.value = 'An unexpected error occurred'
  } finally {
    loading.value = false
  }
}

useHead({
  title: 'Login - ECommerce Store'
})
</script>