<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <!-- Background Effects -->
    <div class="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-900 to-slate-900"></div>
    <div class="fixed inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]"></div>
    
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl lg:text-5xl font-black text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text mb-4">
          Discover Products
        </h1>
        <p class="text-slate-400 text-lg max-w-2xl mx-auto">
          Explore our curated collection of premium products
        </p>
        <div class="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full mt-6"></div>
      </div>
      
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Filters Sidebar -->
        <div class="lg:w-1/4">
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
          
          <div 
            class="bg-slate-800/50 backdrop-blur-xl rounded-2xl lg:rounded-3xl border border-slate-700/50 p-4 lg:p-6 lg:sticky lg:top-8 transition-all duration-300"
            :class="showFilters || !isMobile ? 'block' : 'hidden'"
          >
            <h3 class="text-lg lg:text-xl font-bold text-white mb-4 lg:mb-6 flex items-center gap-2">
              <UIcon name="i-heroicons-funnel" class="w-4 h-4 lg:w-5 lg:h-5 text-cyan-400" />
              Filters
            </h3>
            
            <!-- Search -->
            <div class="mb-4 lg:mb-6">
              <label class="block text-sm font-medium text-slate-300 mb-2 lg:mb-3">Search Products</label>
              <div class="relative">
                <UIcon name="i-heroicons-magnifying-glass" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  v-model="filters.search" 
                  type="text" 
                  placeholder="Search products..."
                  class="w-full pl-10 pr-4 py-2.5 lg:py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors text-sm lg:text-base"
                >
              </div>
            </div>
            
            <!-- Categories -->
            <div class="mb-4 lg:mb-6">
              <label class="block text-sm font-medium text-slate-300 mb-2 lg:mb-3">Category</label>
              <select 
                v-model="filters.category_id" 
                class="w-full px-3 lg:px-4 py-2.5 lg:py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm lg:text-base"
              >
                <option value="" class="bg-slate-800">All Categories</option>
                <option v-for="category in categories" :key="category.id" :value="category.id" class="bg-slate-800">
                  {{ category.name }}
                </option>
              </select>
            </div>
            
            <!-- Brands -->
            <div class="mb-4 lg:mb-6">
              <label class="block text-sm font-medium text-slate-300 mb-2 lg:mb-3">Brand</label>
              <select 
                v-model="filters.brand_id" 
                class="w-full px-3 lg:px-4 py-2.5 lg:py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm lg:text-base"
              >
                <option value="" class="bg-slate-800">All Brands</option>
                <option v-for="brand in brands" :key="brand.id" :value="brand.id" class="bg-slate-800">
                  {{ brand.name }}
                </option>
              </select>
            </div>
            
            <!-- Price Range -->
            <div class="mb-6 lg:mb-8">
              <label class="block text-sm font-medium text-slate-300 mb-2 lg:mb-3">Price Range</label>
              <div class="grid grid-cols-2 gap-2 lg:gap-3">
                <input 
                  v-model="filters.minPrice" 
                  type="number" 
                  placeholder="Min"
                  class="px-3 lg:px-4 py-2.5 lg:py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors text-sm lg:text-base"
                >
                <input 
                  v-model="filters.maxPrice" 
                  type="number" 
                  placeholder="Max"
                  class="px-3 lg:px-4 py-2.5 lg:py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors text-sm lg:text-base"
                >
              </div>
            </div>
            
            <div class="flex gap-2 lg:gap-0">
              <UButton 
                @click="applyFilters" 
                class="flex-1 lg:w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 font-semibold shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300"
                size="sm"
              >
                <UIcon name="i-heroicons-funnel" class="w-4 h-4 mr-1 lg:mr-2" />
                Apply
              </UButton>
              <UButton 
                @click="clearFilters" 
                variant="outline"
                class="flex-1 lg:w-full lg:mt-2 border-slate-600 text-slate-300 hover:bg-slate-700"
                size="sm"
              >
                <UIcon name="i-heroicons-arrow-path" class="w-4 h-4 mr-1 lg:mr-2" />
                Clear
              </UButton>
            </div>
          </div>
        </div>
      
        <!-- Products Grid -->
        <div class="lg:w-3/4">
          <!-- Products Header -->
          <div class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-4 lg:p-6 mb-6 lg:mb-8">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 lg:gap-4">
              <div class="flex items-center gap-2 lg:gap-3">
                <div class="w-1.5 lg:w-2 h-6 lg:h-8 bg-gradient-to-b from-cyan-500 to-purple-500 rounded-full"></div>
                <div>
                  <h2 class="text-lg lg:text-xl font-bold text-white">Products</h2>
                  <p class="text-slate-400 text-xs lg:text-sm">{{ products.length }} items found</p>
                </div>
              </div>
              
              <div class="flex items-center gap-2 lg:gap-3">
                <span class="text-slate-400 text-xs lg:text-sm hidden sm:block">Sort by:</span>
                <select 
                  v-model="sortBy" 
                  @change="sortProducts"
                  class="px-3 lg:px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-xl text-white text-xs lg:text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                >
                  <option value="name" class="bg-slate-800">Name</option>
                  <option value="price_asc" class="bg-slate-800">Price: Low to High</option>
                  <option value="price_desc" class="bg-slate-800">Price: High to Low</option>
                  <option value="newest" class="bg-slate-800">Newest</option>
                </select>
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
          <div v-else-if="products.length === 0" class="text-center py-20">
            <div class="relative inline-block mb-8">
              <div class="w-32 h-32 bg-gradient-to-br from-slate-800 to-slate-700 rounded-3xl flex items-center justify-center border border-slate-600">
                <UIcon name="i-heroicons-cube" class="w-16 h-16 text-slate-400" />
              </div>
              <div class="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                <UIcon name="i-heroicons-magnifying-glass" class="w-4 h-4 text-white" />
              </div>
            </div>
            <h3 class="text-2xl font-bold text-white mb-4">No products found</h3>
            <p class="text-slate-400 mb-8 text-lg">Try adjusting your filters or search terms</p>
            <UButton @click="clearFilters" class="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400">
              <UIcon name="i-heroicons-arrow-path" class="w-4 h-4 mr-2" />
              Clear Filters
            </UButton>
          </div>
          
          <!-- Products Grid -->
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
            <ProductCard v-for="product in products" :key="product.id" :product="product" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { getProducts } = useSupabaseProducts()
const supabase = useSupabaseClient()

const loading = ref(true)
const products = ref([])
const categories = ref([])
const brands = ref([])
const sortBy = ref('name')
const showFilters = ref(false)
const isMobile = ref(false)

const filters = reactive({
  search: '',
  category_id: '',
  brand_id: '',
  minPrice: '',
  maxPrice: ''
})

// Load initial data
const loadData = async () => {
  loading.value = true
  
  try {
    // Load categories and brands
    const [categoriesRes, brandsRes] = await Promise.all([
      supabase.from('categories').select('*').order('name'),
      supabase.from('brands').select('*').order('name')
    ])
    
    categories.value = categoriesRes.data || []
    brands.value = brandsRes.data || []
    
    // Load products
    await loadProducts()
  } catch (error) {
    console.error('Error loading data:', error)
    // Load sample data on error
    await loadProducts()
  } finally {
    loading.value = false
  }
}

const loadProducts = async () => {
  const { data, error } = await getProducts(filters)
  console.log('Products loaded:', data, 'Error:', error)
  products.value = data || []
  sortProducts()
}

const applyFilters = () => {
  loadProducts()
}

const clearFilters = () => {
  Object.assign(filters, {
    search: '',
    category_id: '',
    brand_id: '',
    minPrice: '',
    maxPrice: ''
  })
  loadProducts()
}

const sortProducts = () => {
  switch (sortBy.value) {
    case 'price_asc':
      products.value.sort((a, b) => a.price - b.price)
      break
    case 'price_desc':
      products.value.sort((a, b) => b.price - a.price)
      break
    case 'newest':
      products.value.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      break
    default:
      products.value.sort((a, b) => a.name.localeCompare(b.name))
  }
}

// Watch for filter changes
watch(filters, () => {
  loadProducts()
}, { deep: true })

onMounted(() => {
  loadData()
  
  // Check if mobile
  const checkMobile = () => {
    isMobile.value = window.innerWidth < 1024
  }
  checkMobile()
  window.addEventListener('resize', checkMobile)
  
  onUnmounted(() => {
    window.removeEventListener('resize', checkMobile)
  })
})

useHead({
  title: 'Products - ECommerce Store',
  meta: [
    { name: 'description', content: 'Browse our wide selection of products with great prices and quality.' }
  ]
})
</script>