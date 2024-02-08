'use client'

import { useLobby } from '@/hooks/useLobby'
import { Participant } from './participant'
import { ScrollArea } from './ui/scroll-area'
import { useUser } from '@/hooks/useUser'

export const Participants = () => {
  const { user } = useUser()
  const { localVideo, remoteStreams } = useLobby()

  return (
    <ScrollArea className="w-full">
      <div className="flex-1 p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 place-content-start">
        {user ? (
          <Participant ref={localVideo} name={user.user_metadata.name} />
        ) : (
          <div className="rounded-lg aspect-video  bg-gradient-to-t from-white/20 border animate-pulse" />
        )}

        {remoteStreams.map(({ stream, username }, index) => (
          <Participant
            key={index}
            ref={(video) => {
              if (stream && video && !video.srcObject) {
                video.srcObject = stream
              }
            }}
            name={username ?? 'bill'}
          />
        ))}
      </div>
    </ScrollArea>
  )
}
