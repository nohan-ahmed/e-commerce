export const useSupabaseAuth = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const signUp = async (email: string, password: string, userData?: any) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })
    return { data, error }
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      await navigateTo('/auth/login')
    }
    return { error }
  }

  const resetPassword = async (email: string) => {
    return await supabase.auth.resetPasswordForEmail(email)
  }

  const updateProfile = async (updates: any) => {
    return await supabase.auth.updateUser({
      data: updates
    })
  }

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
    return { data, error }
  }

  const isAdmin = computed(() => {
    return user.value?.user_metadata?.role === 'admin'
  })

  return {
    user,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateProfile,
    signInWithGoogle,
    isAdmin
  }
}