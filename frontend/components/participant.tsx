import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { UserAvatar } from './user-avatar'

type ParticipantProps = {
  name: string
  muted: boolean
}

export const Participant = forwardRef<HTMLVideoElement, ParticipantProps>(
  ({ name, muted }, ref) => {
    // TODO: Verificar se o vídeo dos usuários remotos estão ativados
    const showUserAvatar = false

    return (
      <div className="rounded-lg aspect-video relative overflow-hidden bg-gradient-to-t from-white/20 border">
        {showUserAvatar && (
          <div className="flex justify-center items-center h-full">
            <UserAvatar
              user={{ name, avatar: '' }}
              className="ring-4 ring-white/10"
            />
          </div>
        )}

        <video
          ref={ref}
          muted={muted}
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
