<template>
  <div>
    <!-- Hero Slider -->
    <HeroSlider :slides="heroSlides" />

    <!-- Categories Carousel -->
    <UContainer class="py-12">
      <div class="text-center mb-10">
        <h2 class="text-3xl font-bold">Shop by Category</h2>
        <p class="text-gray-600 dark:text-gray-400 mt-4">Discover our wide range of product categories</p>
      </div>
      <CategoryCarousel :categories="categoriesWithIcons" />
    </UContainer>

    <!-- Featured Products -->
    <div class="bg-gray-50 dark:bg-gray-800/50 py-16">
      <UContainer>
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold">Featured Products</h2>
          <p class="text-gray-600 dark:text-gray-400 mt-4">Hand-picked products with the best reviews</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard v-for="product in featuredProducts" :key="product.id" :product="product" />
        </div>
        <div class="text-center mt-12">
          <UButton to="/products" size="lg">View All Products</UButton>
        </div>
      </UContainer>
    </div>

    <!-- Promo Banner -->
    <div class="bg-primary-500 text-white py-16">
      <UContainer>
        <div class="text-center">
          <h2 class="text-4xl font-bold mb-4">Ready to dive in?</h2>
          <p class="text-xl mb-8 text-primary-100">Get free shipping on orders over $50</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <UButton to="/products" color="white" variant="solid" size="lg">Shop Now</UButton>
            <UButton color="white" variant="outline" size="lg">Learn More</UButton>
          </div>
        </div>
      </UContainer>
    </div>

    <!-- Newsletter -->
    <UContainer class="py-16">
      <UCard class="bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <div class="p-8 text-center">
          <h2 class="text-3xl font-bold mb-4">Stay Updated</h2>
          <p class="mb-6 text-primary-100">Get the latest updates on new products and exclusive offers</p>
          <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <UInput placeholder="Enter your email" class="flex-1" />
            <UButton color="white" variant="solid">Subscribe</UButton>
          </div>
        </div>
      </UCard>
    </UContainer>
  </div>
</template>

<script setup>
const { getFeaturedProducts } = useSupabaseProducts()
const { getFeaturedCategories } = useSupabaseCategories()

const heroSlides = ref([])
const featuredProducts = ref([])
const categories = ref([])

const iconMap = {
  'smartphones': 'i-heroicons-device-phone-mobile',
  'laptops': 'i-heroicons-computer-desktop',
  'headphones': 'i-heroicons-speaker-wave',
  'cameras': 'i-heroicons-camera',
  'gaming': 'i-heroicons-puzzle-piece',
  'accessories': 'i-heroicons-cube',
  'tablets': 'i-heroicons-device-tablet',
  'watches': 'i-heroicons-clock'
}

const categoriesWithIcons = computed(() => {
  return categories.value.map(category => ({
    ...category,
    icon: iconMap[category.name.toLowerCase()] || 'i-heroicons-squares-2x2',
    slug: category.name.toLowerCase().replace(/\s+/g, '-'),
    productCount: 0
  }))
})

onMounted(async () => {
  const supabase = useSupabaseClient()
  
  // Fetch hero slides from database
  const { data: slides } = await supabase
    .from('hero_slides')
    .select('*')
    .eq('is_active', true)
    .order('order_index')
  
  heroSlides.value = slides || []
  
  // Fetch featured products from database
  const { data: products } = await getFeaturedProducts(4)
  featuredProducts.value = products || []
  
  // Fetch categories from database
  const { data: categoriesData } = await getFeaturedCategories()
  categories.value = categoriesData || []
})

useHead({
  title: 'ElectroStore - Premium Electronics'
})
</script>