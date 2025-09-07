<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <!-- Background Effects -->
    <div class="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-900 to-slate-900"></div>
    <div class="fixed inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]"></div>
    
    <!-- Loading State -->
    <div v-if="loading" class="relative z-10 flex justify-center items-center min-h-screen">
      <div class="relative">
        <div class="w-16 h-16 border-4 border-cyan-500/30 rounded-full animate-spin"></div>
        <div class="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-cyan-500 rounded-full animate-spin"></div>
      </div>
    </div>
    
    <div v-else-if="product" class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Breadcrumb -->
      <nav class="flex mb-8" aria-label="Breadcrumb">
        <ol class="flex items-center space-x-2 text-sm">
          <li><NuxtLink to="/" class="text-slate-400 hover:text-cyan-400 transition-colors">Home</NuxtLink></li>
          <li><UIcon name="i-heroicons-chevron-right" class="w-4 h-4 text-slate-600" /></li>
          <li><NuxtLink to="/products" class="text-slate-400 hover:text-cyan-400 transition-colors">Products</NuxtLink></li>
          <li><UIcon name="i-heroicons-chevron-right" class="w-4 h-4 text-slate-600" /></li>
          <li class="text-cyan-300 font-medium">{{ product.name }}</li>
        </ol>
      </nav>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
        <!-- Product Images -->
        <div class="space-y-4 lg:space-y-6">
          <!-- Main Image -->
          <div class="relative group">
            <div class="aspect-square bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl lg:rounded-3xl overflow-hidden border border-slate-600">
              <img 
                :src="selectedImage || mainImage || '/placeholder-product.jpg'" 
                :alt="product.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
            
            <!-- Image Navigation -->
            <div v-if="product.product_images?.length > 1" class="absolute top-1/2 -translate-y-1/2 left-2 right-2 lg:left-4 lg:right-4 flex justify-between pointer-events-none">
              <button class="w-10 h-10 lg:w-12 lg:h-12 bg-slate-900/80 backdrop-blur-md rounded-full border border-slate-600 flex items-center justify-center text-white hover:bg-slate-800 transition-colors pointer-events-auto">
                <UIcon name="i-heroicons-chevron-left" class="w-4 h-4 lg:w-5 lg:h-5" />
              </button>
              <button class="w-10 h-10 lg:w-12 lg:h-12 bg-slate-900/80 backdrop-blur-md rounded-full border border-slate-600 flex items-center justify-center text-white hover:bg-slate-800 transition-colors pointer-events-auto">
                <UIcon name="i-heroicons-chevron-right" class="w-4 h-4 lg:w-5 lg:h-5" />
              </button>
            </div>
          </div>
          
          <!-- Thumbnail Gallery -->
          <div v-if="product.product_images?.length" class="grid grid-cols-4 gap-2 lg:gap-3">
            <button 
              v-for="image in product.product_images" 
              :key="image.id"
              @click="selectedImage = image.image_url"
              class="aspect-square bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg lg:rounded-xl overflow-hidden border-2 transition-all duration-300"
              :class="selectedImage === image.image_url ? 'border-cyan-400 shadow-lg shadow-cyan-400/25' : 'border-slate-600 hover:border-slate-500'"
            >
              <img :src="image.image_url" :alt="product.name" class="w-full h-full object-cover">
            </button>
          </div>
        </div>
        
        <!-- Product Info -->
        <div class="space-y-6 lg:space-y-8">
          <!-- Header -->
          <div>
            <div class="flex items-center gap-3 mb-4">
              <div class="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full border border-cyan-500/30">
                <span class="text-cyan-300 text-sm font-medium">{{ product.categories?.name }}</span>
              </div>
              <div v-if="product.brands?.name" class="px-3 py-1 bg-slate-800/50 rounded-full border border-slate-600">
                <span class="text-slate-300 text-sm font-medium">{{ product.brands.name }}</span>
              </div>
            </div>
            
            <h1 class="text-2xl lg:text-4xl font-black text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text mb-4">
              {{ product.name }}
            </h1>
            
            <!-- Rating & Reviews -->
            <div v-if="averageRating > 0" class="flex items-center gap-4 mb-6">
              <div class="flex items-center gap-1">
                <UIcon v-for="i in 5" :key="i" 
                       name="i-heroicons-star-solid" 
                       class="w-5 h-5" 
                       :class="i <= averageRating ? 'text-yellow-400' : 'text-slate-600'"
                />
              </div>
              <span class="text-slate-300 font-medium">{{ averageRating.toFixed(1) }}</span>
              <span class="text-slate-500">({{ reviewCount }} reviews)</span>
            </div>
          </div>
          
          <!-- Price -->
          <div class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-4 lg:p-6">
            <div class="flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-4">
              <span class="text-3xl lg:text-4xl font-black text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text">
                ${{ currentPrice }}
              </span>
              <div class="text-slate-400 space-y-1">
                <div class="flex items-center gap-2">
                  <UIcon name="i-heroicons-truck" class="w-4 h-4" />
                  <span class="text-sm">Shipping: ${{ parseFloat(product.shipping_fee || 0).toFixed(2) }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <UIcon name="i-heroicons-receipt-percent" class="w-4 h-4" />
                  <span class="text-sm">Tax: ${{ parseFloat(product.tax || 0).toFixed(2) }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Variants -->
          <div v-if="activeVariants.length" class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-4 lg:p-6">
            <h3 class="text-lg lg:text-xl font-bold text-white mb-4">Choose Options</h3>
            <div class="space-y-3">
              <label v-for="variant in activeVariants" :key="variant.id" 
                     class="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 lg:p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 gap-3"
                     :class="selectedVariant === variant.id ? 'border-cyan-400 bg-cyan-400/10' : 'border-slate-600 hover:border-slate-500 bg-slate-900/50'">
                <div class="flex items-center gap-3">
                  <input 
                    type="radio" 
                    :value="variant.id" 
                    v-model="selectedVariant"
                    class="w-4 h-4 text-cyan-500 bg-slate-700 border-slate-600 focus:ring-cyan-500"
                  >
                  <div>
                    <div class="font-semibold text-white">{{ variant.name }}: {{ variant.value }}</div>
                    <div class="text-sm text-slate-400">Stock: {{ variant.stock }} available</div>
                  </div>
                </div>
                <div class="text-left sm:text-right">
                  <div v-if="variant.discount_price" class="space-y-1">
                    <div class="text-lg lg:text-xl font-bold text-cyan-400">${{ parseFloat(variant.discount_price).toFixed(2) }}</div>
                    <div class="text-sm text-slate-500 line-through">${{ parseFloat(variant.regular_price).toFixed(2) }}</div>
                  </div>
                  <div v-else class="text-lg lg:text-xl font-bold text-white">${{ parseFloat(variant.regular_price).toFixed(2) }}</div>
                </div>
              </label>
            </div>
          </div>
          
          <!-- Quantity & Actions -->
          <div class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-4 lg:p-6 space-y-4 lg:space-y-6">
            <!-- Quantity -->
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-3">Quantity</label>
              <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <div class="flex items-center bg-slate-900 rounded-xl border border-slate-600 w-fit">
                  <button 
                    @click="quantity = Math.max(1, quantity - 1)"
                    class="p-2 lg:p-3 text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    <UIcon name="i-heroicons-minus" class="w-4 h-4" />
                  </button>
                  <input 
                    v-model="quantity" 
                    type="number" 
                    min="1" 
                    :max="totalStock"
                    class="w-16 lg:w-20 px-2 lg:px-3 py-2 lg:py-3 bg-transparent text-center text-white font-semibold focus:outline-none"
                  >
                  <button 
                    @click="quantity = Math.min(totalStock, quantity + 1)"
                    class="p-2 lg:p-3 text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    <UIcon name="i-heroicons-plus" class="w-4 h-4" />
                  </button>
                </div>
                <div class="text-slate-400">
                  <span class="text-sm">{{ totalStock }} in stock</span>
                </div>
              </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <UButton 
                @click="addToCart"
                :disabled="totalStock === 0"
                size="lg"
                class="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 disabled:from-slate-600 disabled:to-slate-600 font-bold shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300"
              >
                <UIcon name="i-heroicons-shopping-bag" class="w-5 h-5 mr-2" />
                {{ totalStock === 0 ? 'Out of Stock' : 'Add to Cart' }}
              </UButton>
              
              <UButton 
                variant="outline" 
                size="lg"
                class="border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500 sm:w-auto w-full"
              >
                <UIcon name="i-heroicons-heart" class="w-5 h-5" />
              </UButton>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Product Details Tabs -->
      <div class="mt-8 lg:mt-16">
        <div class="bg-slate-800/50 backdrop-blur-xl rounded-2xl lg:rounded-3xl border border-slate-700/50 overflow-hidden">
          <!-- Tab Navigation -->
          <div class="flex overflow-x-auto border-b border-slate-700">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              @click="activeTab = tab.id"
              class="px-4 lg:px-8 py-3 lg:py-4 font-semibold transition-all duration-300 whitespace-nowrap flex-shrink-0"
              :class="activeTab === tab.id ? 'text-cyan-400 border-b-2 border-cyan-400 bg-slate-900/50' : 'text-slate-400 hover:text-slate-300'"
            >
              {{ tab.label }}
            </button>
          </div>
          
          <!-- Tab Content -->
          <div class="p-4 lg:p-8">
            <!-- Description Tab -->
            <div v-if="activeTab === 'description'" class="prose prose-invert max-w-none prose-sm lg:prose-base">
              <div class="text-slate-300 leading-relaxed text-sm lg:text-base" v-html="product.description || 'No description available.'">
              </div>
            </div>
            
            <!-- Specifications Tab -->
            <div v-if="activeTab === 'specifications'" class="space-y-3 lg:space-y-4">
              <div v-if="product.product_attributes?.length" class="grid grid-cols-1 gap-3 lg:gap-4">
                <div v-for="attr in product.product_attributes" :key="attr.id" 
                     class="flex flex-col sm:flex-row sm:justify-between p-3 lg:p-4 bg-slate-900/50 rounded-xl border border-slate-700 gap-1 sm:gap-0">
                  <span class="font-medium text-slate-300 text-sm lg:text-base">{{ attr.key }}</span>
                  <span class="text-white font-semibold text-sm lg:text-base">{{ attr.value }}</span>
                </div>
              </div>
              <div v-else class="text-center py-8 lg:py-12 text-slate-400">
                No specifications available.
              </div>
            </div>
            
            <!-- Reviews Tab -->
            <div v-if="activeTab === 'reviews'" class="space-y-6 lg:space-y-8">
              <!-- Add Review Form -->
              <div v-if="user" class="bg-slate-900/50 rounded-2xl border border-slate-700 p-4 lg:p-6">
                <h3 class="text-lg lg:text-xl font-bold text-white mb-4 lg:mb-6">Write a Review</h3>
                <form @submit.prevent="submitReview" class="space-y-4 lg:space-y-6">
                  <div>
                    <label class="block text-sm font-medium text-slate-300 mb-3">Rating</label>
                    <div class="flex gap-1 lg:gap-2">
                      <button 
                        v-for="i in 5" 
                        :key="i"
                        type="button"
                        @click="newReview.rating = i"
                        class="w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 transition-all duration-200"
                        :class="i <= newReview.rating ? 'border-yellow-400 bg-yellow-400/20' : 'border-slate-600 hover:border-slate-500'"
                      >
                        <UIcon name="i-heroicons-star-solid" 
                               class="w-4 h-4 lg:w-5 lg:h-5 mx-auto" 
                               :class="i <= newReview.rating ? 'text-yellow-400' : 'text-slate-600'" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-slate-300 mb-3">Comment</label>
                    <textarea 
                      v-model="newReview.comment"
                      rows="4"
                      class="w-full px-3 lg:px-4 py-2 lg:py-3 bg-slate-900 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors text-sm lg:text-base"
                      placeholder="Share your experience with this product..."
                    ></textarea>
                  </div>
                  <UButton type="submit" size="sm" class="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 w-full sm:w-auto">
                    Submit Review
                  </UButton>
                </form>
              </div>
              
              <!-- Reviews List -->
              <div class="space-y-4 lg:space-y-6">
                <div v-for="review in product.reviews" :key="review.id" 
                     class="bg-slate-900/50 rounded-2xl border border-slate-700 p-4 lg:p-6">
                  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 lg:mb-4 gap-2 sm:gap-4">
                    <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <div class="flex items-center gap-1">
                        <UIcon v-for="i in 5" :key="i" 
                               name="i-heroicons-star-solid" 
                               class="w-3 h-3 lg:w-4 lg:h-4" 
                               :class="i <= review.rating ? 'text-yellow-400' : 'text-slate-600'" />
                      </div>
                      <span class="font-medium text-white text-sm lg:text-base">{{ review.users?.email || 'Anonymous' }}</span>
                    </div>
                    <span class="text-xs lg:text-sm text-slate-400">{{ formatDate(review.created_at) }}</span>
                  </div>
                  <p class="text-slate-300 leading-relaxed text-sm lg:text-base">{{ review.comment }}</p>
                </div>
                
                <div v-if="!product.reviews?.length" class="text-center py-8 lg:py-12 text-slate-400">
                  No reviews yet. Be the first to review this product!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { getProduct } = useSupabaseProducts()
const { addToCart: addItemToCart } = useSupabaseCart()
const { incrementCount } = useCartStore()
const toast = useToast()
const { user } = useSupabaseAuth()
const supabase = useSupabaseClient()

const product = ref(null)
const loading = ref(true)
const selectedImage = ref('')
const selectedVariant = ref('')
const quantity = ref(1)
const activeTab = ref('description')
const newReview = reactive({
  rating: 5,
  comment: ''
})

const tabs = [
  { id: 'description', label: 'Description' },
  { id: 'specifications', label: 'Specifications' },
  { id: 'reviews', label: 'Reviews' }
]

// Load product data
const loadProduct = async () => {
  try {
    loading.value = true
    console.log('Loading product with ID:', route.params.id)
    const { data, error } = await getProduct(route.params.id)
    console.log('Product data:', data, 'Error:', error)
    
    if (error || !data) {
      console.error('Product not found or error occurred')
      throw createError({ statusCode: 404, statusMessage: 'Product not found' })
    }
    product.value = data
    
    // Set default selected variant
    if (product.value.product_variants?.length) {
      selectedVariant.value = product.value.product_variants.find(v => v.is_active)?.id || ''
    }
    console.log('Product loaded successfully:', product.value.name)
  } catch (error) {
    console.error('Error loading product:', error)
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  } finally {
    loading.value = false
  }
}

// Load product on mount
onMounted(() => {
  loadProduct()
})

const mainImage = computed(() => {
  if (!product.value) return ''
  return product.value.product_images?.find(img => img.is_main)?.image_url || 
         product.value.product_images?.[0]?.image_url
})

const averageRating = computed(() => {
  if (!product.value?.reviews?.length) return 0
  const sum = product.value.reviews.reduce((acc, review) => acc + review.rating, 0)
  return Math.round(sum / product.value.reviews.length)
})

const reviewCount = computed(() => {
  return product.value?.reviews?.length || 0
})

const currentPrice = computed(() => {
  if (!product.value) return '0.00'
  if (selectedVariant.value) {
    const variant = product.value.product_variants?.find(v => v.id === selectedVariant.value)
    return variant?.discount_price || variant?.regular_price || '0.00'
  }
  // Show lowest price from active variants
  const activeVariants = product.value.product_variants?.filter(v => v.is_active) || []
  if (activeVariants.length > 0) {
    const prices = activeVariants.map(v => parseFloat(v.discount_price || v.regular_price))
    return Math.min(...prices).toFixed(2)
  }
  return '0.00'
})

const activeVariants = computed(() => {
  if (!product.value) return []
  return product.value.product_variants?.filter(v => v.is_active) || []
})

const totalStock = computed(() => {
  return activeVariants.value.reduce((sum, v) => sum + (v.stock || 0), 0)
})

const addToCart = async () => {
  // If no variant selected, select the first available one
  let variantId = selectedVariant.value
  if (!variantId && product.value.product_variants?.length) {
    variantId = product.value.product_variants.find(v => v.is_active)?.id
  }
  
  if (!variantId) {
    toast.add({
      title: 'Please select a variant',
      color: 'orange'
    })
    return
  }
  
  try {
    const { error, isNewItem } = await addItemToCart(product.value.id, variantId, quantity.value)
    
    if (error) {
      toast.add({
        title: 'Error adding to cart',
        description: error.message,
        color: 'red'
      })
    } else {
      if (isNewItem) {
        incrementCount(quantity.value)
      }
      toast.add({
        title: 'Added to cart!',
        description: `${product.value.name} has been added to your cart`,
        color: 'green'
      })
    }
  } catch (error) {
    console.error('Error adding to cart:', error)
    toast.add({
      title: 'Failed to add to cart',
      description: 'Please try again',
      color: 'red'
    })
  }
}

const submitReview = async () => {
  if (!user.value) return
  
  try {
    await supabase.from('reviews').insert({
      product_id: product.value.id,
      user_id: user.value.id,
      rating: newReview.rating,
      comment: newReview.comment
    })
    
    // Reload product to show new review
    const { data } = await getProduct(route.params.id)
    product.value = data
    
    // Reset form
    newReview.rating = 5
    newReview.comment = ''
  } catch (error) {
    console.error('Error submitting review:', error)
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

// Dynamic head based on product data
watchEffect(() => {
  if (product.value) {
    useHead({
      title: `${product.value.name} - ECommerce Store`,
      meta: [
        { name: 'description', content: product.value.description || 'Product details' }
      ]
    })
  }
})
</script>