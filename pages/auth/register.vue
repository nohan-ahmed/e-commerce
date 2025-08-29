<template>
  <NuxtLayout name="auth">
    <div class="card">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-900">Create your account</h2>
        <p class="mt-2 text-gray-600">
          Already have an account? 
          <NuxtLink to="/auth/login" class="text-primary-600 hover:text-primary-500">
            Sign in
          </NuxtLink>
        </p>
      </div>
      
      <form @submit.prevent="handleRegister" class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="first-name" class="block text-sm font-medium text-gray-700">First name</label>
            <input 
              id="first-name"
              v-model="form.firstName"
              type="text" 
              required
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter your first name"
            >
          </div>
          
          <div>
            <label for="last-name" class="block text-sm font-medium text-gray-700">Last name</label>
            <input 
              id="last-name"
              v-model="form.lastName"
              type="text" 
              required
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter your last name"
            >
          </div>
        </div>
        
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
          <input 
            id="email"
            v-model="form.email"
            type="email" 
            required
            class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Enter your email"
          >
        </div>
        
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input 
            id="password"
            v-model="form.password"
            type="password" 
            required
            class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Create a password"
          >
          <p class="mt-1 text-sm text-gray-500">Must be at least 8 characters long</p>
        </div>
        
        <div>
          <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirm password</label>
          <input 
            id="confirm-password"
            v-model="form.confirmPassword"
            type="password" 
            required
            class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Confirm your password"
          >
        </div>
        
        <div class="flex items-center">
          <input 
            id="agree-terms" 
            v-model="form.agreeTerms"
            type="checkbox" 
            required
            class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          >
          <label for="agree-terms" class="ml-2 block text-sm text-gray-900">
            I agree to the 
            <NuxtLink to="/terms" class="text-primary-600 hover:text-primary-500">Terms of Service</NuxtLink>
            and 
            <NuxtLink to="/privacy" class="text-primary-600 hover:text-primary-500">Privacy Policy</NuxtLink>
          </label>
        </div>
        
        <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
          <p class="text-red-600 text-sm">{{ error }}</p>
        </div>
        
        <div v-if="success" class="bg-green-50 border border-green-200 rounded-lg p-4">
          <p class="text-green-600 text-sm">{{ success }}</p>
        </div>
        
        <button 
          type="submit" 
          :disabled="loading"
          class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Creating account...' : 'Create account' }}
        </button>
      </form>
    </div>
  </NuxtLayout>
</template>

<script setup>
const { signUp } = useSupabaseAuth()

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false
})

const loading = ref(false)
const error = ref('')
const success = ref('')

const handleRegister = async () => {
  loading.value = true
  error.value = ''
  success.value = ''
  
  // Validation
  if (form.password !== form.confirmPassword) {
    error.value = 'Passwords do not match'
    loading.value = false
    return
  }
  
  if (form.password.length < 8) {
    error.value = 'Password must be at least 8 characters long'
    loading.value = false
    return
  }
  
  if (!form.agreeTerms) {
    error.value = 'You must agree to the terms and conditions'
    loading.value = false
    return
  }
  
  try {
    const { error: authError } = await signUp(form.email, form.password, {
      first_name: form.firstName,
      last_name: form.lastName,
      full_name: `${form.firstName} ${form.lastName}`
    })
    
    if (authError) {
      error.value = authError.message
    } else {
      success.value = 'Account created successfully! Please check your email to verify your account.'
      // Reset form
      Object.keys(form).forEach(key => {
        if (typeof form[key] === 'boolean') {
          form[key] = false
        } else {
          form[key] = ''
        }
      })
    }
  } catch (err) {
    error.value = 'An unexpected error occurred'
  } finally {
    loading.value = false
  }
}

useHead({
  title: 'Register - ECommerce Store'
})
</script>