import { forwardRef } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { cn } from '@/lib/utils'
import { useLobby } from '@/hooks/useLobby'

type ParticipantProps = {
  name: string
}

export const Participant = forwardRef<HTMLVideoElement, ParticipantProps>(
  ({ name }, ref) => {
    const { cameraEnabled } = useLobby()

    const showUserAvatar = !cameraEnabled
    const letter = name.charAt(0)

    return (
      <div className="rounded-lg aspect-video relative overflow-hidden bg-gradient-to-t from-white/20 border">
        {showUserAvatar && (
          <div className="flex justify-center items-center h-full">
            <Avatar className="ring-4 ring-white/10">
              <AvatarImage src="https://github.com/wandersonalwes.png" />
              <AvatarFallback>{letter}</AvatarFallback>
            </Avatar>
          </div>
        )}

        <video
          ref={ref}
          autoPlay
          className={cn('w-full h-full object-cover')}
        ></video>

        <span className="absolute left-4 bottom-4 text-foreground/80">
          {name}
        </span>
      </div>
    )
  }
)

Participant.displayName = 'Participant'
