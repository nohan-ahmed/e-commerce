export const useSupabaseCart = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const getOrCreateCart = async () => {
    if (!user.value) return null
    
    let { data: cart } = await supabase
      .from('carts')
      .select('*')
      .eq('user_id', user.value.id)
      .single()
    
    if (!cart) {
      const { data: newCart } = await supabase
        .from('carts')
        .insert({ user_id: user.value.id })
        .select()
        .single()
      cart = newCart
    }
    
    return cart
  }

  const addToCart = async (productId: string, variantId: string, quantity = 1) => {
    const cart = await getOrCreateCart()
    if (!cart) return { error: 'Not authenticated' }

    return await supabase
      .from('cart_items')
      .upsert({
        cart_id: cart.id,
        product_id: productId,
        variant_id: variantId,
        quantity
      }, {
        onConflict: 'cart_id,product_id,variant_id'
      })
  }

  const updateCartItem = async (productId: string, variantId: string, quantity: number) => {
    const cart = await getOrCreateCart()
    if (!cart) return { error: 'Not authenticated' }

    if (quantity <= 0) {
      return await supabase
        .from('cart_items')
        .delete()
        .eq('cart_id', cart.id)
        .eq('product_id', productId)
        .eq('variant_id', variantId)
    }

    return await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('cart_id', cart.id)
      .eq('product_id', productId)
      .eq('variant_id', variantId)
  }

  const removeFromCart = async (productId: string, variantId: string) => {
    const cart = await getOrCreateCart()
    if (!cart) return { error: 'Not authenticated' }

    return await supabase
      .from('cart_items')
      .delete()
      .eq('cart_id', cart.id)
      .eq('product_id', productId)
      .eq('variant_id', variantId)
  }

  const getCartItems = async () => {
    const cart = await getOrCreateCart()
    if (!cart) return { data: [], error: null }

    return await supabase
      .from('cart_items')
      .select(`
        *,
        products(
          id,
          name,
          categories(name),
          brands(name),
          product_images(image_url, is_main)
        ),
        product_variants(regular_price, discount_price, stock, is_active)
      `)
      .eq('cart_id', cart.id)
  }

  const clearCart = async () => {
    const cart = await getOrCreateCart()
    if (!cart) return { error: 'Not authenticated' }

    return await supabase
      .from('cart_items')
      .delete()
      .eq('cart_id', cart.id)
  }

  return {
    addToCart,
    updateCartItem,
    removeFromCart,
    getCartItems,
    clearCart
  }
}