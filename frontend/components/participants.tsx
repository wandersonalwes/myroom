'use client'

import { useLobby } from '@/hooks/useLobby'
import { Participant } from './participant'
import { User } from '@supabase/supabase-js'
import { ScrollArea } from './ui/scroll-area'

export const Participants = ({ signedUser }: { signedUser: User }) => {
  const { localVideo, remoteStreams } = useLobby()

  return (
    <ScrollArea className="w-full">
      <div className="flex-1 p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 place-content-start">
        {signedUser ? (
          <Participant
            ref={localVideo}
            name={signedUser.user_metadata.name}
            muted
          />
        ) : (
          <div className="rounded-lg aspect-video  bg-gradient-to-t from-white/20 border animate-pulse" />
        )}

        {remoteStreams.map(({ stream, username }, index) => (
          <Participant
            key={index}
            muted={false}
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
