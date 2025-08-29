<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="max-w-3xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h1>
        <p class="text-xl text-gray-600 dark:text-gray-300">
          Get in touch with our team. We're here to help!
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Contact Form -->
        <UCard>
          <template #header>
            <h2 class="text-xl font-semibold">Send us a message</h2>
          </template>
          
          <form @submit.prevent="submitForm" class="space-y-4">
            <UInput
              v-model="form.name"
              placeholder="Your Name"
              required
            />
            <UInput
              v-model="form.email"
              type="email"
              placeholder="Your Email"
              required
            />
            <UInput
              v-model="form.subject"
              placeholder="Subject"
              required
            />
            <UTextarea
              v-model="form.message"
              placeholder="Your Message"
              rows="4"
              required
            />
            <UButton type="submit" block>
              Send Message
            </UButton>
          </form>
        </UCard>

        <!-- Contact Info -->
        <div class="space-y-6">
          <UCard>
            <div class="flex items-center space-x-3">
              <Icon name="heroicons:envelope" class="w-6 h-6 text-blue-600" />
              <div>
                <h3 class="font-semibold">Email</h3>
                <p class="text-gray-600 dark:text-gray-300">support@electrostore.com</p>
              </div>
            </div>
          </UCard>

          <UCard>
            <div class="flex items-center space-x-3">
              <Icon name="heroicons:phone" class="w-6 h-6 text-green-600" />
              <div>
                <h3 class="font-semibold">Phone</h3>
                <p class="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
              </div>
            </div>
          </UCard>

          <UCard>
            <div class="flex items-center space-x-3">
              <Icon name="heroicons:map-pin" class="w-6 h-6 text-red-600" />
              <div>
                <h3 class="font-semibold">Address</h3>
                <p class="text-gray-600 dark:text-gray-300">123 Tech Street<br>San Francisco, CA 94105</p>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const submitForm = () => {
  console.log('Form submitted:', form)
  // Handle form submission
}

useHead({
  title: 'Contact Us - ElectroStore'
})
</script>