<template>
  <div 
    class="relative select-none"
    @mouseenter="pauseAutoScroll"
    @mouseleave="resumeAutoScroll"
  >
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
        class="flex transition-transform duration-500 ease-out"
        :style="{ 
          transform: `translateX(-${currentIndex * slideWidth}%)`,
          transitionDuration: isDragging ? '0ms' : '500ms'
        }"
      >
        <div
          v-for="category in categories"
          :key="category.id"
          class="flex-shrink-0 px-2 sm:px-3"
          :style="{ width: `${slideWidth}%` }"
        >
          <UCard 
            class="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-850 dark:to-gray-800"
            @click="navigateToCategory(category)"
          >
            <div class="p-4 sm:p-6 text-center">
              <!-- Icon Container -->
              <div class="relative mb-4">
                <div class="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary-500/20">
                  <UIcon :name="category.icon" class="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <!-- Glow Effect -->
                <div class="absolute inset-0 w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-2xl bg-primary-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
              </div>
              
              <!-- Category Info -->
              <h3 class="font-semibold text-sm sm:text-lg mb-1 sm:mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                {{ category.name }}
              </h3>
              
              <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2 sm:mb-3">
                {{ category.productCount }} items
              </p>
              
              <!-- Hover Indicator -->
              <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 sm:w-5 sm:h-5 mx-auto text-primary-500" />
              </div>
            </div>
          </UCard>
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
      class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 z-10 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:scale-110 transition-all duration-300"
    >
      <UIcon name="i-heroicons-chevron-left" class="w-4 h-4 sm:w-5 sm:h-5" />
    </UButton>
    
    <UButton
      v-if="canScrollRight"
      @click="nextSlide"
      variant="ghost"
      size="sm"
      square
      class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 z-10 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:scale-110 transition-all duration-300"
    >
      <UIcon name="i-heroicons-chevron-right" class="w-4 h-4 sm:w-5 sm:h-5" />
    </UButton>

    <!-- Dots Indicator -->
    <div class="flex justify-center mt-6 space-x-2">
      <button
        v-for="(_, index) in totalSlides"
        :key="index"
        @click="goToSlide(index)"
        class="w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300"
        :class="index === currentIndex ? 'bg-primary-500 scale-125' : 'bg-gray-300 dark:bg-gray-600 hover:bg-primary-300 dark:hover:bg-primary-700'"
      />
    </div>

    <!-- Swipe Indicator -->
    <div class="text-center mt-4 sm:hidden">
      <p class="text-xs text-gray-400 dark:text-gray-500 flex items-center justify-center gap-2">
        <UIcon name="i-heroicons-hand-raised" class="w-4 h-4" />
        Swipe to explore more
      </p>
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
const autoScrollTimer = ref(null)

// Responsive slides per view
const updateSlidesToShow = () => {
  if (!process.client) return
  const width = window.innerWidth
  if (width < 480) slidesToShow.value = 2
  else if (width < 640) slidesToShow.value = 3
  else if (width < 768) slidesToShow.value = 4
  else if (width < 1024) slidesToShow.value = 5
  else slidesToShow.value = 6
}

const slideWidth = computed(() => 100 / slidesToShow.value)
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
  pauseAutoScroll()
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
  resumeAutoScroll()
}

const handleMouseDown = (e) => {
  isDragging.value = true
  startX.value = e.clientX
  pauseAutoScroll()
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
  resumeAutoScroll()
}

// Auto Scroll
const startAutoScroll = () => {
  autoScrollTimer.value = setInterval(nextSlide, 4000)
}

const pauseAutoScroll = () => {
  if (autoScrollTimer.value) {
    clearInterval(autoScrollTimer.value)
    autoScrollTimer.value = null
  }
}

const resumeAutoScroll = () => {
  setTimeout(startAutoScroll, 1000)
}

// Lifecycle
onMounted(() => {
  updateSlidesToShow()
  window.addEventListener('resize', updateSlidesToShow)
  startAutoScroll()
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSlidesToShow)
  pauseAutoScroll()
})
</script>