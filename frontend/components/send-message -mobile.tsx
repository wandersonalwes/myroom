import { useSocket } from '@/hooks/socket'
import { useLobby } from '@/hooks/useLobby'
import { useUser } from '@/hooks/useUser'
import { getNanoId } from '@/lib/nanoid'
import { Send } from 'lucide-react'
import { useParams } from 'next/navigation'
import { FormEvent, useRef } from 'react'
import { Input } from './ui/input'

export const SendMessageMobile = () => {
  const { user } = useUser()
  const { socket } = useSocket()
  const { setMessages } = useLobby()
  const inputRef = useRef<HTMLInputElement>(null)

  const params = useParams<{ id: string }>()

  const roomId = params.id

  const handleSend = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!inputRef.current || !socket || !roomId) return
    const message = inputRef.current.value

    const messageData = {
      id: getNanoId(),
      message,
      date: new Date().toISOString(),
      username: user?.user_metadata.name,
      roomId,
    }

    setMessages((messages) => [...messages, messageData])

    socket.emit('chat:published', messageData)

    inputRef.current.value = ''
  }

  return (
    <form onSubmit={handleSend} className="relative">
      <Input
        ref={inputRef}
        type="text"
        name="message"
        placeholder="Enviar mensagem"
        className="h-14"
      />

      <button type="submit" className="absolute top-5 right-4" disabled={!user}>
        <Send className="size-4" />
      </button>
    </form>
  )
}
