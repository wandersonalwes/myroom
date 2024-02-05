import { useSocket } from '@/hooks/socket'
import { useLobby } from '@/hooks/useLobby'
import { getNanoId } from '@/lib/nanoid'
import { Send } from 'lucide-react'
import { useParams } from 'next/navigation'
import { FormEvent, useRef } from 'react'

export const SendMessage = () => {
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
      username: 'Wanderson',
      roomId,
    }

    setMessages((messages) => [...messages, messageData])

    socket.emit('chat:published', messageData)

    inputRef.current.value = ''
  }

  return (
    <form onSubmit={handleSend} className="relative border-l hidden lg:block">
      <input
        ref={inputRef}
        type="text"
        name="message"
        placeholder="Enviar mensagem"
        className="absolute inset-0 outline-none bg-transparent px-4"
      />

      <button type="submit" className="absolute top-8 right-4">
        <Send />
      </button>
    </form>
  )
}
