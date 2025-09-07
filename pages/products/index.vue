<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Filters Sidebar -->
      <div class="lg:w-1/4">
        <div class="card">
          <h3 class="font-semibold mb-4">Filters</h3>
          
          <!-- Search -->
          <div class="mb-6">
            <label class="block text-sm font-medium mb-2">Search</label>
            <input 
              v-model="filters.search" 
              type="text" 
              placeholder="Search products..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
          </div>
          
          <!-- Categories -->
          <div class="mb-6">
            <label class="block text-sm font-medium mb-2">Category</label>
            <select 
              v-model="filters.category_id" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Categories</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>
          
          <!-- Brands -->
          <div class="mb-6">
            <label class="block text-sm font-medium mb-2">Brand</label>
            <select 
              v-model="filters.brand_id" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Brands</option>
              <option v-for="brand in brands" :key="brand.id" :value="brand.id">
                {{ brand.name }}
              </option>
            </select>
          </div>
          
          <!-- Price Range -->
          <div class="mb-6">
            <label class="block text-sm font-medium mb-2">Price Range</label>
            <div class="flex gap-2">
              <input 
                v-model="filters.minPrice" 
                type="number" 
                placeholder="Min"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
              <input 
                v-model="filters.maxPrice" 
                type="number" 
                placeholder="Max"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
            </div>
          </div>
          
          <button @click="applyFilters" class="w-full btn-primary">
            Apply Filters
          </button>
        </div>
      </div>
      
      <!-- Products Grid -->
      <div class="lg:w-3/4">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold">Products</h1>
          <div class="flex items-center gap-4">
            <span class="text-gray-600">{{ products.length }} products</span>
            <select 
              v-model="sortBy" 
              @change="sortProducts"
              class="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="name">Name</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
        
        <div v-if="loading" class="text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        </div>
        
        <div v-else-if="products.length === 0" class="text-center py-12">
          <p class="text-gray-500">No products found matching your criteria.</p>
        </div>
        
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard v-for="product in products" :key="product.id" :product="product" />
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
})

useHead({
  title: 'Products - ECommerce Store',
  meta: [
    { name: 'description', content: 'Browse our wide selection of products with great prices and quality.' }
  ]
})
</script>