type ChatMessageProps = {
  name: string
  message: string
  time: string
}

export const ChatMessage = (props: ChatMessageProps) => {
  const { name, message, time } = props
  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between">
        <span className="text-foreground/80 text-sm">{name}</span>
        <span className="text-foreground/80 text-xs">{time}</span>
      </div>

      <span className="text-foreground">{message}</span>
    </div>
  )
}
