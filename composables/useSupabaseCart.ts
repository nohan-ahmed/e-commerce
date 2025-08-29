export const useSupabaseCart = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const getCartItems = async () => {
    if (!user.value) return { data: [], error: null }
    
    return await supabase
      .from('cart_items')
      .select(`
        *,
        products(name, price, product_images(image_url, is_main)),
        product_variants(name, value, price)
      `)
      .eq('user_id', user.value.id)
  }

  const addToCart = async (productId: string, variantId?: string, quantity = 1) => {
    if (!user.value) throw new Error('User not authenticated')

    const { data: existing } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', user.value.id)
      .eq('product_id', productId)
      .eq('variant_id', variantId || null)
      .single()

    if (existing) {
      return await supabase
        .from('cart_items')
        .update({ quantity: existing.quantity + quantity })
        .eq('id', existing.id)
        .select()
        .single()
    }

    return await supabase
      .from('cart_items')
      .insert({
        user_id: user.value.id,
        product_id: productId,
        variant_id: variantId,
        quantity
      })
      .select()
      .single()
  }

  const updateCartItem = async (id: string, quantity: number) => {
    return await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', id)
      .select()
      .single()
  }

  const removeFromCart = async (id: string) => {
    return await supabase.from('cart_items').delete().eq('id', id)
  }

  const clearCart = async () => {
    if (!user.value) return
    return await supabase.from('cart_items').delete().eq('user_id', user.value.id)
  }

  return {
    getCartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
  }
}