import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Video } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex justify-center items-center relative">
      <div className="space-y-4 p-4 max-w-sm w-full text-center bg-zinc-950">
        <div className="flex justify-center">
          <div className="flex justify-center items-center rounded-full size-10 bg-white/5">
            <Video className="size-5" />
          </div>
        </div>

        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Entrar</h1>
          <p className="text-sm text-muted-foreground">
            Digite seu e-mail para entrar
          </p>
        </div>

        <Input placeholder="john.doe@gmail.com" />

        <Button className="w-full">Entrar</Button>

        <span className="text-sm text-muted-foreground block">
          Não tem uma conta?{' '}
          <Link
            href="/sign-up"
            className="text-gray-200 hover:text-white font-medium"
          >
            Criar conta
          </Link>
        </span>
      </div>
    </div>
  )
}
