import { useUser } from '@/hooks/useUser'
import { UserAvatar } from './user-avatar'

export const UserCurrentAvatar = () => {
  const { user } = useUser()

  if (!user) return null

  return (
    <UserAvatar
      user={user.user_metadata as { name: string; avatar?: string }}
    />
  )
}
