<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <!-- Background Effects -->
    <div class="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-900 to-slate-900"></div>
    <div class="fixed inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]"></div>
    
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl lg:text-5xl font-black text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text mb-4">
          My Profile
        </h1>
        <p class="text-slate-400 text-lg max-w-2xl mx-auto">
          Manage your account settings and preferences
        </p>
        <div class="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full mt-6"></div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="relative">
          <div class="w-16 h-16 border-4 border-cyan-500/30 rounded-full animate-spin"></div>
          <div class="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-cyan-500 rounded-full animate-spin"></div>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Profile Card -->
        <div class="lg:col-span-1">
          <div class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 sticky top-8">
            <!-- Profile Picture -->
            <div class="text-center mb-6">
              <div class="relative inline-block">
                <div class="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 p-1">
                  <img 
                    :src="profileData.avatar_url || '/default-avatar.jpg'"
                    :alt="profileData.full_name || 'Profile'"
                    class="w-full h-full rounded-full object-cover bg-slate-700"
                  >
                </div>
                <button 
                  @click="uploadAvatar"
                  class="absolute bottom-2 right-2 w-8 h-8 bg-cyan-500 hover:bg-cyan-400 rounded-full flex items-center justify-center transition-colors"
                >
                  <UIcon name="i-heroicons-camera" class="w-4 h-4 text-white" />
                </button>
              </div>
              <h2 class="text-xl font-bold text-white mt-4">{{ profileData.full_name || 'User' }}</h2>
              <p class="text-slate-400 text-sm">{{ user?.email }}</p>
            </div>

            <!-- Quick Stats -->
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div class="text-center p-3 bg-slate-900/50 rounded-xl border border-slate-700/50">
                <p class="text-2xl font-bold text-cyan-400">{{ recentOrders.length }}</p>
                <p class="text-slate-400 text-xs">Orders</p>
              </div>
              <div class="text-center p-3 bg-slate-900/50 rounded-xl border border-slate-700/50">
                <p class="text-2xl font-bold text-purple-400">{{ addresses.length }}</p>
                <p class="text-slate-400 text-xs">Addresses</p>
              </div>
            </div>

            <!-- Navigation Tabs -->
            <div class="space-y-2">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
                :class="activeTab === tab.id 
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-300' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'"
              >
                <UIcon :name="tab.icon" class="w-5 h-5" />
                <span class="font-medium">{{ tab.label }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Profile Information -->
          <div v-if="activeTab === 'profile'" class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6">
            <h3 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <UIcon name="i-heroicons-user" class="w-5 h-5 text-cyan-400" />
              Profile Information
            </h3>
            
            <form @submit.prevent="updateProfile" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                  <input 
                    v-model="profileData.full_name"
                    type="text"
                    class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="Enter your full name"
                  >
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-slate-300 mb-2">Phone</label>
                  <input 
                    v-model="profileData.phone"
                    type="tel"
                    class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="Enter your phone number"
                  >
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-slate-300 mb-2">Email</label>
                <input 
                  :value="user?.email"
                  type="email"
                  disabled
                  class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-slate-400 cursor-not-allowed"
                >
                <p class="text-slate-500 text-xs mt-1">Email cannot be changed</p>
              </div>

              <UButton 
                type="submit"
                :loading="updating"
                class="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400"
              >
                <UIcon name="i-heroicons-check" class="w-4 h-4 mr-2" />
                Update Profile
              </UButton>
            </form>
          </div>

          <!-- Addresses -->
          <div v-if="activeTab === 'addresses'" class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-bold text-white flex items-center gap-2">
                <UIcon name="i-heroicons-map-pin" class="w-5 h-5 text-cyan-400" />
                Saved Addresses
              </h3>
              <UButton 
                @click="showAddressModal = true"
                size="sm"
                class="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400"
              >
                <UIcon name="i-heroicons-plus" class="w-4 h-4 mr-2" />
                Add Address
              </UButton>
            </div>

            <div v-if="addresses.length === 0" class="text-center py-12">
              <UIcon name="i-heroicons-map-pin" class="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p class="text-slate-400">No addresses saved yet</p>
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                v-for="address in addresses" 
                :key="address.id"
                class="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50 relative"
              >
                <div class="flex justify-between items-start mb-2">
                  <h4 class="font-medium text-white">{{ address.full_name }}</h4>
                  <div class="flex gap-2">
                    <button 
                      @click="editAddress(address)"
                      class="text-cyan-400 hover:text-cyan-300"
                    >
                      <UIcon name="i-heroicons-pencil" class="w-4 h-4" />
                    </button>
                    <button 
                      @click="deleteAddress(address.id)"
                      class="text-red-400 hover:text-red-300"
                    >
                      <UIcon name="i-heroicons-trash" class="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p class="text-slate-400 text-sm">{{ address.phone }}</p>
                <p class="text-slate-400 text-sm">
                  {{ address.line1 }}
                  <span v-if="address.line2">, {{ address.line2 }}</span>
                </p>
                <p class="text-slate-400 text-sm">
                  {{ address.city }}, {{ address.state }} {{ address.zip_code }}
                </p>
                <span 
                  v-if="address.is_default"
                  class="absolute top-2 right-2 px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs"
                >
                  Default
                </span>
              </div>
            </div>
          </div>

          <!-- Security -->
          <div v-if="activeTab === 'security'" class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6">
            <h3 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <UIcon name="i-heroicons-shield-check" class="w-5 h-5 text-cyan-400" />
              Security Settings
            </h3>
            
            <form @submit.prevent="changePassword" class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-slate-300 mb-2">Current Password</label>
                <input 
                  v-model="passwordData.current"
                  type="password"
                  class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="Enter current password"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-slate-300 mb-2">New Password</label>
                <input 
                  v-model="passwordData.new"
                  type="password"
                  class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="Enter new password"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-slate-300 mb-2">Confirm New Password</label>
                <input 
                  v-model="passwordData.confirm"
                  type="password"
                  class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="Confirm new password"
                >
              </div>

              <UButton 
                type="submit"
                :loading="changingPassword"
                class="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400"
              >
                <UIcon name="i-heroicons-key" class="w-4 h-4 mr-2" />
                Change Password
              </UButton>
            </form>
          </div>

          <!-- Orders -->
          <div v-if="activeTab === 'orders'" class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-bold text-white flex items-center gap-2">
                <UIcon name="i-heroicons-shopping-bag" class="w-5 h-5 text-cyan-400" />
                Recent Orders
              </h3>
              <UButton 
                to="/orders"
                variant="outline"
                size="sm"
                class="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
              >
                View All Orders
              </UButton>
            </div>

            <div v-if="recentOrders.length === 0" class="text-center py-12">
              <UIcon name="i-heroicons-shopping-bag" class="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p class="text-slate-400 mb-4">No orders yet</p>
              <UButton 
                to="/products"
                class="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400"
              >
                Start Shopping
              </UButton>
            </div>

            <div v-else class="space-y-4">
              <div 
                v-for="order in recentOrders" 
                :key="order.id"
                class="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-700/50 hover:border-cyan-400/50 transition-colors cursor-pointer"
                @click="navigateTo(`/orders`)"
              >
                <div>
                  <h4 class="font-medium text-white">Order #{{ order.id.slice(-8).toUpperCase() }}</h4>
                  <p class="text-slate-400 text-sm">{{ formatDate(order.created_at) }}</p>
                </div>
                <div class="text-right">
                  <p class="font-semibold text-white">${{ order.total_amount.toFixed(2) }}</p>
                  <span 
                    class="px-2 py-1 rounded-full text-xs font-medium"
                    :class="getStatusClass(order.status)"
                  >
                    {{ order.status.toUpperCase() }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Address Modal -->
    <UModal v-model="showAddressModal">
      <div class="p-6">
        <h3 class="text-lg font-bold mb-4">{{ editingAddress ? 'Edit Address' : 'Add New Address' }}</h3>
        
        <form @submit.prevent="saveAddress" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Full Name</label>
              <UInput v-model="addressForm.full_name" placeholder="Enter full name" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Phone</label>
              <UInput v-model="addressForm.phone" placeholder="Enter phone number" />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1">Address Line 1</label>
            <UInput v-model="addressForm.line1" placeholder="Enter address" />
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1">Address Line 2 (Optional)</label>
            <UInput v-model="addressForm.line2" placeholder="Apartment, suite, etc." />
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">City</label>
              <UInput v-model="addressForm.city" placeholder="City" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">State</label>
              <UInput v-model="addressForm.state" placeholder="State" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">ZIP Code</label>
              <UInput v-model="addressForm.zip_code" placeholder="ZIP" />
            </div>
          </div>
          
          <div class="flex items-center gap-2">
            <UCheckbox v-model="addressForm.is_default" />
            <label class="text-sm">Set as default address</label>
          </div>
          
          <div class="flex gap-3 pt-4">
            <UButton type="submit" :loading="savingAddress">
              {{ editingAddress ? 'Update' : 'Save' }} Address
            </UButton>
            <UButton variant="outline" @click="closeAddressModal">Cancel</UButton>
          </div>
        </form>
      </div>
    </UModal>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const { user } = useSupabaseAuth()
const supabase = useSupabaseClient()
const toast = useToast()

const loading = ref(true)
const updating = ref(false)
const changingPassword = ref(false)
const savingAddress = ref(false)

const activeTab = ref('profile')
const showAddressModal = ref(false)
const editingAddress = ref(null)

// Data
const profileData = reactive({
  full_name: '',
  phone: '',
  avatar_url: ''
})

const passwordData = reactive({
  current: '',
  new: '',
  confirm: ''
})

const addressForm = reactive({
  full_name: '',
  phone: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  zip_code: '',
  country: 'US',
  is_default: false
})

const addresses = ref([])
const recentOrders = ref([])

const tabs = [
  { id: 'profile', label: 'Profile', icon: 'i-heroicons-user' },
  { id: 'addresses', label: 'Addresses', icon: 'i-heroicons-map-pin' },
  { id: 'security', label: 'Security', icon: 'i-heroicons-shield-check' },
  { id: 'orders', label: 'Orders', icon: 'i-heroicons-shopping-bag' }
]

// Load user data
const loadUserData = async () => {
  loading.value = true
  try {
    // Load profile data
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.value.id)
      .single()

    if (profile) {
      Object.assign(profileData, profile)
    }

    // Load addresses
    const { data: userAddresses } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', user.value.id)
      .order('is_default', { ascending: false })

    addresses.value = userAddresses || []

    // Load recent orders
    const { data: orders } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.value.id)
      .order('created_at', { ascending: false })
      .limit(5)

    recentOrders.value = orders || []

  } catch (error) {
    console.error('Error loading user data:', error)
  } finally {
    loading.value = false
  }
}

// Update profile
const updateProfile = async () => {
  updating.value = true
  try {
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.value.id,
        ...profileData,
        updated_at: new Date().toISOString()
      })

    if (error) throw error

    toast.add({
      title: 'Profile Updated',
      description: 'Your profile has been updated successfully',
      color: 'green'
    })
  } catch (error) {
    console.error('Error updating profile:', error)
    toast.add({
      title: 'Error',
      description: 'Failed to update profile',
      color: 'red'
    })
  } finally {
    updating.value = false
  }
}

// Change password
const changePassword = async () => {
  if (passwordData.new !== passwordData.confirm) {
    toast.add({
      title: 'Error',
      description: 'New passwords do not match',
      color: 'red'
    })
    return
  }

  changingPassword.value = true
  try {
    const { error } = await supabase.auth.updateUser({
      password: passwordData.new
    })

    if (error) throw error

    toast.add({
      title: 'Password Changed',
      description: 'Your password has been updated successfully',
      color: 'green'
    })

    // Clear form
    Object.assign(passwordData, { current: '', new: '', confirm: '' })
  } catch (error) {
    console.error('Error changing password:', error)
    toast.add({
      title: 'Error',
      description: 'Failed to change password',
      color: 'red'
    })
  } finally {
    changingPassword.value = false
  }
}

// Address management
const editAddress = (address) => {
  editingAddress.value = address
  Object.assign(addressForm, address)
  showAddressModal.value = true
}

const saveAddress = async () => {
  savingAddress.value = true
  try {
    const addressData = {
      ...addressForm,
      user_id: user.value.id
    }

    if (editingAddress.value) {
      const { error } = await supabase
        .from('addresses')
        .update(addressData)
        .eq('id', editingAddress.value.id)

      if (error) throw error
    } else {
      const { error } = await supabase
        .from('addresses')
        .insert(addressData)

      if (error) throw error
    }

    toast.add({
      title: 'Address Saved',
      description: 'Address has been saved successfully',
      color: 'green'
    })

    closeAddressModal()
    await loadUserData()
  } catch (error) {
    console.error('Error saving address:', error)
    toast.add({
      title: 'Error',
      description: 'Failed to save address',
      color: 'red'
    })
  } finally {
    savingAddress.value = false
  }
}

const deleteAddress = async (addressId) => {
  try {
    const { error } = await supabase
      .from('addresses')
      .delete()
      .eq('id', addressId)

    if (error) throw error

    toast.add({
      title: 'Address Deleted',
      description: 'Address has been deleted successfully',
      color: 'green'
    })

    await loadUserData()
  } catch (error) {
    console.error('Error deleting address:', error)
    toast.add({
      title: 'Error',
      description: 'Failed to delete address',
      color: 'red'
    })
  }
}

const closeAddressModal = () => {
  showAddressModal.value = false
  editingAddress.value = null
  Object.assign(addressForm, {
    full_name: '',
    phone: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    zip_code: '',
    country: 'US',
    is_default: false
  })
}

// Helper functions
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getStatusClass = (status) => {
  const classes = {
    pending: 'bg-yellow-500/20 text-yellow-400',
    shipped: 'bg-blue-500/20 text-blue-400',
    delivered: 'bg-green-500/20 text-green-400',
    cancelled: 'bg-red-500/20 text-red-400'
  }
  return classes[status] || 'bg-gray-500/20 text-gray-400'
}

const uploadAvatar = () => {
  // TODO: Implement avatar upload
  toast.add({
    title: 'Coming Soon',
    description: 'Avatar upload feature will be available soon',
    color: 'blue'
  })
}

onMounted(() => {
  loadUserData()
})

useHead({
  title: 'My Profile - ECommerce Store'
})
</script>