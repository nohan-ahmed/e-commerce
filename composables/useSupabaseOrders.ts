export const useSupabaseOrders = () => {
  const supabase = useSupabaseClient()

  const getOrders = async (userId?: string) => {
    let query = supabase
      .from('orders')
      .select(`
        *,
        order_items(*, products(name, product_images(image_url))),
        addresses!orders_shipping_address_id_fkey(*)
      `)
      .order('created_at', { ascending: false })

    if (userId) {
      query = query.eq('user_id', userId)
    }

    return await query
  }

  const getOrder = async (id: string) => {
    return await supabase
      .from('orders')
      .select(`
        *,
        order_items(*, products(name, product_images(image_url)), product_variants(*)),
        addresses!orders_shipping_address_id_fkey(*),
        addresses!orders_billing_address_id_fkey(*)
      `)
      .eq('id', id)
      .single()
  }

  const createOrder = async (order: any) => {
    return await supabase.from('orders').insert(order).select().single()
  }

  const updateOrderStatus = async (id: string, status: string) => {
    return await supabase.from('orders').update({ status }).eq('id', id).select().single()
  }

  const getOrderStats = async () => {
    const { data: totalOrders } = await supabase
      .from('orders')
      .select('id', { count: 'exact' })

    const { data: totalRevenue } = await supabase
      .from('orders')
      .select('total_amount')

    const revenue = totalRevenue?.reduce((sum, order) => sum + order.total_amount, 0) || 0

    return { totalOrders: totalOrders?.length || 0, totalRevenue: revenue }
  }

  return {
    getOrders,
    getOrder,
    createOrder,
    updateOrderStatus,
    getOrderStats
  }
}