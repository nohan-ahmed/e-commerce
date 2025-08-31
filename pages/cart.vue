<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <!-- Background Effects -->
    <div class="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-900 to-slate-900"></div>
    <div class="fixed inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]"></div>
    
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-5xl font-black text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text mb-4">
          Shopping Cart
        </h1>
        <div class="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full"></div>
      </div>
      
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="relative">
          <div class="w-16 h-16 border-4 border-cyan-500/30 rounded-full animate-spin"></div>
          <div class="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-cyan-500 rounded-full animate-spin"></div>
        </div>
      </div>
      
      <!-- Empty Cart -->
      <div v-else-if="cartItems.length === 0" class="text-center py-20">
        <div class="relative inline-block mb-8">
          <div class="w-32 h-32 bg-gradient-to-br from-slate-800 to-slate-700 rounded-3xl flex items-center justify-center border border-slate-600">
            <UIcon name="i-heroicons-shopping-bag" class="w-16 h-16 text-slate-400" />
          </div>
          <div class="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
            <span class="text-white text-sm font-bold">0</span>
          </div>
        </div>
        <h2 class="text-3xl font-bold text-white mb-4">Your cart is empty</h2>
        <p class="text-slate-400 mb-8 text-lg">Discover amazing products and start shopping</p>
        <UButton to="/products" size="xl" class="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400">
          <UIcon name="i-heroicons-sparkles" class="w-5 h-5 mr-2" />
          Start Shopping
        </UButton>
      </div>
      
      <!-- Cart Content -->
      <div v-else class="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="xl:col-span-2 space-y-6">
          <div class="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-white">Cart Items</h2>
              <div class="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full border border-cyan-500/30">
                <span class="text-cyan-300 font-semibold">{{ totalItems }} items</span>
              </div>
            </div>
            
            <div class="space-y-4">
              <div v-for="item in cartItems" :key="item.id" 
                   class="group bg-slate-900/50 rounded-2xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 p-6">
                <div class="flex items-center gap-6">
                  <!-- Product Image -->
                  <div class="relative flex-shrink-0">
                    <div class="w-24 h-24 bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl overflow-hidden border border-slate-600">
                      <img 
                        :src="getItemImage(item)" 
                        :alt="item.products?.name"
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      >
                    </div>
                    <div class="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span class="text-white text-xs font-bold">{{ item.quantity }}</span>
                    </div>
                  </div>
                  
                  <!-- Product Info -->
                  <div class="flex-1 min-w-0">
                    <h3 class="text-xl font-bold text-white mb-2 truncate">{{ item.products?.name }}</h3>
                    <p v-if="item.product_variants" class="text-slate-400 mb-3">
                      {{ item.product_variants.name }}: {{ item.product_variants.value }}
                    </p>
                    <div class="flex items-center gap-4">
                      <div class="text-2xl font-black text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text">
                        ${{ getItemPrice(item).toFixed(2) }}
                      </div>
                      <div class="text-sm text-slate-500">
                        × {{ item.quantity }} = ${{ (getItemPrice(item) * item.quantity).toFixed(2) }}
                      </div>
                    </div>
                  </div>
                  
                  <!-- Quantity Controls -->
                  <div class="flex items-center gap-3">
                    <div class="flex items-center bg-slate-800 rounded-xl border border-slate-600">
                      <button 
                        @click="updateQuantity(item.id, item.quantity - 1)"
                        :disabled="item.quantity <= 1"
                        class="p-2 text-slate-400 hover:text-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <UIcon name="i-heroicons-minus" class="w-4 h-4" />
                      </button>
                      <div class="px-4 py-2 text-white font-semibold min-w-[3rem] text-center">
                        {{ item.quantity }}
                      </div>
                      <button 
                        @click="updateQuantity(item.id, item.quantity + 1)"
                        class="p-2 text-slate-400 hover:text-cyan-400 transition-colors"
                      >
                        <UIcon name="i-heroicons-plus" class="w-4 h-4" />
                      </button>
                    </div>
                    
                    <!-- Remove Button -->
                    <button 
                      @click="removeItem(item.id)"
                      class="p-2 text-slate-400 hover:text-red-400 transition-colors"
                    >
                      <UIcon name="i-heroicons-trash" class="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Order Summary -->
        <div class="xl:col-span-1">
          <div class="sticky top-8 space-y-6">
            <!-- Summary Card -->
            <div class="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-6">
              <h2 class="text-2xl font-bold text-white mb-6">Order Summary</h2>
              
              <div class="space-y-4 mb-6">
                <div class="flex justify-between text-slate-300">
                  <span>Subtotal ({{ totalItems }} items)</span>
                  <span class="font-semibold">${{ subtotal.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-slate-300">
                  <span>Shipping</span>
                  <span class="font-semibold">{{ shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}` }}</span>
                </div>
                <div class="flex justify-between text-slate-300">
                  <span>Tax</span>
                  <span class="font-semibold">${{ tax.toFixed(2) }}</span>
                </div>
                <div class="border-t border-slate-600 pt-4">
                  <div class="flex justify-between text-xl font-bold text-white">
                    <span>Total</span>
                    <span class="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text">
                      ${{ total.toFixed(2) }}
                    </span>
                  </div>
                </div>
              </div>
              
              <!-- Promo Code -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-slate-300 mb-3">Promo Code</label>
                <div class="flex">
                  <input 
                    v-model="couponCode"
                    type="text" 
                    placeholder="Enter code"
                    class="flex-1 px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-l-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                  <button 
                    @click="applyCoupon"
                    class="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold rounded-r-xl transition-all duration-300"
                  >
                    Apply
                  </button>
                </div>
              </div>
              
              <!-- Checkout Button -->
              <UButton 
                to="/checkout" 
                block 
                size="xl"
                class="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-bold shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 mb-4"
              >
                <UIcon name="i-heroicons-credit-card" class="w-5 h-5 mr-2" />
                Proceed to Checkout
              </UButton>
              
              <UButton 
                to="/products" 
                variant="outline" 
                block 
                class="border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500"
              >
                <UIcon name="i-heroicons-arrow-left" class="w-4 h-4 mr-2" />
                Continue Shopping
              </UButton>
            </div>
            
            <!-- Security Badge -->
            <div class="bg-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <UIcon name="i-heroicons-shield-check" class="w-5 h-5 text-white" />
                </div>
                <div>
                  <div class="text-sm font-semibold text-white">Secure Checkout</div>
                  <div class="text-xs text-slate-400">256-bit SSL encryption</div>
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
  const variant = item.product_variants
  if (variant) {
    const price = parseFloat(variant.discount_price || variant.regular_price)
    return isNaN(price) ? 0 : price
  }
  return 0
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
  return cartItems.value.reduce((sum, item) => {
    const productShipping = parseFloat(item.products?.shipping_fee || 0)
    return sum + (productShipping * item.quantity)
  }, 0)
})

const tax = computed(() => {
  return cartItems.value.reduce((sum, item) => {
    const productTax = parseFloat(item.products?.tax || 0)
    return sum + (productTax * item.quantity)
  }, 0)
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