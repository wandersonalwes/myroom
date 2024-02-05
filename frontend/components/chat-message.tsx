import { convertToTemporalFormat } from '@/lib/utils'

type ChatMessageProps = {
  id: string
  username: string
  message: string
  date: string
}

export const ChatMessage = (props: ChatMessageProps) => {
  const { username, message, date, id } = props

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between">
        <span className="text-foreground/80 text-sm">{username}</span>
        <span className="text-foreground/80 text-xs">
          {convertToTemporalFormat(date)}
        </span>
      </div>

      <span className="text-foreground">{message}</span>
    </div>
  )
}
