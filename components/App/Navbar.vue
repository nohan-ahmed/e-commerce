<template>
  <div class="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/20 dark:border-gray-800/20">
    <UContainer>
      <div class="flex items-center justify-between h-16">
        <!-- Artistic Logo -->
        <NuxtLink to="/" class="flex items-center space-x-3 group">
          <div class="relative">
            <div class="w-10 h-10 bg-gradient-to-br from-primary-500 via-primary-600 to-purple-600 rounded-xl rotate-12 group-hover:rotate-0 transition-transform duration-300 shadow-lg shadow-primary-500/25"></div>
            <UIcon name="i-heroicons-bolt" class="absolute inset-0 w-6 h-6 m-auto text-white" />
          </div>
          <div class="hidden sm:block">
            <span class="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              ElectroStore
            </span>
            <div class="text-xs text-gray-500 dark:text-gray-400 -mt-1">Premium Tech</div>
          </div>
        </NuxtLink>

        <!-- Floating Navigation -->
        <nav class="hidden lg:flex items-center bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full px-6 py-2 border border-gray-200/50 dark:border-gray-700/50">
          <UButton 
            v-for="item in navItems" 
            :key="item.label"
            :to="item.to" 
            variant="ghost" 
            size="sm"
            class="rounded-full hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200"
          >
            {{ item.label }}
          </UButton>
        </nav>

        <!-- Artistic Search -->
        <div class="hidden md:block flex-1 max-w-sm mx-8">
          <div class="relative group">
            <UInput
              v-model="searchQuery"
              placeholder="Search anything..."
              class="rounded-full bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 focus:border-primary-300 dark:focus:border-primary-700 transition-all duration-300"
              @keyup.enter="handleSearch"
            >
              <template #leading>
                <UIcon name="i-heroicons-magnifying-glass" class="w-4 h-4 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
              </template>
            </UInput>
            <div class="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center space-x-2">
          <!-- Theme Selector with Glow -->
          <div class="relative">
            <AppThemeSelector />
            <div class="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500/20 to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10 blur-md"></div>
          </div>
          
          <!-- Wishlist Button -->
          <NuxtLink to="/wishlist" class="relative group">
            <UButton variant="ghost" size="sm" square class="relative">
              <UIcon name="i-heroicons-heart" class="w-5 h-5 group-hover:scale-110 transition-transform duration-200 group-hover:text-pink-500" />
              <UBadge 
                v-if="$wishlist.count.value > 0" 
                :label="$wishlist.count.value.toString()" 
                color="pink" 
                size="xs" 
                class="absolute -top-1 -right-1 animate-pulse"
              />
            </UButton>
            <div class="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-md"></div>
          </NuxtLink>
          
          <!-- Artistic Cart -->
          <NuxtLink to="/cart" class="relative group">
            <UButton variant="ghost" size="sm" square class="relative">
              <UIcon name="i-heroicons-shopping-bag" class="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              <UBadge 
                v-if="cartCount > 0" 
                :label="cartCount.toString()" 
                color="red" 
                size="xs" 
                class="absolute -top-1 -right-1 animate-pulse"
              />
            </UButton>
            <div class="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-md"></div>
          </NuxtLink>

          <!-- User Menu -->
          <UDropdown v-if="user" :items="userItems" class="relative">
            <div class="relative group">
              <UAvatar 
                :src="user.user_metadata?.avatar_url" 
                :alt="user.email" 
                size="sm" 
                class="ring-2 ring-transparent group-hover:ring-primary-300 dark:group-hover:ring-primary-700 transition-all duration-200"
              />
              <div class="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-lg"></div>
            </div>
          </UDropdown>
          
          <!-- Auth Buttons -->
          <div v-else class="hidden md:flex space-x-2">
            <UButton variant="ghost" size="sm" class="rounded-full" to="/auth/login">Sign In</UButton>
            <UButton size="sm" class="rounded-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-200" to="/auth/register">
              Sign Up
            </UButton>
          </div>

          <!-- Artistic Mobile Menu -->
          <UButton 
            @click="isOpen = !isOpen" 
            variant="ghost" 
            size="sm" 
            square 
            class="lg:hidden relative group"
          >
            <div class="relative w-5 h-5">
              <span 
                class="absolute top-1 left-0 w-5 h-0.5 bg-current transform transition-all duration-300"
                :class="isOpen ? 'rotate-45 translate-y-1.5' : ''"
              ></span>
              <span 
                class="absolute top-2.5 left-0 w-5 h-0.5 bg-current transition-opacity duration-300"
                :class="isOpen ? 'opacity-0' : ''"
              ></span>
              <span 
                class="absolute top-4 left-0 w-5 h-0.5 bg-current transform transition-all duration-300"
                :class="isOpen ? '-rotate-45 -translate-y-1.5' : ''"
              ></span>
            </div>
          </UButton>
        </div>
      </div>

      <!-- Mobile Menu with Slide Animation -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div v-if="isOpen" class="lg:hidden border-t border-gray-200/20 dark:border-gray-800/20 py-4">
          <!-- Mobile Search -->
          <div class="mb-4">
            <UInput
              v-model="searchQuery"
              placeholder="Search products..."
              icon="i-heroicons-magnifying-glass"
              class="rounded-full"
              @keyup.enter="handleSearch"
            />
          </div>
          
          <!-- Mobile Nav -->
          <div class="space-y-1">
            <UButton
              v-for="item in navItems"
              :key="item.label"
              :to="item.to"
              variant="ghost"
              block
              class="justify-start rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20"
              @click="isOpen = false"
            >
              <UIcon :name="item.icon" class="w-4 h-4 mr-3" />
              {{ item.label }}
            </UButton>
            
            <!-- Mobile Wishlist -->
            <UButton
              to="/wishlist"
              variant="ghost"
              block
              class="justify-start rounded-xl hover:bg-pink-50 dark:hover:bg-pink-900/20"
              @click="isOpen = false"
            >
              <UIcon name="i-heroicons-heart" class="w-4 h-4 mr-3" />
              Wishlist
              <UBadge v-if="$wishlist.count.value > 0" :label="$wishlist.count.value.toString()" color="pink" size="xs" class="ml-auto" />
            </UButton>
          </div>

          <!-- Mobile Auth -->
          <div v-if="!user" class="pt-4 mt-4 border-t border-gray-200/20 dark:border-gray-800/20 space-y-2">
            <UButton variant="outline" block class="rounded-xl" to="/auth/login" @click="isOpen = false">
              Sign In
            </UButton>
            <UButton block class="rounded-xl bg-gradient-to-r from-primary-500 to-primary-600" to="/auth/register" @click="isOpen = false">
              Sign Up
            </UButton>
          </div>
        </div>
      </Transition>
    </UContainer>
  </div>
</template>

<script setup>
const { user, signOut } = useSupabaseAuth()
const { getWishlist } = useSupabaseWishlist()
const { cartCount, updateCartCount } = useCartStore()
const { $wishlist } = useNuxtApp()
const searchQuery = ref('')
const isOpen = ref(false)

const navItems = [
  { label: 'Home', to: '/', icon: 'i-heroicons-home' },
  { label: 'Products', to: '/products', icon: 'i-heroicons-squares-2x2' },
  { label: 'About', to: '/about', icon: 'i-heroicons-information-circle' },
  { label: 'Contact', to: '/contact', icon: 'i-heroicons-envelope' }
]

const userItems = [
  [{ label: 'Profile', icon: 'i-heroicons-user', to: '/profile' }],
  [{ label: 'Wishlist', icon: 'i-heroicons-heart', to: '/wishlist' }],
  [{ label: 'Orders', icon: 'i-heroicons-shopping-bag', to: '/orders' }],
  [{ label: 'Sign Out', icon: 'i-heroicons-arrow-right-on-rectangle', click: signOut }]
]

const loadWishlistCount = async () => {
  if (user.value) {
    const { data } = await getWishlist()
    $wishlist.setCount(data?.length || 0)
  } else {
    $wishlist.setCount(0)
  }
}



const handleSearch = () => {
  if (searchQuery.value.trim()) {
    navigateTo(`/search?q=${encodeURIComponent(searchQuery.value)}`)
    isOpen.value = false
  }
}

watch(() => useRoute().path, () => {
  isOpen.value = false
})

watch(user, () => {
  loadWishlistCount()
  updateCartCount()
})

onMounted(() => {
  loadWishlistCount()
  updateCartCount()
})
</script>