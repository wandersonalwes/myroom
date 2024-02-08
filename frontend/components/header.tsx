import { Logo } from './logo'
import { HeaderRight } from './header-right'
import { isSigned } from '@/lib/supabase/isSigned'
import Link from 'next/link'

export const Header = async () => {
  const signed = await isSigned()
  return (
    <header className="h-16 flex items-center sticky top-0 backdrop-blur-2xl z-50">
      <div className="container flex justify-between items-center">
        <Link href="/">
          <Logo />
        </Link>

        <HeaderRight signed={signed} />
      </div>
    </header>
  )
}
