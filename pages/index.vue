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
      <CategoryCarousel :categories="categoriesWithDetails" />
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
const supabase = useSupabaseClient()

const categoriesWithDetails = ref([
  { id: 1, name: 'Smartphones', slug: 'smartphones', icon: 'i-heroicons-device-phone-mobile', productCount: 245 },
  { id: 2, name: 'Laptops', slug: 'laptops', icon: 'i-heroicons-computer-desktop', productCount: 189 },
  { id: 3, name: 'Headphones', slug: 'headphones', icon: 'i-heroicons-speaker-wave', productCount: 156 },
  { id: 4, name: 'Cameras', slug: 'cameras', icon: 'i-heroicons-camera', productCount: 98 },
  { id: 5, name: 'Gaming', slug: 'gaming', icon: 'i-heroicons-puzzle-piece', productCount: 167 },
  { id: 6, name: 'Accessories', slug: 'accessories', icon: 'i-heroicons-cube', productCount: 234 },
  { id: 7, name: 'Tablets', slug: 'tablets', icon: 'i-heroicons-device-tablet', productCount: 87 },
  { id: 8, name: 'Watches', slug: 'watches', icon: 'i-heroicons-clock', productCount: 123 }
])

const heroSlides = ref([])
const featuredProducts = ref([])
const { getFeaturedProducts } = useSupabaseProducts()

onMounted(async () => {
  // Fetch hero slides from database
  const supabase = useSupabaseClient()
  const { data: slides } = await supabase
    .from('hero_slides')
    .select('*')
    .eq('is_active', true)
    .order('order_index')
  
  heroSlides.value = slides || []
  
  // Fetch featured products from database
  const { data: products } = await getFeaturedProducts(4)
  featuredProducts.value = products || []
})

useHead({
  title: 'ElectroStore - Premium Electronics'
})
</script>