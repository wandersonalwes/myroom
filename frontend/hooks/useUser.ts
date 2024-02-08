import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { getUserByClient } from '@/lib/supabase/getUserByClient'

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    ;(async () => {
      const userData = await getUserByClient()
      setUser(userData)
    })()
  }, [])

  return { user }
}
