<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold mb-8">Checkout</h1>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Checkout Form -->
      <div class="space-y-6">
        <!-- Shipping Address -->
        <div class="card">
          <h2 class="text-xl font-semibold mb-4">Shipping Address</h2>
          <form class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1">First Name</label>
                <input 
                  v-model="shippingAddress.firstName"
                  type="text" 
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Last Name</label>
                <input 
                  v-model="shippingAddress.lastName"
                  type="text" 
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">Address Line 1</label>
              <input 
                v-model="shippingAddress.line1"
                type="text" 
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">Address Line 2 (Optional)</label>
              <input 
                v-model="shippingAddress.line2"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1">City</label>
                <input 
                  v-model="shippingAddress.city"
                  type="text" 
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">State</label>
                <input 
                  v-model="shippingAddress.state"
                  type="text" 
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">ZIP Code</label>
                <input 
                  v-model="shippingAddress.zipCode"
                  type="text" 
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">Phone Number</label>
              <input 
                v-model="shippingAddress.phone"
                type="tel" 
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
            </div>
          </form>
        </div>
        
        <!-- Payment Method -->
        <div class="card">
          <h2 class="text-xl font-semibold mb-4">Payment Method</h2>
          <div class="space-y-4">
            <div class="flex items-center">
              <input 
                id="credit-card" 
                type="radio" 
                value="credit_card"
                v-model="paymentMethod"
                class="mr-3"
              >
              <label for="credit-card" class="flex items-center">
                <svg class="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" stroke-width="2"/>
                  <path d="M2 10h20" stroke="currentColor" stroke-width="2"/>
                </svg>
                Credit Card
              </label>
            </div>
            
            <div v-if="paymentMethod === 'credit_card'" class="ml-8 space-y-4">
              <div>
                <label class="block text-sm font-medium mb-1">Card Number</label>
                <input 
                  v-model="cardDetails.number"
                  type="text" 
                  placeholder="1234 5678 9012 3456"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium mb-1">Expiry Date</label>
                  <input 
                    v-model="cardDetails.expiry"
                    type="text" 
                    placeholder="MM/YY"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">CVV</label>
                  <input 
                    v-model="cardDetails.cvv"
                    type="text" 
                    placeholder="123"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium mb-1">Cardholder Name</label>
                <input 
                  v-model="cardDetails.name"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
              </div>
            </div>
            
            <div class="flex items-center">
              <input 
                id="paypal" 
                type="radio" 
                value="paypal"
                v-model="paymentMethod"
                class="mr-3"
              >
              <label for="paypal" class="flex items-center">
                <svg class="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.26-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.926-.774l.038-.247.732-4.64.047-.267c.077-.44.466-.774.926-.774h.582c3.748 0 6.68-1.52 7.54-5.924.36-1.847.174-3.388-.777-4.471z"/>
                </svg>
                PayPal
              </label>
            </div>
            
            <div class="flex items-center">
              <input 
                id="cod" 
                type="radio" 
                value="cod"
                v-model="paymentMethod"
                class="mr-3"
              >
              <label for="cod" class="flex items-center">
                <UIcon name="i-heroicons-banknotes" class="w-8 h-8 mr-2 text-green-600" />
                <div>
                  <div class="font-medium">Cash on Delivery</div>
                  <div class="text-sm text-gray-500">Pay with cash upon delivery</div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Order Summary -->
      <div class="lg:col-span-1">
        <div class="card sticky top-4">
          <h2 class="text-xl font-semibold mb-4">Order Summary</h2>
          
          <!-- Cart Items -->
          <div class="space-y-4 mb-6">
            <div v-for="item in cartItems" :key="item.id" class="flex items-center space-x-3">
              <img 
                :src="getItemImage(item)" 
                :alt="item.products.name"
                class="w-16 h-16 object-cover rounded-lg"
              >
              <div class="flex-1">
                <h3 class="font-medium">{{ item.products.name }}</h3>
                <p class="text-sm text-gray-500">Qty: {{ item.quantity }}</p>
              </div>
              <span class="font-medium">${{ (getItemPrice(item) * item.quantity).toFixed(2) }}</span>
            </div>
          </div>
          
          <!-- Order Totals -->
          <div class="space-y-2 border-t pt-4">
            <div class="flex justify-between">
              <span>Subtotal</span>
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
            <hr>
            <div class="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${{ total.toFixed(2) }}</span>
            </div>
          </div>
          
          <!-- Place Order Button -->
          <button 
            @click="placeOrder"
            :disabled="loading || !isFormValid"
            class="w-full mt-6 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Processing...' : 'Place Order' }}
          </button>
          
          <div v-if="paymentMethod === 'cod'" class="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div class="flex items-center">
              <UIcon name="i-heroicons-information-circle" class="w-5 h-5 text-green-600 mr-2" />
              <span class="text-sm text-green-800 font-medium">Cash on Delivery Selected</span>
            </div>
            <p class="text-xs text-green-700 mt-1 ml-7">
              You'll pay ${{ total.toFixed(2) }} in cash when your order is delivered.
            </p>
          </div>
          
          <p class="text-xs text-gray-500 mt-4 text-center">
            By placing your order, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const { getCartItems, clearCart } = useSupabaseCart()
const { createOrder } = useSupabaseOrders()
const { user } = useSupabaseAuth()
const supabase = useSupabaseClient()

const loading = ref(false)
const cartItems = ref([])
const paymentMethod = ref('cod')

const shippingAddress = reactive({
  firstName: '',
  lastName: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  zipCode: '',
  phone: ''
})

const cardDetails = reactive({
  number: '',
  expiry: '',
  cvv: '',
  name: ''
})

// Load cart items
const loadCartItems = async () => {
  const { data } = await getCartItems()
  cartItems.value = data || []
}

const getItemImage = (item) => {
  return item.products.product_images?.find(img => img.is_main)?.image_url || 
         item.products.product_images?.[0]?.image_url || 
         '/placeholder-product.jpg'
}

const getItemPrice = (item) => {
  return item.product_variants?.price || item.products.price
}

// Computed properties
const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => {
    return sum + (getItemPrice(item) * item.quantity)
  }, 0)
})

const shipping = computed(() => {
  return subtotal.value > 100 ? 0 : 10
})

const tax = computed(() => {
  return subtotal.value * 0.08
})

const total = computed(() => {
  return subtotal.value + shipping.value + tax.value
})

const isFormValid = computed(() => {
  const addressValid = shippingAddress.firstName && 
         shippingAddress.lastName && 
         shippingAddress.line1 && 
         shippingAddress.city && 
         shippingAddress.state && 
         shippingAddress.zipCode && 
         shippingAddress.phone
  
  const paymentValid = paymentMethod.value === 'cod' || 
                      (paymentMethod.value === 'credit_card' && cardDetails.number && cardDetails.expiry && cardDetails.cvv)
  
  return addressValid && paymentValid
})

const placeOrder = async () => {
  if (!isFormValid.value) return
  
  loading.value = true
  const toast = useToast()
  
  try {
    // Create address
    const { data: address, error: addressError } = await supabase
      .from('addresses')
      .insert({
        user_id: user.value.id,
        full_name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
        phone: shippingAddress.phone,
        line1: shippingAddress.line1,
        line2: shippingAddress.line2,
        city: shippingAddress.city,
        state: shippingAddress.state,
        zip_code: shippingAddress.zipCode,
        country: 'US'
      })
      .select()
      .single()
    
    if (addressError || !address?.id) {
      throw new Error('Failed to create address')
    }

    // Prepare cart items for Edge Function
    const cartItemsData = cartItems.value.map(item => ({
      variant_id: item.variant_id,
      quantity: item.quantity
    }))

    // Call Edge Function
    const { data: session } = await supabase.auth.getSession()
    
    const response = await fetch('https://hxzpksniexqgkqdcdwer.supabase.co/functions/v1/dynamic-function', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.session?.access_token}`
      },
      body: JSON.stringify({
        user_id: user.value.id,
        cart_items: cartItemsData,
        shipping_address_id: address.id,
        billing_address_id: address.id,
        payment_method: 'cod'
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Edge Function response:', response.status, errorText)
      throw new Error(`Edge Function failed: ${response.status} ${errorText}`)
    }

    const functionResult = await response.json()

    if (!functionResult?.order) {
      console.error('No order returned from function:', functionResult)
      throw new Error('Order creation failed - no order returned')
    }

    const { order } = functionResult
    
    // Clear cart
    await clearCart()
    
    // Show success message
    toast.add({
      title: 'Order Placed Successfully!',
      description: 'Your COD order has been confirmed.',
      color: 'green'
    })
    
    // Redirect to order confirmation
    await navigateTo(`/orders/${order.id}`)
    
  } catch (error) {
    console.error('Error placing order:', error)
    
    // Fallback to direct database insertion if Edge Function fails
    if (error.message?.includes('Failed to fetch') || error.message?.includes('Edge Function')) {
      try {
        console.log('Falling back to direct database insertion...')
        
        const { data: order, error: orderError } = await supabase
          .from('orders')
          .insert({
            user_id: user.value.id,
            status: 'pending',
            total_amount: total.value,
            shipping_address_id: address.id,
            billing_address_id: address.id,
            payment_method: 'cod',
            payment_status: 'pending'
          })
          .select()
          .single()
        
        if (orderError || !order?.id) {
          throw new Error('Fallback order creation failed')
        }
        
        const orderItems = cartItems.value.map(item => ({
          order_id: order.id,
          product_id: item.product_id,
          variant_id: item.variant_id,
          quantity: item.quantity
        }))
        
        await supabase.from('order_items').insert(orderItems)
        await clearCart()
        
        toast.add({
          title: 'Order Placed Successfully!',
          description: 'Your COD order has been confirmed.',
          color: 'green'
        })
        
        await navigateTo(`/orders/${order.id}`)
        return
        
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError)
      }
    }
    
    toast.add({
      title: 'Order Failed',
      description: error.message || 'There was an error placing your order. Please try again.',
      color: 'red'
    })
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadCartItems()
})

useHead({
  title: 'Checkout - ECommerce Store'
})
</script>