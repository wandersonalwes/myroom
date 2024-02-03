import { Participant } from './participant'
import { ScrollArea } from './ui/scroll-area'

export const Participants = () => {
  return (
    <ScrollArea className="w-full">
      <div className="flex-1 p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 place-content-start">
        <Participant name="Wanderson" />
        <Participant name="Miguel" />
      </div>
    </ScrollArea>
  )
}
