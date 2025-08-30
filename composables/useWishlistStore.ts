export const useWishlistStore = () => {
  const wishlistCount = ref(0)
  const { getWishlist } = useSupabaseWishlist()
  const user = useSupabaseUser()

  const refreshWishlistCount = async () => {
    if (user.value) {
      const { data } = await getWishlist()
      wishlistCount.value = data?.length || 0
    } else {
      wishlistCount.value = 0
    }
  }

  const incrementCount = () => {
    wishlistCount.value++
  }

  const decrementCount = () => {
    if (wishlistCount.value > 0) {
      wishlistCount.value--
    }
  }

  return {
    wishlistCount: readonly(wishlistCount),
    refreshWishlistCount,
    incrementCount,
    decrementCount
  }
}