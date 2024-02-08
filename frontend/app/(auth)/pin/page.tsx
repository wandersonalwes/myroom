'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { createClient } from '@/lib/supabase/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const pinSchema = z.object({
  token: z.string({ required_error: 'Código obrigatório' }).length(6),
})

const emailSchema = z.string().email()

export default function PinPage() {
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()
  const searchParams = useSearchParams()

  const email = searchParams.get('email') as string
  const validEmail = emailSchema.safeParse(email).success

  const form = useForm<z.infer<typeof pinSchema>>({
    resolver: zodResolver(pinSchema),
  })

  const onSubmit = async ({ token }: z.infer<typeof pinSchema>) => {
    const { error } = await supabase.auth.verifyOtp({
      type: 'email',
      email,
      token,
    })

    if (error) {
      toast({
        title: 'O login falhou',
        description: 'Verifique seu e-mail e tente novamente!',
      })

      return
    }

    router.push('/dashboard')
  }

  if (!email || !validEmail) {
    return router.replace('/login')
  }

  return (
    <div className="min-h-screen flex justify-center items-center relative">
      <div className="space-y-4 p-4 max-w-sm w-full bg-zinc-950">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Insira o código
          </h1>
          <p className="text-sm text-muted-foreground">
            Por favor insira o código que você recebeu no e-mail: {email}
          </p>
        </div>

        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="token"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="123123" maxLength={6} {...field} />
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
              Continuar
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
