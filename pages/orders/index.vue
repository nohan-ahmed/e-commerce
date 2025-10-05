<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <!-- Background Effects -->
    <div class="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-900 to-slate-900"></div>
    <div class="fixed inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]"></div>
    
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl lg:text-5xl font-black text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text mb-4">
          My Orders
        </h1>
        <p class="text-slate-400 text-lg max-w-2xl mx-auto">
          Track and manage your order history
        </p>
        <div class="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full mt-6"></div>
      </div>

      <!-- Filters & Search -->
      <div class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 mb-8">
        <!-- Mobile Filter Toggle -->
        <div class="lg:hidden mb-4">
          <UButton 
            @click="showFilters = !showFilters"
            variant="outline"
            block
            class="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <UIcon name="i-heroicons-funnel" class="w-4 h-4 mr-2" />
            {{ showFilters ? 'Hide Filters' : 'Show Filters' }}
            <UIcon :name="showFilters ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'" class="w-4 h-4 ml-auto" />
          </UButton>
        </div>

        <div :class="showFilters || !isMobile ? 'block' : 'hidden'" class="space-y-4 lg:space-y-0 lg:flex lg:items-center lg:justify-between">
          <!-- Status Filter -->
          <div class="flex flex-col sm:flex-row gap-4">
            <select 
              v-model="selectedStatus" 
              class="px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors"
            >
              <option value="">All Orders</option>
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <!-- Sort By -->
            <select 
              v-model="sortBy" 
              class="px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors"
            >
              <option value="created_at_desc">Newest First</option>
              <option value="created_at_asc">Oldest First</option>
              <option value="total_desc">Highest Amount</option>
              <option value="total_asc">Lowest Amount</option>
            </select>
          </div>

          <!-- Search -->
          <div class="relative">
            <UIcon name="i-heroicons-magnifying-glass" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search orders..."
              class="pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors text-sm w-full sm:w-64"
            >
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="relative">
          <div class="w-16 h-16 border-4 border-cyan-500/30 rounded-full animate-spin"></div>
          <div class="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-cyan-500 rounded-full animate-spin"></div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredOrders.length === 0" class="text-center py-20">
        <div class="relative inline-block mb-8">
          <div class="w-32 h-32 bg-gradient-to-br from-slate-800 to-slate-700 rounded-3xl flex items-center justify-center border border-slate-600">
            <UIcon name="i-heroicons-shopping-bag" class="w-16 h-16 text-slate-400" />
          </div>
          <div class="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
            <UIcon name="i-heroicons-magnifying-glass" class="w-4 h-4 text-white" />
          </div>
        </div>
        <h3 class="text-2xl font-bold text-white mb-4">No orders found</h3>
        <p class="text-slate-400 mb-8 text-lg">{{ orders.length === 0 ? "You haven't placed any orders yet" : "Try adjusting your filters" }}</p>
        <UButton 
          v-if="orders.length === 0"
          to="/products" 
          class="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400"
        >
          <UIcon name="i-heroicons-shopping-bag" class="w-4 h-4 mr-2" />
          Start Shopping
        </UButton>
        <UButton 
          v-else
          @click="clearFilters" 
          class="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400"
        >
          <UIcon name="i-heroicons-arrow-path" class="w-4 h-4 mr-2" />
          Clear Filters
        </UButton>
      </div>

      <!-- Orders List -->
      <div v-else class="space-y-6">
        <div 
          v-for="order in filteredOrders" 
          :key="order.id"
          class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden hover:border-cyan-400/50 transition-all duration-300"
        >
          <!-- Order Header -->
          <div class="p-6 border-b border-slate-700/50">
            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div class="flex flex-col sm:flex-row sm:items-center gap-4">
                <div>
                  <h3 class="text-lg font-bold text-white mb-1">
                    Order #{{ order.id.slice(-8).toUpperCase() }}
                  </h3>
                  <p class="text-slate-400 text-sm">{{ formatDate(order.created_at) }}</p>
                </div>
                
                <div class="flex items-center gap-3">
                  <span 
                    class="px-3 py-1 rounded-full text-xs font-medium"
                    :class="getStatusClass(order.status)"
                  >
                    {{ order.status.toUpperCase() }}
                  </span>
                  
                  <span 
                    v-if="order.payment_method === 'cod'"
                    class="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium flex items-center gap-1"
                  >
                    <UIcon name="i-heroicons-banknotes" class="w-3 h-3" />
                    COD
                  </span>
                </div>
              </div>

              <div class="flex items-center justify-between lg:justify-end gap-4">
                <div class="text-right">
                  <p class="text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text">
                    ${{ order.total_amount.toFixed(2) }}
                  </p>
                  <p class="text-slate-400 text-sm">{{ order.order_items?.length || 0 }} items</p>
                </div>
                
                <UButton
                  @click="toggleOrderDetails(order.id)"
                  variant="ghost"
                  size="sm"
                  class="text-cyan-400 hover:text-cyan-300"
                >
                  <UIcon 
                    :name="expandedOrders.includes(order.id) ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'" 
                    class="w-5 h-5"
                  />
                </UButton>
              </div>
            </div>
          </div>

          <!-- Order Details (Expandable) -->
          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 max-h-0"
            enter-to-class="opacity-100 max-h-screen"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 max-h-screen"
            leave-to-class="opacity-0 max-h-0"
          >
            <div v-if="expandedOrders.includes(order.id)" class="overflow-hidden">
              <div class="p-6 space-y-6">
                <!-- Order Items -->
                <div>
                  <h4 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <UIcon name="i-heroicons-shopping-bag" class="w-5 h-5 text-cyan-400" />
                    Order Items
                  </h4>
                  <div class="space-y-3">
                    <div 
                      v-for="item in order.order_items" 
                      :key="item.id"
                      class="flex items-center gap-4 p-4 bg-slate-900/50 rounded-xl border border-slate-700/50"
                    >
                      <img 
                        :src="getItemImage(item)" 
                        :alt="item.products?.name"
                        class="w-16 h-16 object-cover rounded-lg bg-slate-700"
                      >
                      <div class="flex-1 min-w-0">
                        <h5 class="font-medium text-white truncate">{{ item.products?.name || 'Product' }}</h5>
                        <p class="text-slate-400 text-sm">Quantity: {{ item.quantity }}</p>
                        <p v-if="item.product_variants?.name" class="text-slate-500 text-xs">
                          {{ item.product_variants.name }}: {{ item.product_variants.value }}
                        </p>
                      </div>
                      <div class="text-right">
                        <p class="font-semibold text-white">
                          ${{ getItemTotal(item).toFixed(2) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Shipping Address -->
                <div v-if="order.addresses">
                  <h4 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <UIcon name="i-heroicons-map-pin" class="w-5 h-5 text-cyan-400" />
                    Shipping Address
                  </h4>
                  <div class="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                    <p class="text-white font-medium">{{ order.addresses.full_name }}</p>
                    <p class="text-slate-400 text-sm">{{ order.addresses.phone }}</p>
                    <p class="text-slate-400 text-sm mt-2">
                      {{ order.addresses.line1 }}
                      <span v-if="order.addresses.line2">, {{ order.addresses.line2 }}</span>
                    </p>
                    <p class="text-slate-400 text-sm">
                      {{ order.addresses.city }}, {{ order.addresses.state }} {{ order.addresses.zip_code }}
                    </p>
                    <p class="text-slate-400 text-sm">{{ order.addresses.country }}</p>
                  </div>
                </div>

                <!-- Actions -->
                <div class="flex flex-col sm:flex-row gap-3">
                  <UButton
                    v-if="order.status === 'pending'"
                    @click="cancelOrder(order.id)"
                    variant="outline"
                    color="red"
                    size="sm"
                  >
                    <UIcon name="i-heroicons-x-mark" class="w-4 h-4 mr-2" />
                    Cancel Order
                  </UButton>
                  
                  <UButton
                    @click="reorder(order)"
                    variant="outline"
                    size="sm"
                    class="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
                  >
                    <UIcon name="i-heroicons-arrow-path" class="w-4 h-4 mr-2" />
                    Reorder
                  </UButton>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const { user } = useSupabaseAuth()
const supabase = useSupabaseClient()
const toast = useToast()

const loading = ref(true)
const orders = ref([])
const expandedOrders = ref([])
const showFilters = ref(false)
const isMobile = ref(false)

// Filters
const selectedStatus = ref('')
const sortBy = ref('created_at_desc')
const searchQuery = ref('')

// Load orders
const loadOrders = async () => {
  loading.value = true
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items(
          *,
          products(name, product_images(image_url, is_main)),
          product_variants(name, value, regular_price, discount_price)
        ),
        addresses!orders_shipping_address_id_fkey(*)
      `)
      .eq('user_id', user.value.id)
      .order('created_at', { ascending: false })

    if (error) throw error
    orders.value = data || []
  } catch (error) {
    console.error('Error loading orders:', error)
    toast.add({
      title: 'Error',
      description: 'Failed to load orders',
      color: 'red'
    })
  } finally {
    loading.value = false
  }
}

// Computed filtered orders
const filteredOrders = computed(() => {
  let filtered = [...orders.value]

  // Filter by status
  if (selectedStatus.value) {
    filtered = filtered.filter(order => order.status === selectedStatus.value)
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(order => 
      order.id.toLowerCase().includes(query) ||
      order.order_items?.some(item => 
        item.products?.name?.toLowerCase().includes(query)
      )
    )
  }

  // Sort orders
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'created_at_asc':
        return new Date(a.created_at) - new Date(b.created_at)
      case 'created_at_desc':
        return new Date(b.created_at) - new Date(a.created_at)
      case 'total_asc':
        return a.total_amount - b.total_amount
      case 'total_desc':
        return b.total_amount - a.total_amount
      default:
        return new Date(b.created_at) - new Date(a.created_at)
    }
  })

  return filtered
})

// Helper functions
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusClass = (status) => {
  const classes = {
    pending: 'bg-yellow-500/20 text-yellow-400',
    shipped: 'bg-blue-500/20 text-blue-400',
    delivered: 'bg-green-500/20 text-green-400',
    cancelled: 'bg-red-500/20 text-red-400',
    returned: 'bg-gray-500/20 text-gray-400'
  }
  return classes[status] || 'bg-gray-500/20 text-gray-400'
}

const getItemImage = (item) => {
  return item.products?.product_images?.find(img => img.is_main)?.image_url ||
         item.products?.product_images?.[0]?.image_url ||
         '/placeholder-product.jpg'
}

const getItemTotal = (item) => {
  const price = item.product_variants?.discount_price || 
                item.product_variants?.regular_price || 
                0
  return price * item.quantity
}

const toggleOrderDetails = (orderId) => {
  const index = expandedOrders.value.indexOf(orderId)
  if (index > -1) {
    expandedOrders.value.splice(index, 1)
  } else {
    expandedOrders.value.push(orderId)
  }
}

const clearFilters = () => {
  selectedStatus.value = ''
  searchQuery.value = ''
  sortBy.value = 'created_at_desc'
}

const cancelOrder = async (orderId) => {
  try {
    const { error } = await supabase
      .from('orders')
      .update({ status: 'cancelled' })
      .eq('id', orderId)

    if (error) throw error

    toast.add({
      title: 'Order Cancelled',
      description: 'Your order has been cancelled successfully',
      color: 'green'
    })

    await loadOrders()
  } catch (error) {
    console.error('Error cancelling order:', error)
    toast.add({
      title: 'Error',
      description: 'Failed to cancel order',
      color: 'red'
    })
  }
}

const reorder = async (order) => {
  // Add order items back to cart
  const { addToCart } = useSupabaseCart()
  
  try {
    for (const item of order.order_items) {
      await addToCart(item.product_id, item.variant_id, item.quantity)
    }
    
    toast.add({
      title: 'Items Added to Cart',
      description: 'Order items have been added to your cart',
      color: 'green'
    })
    
    await navigateTo('/cart')
  } catch (error) {
    console.error('Error reordering:', error)
    toast.add({
      title: 'Error',
      description: 'Failed to add items to cart',
      color: 'red'
    })
  }
}

// Mobile detection
const checkMobile = () => {
  isMobile.value = window.innerWidth < 1024
}

onMounted(() => {
  loadOrders()
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

useHead({
  title: 'My Orders - ECommerce Store'
})
</script>