import { createClient } from './client'

export const getUserByClient = async () => {
  const supabase = createClient()
  const { data } = await supabase.auth.getUser()
  return data.user
}
