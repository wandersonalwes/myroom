import { cookies } from 'next/headers'
import { createClient } from './server'

export const isSigned = async () => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data } = await supabase.auth.getUser()

  return !!data.user
}
