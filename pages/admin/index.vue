<template>
  <NuxtLayout name="admin">
    <div class="space-y-6">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="card">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-blue-100">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Orders</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.totalOrders }}</p>
            </div>
          </div>
        </div>
        
        <div class="card">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-100">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Revenue</p>
              <p class="text-2xl font-semibold text-gray-900">${{ stats.totalRevenue.toLocaleString() }}</p>
            </div>
          </div>
        </div>
        
        <div class="card">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-yellow-100">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Products</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.totalProducts }}</p>
            </div>
          </div>
        </div>
        
        <div class="card">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-purple-100">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Customers</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.totalUsers }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Charts Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Sales Chart -->
        <div class="card">
          <h3 class="text-lg font-semibold mb-4">Sales Overview</h3>
          <div class="h-64">
            <Line :data="salesChartData" :options="chartOptions" />
          </div>
        </div>
        
        <!-- Orders Chart -->
        <div class="card">
          <h3 class="text-lg font-semibold mb-4">Order Status</h3>
          <div class="h-64">
            <Doughnut :data="ordersChartData" :options="chartOptions" />
          </div>
        </div>
      </div>
      
      <!-- Recent Orders -->
      <div class="card">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">Recent Orders</h3>
          <NuxtLink to="/admin/orders" class="text-primary-600 hover:text-primary-700">
            View all
          </NuxtLink>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="order in recentOrders" :key="order.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{{ order.id.slice(-8) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ order.user_email || 'N/A' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                        :class="getStatusClass(order.status)">
                    {{ order.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${{ order.total_amount }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(order.created_at) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Low Stock Alert -->
      <div v-if="lowStockProducts.length > 0" class="card border-l-4 border-yellow-400">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-yellow-800">Low Stock Alert</h3>
            <div class="mt-2 text-sm text-yellow-700">
              <p>{{ lowStockProducts.length }} products are running low on stock:</p>
              <ul class="list-disc list-inside mt-1">
                <li v-for="product in lowStockProducts.slice(0, 3)" :key="product.id">
                  {{ product.name }} ({{ product.stock }} left)
                </li>
              </ul>
              <NuxtLink v-if="lowStockProducts.length > 3" to="/admin/products" class="font-medium underline">
                View all low stock products
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { Line, Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

const { getOrders, getOrderStats } = useSupabaseOrders()
const supabase = useSupabaseClient()

const stats = ref({
  totalOrders: 0,
  totalRevenue: 0,
  totalProducts: 0,
  totalUsers: 0
})

const recentOrders = ref([])
const lowStockProducts = ref([])

// Chart data
const salesChartData = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    label: 'Sales',
    data: [12000, 19000, 15000, 25000, 22000, 30000],
    borderColor: 'rgb(59, 130, 246)',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    tension: 0.4
  }]
})

const ordersChartData = ref({
  labels: ['Pending', 'Processing', 'Shipped', 'Delivered'],
  datasets: [{
    data: [12, 25, 18, 45],
    backgroundColor: [
      '#fbbf24',
      '#3b82f6',
      '#8b5cf6',
      '#10b981'
    ]
  }]
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom'
    }
  }
}

// Load dashboard data
const loadDashboardData = async () => {
  try {
    // Load stats
    const [ordersRes, productsRes, usersRes] = await Promise.all([
      getOrderStats(),
      supabase.from('products').select('id', { count: 'exact' }),
      supabase.from('auth.users').select('id', { count: 'exact' })
    ])
    
    stats.value = {
      totalOrders: ordersRes.totalOrders,
      totalRevenue: ordersRes.totalRevenue,
      totalProducts: productsRes.count || 0,
      totalUsers: usersRes.count || 0
    }
    
    // Load recent orders
    const { data: orders } = await getOrders()
    recentOrders.value = orders?.slice(0, 5) || []
    
    // Load low stock products
    const { data: products } = await supabase
      .from('products')
      .select('id, name, stock')
      .lt('stock', 10)
      .order('stock', { ascending: true })
    
    lowStockProducts.value = products || []
    
  } catch (error) {
    console.error('Error loading dashboard data:', error)
  }
}

const getStatusClass = (status) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

onMounted(() => {
  loadDashboardData()
})

useHead({
  title: 'Admin Dashboard - ECommerce Store'
})
</script>