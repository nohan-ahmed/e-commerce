<template>
  <div class="relative select-none">
    <!-- Carousel Container -->
    <div 
      ref="carouselContainer"
      class="overflow-hidden cursor-grab active:cursor-grabbing"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
      @mouseleave="handleMouseUp"
    >
      <div 
        class="flex gap-3 sm:gap-4 transition-transform duration-500 ease-out"
        :style="{ 
          transform: `translateX(-${currentIndex * slideWidth}%)`,
          transitionDuration: isDragging ? '0ms' : '500ms'
        }"
      >
        <div
          v-for="category in categories"
          :key="category.id"
          class="flex-shrink-0"
          :style="{ width: `${slideWidth}%` }"
        >
          <div 
            class="group relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20 cursor-pointer"
            @click="navigateToCategory(category)"
          >
            <!-- Glow Effect -->
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <!-- Fixed Size Image Container -->
            <div class="w-full h-32 sm:h-40 md:h-48 relative overflow-hidden">
              <img 
                v-if="category.image_url" 
                :src="category.image_url" 
                :alt="category.name"
                class="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
              />
              <div v-else class="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                <UIcon :name="category.icon" class="w-8 h-8 sm:w-12 sm:h-12 text-slate-400" />
              </div>
              
              <!-- Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              <!-- Category Name -->
              <div class="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                <h3 class="text-white font-bold text-sm sm:text-base mb-1 group-hover:text-cyan-300 transition-colors">
                  {{ category.name }}
                </h3>
                <p class="text-slate-300 text-xs opacity-80">
                  {{ category.productCount || 0 }} items
                </p>
              </div>
              
              <!-- Hover Arrow -->
              <div class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                <div class="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                  <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Arrows -->
    <UButton
      v-if="canScrollLeft"
      @click="previousSlide"
      variant="ghost"
      size="sm"
      square
      class="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 backdrop-blur-md text-white border-white/20 hover:bg-black/60 transition-all duration-300"
    >
      <UIcon name="i-heroicons-chevron-left" class="w-5 h-5" />
    </UButton>
    
    <UButton
      v-if="canScrollRight"
      @click="nextSlide"
      variant="ghost"
      size="sm"
      square
      class="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 backdrop-blur-md text-white border-white/20 hover:bg-black/60 transition-all duration-300"
    >
      <UIcon name="i-heroicons-chevron-right" class="w-5 h-5" />
    </UButton>

    <!-- Dots Indicator -->
    <div class="flex justify-center mt-6 space-x-2">
      <button
        v-for="(_, index) in totalSlides"
        :key="index"
        @click="goToSlide(index)"
        class="w-2 h-2 rounded-full transition-all duration-300"
        :class="index === currentIndex ? 'bg-cyan-400 scale-125' : 'bg-slate-600 hover:bg-slate-500'"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  categories: { type: Array, default: () => [] }
})

const carouselContainer = ref(null)
const currentIndex = ref(0)
const slidesToShow = ref(2)
const isDragging = ref(false)
const startX = ref(0)
const currentX = ref(0)

// Responsive slides per view
const updateSlidesToShow = () => {
  if (!process.client) return
  const width = window.innerWidth
  if (width < 480) slidesToShow.value = 2
  else if (width < 640) slidesToShow.value = 3
  else if (width < 768) slidesToShow.value = 4
  else if (width < 1024) slidesToShow.value = 4
  else slidesToShow.value = 6
}

const slideWidth = computed(() => (100 / slidesToShow.value) - (12 / slidesToShow.value))
const totalSlides = computed(() => Math.max(0, props.categories.length - slidesToShow.value + 1))
const canScrollLeft = computed(() => currentIndex.value > 0)
const canScrollRight = computed(() => currentIndex.value < totalSlides.value - 1)

// Navigation
const nextSlide = () => {
  if (canScrollRight.value) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
}

const previousSlide = () => {
  if (canScrollLeft.value) {
    currentIndex.value--
  }
}

const goToSlide = (index) => {
  currentIndex.value = Math.max(0, Math.min(index, totalSlides.value - 1))
}

const navigateToCategory = (category) => {
  navigateTo(`/categories/${category.slug}`)
}

// Touch/Mouse Events
const handleTouchStart = (e) => {
  isDragging.value = true
  startX.value = e.touches[0].clientX
}

const handleTouchMove = (e) => {
  if (!isDragging.value) return
  e.preventDefault()
  currentX.value = e.touches[0].clientX
}

const handleTouchEnd = () => {
  if (!isDragging.value) return
  const diff = startX.value - currentX.value
  const threshold = 50
  
  if (Math.abs(diff) > threshold) {
    if (diff > 0 && canScrollRight.value) nextSlide()
    else if (diff < 0 && canScrollLeft.value) previousSlide()
  }
  
  isDragging.value = false
}

const handleMouseDown = (e) => {
  isDragging.value = true
  startX.value = e.clientX
}

const handleMouseMove = (e) => {
  if (!isDragging.value) return
  currentX.value = e.clientX
}

const handleMouseUp = () => {
  if (!isDragging.value) return
  const diff = startX.value - currentX.value
  const threshold = 50
  
  if (Math.abs(diff) > threshold) {
    if (diff > 0 && canScrollRight.value) nextSlide()
    else if (diff < 0 && canScrollLeft.value) previousSlide()
  }
  
  isDragging.value = false
}

// Lifecycle
onMounted(() => {
  updateSlidesToShow()
  window.addEventListener('resize', updateSlidesToShow)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSlidesToShow)
})
</script>