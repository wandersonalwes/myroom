import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Syne } from 'next/font/google'
import { Video } from 'lucide-react'
import Image from 'next/image'
import { BallLuminance } from '@/icons'
import Link from 'next/link'
import { getNanoId } from '@/lib/nanoid'
import { EnterRoom } from './components/enter-room'
import { Header } from '@/components/header'

const syne = Syne({ subsets: ['latin'] })

export default async function DashboardPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/')
  }

  return (
    <div>
      <Header />

      <div className="container">
        <div className="flex flex-col-reverse md:flex-row gap-8 justify-between items-center pt-24 xl:pt-56">
          <div className="w-full text-center md:text-start">
            <h2
              className={cn(
                syne.className,
                'tracking-tight font-medium text-transparent',
                'bg-gradient-to-r from-white via-gray-400 to-gray-900',
                'bg-clip-text leading-[56px] text-3xl sm:text-5xl'
              )}
            >
              Let&apos;s go{' '}
            </h2>

            <p className="mt-4 text-foreground/60 max-w-md text-sm sm:text-base mx-auto md:mx-0">
              Crie uma sala e compartilhe o link com seus amigos, ou junte-se a
              uma sala existente!
            </p>

            <div className="flex flex-col justify-center md:justify-start md:flex-row gap-4 max-w-lg mt-10 mx-auto md:mx-0">
              <Link
                href={`/room/${getNanoId()}`}
                className={cn(buttonVariants(), 'space-x-3')}
              >
                <Video className="size-5" />
                <span>Cria sala</span>
              </Link>

              <EnterRoom />
            </div>
          </div>

          <div className="relative">
            <Image
              src="/users.png"
              alt="Usuários"
              width={328}
              height={100}
              className="max-w-40 md:max-w-max"
            />
            <BallLuminance className="absolute inset-x-0 w-6/12 h-6/12 max-w-96 max-h-96 mx-auto blur-3xl opacity-20 -top-20" />
          </div>
        </div>
      </div>
    </div>
  )
}
