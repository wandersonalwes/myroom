import Link from 'next/link'
import { Logo } from './logo'
import { Button, buttonVariants } from './ui/button'
import { cn } from '@/lib/utils'

export const Header = () => {
  return (
    <header className="h-16 flex items-center sticky top-0 backdrop-blur-2xl z-50">
      <div className="container flex justify-between items-center">
        <Logo />

        <div className="space-x-4">
          <Link
            className={cn(buttonVariants({ variant: 'ghost', rounded: true }))}
            href="/login"
          >
            Entrar
          </Link>

          <Link
            href="/sign-up"
            className={cn(
              buttonVariants({ variant: 'outline', rounded: true })
            )}
          >
            Criar conta
          </Link>
        </div>
      </div>
    </header>
  )
}
