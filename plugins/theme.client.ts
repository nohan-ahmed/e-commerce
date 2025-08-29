export default defineNuxtPlugin(() => {
  const { initTheme } = useTheme()
  
  // Initialize theme on app start
  initTheme()
})