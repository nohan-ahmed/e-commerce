<template>
  <UDropdown :items="items">
    <UButton variant="ghost" size="sm" square>
      <UIcon :name="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'" />
    </UButton>
  </UDropdown>
</template>

<script setup>
const colorMode = useColorMode()
const appConfig = useAppConfig()

const isDark = computed(() => colorMode.value === 'dark')

const colors = ['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose']

const items = [
  [{
    label: 'Light',
    icon: 'i-heroicons-sun-20-solid',
    click: () => colorMode.preference = 'light'
  }, {
    label: 'Dark',
    icon: 'i-heroicons-moon-20-solid',
    click: () => colorMode.preference = 'dark'
  }, {
    label: 'System',
    icon: 'i-heroicons-computer-desktop-20-solid',
    click: () => colorMode.preference = 'system'
  }],
  colors.map(color => ({
    label: color.charAt(0).toUpperCase() + color.slice(1),
    icon: 'i-heroicons-swatch-20-solid',
    iconClass: `text-${color}-500 dark:text-${color}-400`,
    click: () => {
      appConfig.ui.primary = color
      if (process.client) {
        localStorage.setItem('nuxt-ui-primary', color)
      }
    }
  }))
]

onMounted(() => {
  if (process.client) {
    const saved = localStorage.getItem('nuxt-ui-primary')
    if (saved && colors.includes(saved)) {
      appConfig.ui.primary = saved
    }
  }
})
</script>