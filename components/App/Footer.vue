<template>
  <footer class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 class="text-lg font-semibold mb-4">ECommerce</h3>
          <p class="text-gray-400">Your trusted online shopping destination.</p>
        </div>
        
        <div>
          <h4 class="font-semibold mb-4">Quick Links</h4>
          <ul class="space-y-2 text-gray-400">
            <li><NuxtLink to="/products" class="hover:text-white">Products</NuxtLink></li>
            <li><NuxtLink to="/categories" class="hover:text-white">Categories</NuxtLink></li>
            <li><NuxtLink to="/about" class="hover:text-white">About</NuxtLink></li>
            <li><NuxtLink to="/contact" class="hover:text-white">Contact</NuxtLink></li>
          </ul>
        </div>
        
        <div>
          <h4 class="font-semibold mb-4">Customer Service</h4>
          <ul class="space-y-2 text-gray-400">
            <li><NuxtLink to="/help" class="hover:text-white">Help Center</NuxtLink></li>
            <li><NuxtLink to="/returns" class="hover:text-white">Returns</NuxtLink></li>
            <li><NuxtLink to="/shipping" class="hover:text-white">Shipping Info</NuxtLink></li>
            <li><NuxtLink to="/privacy" class="hover:text-white">Privacy Policy</NuxtLink></li>
          </ul>
        </div>
        
        <div>
          <h4 class="font-semibold mb-4">Connect</h4>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-white">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2024 ECommerce. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>