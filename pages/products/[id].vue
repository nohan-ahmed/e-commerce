<template>
  <div v-if="product" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- Product Images -->
      <div>
        <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 mb-4">
          <img 
            :src="selectedImage || mainImage || '/placeholder-product.jpg'" 
            :alt="product.name"
            class="h-96 w-full object-cover object-center"
          />
        </div>
        <div class="grid grid-cols-4 gap-2">
          <button 
            v-for="image in product.product_images" 
            :key="image.id"
            @click="selectedImage = image.image_url"
            class="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg border-2"
            :class="selectedImage === image.image_url ? 'border-primary-600' : 'border-gray-200'"
          >
            <img :src="image.image_url" :alt="product.name" class="h-20 w-full object-cover">
          </button>
        </div>
      </div>
      
      <!-- Product Info -->
      <div>
        <nav class="flex mb-4" aria-label="Breadcrumb">
          <ol class="flex items-center space-x-2">
            <li><NuxtLink to="/" class="text-gray-500 hover:text-gray-700">Home</NuxtLink></li>
            <li><span class="text-gray-500">/</span></li>
            <li><NuxtLink to="/products" class="text-gray-500 hover:text-gray-700">Products</NuxtLink></li>
            <li><span class="text-gray-500">/</span></li>
            <li class="text-gray-900">{{ product.name }}</li>
          </ol>
        </nav>
        
        <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ product.name }}</h1>
        
        <div class="flex items-center mb-4">
          <div class="flex items-center">
            <svg v-for="i in 5" :key="i" 
                 class="w-5 h-5" 
                 :class="i <= averageRating ? 'text-yellow-400' : 'text-gray-300'"
                 fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          </div>
          <span class="ml-2 text-gray-600">({{ reviewCount }} reviews)</span>
        </div>
        
        <p class="text-3xl font-bold text-gray-900 mb-6">${{ currentPrice }}</p>
        
        <div class="mb-6">
          <p class="text-gray-600">Brand: <span class="font-medium">{{ product.brands?.name }}</span></p>
          <p class="text-gray-600">Category: <span class="font-medium">{{ product.categories?.name }}</span></p>
          <p class="text-gray-600">Stock: <span class="font-medium">{{ totalStock }} available</span></p>
          <p class="text-gray-600">Shipping: <span class="font-medium">${{ parseFloat(product.shipping_fee || 0).toFixed(2) }}</span></p>
          <p class="text-gray-600">Tax: <span class="font-medium">${{ parseFloat(product.tax || 0).toFixed(2) }}</span></p>
        </div>
        
        <!-- Variants -->
        <div v-if="activeVariants.length" class="mb-6">
          <h3 class="text-lg font-medium mb-3">Options</h3>
          <div class="space-y-3">
            <div v-for="variant in activeVariants" :key="variant.id">
              <label class="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50" :class="selectedVariant === variant.id ? 'border-primary-500 bg-primary-50' : 'border-gray-200'">
                <div class="flex items-center">
                  <input 
                    type="radio" 
                    :value="variant.id" 
                    v-model="selectedVariant"
                    class="mr-3"
                  >
                  <div>
                    <span class="font-medium">{{ variant.name }}: {{ variant.value }}</span>
                    <div class="text-sm text-gray-500">Stock: {{ variant.stock }}</div>
                  </div>
                </div>
                <div class="text-right">
                  <div v-if="variant.discount_price" class="space-y-1">
                    <div class="text-lg font-bold text-primary-600">${{ parseFloat(variant.discount_price).toFixed(2) }}</div>
                    <div class="text-sm text-gray-500 line-through">${{ parseFloat(variant.regular_price).toFixed(2) }}</div>
                  </div>
                  <div v-else class="text-lg font-bold">${{ parseFloat(variant.regular_price).toFixed(2) }}</div>
                </div>
              </label>
            </div>
          </div>
        </div>
        
        <!-- Quantity -->
        <div class="mb-6">
          <label class="block text-sm font-medium mb-2">Quantity</label>
          <div class="flex items-center">
            <button 
              @click="quantity = Math.max(1, quantity - 1)"
              class="px-3 py-1 border border-gray-300 rounded-l-lg hover:bg-gray-100"
            >
              -
            </button>
            <input 
              v-model="quantity" 
              type="number" 
              min="1" 
              :max="totalStock"
              class="w-20 px-3 py-1 border-t border-b border-gray-300 text-center focus:outline-none"
            >
            <button 
              @click="quantity = Math.min(totalStock, quantity + 1)"
              class="px-3 py-1 border border-gray-300 rounded-r-lg hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>
        
        <!-- Add to Cart -->
        <div class="flex space-x-4 mb-8">
          <button 
            @click="addToCart"
            :disabled="totalStock === 0"
            class="flex-1 btn-primary disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {{ totalStock === 0 ? 'Out of Stock' : 'Add to Cart' }}
          </button>
          <button class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </button>
        </div>
        
        <!-- Description -->
        <div class="mb-8">
          <h3 class="text-lg font-medium mb-3">Description</h3>
          <div class="prose text-gray-600" v-html="product.description"></div>
        </div>
        
        <!-- Attributes -->
        <div v-if="product.product_attributes?.length" class="mb-8">
          <h3 class="text-lg font-medium mb-3">Specifications</h3>
          <dl class="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
            <div v-for="attr in product.product_attributes" :key="attr.id" class="flex">
              <dt class="font-medium text-gray-900 mr-2">{{ attr.key }}:</dt>
              <dd class="text-gray-600">{{ attr.value }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
    
    <!-- Reviews Section -->
    <div class="mt-16">
      <h2 class="text-2xl font-bold mb-8">Customer Reviews</h2>
      
      <!-- Add Review Form -->
      <div v-if="user" class="card mb-8">
        <h3 class="font-medium mb-4">Write a Review</h3>
        <form @submit.prevent="submitReview">
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Rating</label>
            <div class="flex space-x-1">
              <button 
                v-for="i in 5" 
                :key="i"
                type="button"
                @click="newReview.rating = i"
                class="w-8 h-8"
              >
                <svg 
                  class="w-full h-full" 
                  :class="i <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'"
                  fill="currentColor" viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </button>
            </div>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Comment</label>
            <textarea 
              v-model="newReview.comment"
              rows="4"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Share your experience with this product..."
            ></textarea>
          </div>
          <button type="submit" class="btn-primary">Submit Review</button>
        </form>
      </div>
      
      <!-- Reviews List -->
      <div class="space-y-6">
        <div v-for="review in product.reviews" :key="review.id" class="card">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center">
              <div class="flex items-center">
                <svg v-for="i in 5" :key="i" 
                     class="w-4 h-4" 
                     :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-300'"
                     fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
              <span class="ml-2 font-medium">{{ review.users?.email || 'Anonymous' }}</span>
            </div>
            <span class="text-sm text-gray-500">{{ formatDate(review.created_at) }}</span>
          </div>
          <p class="text-gray-600">{{ review.comment }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { getProduct } = useSupabaseProducts()
const { addToCart: addItemToCart } = useSupabaseCart()
const { user } = useSupabaseAuth()
const supabase = useSupabaseClient()

const product = ref(null)
const selectedImage = ref('')
const selectedVariant = ref('')
const quantity = ref(1)
const newReview = reactive({
  rating: 5,
  comment: ''
})

// Load product data
const { data } = await getProduct(route.params.id)
product.value = data

if (!product.value) {
  throw createError({ statusCode: 404, statusMessage: 'Product not found' })
}

const mainImage = computed(() => {
  return product.value.product_images?.find(img => img.is_main)?.image_url || 
         product.value.product_images?.[0]?.image_url
})

const averageRating = computed(() => {
  if (!product.value.reviews?.length) return 0
  const sum = product.value.reviews.reduce((acc, review) => acc + review.rating, 0)
  return Math.round(sum / product.value.reviews.length)
})

const reviewCount = computed(() => {
  return product.value.reviews?.length || 0
})

const currentPrice = computed(() => {
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
    alert('Please select a variant')
    return
  }
  
  try {
    const { error } = await addItemToCart(product.value.id, variantId, quantity.value)
    if (error) {
      alert('Error: ' + error.message)
    } else {
      alert('Added to cart successfully!')
    }
  } catch (error) {
    console.error('Error adding to cart:', error)
    alert('Failed to add to cart')
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

useHead({
  title: `${product.value.name} - ECommerce Store`,
  meta: [
    { name: 'description', content: product.value.description }
  ]
})
</script>