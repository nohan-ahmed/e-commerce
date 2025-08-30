<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <UContainer class="py-12">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-black text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text mb-4">
          Your Wishlist
        </h1>
        <p class="text-slate-400 text-lg">Items you have saved for later</p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="i in 8" :key="i" class="animate-pulse">
          <div class="bg-slate-800 rounded-3xl h-96"></div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="!wishlistItems.length" class="text-center py-20">
        <UIcon name="i-heroicons-heart" class="w-24 h-24 text-slate-600 mx-auto mb-6" />
        <h2 class="text-2xl font-bold text-white mb-4">Your wishlist is empty</h2>
        <p class="text-slate-400 mb-8">Start adding products you love!</p>
        <UButton to="/products" size="lg" class="bg-gradient-to-r from-pink-500 to-purple-500">
          Browse Products
        </UButton>
      </div>

      <!-- Wishlist Items -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="item in wishlistItems" :key="item.id" class="relative">
          <ProductCard :product="item.products" />
          
          <!-- Remove Button -->
          <button
            @click="removeItem(item.product_id, item.variant_id, item.id)"
            class="absolute top-4 right-4 p-2 bg-red-500/80 backdrop-blur-md rounded-full text-white hover:bg-red-500 transition-colors z-10"
          >
            <UIcon name="i-heroicons-x-mark" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const { getWishlist, removeFromWishlist } = useSupabaseWishlist()
const { $wishlist } = useNuxtApp()

const loading = ref(true)
const wishlistItems = ref([])

const loadWishlist = async () => {
  loading.value = true
  const { data } = await getWishlist()
  wishlistItems.value = data || []
  loading.value = false
}

const removeItem = async (productId, variantId, itemId) => {
  // Remove from UI immediately
  wishlistItems.value = wishlistItems.value.filter(item => item.id !== itemId)
  
  // Update navbar count
  $wishlist.decrement()
  
  // Remove from database
  await removeFromWishlist(productId, variantId)
}

onMounted(() => {
  loadWishlist()
})

useHead({
  title: 'Wishlist - ElectroStore'
})
</script>