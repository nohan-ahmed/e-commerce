<template>
  <button
    @click="toggleWishlist"
    :disabled="loading"
    class="group relative p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 hover:border-pink-400/60 transition-all duration-300 hover:bg-pink-500/30"
    :class="{ 'animate-pulse': loading }"
  >
    <!-- Heart Icon -->
    <UIcon 
      :name="isWishlisted ? 'i-heroicons-heart-solid' : 'i-heroicons-heart'"
      class="w-4 h-4 transition-all duration-300"
      :class="isWishlisted ? 'text-pink-400' : 'text-white/80 group-hover:text-pink-400'"
    />
    
    <!-- Glow Effect -->
    <div 
      v-if="isWishlisted" 
      class="absolute inset-0 rounded-full bg-pink-400/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    ></div>
    
    <!-- Ripple Effect -->
    <div 
      v-if="showRipple"
      class="absolute inset-0 rounded-full border border-pink-400 animate-ping"
    ></div>
  </button>
</template>

<script setup>
const props = defineProps({
  productId: {
    type: String,
    required: true
  }
})

const { addToWishlist, removeFromWishlist, isInWishlist } = useSupabaseWishlist()
const { $wishlist } = useNuxtApp()
const user = useSupabaseUser()

const loading = ref(false)
const isWishlisted = ref(false)
const showRipple = ref(false)

const toggleWishlist = async () => {
  if (!user.value) {
    await navigateTo('/auth/login')
    return
  }

  loading.value = true
  showRipple.value = true

  try {
    if (isWishlisted.value) {
      await removeFromWishlist(props.productId)
      isWishlisted.value = false
      $wishlist.decrement()
    } else {
      await addToWishlist(props.productId)
      isWishlisted.value = true
      $wishlist.increment()
    }
  } catch (error) {
    console.error('Wishlist error:', error)
  }

  loading.value = false
  setTimeout(() => showRipple.value = false, 600)
}

onMounted(async () => {
  if (user.value) {
    isWishlisted.value = await isInWishlist(props.productId)
  }
})
</script>