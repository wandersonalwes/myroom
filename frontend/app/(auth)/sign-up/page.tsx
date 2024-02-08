'use client'

import Link from 'next/link'
import { Video } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { createClient } from '@/lib/supabase/client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

const signUpSchema = z.object({
  name: z
    .string({
      required_error: 'Nome obrigatório',
    })
    .min(3, 'O nome deve ter pelo menos 3 carecteres'),
  email: z
    .string({ required_error: 'E-mail obrigatório' })
    .email('E-mail inválido'),
})

export default function SignUpPage() {
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = async ({ email, name }: z.infer<typeof signUpSchema>) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        shouldCreateUser: true,
        data: { name },
      },
    })

    if (error) {
      toast({
        description: 'Não foi possível concluir seu cadastro',
      })

      return
    }

    router.push(`/pin?email=${email}`)
  }

  return (
    <div className="min-h-screen flex justify-center items-center relative">
      <div className="space-y-4 p-4 max-w-sm w-full bg-zinc-950">
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

        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Nome" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="E-mail" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" disabled={form.formState.isSubmitting}>
              Criar conta
            </Button>
          </form>
        </Form>

        <span className="text-sm text-muted-foreground block text-center">
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
