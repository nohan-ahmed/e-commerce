export const useTheme = () => {
  const colorMode = useColorMode()
  const currentTheme = ref('blue')

  const themes = [
    { name: 'Blue', value: 'blue', class: 'theme-blue' },
    { name: 'Green', value: 'green', class: 'theme-green' },
    { name: 'Purple', value: 'purple', class: 'theme-purple' },
    { name: 'Pink', value: 'pink', class: 'theme-pink' },
    { name: 'Orange', value: 'orange', class: 'theme-orange' },
    { name: 'Red', value: 'red', class: 'theme-red' }
  ]

  const setTheme = (theme: string) => {
    currentTheme.value = theme
    
    if (process.client) {
      // Remove all theme classes
      themes.forEach(t => {
        document.documentElement.classList.remove(t.class)
      })
      
      // Add new theme class
      const selectedTheme = themes.find(t => t.value === theme)
      if (selectedTheme) {
        document.documentElement.classList.add(selectedTheme.class)
      }
      
      // Save to localStorage
      localStorage.setItem('theme-color', theme)
    }
  }

  const initTheme = () => {
    if (process.client) {
      const savedTheme = localStorage.getItem('theme-color') || 'blue'
      setTheme(savedTheme)
    }
  }

  return {
    colorMode,
    currentTheme: readonly(currentTheme),
    themes,
    setTheme,
    initTheme
  }
}