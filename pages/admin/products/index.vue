<template>
  <NuxtLayout name="admin">
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900">Products</h1>
        <NuxtLink to="/admin/products/create" class="btn-primary">
          Add Product
        </NuxtLink>
      </div>
      
      <!-- Filters -->
      <div class="card">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">Search</label>
            <input 
              v-model="filters.search"
              type="text" 
              placeholder="Search products..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Category</label>
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
          <div>
            <label class="block text-sm font-medium mb-1">Stock Status</label>
            <select 
              v-model="filters.stockStatus"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All</option>
              <option value="in_stock">In Stock</option>
              <option value="low_stock">Low Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>
          <div class="flex items-end">
            <button @click="applyFilters" class="w-full btn-primary">
              Apply Filters
            </button>
          </div>
        </div>
      </div>
      
      <!-- Products Table -->
      <div class="card">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input type="checkbox" @change="toggleSelectAll" class="rounded">
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="product in products" :key="product.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <input 
                    type="checkbox" 
                    :value="product.id"
                    v-model="selectedProducts"
                    class="rounded"
                  >
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <img 
                      :src="getProductImage(product)" 
                      :alt="product.name"
                      class="h-10 w-10 rounded-lg object-cover mr-3"
                    >
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                      <div class="text-sm text-gray-500">{{ product.brands?.name }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ product.categories?.name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${{ product.price }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span :class="getStockClass(product.stock)">
                    {{ product.stock }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                        :class="product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                    {{ product.stock > 0 ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <NuxtLink 
                      :to="`/admin/products/${product.id}`"
                      class="text-primary-600 hover:text-primary-900"
                    >
                      Edit
                    </NuxtLink>
                    <button 
                      @click="deleteProduct(product.id)"
                      class="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
const { getProducts, deleteProduct: removeProduct } = useSupabaseProducts()
const supabase = useSupabaseClient()

const products = ref([])
const categories = ref([])
const selectedProducts = ref([])

const filters = reactive({
  search: '',
  category_id: '',
  stockStatus: ''
})

const loadData = async () => {
  const { data: categoriesData } = await supabase
    .from('categories')
    .select('*')
    .order('name')
  categories.value = categoriesData || []
  
  await loadProducts()
}

const loadProducts = async () => {
  const { data } = await getProducts(filters)
  products.value = data || []
}

const applyFilters = () => {
  loadProducts()
}

const getProductImage = (product) => {
  return product.product_images?.find(img => img.is_main)?.image_url || 
         product.product_images?.[0]?.image_url || 
         '/placeholder-product.jpg'
}

const getStockClass = (stock) => {
  if (stock === 0) return 'text-red-600 font-medium'
  if (stock < 10) return 'text-yellow-600 font-medium'
  return 'text-green-600 font-medium'
}

const toggleSelectAll = (event) => {
  if (event.target.checked) {
    selectedProducts.value = products.value.map(p => p.id)
  } else {
    selectedProducts.value = []
  }
}

const deleteProduct = async (id) => {
  if (confirm('Are you sure you want to delete this product?')) {
    try {
      await removeProduct(id)
      await loadProducts()
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }
}

onMounted(() => {
  loadData()
})

useHead({
  title: 'Products - Admin Dashboard'
})
</script>