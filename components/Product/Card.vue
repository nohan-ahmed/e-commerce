<template>
  <UCard class="hover:shadow-xl transition-all duration-300">
    <template #header>
      <NuxtLink :to="`/products/${product.id}`">
        <div class="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
          <UIcon name="i-heroicons-photo" class="w-12 h-12 text-gray-400" />
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
        <p class="text-2xl font-bold">${{ product.price }}</p>
        <UBadge v-if="product.stock < 10" color="orange" variant="soft" size="sm">
          {{ product.stock }} left
        </UBadge>
      </div>

      <UButton 
        @click="addToCart"
        :disabled="product.stock === 0"
        block
        :color="product.stock === 0 ? 'gray' : 'primary'"
      >
        {{ product.stock === 0 ? 'Out of Stock' : 'Add to Cart' }}
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

const addToCart = () => {
  console.log('Added to cart:', props.product.name)
}
</script>