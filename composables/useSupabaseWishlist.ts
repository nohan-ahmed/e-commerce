export const useSupabaseWishlist = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const addToWishlist = async (productId: string, variantId?: string) => {
    if (!user.value) return { error: 'Not authenticated' }
    
    return await supabase
      .from('wishlists')
      .insert({ 
        user_id: user.value.id, 
        product_id: productId,
        variant_id: variantId 
      })
  }

  const removeFromWishlist = async (productId: string, variantId?: string) => {
    if (!user.value) return { error: 'Not authenticated' }
    
    let query = supabase
      .from('wishlists')
      .delete()
      .eq('user_id', user.value.id)
      .eq('product_id', productId)
    
    if (variantId) {
      query = query.eq('variant_id', variantId)
    }
    
    return await query
  }

  const getWishlist = async () => {
    if (!user.value) return { data: [], error: null }
    
    return await supabase
      .from('wishlists')
      .select(`
        *,
        products(
          id,
          name,
          description,
          categories(name),
          brands(name),
          product_images(image_url, is_main),
          product_variants!inner(regular_price, discount_price, stock, is_active)
        )
      `)
      .eq('user_id', user.value.id)
      .eq('products.product_variants.is_active', true)
  }

  const isInWishlist = async (productId: string, variantId?: string) => {
    if (!user.value) return false
    
    let query = supabase
      .from('wishlists')
      .select('id')
      .eq('user_id', user.value.id)
      .eq('product_id', productId)
    
    if (variantId) {
      query = query.eq('variant_id', variantId)
    }
    
    const { data } = await query.single()
    return !!data
  }

  return {
    addToWishlist,
    removeFromWishlist,
    getWishlist,
    isInWishlist
  }
}