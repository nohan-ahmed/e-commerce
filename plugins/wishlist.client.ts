export default defineNuxtPlugin(() => {
  const wishlistCount = useState('wishlist.count', () => 0)
  
  return {
    provide: {
      wishlist: {
        count: wishlistCount,
        increment: () => wishlistCount.value++,
        decrement: () => wishlistCount.value > 0 ? wishlistCount.value-- : 0,
        setCount: (count: number) => wishlistCount.value = count
      }
    }
  }
})