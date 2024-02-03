import { Logo } from './logo'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export const DashHeader = () => {
  return (
    <header className="lg:col-span-2 flex justify-between items-center px-4">
      <Logo />

      <Avatar>
        <AvatarImage src="https://github.com/wandersonalwes.png" />
        <AvatarFallback>WA</AvatarFallback>
      </Avatar>
    </header>
  )
}
