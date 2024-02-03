type ParticipantProps = {
  name: string
}

export const Participant = ({ name }: ParticipantProps) => {
  return (
    <div className="bg-zinc-900 rounded-lg aspect-video relative">
      <span className="absolute left-4 bottom-4 text-foreground/80">
        {name}
      </span>
    </div>
  )
}
