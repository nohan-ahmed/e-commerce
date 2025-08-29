<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">About Us</h1>
      <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
        We're a leading electronics retailer committed to bringing you the latest technology at competitive prices.
      </p>
    </div>
    
    <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="text-center">
        <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="heroicons:truck" class="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 class="text-lg font-semibold mb-2">Fast Shipping</h3>
        <p class="text-gray-600 dark:text-gray-300">Free shipping on orders over $50</p>
      </div>
      
      <div class="text-center">
        <div class="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="heroicons:shield-check" class="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <h3 class="text-lg font-semibold mb-2">Quality Guarantee</h3>
        <p class="text-gray-600 dark:text-gray-300">30-day money back guarantee</p>
      </div>
      
      <div class="text-center">
        <div class="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="heroicons:chat-bubble-left-right" class="w-8 h-8 text-purple-600 dark:text-purple-400" />
        </div>
        <h3 class="text-lg font-semibold mb-2">24/7 Support</h3>
        <p class="text-gray-600 dark:text-gray-300">Round the clock customer support</p>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'About Us - ElectroStore'
})
</script>