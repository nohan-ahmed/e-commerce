<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold mb-8">Shopping Cart</h1>
    
    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
    </div>
    
    <div v-else-if="cartItems.length === 0" class="text-center py-12">
      <svg class="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0h9"></path>
      </svg>
      <h2 class="text-2xl font-semibold text-gray-600 mb-2">Your cart is empty</h2>
      <p class="text-gray-500 mb-6">Add some products to get started</p>
      <NuxtLink to="/products" class="btn-primary">Continue Shopping</NuxtLink>
    </div>
    
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Cart Items -->
      <div class="lg:col-span-2">
        <div class="space-y-4">
          <div v-for="item in cartItems" :key="item.id" class="card">
            <div class="flex items-center space-x-4">
              <img 
                :src="getItemImage(item)" 
                :alt="item.products.name"
                class="w-20 h-20 object-cover rounded-lg"
              >
              
              <div class="flex-1">
                <h3 class="font-medium">{{ item.products.name }}</h3>
                <p v-if="item.product_variants" class="text-sm text-gray-500">
                  {{ item.product_variants.name }}: {{ item.product_variants.value }}
                </p>
                <p class="text-lg font-semibold text-primary-600">
                  ${{ getItemPrice(item) }}
                </p>
              </div>
              
              <div class="flex items-center space-x-2">
                <button 
                  @click="updateQuantity(item.id, item.quantity - 1)"
                  :disabled="item.quantity <= 1"
                  class="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
                >
                  -
                </button>
                <span class="px-3 py-1 border border-gray-300 rounded">{{ item.quantity }}</span>
                <button 
                  @click="updateQuantity(item.id, item.quantity + 1)"
                  class="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              
              <button 
                @click="removeItem(item.id)"
                class="text-red-600 hover:text-red-800"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Order Summary -->
      <div class="lg:col-span-1">
        <div class="card sticky top-4">
          <h2 class="text-xl font-semibold mb-4">Order Summary</h2>
          
          <div class="space-y-2 mb-4">
            <div class="flex justify-between">
              <span>Subtotal ({{ totalItems }} items)</span>
              <span>${{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Shipping</span>
              <span>{{ shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}` }}</span>
            </div>
            <div class="flex justify-between">
              <span>Tax</span>
              <span>${{ tax.toFixed(2) }}</span>
            </div>
            <hr class="my-2">
            <div class="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${{ total.toFixed(2) }}</span>
            </div>
          </div>
          
          <!-- Coupon Code -->
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Coupon Code</label>
            <div class="flex">
              <input 
                v-model="couponCode"
                type="text" 
                placeholder="Enter code"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
              <button 
                @click="applyCoupon"
                class="px-4 py-2 bg-gray-200 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-300"
              >
                Apply
              </button>
            </div>
          </div>
          
          <NuxtLink to="/checkout" class="w-full btn-primary block text-center">
            Proceed to Checkout
          </NuxtLink>
          
          <NuxtLink to="/products" class="block text-center text-primary-600 hover:text-primary-700 mt-4">
            Continue Shopping
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const { getCartItems, updateCartItem, removeFromCart } = useSupabaseCart()

const loading = ref(true)
const cartItems = ref([])
const couponCode = ref('')

const loadCartItems = async () => {
  loading.value = true
  const { data } = await getCartItems()
  cartItems.value = data || []
  loading.value = false
}

const getItemImage = (item) => {
  return item.products.product_images?.find(img => img.is_main)?.image_url || 
         item.products.product_images?.[0]?.image_url || 
         '/placeholder-product.jpg'
}

const getItemPrice = (item) => {
  return item.product_variants?.price || item.products.price
}

const updateQuantity = async (itemId, newQuantity) => {
  if (newQuantity < 1) return
  
  try {
    await updateCartItem(itemId, newQuantity)
    await loadCartItems()
  } catch (error) {
    console.error('Error updating quantity:', error)
  }
}

const removeItem = async (itemId) => {
  try {
    await removeFromCart(itemId)
    await loadCartItems()
  } catch (error) {
    console.error('Error removing item:', error)
  }
}

const applyCoupon = () => {
  // Implement coupon logic
  console.log('Applying coupon:', couponCode.value)
}

// Computed properties for order summary
const totalItems = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
})

const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => {
    return sum + (getItemPrice(item) * item.quantity)
  }, 0)
})

const shipping = computed(() => {
  return subtotal.value > 100 ? 0 : 10 // Free shipping over $100
})

const tax = computed(() => {
  return subtotal.value * 0.08 // 8% tax
})

const total = computed(() => {
  return subtotal.value + shipping.value + tax.value
})

onMounted(() => {
  loadCartItems()
})

useHead({
  title: 'Shopping Cart - ECommerce Store'
})
</script>