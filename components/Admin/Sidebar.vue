<template>
  <div class="fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out lg:translate-x-0">
    <div class="flex items-center justify-center h-16 bg-gray-800">
      <h1 class="text-white text-xl font-bold">Admin Panel</h1>
    </div>
    
    <nav class="mt-8">
      <div class="px-4 space-y-2">
        <NuxtLink 
          to="/admin" 
          class="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
          :class="{ 'bg-gray-800 text-white': $route.path === '/admin' }"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
          </svg>
          Dashboard
        </NuxtLink>
        
        <NuxtLink 
          to="/admin/products" 
          class="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
          :class="{ 'bg-gray-800 text-white': $route.path.startsWith('/admin/products') }"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
          </svg>
          Products
        </NuxtLink>
        
        <NuxtLink 
          to="/admin/orders" 
          class="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
          :class="{ 'bg-gray-800 text-white': $route.path.startsWith('/admin/orders') }"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          Orders
        </NuxtLink>
        
        <NuxtLink 
          to="/admin/categories" 
          class="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
          :class="{ 'bg-gray-800 text-white': $route.path.startsWith('/admin/categories') }"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
          Categories
        </NuxtLink>
        
        <NuxtLink 
          to="/admin/users" 
          class="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
          :class="{ 'bg-gray-800 text-white': $route.path.startsWith('/admin/users') }"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
          </svg>
          Users
        </NuxtLink>
        
        <NuxtLink 
          to="/admin/coupons" 
          class="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
          :class="{ 'bg-gray-800 text-white': $route.path.startsWith('/admin/coupons') }"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
          </svg>
          Coupons
        </NuxtLink>
        
        <NuxtLink 
          to="/admin/analytics" 
          class="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
          :class="{ 'bg-gray-800 text-white': $route.path.startsWith('/admin/analytics') }"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
          Analytics
        </NuxtLink>
      </div>
    </nav>
  </div>
</template>