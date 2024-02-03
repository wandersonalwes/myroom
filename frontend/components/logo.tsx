import { cn } from '@/lib/utils'
import { Video } from 'lucide-react'

import { Syne } from 'next/font/google'

const syne = Syne({ subsets: ['latin'] })

export const Logo = () => {
  return (
    <div className="flex items-center gap-x-4">
      <Video />
      <span className={cn(syne.className, 'font-bold text-lg')}>myroom</span>
    </div>
  )
}
