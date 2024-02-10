import { useLobby } from '@/hooks/useLobby'
import { Chat } from './chat'
import { SendMessage } from './send-message'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import { ChatMessage } from './chat-message'
import { SendMessageMobile } from './send-message -mobile'
import { ScrollArea } from './ui/scroll-area'
import { MessageSquare } from 'lucide-react'
import { Button } from './ui/button'

export const MobileChat = () => {
  const { messages } = useLobby()
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="w-14 lg:hidden" size="icon" variant="ghost">
          <MessageSquare />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Chat</SheetTitle>
          <SheetDescription>
            As mensagens só aparecem para as pessoas na chamada quando são
            enviadas, e são excluídas quando a ligação é encerrada.
          </SheetDescription>

          <ScrollArea>
            <div className="space-y-4 max-h-[60vh]">
              {messages.map((message) => (
                <ChatMessage key={message.id} {...message} />
              ))}
            </div>
          </ScrollArea>

          <SendMessageMobile />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
