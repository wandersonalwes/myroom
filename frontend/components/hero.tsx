import { cn } from '@/lib/utils'
import { Syne } from 'next/font/google'
import { buttonVariants } from './ui/button'
import { BallLuminance, DashPreview } from '@/icons'
import Link from 'next/link'
import { isSigned } from '@/lib/supabase/isSigned'

const syne = Syne({ subsets: ['latin'] })

export const Hero = async () => {
  const signed = await isSigned()
  return (
    <section className="relative">
      <div className="container text-center">
        <h2
          className={cn(
            syne.className,
            'tracking-tight font-medium text-transparent',
            'bg-gradient-to-r from-white via-gray-400 to-gray-900',
            'bg-clip-text leading-[56px] pt-24 xl:pt-56 text-3xl sm:text-5xl'
          )}
        >
          Crie, Conecte, Relacione{' '}
        </h2>

        <p className="mt-4 text-foreground/60 max-w-md mx-auto text-sm sm:text-base">
          Crie conexões autênticas com pessoas de interesses similares.{' '}
          <span className="font-semibold">Junte-se a nós</span>!
        </p>

        <div className="mt-12">
          <Link
            href={signed ? '/dashboard' : '/sign-up'}
            className={cn(buttonVariants({ rounded: true }))}
          >
            Começar
          </Link>
        </div>

        <BallLuminance className="absolute inset-x-0 w-6/12 h-6/12 max-w-96 max-h-96 mx-auto blur-3xl" />

        <div
          className={cn(
            'my-12 lg:my-24 ring-1 rounded-3xl ring-white/10',
            'bg-gradient-to-t from-white/20 p-2'
          )}
        >
          <DashPreview className="w-full opacity-80 ring-1 shadow ring-white/10 rounded-2xl" />
        </div>
      </div>
    </section>
  )
}
