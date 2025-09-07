<template>
  <div class="group relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl rounded-3xl overflow-hidden border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-700 hover:shadow-2xl hover:shadow-cyan-500/20">
    <!-- Glow Effect -->
    <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
    
    <!-- Image Container -->
    <NuxtLink :to="`/products/${product.id}`" class="block relative">
      <div class="aspect-[4/3] bg-gradient-to-br from-slate-800 to-slate-900 relative overflow-hidden">
        <img 
          v-if="mainImage" 
          :src="mainImage" 
          :alt="product.name"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div v-else class="w-full h-full flex items-center justify-center">
          <UIcon name="i-heroicons-photo" class="w-20 h-20 text-slate-600" />
        </div>
        
        <!-- Holographic Overlay -->
        <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      </div>
      
      <!-- Floating Elements -->
      <div class="absolute top-4 left-4">
        <div class="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-cyan-400/30 text-cyan-300 text-xs font-medium">
          {{ product.categories?.name || 'TECH' }}
        </div>
      </div>
      
      <!-- Discount Badge -->
      <div v-if="hasDiscount" class="absolute top-4 right-4">
        <div class="px-3 py-1 bg-red-500/80 backdrop-blur-md rounded-full text-white text-xs font-bold animate-pulse">
          -{{ discountPercent }}%
        </div>
      </div>
      
      <div v-else-if="totalStock < 10" class="absolute top-4 right-4">
        <div class="px-3 py-1 bg-orange-500/80 backdrop-blur-md rounded-full text-white text-xs font-bold animate-pulse">
          {{ totalStock }} LEFT
        </div>
      </div>
    </NuxtLink>

    <!-- Wishlist Button -->
    <div class="absolute top-14 right-4">
      <WishlistButton :product-id="product.id" />
    </div>

    <!-- Content -->
    <div class="p-6 relative z-10">
      <!-- Title -->
      <NuxtLink :to="`/products/${product.id}`">
        <h3 class="font-bold text-xl text-white mb-2 line-clamp-2 group-hover:text-cyan-300 transition-colors duration-300">
          {{ product.name }}
        </h3>
      </NuxtLink>
      
      <!-- Brand -->
      <p v-if="product.brands?.name" class="text-sm text-slate-400 mb-4 font-medium uppercase tracking-wider">
        {{ product.brands.name }}
      </p>

      <!-- Price & Rating -->
      <div class="flex items-start justify-between mb-6 gap-3">
        <div class="flex flex-col flex-1 min-w-0">
          <div v-if="hasDiscount" class="flex flex-col space-y-1">
            <span class="text-2xl font-black text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text truncate">
              ${{ discountPrice }}
            </span>
            <span class="text-sm text-slate-500 line-through truncate">
              ${{ regularPrice }}
            </span>
          </div>
          <span v-else class="text-2xl font-black text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text truncate">
            ${{ regularPrice }}
          </span>
          <span v-if="hasMultipleVariants" class="text-xs text-slate-500 uppercase tracking-wide">
            Starting from
          </span>
        </div>
        <div v-if="averageRating > 0" class="flex items-center space-x-1 bg-slate-800/50 px-2 py-1 rounded-lg flex-shrink-0">
          <UIcon name="i-heroicons-star-solid" class="w-4 h-4 text-yellow-400" />
          <span class="text-sm font-bold text-white">{{ averageRating.toFixed(1) }}</span>
        </div>
      </div>

      <!-- Add to Cart Button -->
      <UButton 
        @click="addToCart"
        :disabled="totalStock === 0"
        block
        size="lg"
        :class="totalStock === 0 ? 
          'bg-slate-700 text-slate-400 cursor-not-allowed' : 
          'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-bold shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300'"
      >
        <UIcon v-if="totalStock > 0" name="i-heroicons-shopping-bag" class="w-5 h-5 mr-2" />
        {{ totalStock === 0 ? 'OUT OF STOCK' : 'ADD TO CART' }}
      </UButton>
    </div>

    <!-- Corner Accent -->
    <div class="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-cyan-500/20 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
    

  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const mainImage = computed(() => {
  const images = props.product.product_images || []
  const main = images.find(img => img.is_main)
  return main?.image_url || images[0]?.image_url
})

const activeVariants = computed(() => {
  const variants = props.product.product_variants || []
  return variants.filter(v => v.is_active)
})

const regularPrice = computed(() => {
  if (activeVariants.value.length === 0) return '0.00'
  const prices = activeVariants.value.map(v => parseFloat(v.regular_price))
  return Math.min(...prices).toFixed(2)
})

const discountPrice = computed(() => {
  if (activeVariants.value.length === 0) return '0.00'
  const variant = activeVariants.value.find(v => v.discount_price)
  return variant ? parseFloat(variant.discount_price).toFixed(2) : regularPrice.value
})

const hasDiscount = computed(() => {
  return activeVariants.value.some(v => v.discount_price && v.discount_price < v.regular_price)
})

const discountPercent = computed(() => {
  if (!hasDiscount.value) return 0
  const variant = activeVariants.value.find(v => v.discount_price)
  if (!variant) return 0
  return Math.round(((variant.regular_price - variant.discount_price) / variant.regular_price) * 100)
})

const totalStock = computed(() => {
  return activeVariants.value.reduce((sum, v) => sum + (v.stock || 0), 0)
})

const hasMultipleVariants = computed(() => {
  return activeVariants.value.length > 1
})

const averageRating = computed(() => {
  const reviews = props.product.reviews || []
  if (reviews.length === 0) return 0
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
  return sum / reviews.length
})

const { addToCart: addItemToCart } = useSupabaseCart()
const { incrementCount } = useCartStore()
const toast = useToast()

const addToCart = async () => {
  console.log('Product data:', props.product)
  console.log('Active variants:', activeVariants.value)
  
  if (totalStock.value === 0) return
  
  // Get the first available variant
  const variant = activeVariants.value[0]
  console.log('Selected variant:', variant)
  console.log('Variant keys:', Object.keys(variant))
  console.log('Variant.id specifically:', variant.id)
  
  if (!variant) {
    toast.add({
      title: 'No variants available',
      color: 'orange'
    })
    return
  }
  
  try {
    const { error, isNewItem } = await addItemToCart(props.product.id, variant.id, 1)
    if (error) {
      toast.add({
        title: 'Error adding to cart',
        description: error.message,
        color: 'red'
      })
    } else {
      if (isNewItem) {
        incrementCount(1)
      }
      toast.add({
        title: isNewItem ? 'Added to cart!' : 'Quantity updated!',
        description: `${props.product.name} ${isNewItem ? 'added to' : 'updated in'} your cart`,
        color: 'green'
      })
    }
  } catch (error) {
    toast.add({
      title: 'Failed to add to cart',
      description: 'Please try again',
      color: 'red'
    })
  }
}
</script>