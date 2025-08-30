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
        product_variants(*),
        reviews(rating)
      `)

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
        product_variants(*),
        product_attributes(*),
        reviews(*, auth.users(email))
      `)
      .eq('id', id)
      .single()
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

  const getFeaturedProducts = async (limit = 8) => {
    return await supabase
      .from('products')
      .select(`
        id,
        name,
        description,
        categories(name),
        brands(name),
        product_images(image_url, is_main),
        product_variants(price, stock)
      `)
      .limit(limit)
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