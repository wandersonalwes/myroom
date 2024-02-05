import { useLobby } from '@/hooks/useLobby'
import { Participant } from './participant'
import { ScrollArea } from './ui/scroll-area'

export const Participants = () => {
  const { localVideo, remoteStreams } = useLobby()

  return (
    <ScrollArea className="w-full">
      <div className="flex-1 p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 place-content-start">
        <Participant ref={localVideo} name="Wanderson" />

        {remoteStreams.map(({ stream }, index) => (
          <Participant
            key={index}
            ref={(video) => {
              if (stream && video && !video.srcObject) {
                video.srcObject = stream
              }
            }}
            name="Miguel"
          />
        ))}
      </div>
    </ScrollArea>
  )
}
