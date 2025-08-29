export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/supabase',
    '@nuxt/ui',
    '@pinia/nuxt'
  ],
  
  ui: {
    global: true,
    icons: ['heroicons']
  },
  
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: ''
  },
  
  supabase: {
    redirectOptions: {
      login: '/auth/login',
      callback: '/auth/callback',
      exclude: ['/']
    },
    clientOptions: {
      auth: {
        flowType: 'pkce'
      }
    }
  },
  
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NUXT_PUBLIC_SUPABASE_KEY
    }
  },
  
  ssr: false,
  css: ['~/assets/css/main.css']
})