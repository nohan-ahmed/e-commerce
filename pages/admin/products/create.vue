<template>
  <NuxtLayout name="admin">
    <div class="max-w-4xl mx-auto space-y-6">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-gray-900">Create Product</h1>
        <NuxtLink to="/admin/products" class="btn-secondary">
          Back to Products
        </NuxtLink>
      </div>
      
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Basic Information -->
        <div class="card">
          <h2 class="text-lg font-semibold mb-4">Basic Information</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium mb-2">Product Name *</label>
              <input 
                v-model="form.name"
                type="text" 
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter product name"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-2">SKU</label>
              <input 
                v-model="form.sku"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter SKU"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-2">Category *</label>
              <select 
                v-model="form.category_id"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select Category</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-2">Brand</label>
              <select 
                v-model="form.brand_id"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select Brand</option>
                <option v-for="brand in brands" :key="brand.id" :value="brand.id">
                  {{ brand.name }}
                </option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-2">Price *</label>
              <input 
                v-model="form.price"
                type="number" 
                step="0.01"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="0.00"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-2">Stock Quantity *</label>
              <input 
                v-model="form.stock"
                type="number" 
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="0"
              >
            </div>
          </div>
        </div>
        
        <!-- Description -->
        <div class="card">
          <h2 class="text-lg font-semibold mb-4">Description</h2>
          <UIRichTextEditor v-model="form.description" />
        </div>
        
        <!-- Images -->
        <div class="card">
          <h2 class="text-lg font-semibold mb-4">Product Images</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2">Upload Images</label>
              <input 
                @change="handleImageUpload"
                type="file" 
                multiple
                accept="image/*"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
            </div>
            
            <div v-if="form.images.length > 0" class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div v-for="(image, index) in form.images" :key="index" class="relative">
                <img :src="image.url" :alt="`Product image ${index + 1}`" class="w-full h-32 object-cover rounded-lg">
                <button 
                  @click="removeImage(index)"
                  type="button"
                  class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                >
                  ×
                </button>
                <label class="flex items-center mt-2">
                  <input 
                    type="radio" 
                    :value="index"
                    v-model="mainImageIndex"
                    class="mr-2"
                  >
                  <span class="text-sm">Main Image</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Variants -->
        <div class="card">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold">Product Variants</h2>
            <button @click="addVariant" type="button" class="btn-secondary">
              Add Variant
            </button>
          </div>
          
          <div v-if="form.variants.length > 0" class="space-y-4">
            <div v-for="(variant, index) in form.variants" :key="index" class="border border-gray-200 rounded-lg p-4">
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label class="block text-sm font-medium mb-1">Name</label>
                  <input 
                    v-model="variant.name"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="e.g., Size, Color"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">Value</label>
                  <input 
                    v-model="variant.value"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="e.g., Large, Red"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">Price</label>
                  <input 
                    v-model="variant.price"
                    type="number"
                    step="0.01"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                </div>
                <div class="flex items-end">
                  <button 
                    @click="removeVariant(index)"
                    type="button"
                    class="w-full btn-secondary text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Attributes -->
        <div class="card">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold">Product Attributes</h2>
            <button @click="addAttribute" type="button" class="btn-secondary">
              Add Attribute
            </button>
          </div>
          
          <div v-if="form.attributes.length > 0" class="space-y-4">
            <div v-for="(attribute, index) in form.attributes" :key="index" class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1">Key</label>
                <input 
                  v-model="attribute.key"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., Material, Weight"
                >
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Value</label>
                <input 
                  v-model="attribute.value"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., Cotton, 1.5kg"
                >
              </div>
              <div class="flex items-end">
                <button 
                  @click="removeAttribute(index)"
                  type="button"
                  class="w-full btn-secondary text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Submit -->
        <div class="flex justify-end space-x-4">
          <NuxtLink to="/admin/products" class="btn-secondary">
            Cancel
          </NuxtLink>
          <button 
            type="submit" 
            :disabled="loading"
            class="btn-primary disabled:opacity-50"
          >
            {{ loading ? 'Creating...' : 'Create Product' }}
          </button>
        </div>
      </form>
    </div>
  </NuxtLayout>
</template>

<script setup>
const { createProduct } = useSupabaseProducts()
const supabase = useSupabaseClient()

const loading = ref(false)
const categories = ref([])
const brands = ref([])
const mainImageIndex = ref(0)

const form = reactive({
  name: '',
  sku: '',
  description: '',
  price: '',
  stock: '',
  category_id: '',
  brand_id: '',
  images: [],
  variants: [],
  attributes: []
})

// Load categories and brands
const loadData = async () => {
  const [categoriesRes, brandsRes] = await Promise.all([
    supabase.from('categories').select('*').order('name'),
    supabase.from('brands').select('*').order('name')
  ])
  
  categories.value = categoriesRes.data || []
  brands.value = brandsRes.data || []
}

const handleImageUpload = (event) => {
  const files = Array.from(event.target.files)
  files.forEach(file => {
    const reader = new FileReader()
    reader.onload = (e) => {
      form.images.push({
        file,
        url: e.target.result,
        is_main: form.images.length === 0
      })
    }
    reader.readAsDataURL(file)
  })
}

const removeImage = (index) => {
  form.images.splice(index, 1)
  if (mainImageIndex.value >= form.images.length) {
    mainImageIndex.value = 0
  }
}

const addVariant = () => {
  form.variants.push({
    name: '',
    value: '',
    price: form.price
  })
}

const removeVariant = (index) => {
  form.variants.splice(index, 1)
}

const addAttribute = () => {
  form.attributes.push({
    key: '',
    value: ''
  })
}

const removeAttribute = (index) => {
  form.attributes.splice(index, 1)
}

const handleSubmit = async () => {
  loading.value = true
  
  try {
    // Create product
    const { data: product, error } = await createProduct({
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
      category_id: form.category_id,
      brand_id: form.brand_id || null
    })
    
    if (error) throw error
    
    // Upload images and create product_images records
    for (let i = 0; i < form.images.length; i++) {
      const image = form.images[i]
      // In a real app, upload to Supabase Storage here
      // For now, we'll just use the data URL
      await supabase.from('product_images').insert({
        product_id: product.id,
        image_url: image.url,
        is_main: i === mainImageIndex.value
      })
    }
    
    // Create variants
    if (form.variants.length > 0) {
      const variants = form.variants.map(variant => ({
        product_id: product.id,
        name: variant.name,
        value: variant.value,
        price: parseFloat(variant.price) || parseFloat(form.price),
        stock: parseInt(form.stock)
      }))
      
      await supabase.from('product_variants').insert(variants)
    }
    
    // Create attributes
    if (form.attributes.length > 0) {
      const attributes = form.attributes.map(attr => ({
        product_id: product.id,
        key: attr.key,
        value: attr.value
      }))
      
      await supabase.from('product_attributes').insert(attributes)
    }
    
    await navigateTo('/admin/products')
    
  } catch (error) {
    console.error('Error creating product:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadData()
})

useHead({
  title: 'Create Product - Admin Dashboard'
})
</script>