import Link from 'next/link'
import { Video } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex justify-center items-center relative">
      <div className="space-y-4 p-4 max-w-sm w-full text-center bg-zinc-950">
        <div className="flex justify-center">
          <div className="flex justify-center items-center rounded-full size-10 bg-white/5">
            <Video className="size-5" />
          </div>
        </div>

        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Criar conta</h1>
          <p className="text-sm text-muted-foreground">
            Digite seu nome e e-mail para criar uma conta
          </p>
        </div>

        <Input placeholder="Nome" />

        <Input placeholder="E-mail" />

        <Button className="w-full">Entrar</Button>

        <span className="text-sm text-muted-foreground block">
          Já tem uma conta?{' '}
          <Link
            href="/login"
            className="text-gray-200 hover:text-white font-medium"
          >
            Entrar
          </Link>
        </span>
      </div>
    </div>
  )
}
