'use client'

import { User } from '@supabase/supabase-js'

import { cn } from '@/lib/utils'
import { LobbyProvider } from '@/context/lobby'
import { SocketProvider } from '@/context/socket'

import { Chat } from './chat'
import { DashHeader } from './dash-header'
import { RoomFooter } from './room-footer'
import { SendMessage } from './send-message'
import { Participants } from './participants'

type RoomProps = {
  user: User
}

export const Room = ({ user }: RoomProps) => {
  return (
    <SocketProvider>
      <LobbyProvider user={user}>
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
      </LobbyProvider>
    </SocketProvider>
  )
}
