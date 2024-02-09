import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { UserAvatar } from './user-avatar'
import { MicOff } from 'lucide-react'

type ParticipantProps = {
  name: string
  self: boolean
  audioDisabled: boolean
  cameraDisabled: boolean
}

export const Participant = forwardRef<HTMLVideoElement, ParticipantProps>(
  ({ name, audioDisabled, self, cameraDisabled }, ref) => {
    return (
      <div className="rounded-lg aspect-video relative overflow-hidden bg-gradient-to-t from-white/20 border">
        {cameraDisabled && (
          <div className="flex justify-center items-center h-full">
            <UserAvatar
              user={{ name, avatar: '' }}
              className="ring-4 ring-white/10"
            />
          </div>
        )}

        <video
          ref={ref}
          muted={self}
          autoPlay
          className={cn('w-full h-full object-cover scale-x-[-1]')}
        ></video>

        <div className="absolute inset-x-4 bottom-4 flex justify-between items-center">
          <span className="text-foreground/80">{name}</span>

          {audioDisabled && <MicOff className="text-foreground/80" />}
        </div>
      </div>
    )
  }
)

Participant.displayName = 'Participant'
