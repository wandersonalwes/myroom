'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

export const EnterRoom = () => {
  const { toast } = useToast()
  const router = useRouter()
  const [roomId, setRoomId] = useState('')

  const handleEnterRoom = () => {
    if (!roomId) {
      toast({ description: 'Sala não informada' })
      return
    }

    router.push(`/room/${roomId}`)
  }
  return (
    <div className="flex gap-4">
      <Input
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        placeholder="Digite o código de uma sala"
      />
      <Button variant="ghost" onClick={handleEnterRoom}>
        Participar
      </Button>
    </div>
  )
}
