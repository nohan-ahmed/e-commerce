<template>
  <div v-if="show" class="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
    <div class="flex items-center space-x-2">
      <UIcon name="i-heroicons-check-circle" class="w-5 h-5" />
      <span>{{ message }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  message: String
})
</script>