'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'

export const SignOutButton = () => {
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <Button variant="ghost" rounded onClick={handleSignOut}>
      Sair
    </Button>
  )
}
