export const useSupabaseCategories = () => {
  const supabase = useSupabaseClient()

  const getCategories = async () => {
    return await supabase
      .from('categories')
      .select('*')
      .order('name')
  }

  const getFeaturedCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')
    
    console.log('Categories query result:', { data, error })
    return { data, error }
  }

  return {
    getCategories,
    getFeaturedCategories
  }
}