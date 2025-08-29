<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Products</h1>
      <USelect v-model="sortBy" :options="sortOptions" />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>

    <div v-if="products.length === 0" class="text-center py-12">
      <p class="text-gray-500 dark:text-gray-400">No products found.</p>
    </div>
  </div>
</template>

<script setup>
const sortBy = ref('name')
const products = ref([])

const sortOptions = [
  { label: 'Name', value: 'name' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Newest', value: 'created_at' }
]

// Sample products
products.value = [
  { id: 1, name: 'iPhone 15 Pro', price: 999.99, stock: 15, categories: { name: 'Smartphones' }, product_images: [], reviews: [] },
  { id: 2, name: 'MacBook Pro M3', price: 1999.99, stock: 8, categories: { name: 'Laptops' }, product_images: [], reviews: [] },
  { id: 3, name: 'AirPods Pro', price: 249.99, stock: 25, categories: { name: 'Headphones' }, product_images: [], reviews: [] },
  { id: 4, name: 'iPad Air', price: 599.99, stock: 12, categories: { name: 'Tablets' }, product_images: [], reviews: [] }
]

useHead({
  title: 'Products - ElectroStore'
})
</script>