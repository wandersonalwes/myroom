import { Chat } from '@/components/Chat'
import { DashHeader } from '@/components/dash-header'
import { RoomFooter } from '@/components/room-footer'
import { Participants } from '@/components/participants'
import { SendMessage } from '@/components/send-message'
import { cn } from '@/lib/utils'

export default function RoomPage() {
  return (
    <main
      className={cn(
        'grid grid-cols-1 lg:grid-cols-[1fr,400px] divide-y',
        'grid-rows-[80px,1fr,80px] h-screen content-between'
      )}
    >
      <DashHeader />
      <Participants />
      <Chat />
      <RoomFooter />
      <SendMessage />
    </main>
  )
}
