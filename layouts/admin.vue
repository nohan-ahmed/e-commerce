<template>
  <div class="min-h-screen bg-gray-100">
    <AdminSidebar />
    <div class="lg:pl-64">
      <AdminHeader />
      <main class="p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
const { isAdmin } = useSupabaseAuth()

// Protect admin routes
definePageMeta({
  middleware: 'admin'
})
</script>