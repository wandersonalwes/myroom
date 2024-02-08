'use client'

import Link from 'next/link'
import { Video } from 'lucide-react'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
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

const loginSchema = z.object({
  email: z
    .string({ required_error: 'E-mail obrigatório' })
    .email('E-mail inválido'),
})

export default function LoginPage() {
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  })

  const supabase = createClient()

  const onSubmit = async ({ email }: z.infer<typeof loginSchema>) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        shouldCreateUser: false,
      },
    })

    if (error) {
      toast({
        title: 'O login falhou',
        description: 'Verifique seu e-mail e tente novamente!',
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
          <h1 className="text-2xl font-semibold tracking-tight">Entrar</h1>
          <p className="text-sm text-muted-foreground">
            Digite seu e-mail para entrar
          </p>
        </div>

        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="john.doe@gmail.com" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              Entrar
            </Button>
          </form>
        </Form>

        <span className="text-sm text-muted-foreground block text-center">
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
