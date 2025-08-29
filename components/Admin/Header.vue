<template>
  <header class="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
    <div class="flex items-center">
      <h2 class="text-xl font-semibold text-gray-800">{{ pageTitle }}</h2>
    </div>
    
    <div class="flex items-center space-x-4">
      <button class="relative p-2 text-gray-600 hover:text-gray-900">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM9 7H4l5-5v5z"></path>
        </svg>
        <span class="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
      </button>
      
      <div class="relative">
        <button @click="showUserMenu = !showUserMenu" class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
          <div class="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
            <span class="text-white text-sm font-medium">{{ userInitials }}</span>
          </div>
          <span class="text-gray-700">{{ user?.email }}</span>
          <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        
        <div v-if="showUserMenu" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <NuxtLink to="/" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View Store</NuxtLink>
          <NuxtLink to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</NuxtLink>
          <button @click="signOut" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign Out</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const { user, signOut } = useSupabaseAuth()
const route = useRoute()
const showUserMenu = ref(false)

const pageTitle = computed(() => {
  const path = route.path
  if (path === '/admin') return 'Dashboard'
  if (path.startsWith('/admin/products')) return 'Products'
  if (path.startsWith('/admin/orders')) return 'Orders'
  if (path.startsWith('/admin/categories')) return 'Categories'
  if (path.startsWith('/admin/users')) return 'Users'
  if (path.startsWith('/admin/coupons')) return 'Coupons'
  if (path.startsWith('/admin/analytics')) return 'Analytics'
  return 'Admin'
})

const userInitials = computed(() => {
  if (!user.value?.email) return 'A'
  return user.value.email.charAt(0).toUpperCase()
})

// Close menu when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.relative')) {
      showUserMenu.value = false
    }
  })
})
</script>