<template>
  <UCard class="hover:shadow-xl transition-all duration-300">
    <template #header>
      <NuxtLink :to="`/products/${product.id}`">
        <div class="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
          <img 
            v-if="mainImage" 
            :src="mainImage" 
            :alt="product.name"
            class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <div v-else class="w-full h-full flex items-center justify-center">
            <UIcon name="i-heroicons-photo" class="w-12 h-12 text-gray-400" />
          </div>
        </div>
      </NuxtLink>
    </template>

    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <UBadge variant="soft" size="sm">{{ product.categories?.name || 'General' }}</UBadge>
        <div class="flex items-center">
          <UIcon name="i-heroicons-star-solid" class="w-4 h-4 text-yellow-400" />
          <span class="text-sm text-gray-600 dark:text-gray-400 ml-1">4.5</span>
        </div>
      </div>

      <NuxtLink :to="`/products/${product.id}`">
        <h3 class="font-semibold text-lg hover:text-primary transition-colors">
          {{ product.name }}
        </h3>
      </NuxtLink>

      <div class="flex items-center justify-between">
        <p class="text-2xl font-bold">${{ minPrice }}</p>
        <UBadge v-if="totalStock < 10" color="orange" variant="soft" size="sm">
          {{ totalStock }} left
        </UBadge>
      </div>

      <UButton 
        @click="addToCart"
        :disabled="totalStock === 0"
        block
        :color="totalStock === 0 ? 'gray' : 'primary'"
      >
        {{ totalStock === 0 ? 'Out of Stock' : 'Add to Cart' }}
      </UButton>
    </div>
  </UCard>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const mainImage = computed(() => {
  const images = props.product.product_images || []
  const main = images.find(img => img.is_main)
  return main?.image_url || images[0]?.image_url
})

const minPrice = computed(() => {
  const variants = props.product.product_variants || []
  if (variants.length === 0) return '0.00'
  const prices = variants.map(v => parseFloat(v.price))
  return Math.min(...prices).toFixed(2)
})

const totalStock = computed(() => {
  const variants = props.product.product_variants || []
  return variants.reduce((sum, v) => sum + (v.stock || 0), 0)
})

const addToCart = () => {
  console.log('Added to cart:', props.product.name)
}
</script>