<template>
  <header class="bg-white shadow-sm border-b">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <NuxtLink to="/" class="text-2xl font-bold text-primary-600">
            ECommerce
          </NuxtLink>
        </div>

        <nav class="hidden md:flex space-x-8">
          <NuxtLink to="/" class="text-gray-700 hover:text-primary-600">Home</NuxtLink>
          <NuxtLink to="/products" class="text-gray-700 hover:text-primary-600">Products</NuxtLink>
          <NuxtLink to="/categories" class="text-gray-700 hover:text-primary-600">Categories</NuxtLink>
        </nav>

        <div class="flex items-center space-x-4">
          <NuxtLink to="/cart" class="relative">
            <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0h9"></path>
            </svg>
            <span v-if="cartCount > 0" class="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {{ cartCount }}
            </span>
          </NuxtLink>

          <div v-if="user" class="relative">
            <button @click="showUserMenu = !showUserMenu" class="flex items-center space-x-2">
              <span class="text-gray-700">{{ user.email }}</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div v-if="showUserMenu" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <NuxtLink to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</NuxtLink>
              <NuxtLink to="/orders" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Orders</NuxtLink>
              <NuxtLink v-if="isAdmin" to="/admin" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Admin</NuxtLink>
              <button @click="signOut" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign Out</button>
            </div>
          </div>

          <div v-else class="space-x-2">
            <NuxtLink to="/auth/login" class="btn-secondary">Login</NuxtLink>
            <NuxtLink to="/auth/register" class="btn-primary">Register</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const { user, signOut, isAdmin } = useSupabaseAuth()
const showUserMenu = ref(false)
const cartCount = ref(0)

// Get cart count
const { getCartItems } = useSupabaseCart()
const updateCartCount = async () => {
  if (user.value) {
    const { data } = await getCartItems()
    cartCount.value = data?.reduce((sum, item) => sum + item.quantity, 0) || 0
  }
}

watch(user, updateCartCount, { immediate: true })

// Close menu when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.relative')) {
      showUserMenu.value = false
    }
  })
})
</script>