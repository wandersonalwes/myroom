'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

import { buttonVariants } from './ui/button'
import { SignOutButton } from './sign-out-button'

type HeaderRightProps = {
  signed: boolean
}

export const HeaderRight = ({ signed }: HeaderRightProps) => {
  const pathname = usePathname()

  const isHome = pathname === '/'

  if (signed && isHome) {
    return (
      <Link
        href="/dashboard"
        className={cn(buttonVariants({ variant: 'ghost', rounded: true }))}
      >
        Dashboard
      </Link>
    )
  }

  if (signed && !isHome) return <SignOutButton />

  return (
    <div className="space-x-4">
      <Link
        className={cn(buttonVariants({ variant: 'ghost', rounded: true }))}
        href="/login"
      >
        Entrar
      </Link>

      <Link
        href="/sign-up"
        className={cn(buttonVariants({ variant: 'outline', rounded: true }))}
      >
        Criar conta
      </Link>
    </div>
  )
}
