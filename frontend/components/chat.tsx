import { useLobby } from '@/hooks/useLobby'
import { ChatMessage } from './chat-message'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { AlertTriangle } from 'lucide-react'
import { ScrollArea } from './ui/scroll-area'

export const Chat = () => {
  const { messages } = useLobby()

  return (
    <ScrollArea className="border-l hidden lg:block">
      <aside className="p-4 border-l space-y-4">
        <Alert>
          <AlertTriangle className="h-4 w-4 text-foreground/70" />
          <AlertDescription className="text-foreground/70">
            As mensagens só aparecem para as pessoas na chamada quando são
            enviadas, e são excluídas quando a ligação é encerrada.
          </AlertDescription>
        </Alert>

        {messages.map((message) => (
          <ChatMessage key={message.id} {...message} />
        ))}
      </aside>
    </ScrollArea>
  )
}
