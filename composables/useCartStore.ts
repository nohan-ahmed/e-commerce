export const useCartStore = () => {
  const cartCount = useState('cart.count', () => 0)
  
  const updateCartCount = async () => {
    const { getCartItems } = useSupabaseCart()
    const user = useSupabaseUser()
    
    if (user.value) {
      const { data } = await getCartItems()
      cartCount.value = data?.reduce((sum, item) => sum + item.quantity, 0) || 0
    } else {
      cartCount.value = 0
    }
  }
  
  const incrementCount = (quantity = 1) => {
    cartCount.value += quantity
  }
  
  const decrementCount = (quantity = 1) => {
    cartCount.value = Math.max(0, cartCount.value - quantity)
  }
  
  const resetCount = () => {
    cartCount.value = 0
  }
  
  return {
    cartCount: readonly(cartCount),
    updateCartCount,
    incrementCount,
    decrementCount,
    resetCount
  }
}