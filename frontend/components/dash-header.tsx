import { Logo } from './logo'
import { UserCurrentAvatar } from './user-current-avatar'

export const DashHeader = () => {
  return (
    <header className="lg:col-span-2 flex justify-between items-center px-4">
      <Logo />
      <UserCurrentAvatar />
    </header>
  )
}
