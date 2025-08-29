<template>
  <div class="relative h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden">
    <!-- Slides Container -->
    <div 
      class="flex transition-transform duration-700 ease-out h-full"
      :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
    >
      <div
        v-for="(slide, index) in slides"
        :key="slide.id"
        class="min-w-full h-full relative"
      >
        <!-- Background Image -->
        <img 
          :src="slide.image_url"
          :alt="slide.title"
          class="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        
        <!-- Overlay -->
        <div class="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
        
        <!-- Content -->
        <UContainer class="relative h-full flex items-center">
          <div class="max-w-2xl text-white mb-10 ml-10">
            <div class="space-y-6">
              <!-- Discount Badge -->
              <Transition
                enter-active-class="transition-all duration-700 ease-out"
                enter-from-class="opacity-0 -translate-y-4 scale-95"
                enter-to-class="opacity-100 translate-y-0 scale-100"
                appear
                :delay="200"
              >
                <div v-if="index === currentSlide" class="inline-flex items-center bg-red-500 dark:bg-red-600 text-white px-6 py-3 rounded-full text-lg font-bold animate-pulse shadow-lg">
                  <UIcon name="i-heroicons-fire" class="w-6 h-6 mr-3" />
                  Up to 50% OFF
                </div>
              </Transition>
              
              <!-- Title -->
              <Transition
                enter-active-class="transition-all duration-800 ease-out delay-300"
                enter-from-class="opacity-0 translate-y-8"
                enter-to-class="opacity-100 translate-y-0"
                appear
              >
                <h1 v-if="index === currentSlide" class="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight text-white">
                  {{ slide.title }}
                </h1>
              </Transition>
              
              <!-- Subtitle -->
              <Transition
                enter-active-class="transition-all duration-900 ease-out delay-500"
                enter-from-class="opacity-0 translate-y-6"
                enter-to-class="opacity-100 translate-y-0"
                appear
              >
                <p v-if="slide.subtitle && index === currentSlide" class="text-lg sm:text-xl lg:text-2xl text-gray-200 dark:text-gray-300 leading-relaxed">
                  {{ slide.subtitle }}
                </p>
              </Transition>
              
              <!-- Buttons -->
              <Transition
                enter-active-class="transition-all duration-1000 ease-out delay-700"
                enter-from-class="opacity-0 translate-y-8"
                enter-to-class="opacity-100 translate-y-0"
                appear
              >
                <div v-if="slide.cta_text && index === currentSlide" class="flex flex-col sm:flex-row gap-4 pt-4">
                  <UButton 
                    v-if="slide.cta_link"
                    :to="slide.cta_link"
                    size="lg"
                    color="white"
                    class="shadow-xl hover:scale-105 hover:shadow-2xl transition-transform duration-300"
                  >
                    <UIcon name="i-heroicons-shopping-bag" class="w-5 h-5 mr-2" />
                    {{ slide.cta_text }}
                  </UButton>
                  
                  <UButton 
                    variant="outline"
                    size="lg"
                    color="white"
                    class="backdrop-blur-sm hover:scale-105 hover:bg-white/10 transition-all duration-300"
                  >
                    <UIcon name="i-heroicons-play" class="w-5 h-5 mr-2" />
                    Learn More
                  </UButton>
                </div>
              </Transition>
            </div>
          </div>
        </UContainer>
      </div>
    </div>

    <!-- Navigation Dots -->
    <div class="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
      <button
        v-for="(slide, index) in slides"
        :key="`dot-${slide.id}`"
        @click="goToSlide(index)"
        class="w-8 sm:w-12 h-1 rounded-full transition-all duration-300"
        :class="index === currentSlide ? 'bg-white dark:bg-gray-200' : 'bg-white/40 dark:bg-gray-400/40 hover:bg-white/60 dark:hover:bg-gray-400/60'"
      />
    </div>

    <!-- Navigation Arrows -->
    <UButton
      @click="previousSlide"
      variant="ghost"
      size="sm"
      square
      class="absolute left-4 sm:left-6 lg:left-8 top-1/2 transform -translate-y-1/2 bg-black/20 backdrop-blur-sm hover:bg-black/40 text-white z-10"
    >
      <UIcon name="i-heroicons-chevron-left" class="w-5 h-5" />
    </UButton>
    
    <UButton
      @click="nextSlide"
      variant="ghost"
      size="sm"
      square
      class="absolute right-4 sm:right-6 lg:right-8 top-1/2 transform -translate-y-1/2 bg-black/20 backdrop-blur-sm hover:bg-black/40 text-white z-10"
    >
      <UIcon name="i-heroicons-chevron-right" class="w-5 h-5" />
    </UButton>

    <!-- Slide Counter -->
    <div class="absolute top-4 right-4 bg-black/30 dark:bg-gray-900/50 backdrop-blur-sm rounded-full px-3 py-1 text-white dark:text-gray-200 text-sm">
      {{ currentSlide + 1 }} / {{ slides.length }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  slides: {
    type: Array,
    default: () => []
  }
})

const currentSlide = ref(0)
const slideInterval = ref(null)

const goToSlide = (index) => {
  currentSlide.value = index
  resetAutoPlay()
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % props.slides.length
  resetAutoPlay()
}

const previousSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? props.slides.length - 1 : currentSlide.value - 1
  resetAutoPlay()
}

const startAutoPlay = () => {
  if (props.slides.length > 1) {
    slideInterval.value = setInterval(nextSlide, 5000)
  }
}

const stopAutoPlay = () => {
  if (slideInterval.value) {
    clearInterval(slideInterval.value)
    slideInterval.value = null
  }
}

const resetAutoPlay = () => {
  stopAutoPlay()
  startAutoPlay()
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>