export const useSupabaseProducts = () => {
  const supabase = useSupabaseClient()

  const getProducts = async (filters?: any) => {
    let query = supabase
      .from('products')
      .select(`
        *,
        categories(name),
        brands(name),
        product_images(image_url, is_main),
        product_variants!inner(id, name, value, regular_price, discount_price, stock, is_active),
        reviews(rating)
      `)
      .eq('product_variants.is_active', true)

    if (filters?.category_id) {
      query = query.eq('category_id', filters.category_id)
    }
    if (filters?.brand_id) {
      query = query.eq('brand_id', filters.brand_id)
    }
    if (filters?.search) {
      query = query.ilike('name', `%${filters.search}%`)
    }

    return await query
  }

  const getProduct = async (id: string) => {
    return await supabase
      .from('products')
      .select(`
        *,
        categories(name),
        brands(name),
        product_images(image_url, is_main),
        product_variants(id, name, value, sku, regular_price, discount_price, stock, is_active, attributes),
        product_attributes(*),
        reviews(*, auth.users(email))
      `)
      .eq('id', id)
      .single()
  }

  const getFeaturedProducts = async (limit = 8) => {
    return await supabase
      .from('products')
      .select(`
        id,
        name,
        description,
        is_featured,
        shipping_fee,
        tax,
        categories(name),
        brands(name),
        product_images(image_url, is_main),
        product_variants!inner(id, name, value, regular_price, discount_price, stock, is_active)
      `)
      .eq('is_featured', true)
      .eq('product_variants.is_active', true)
      .limit(limit)
  }

  const createProduct = async (product: any) => {
    return await supabase.from('products').insert(product).select().single()
  }

  const updateProduct = async (id: string, updates: any) => {
    return await supabase.from('products').update(updates).eq('id', id).select().single()
  }

  const deleteProduct = async (id: string) => {
    return await supabase.from('products').delete().eq('id', id)
  }

  return {
    getProducts,
    getProduct,
    getFeaturedProducts,
    createProduct,
    updateProduct,
    deleteProduct
  }
}