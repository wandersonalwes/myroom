import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

type UserAvatarProps = {
  className?: string
  user: {
    name: string
    avatar?: string
  }
}

export const UserAvatar = ({ user, className }: UserAvatarProps) => {
  const letter = user?.name?.charAt(0)
  return (
    <Avatar className={className}>
      <AvatarImage src={user.avatar} />
      <AvatarFallback>{letter}</AvatarFallback>
    </Avatar>
  )
}
