import { ChatMessage } from './chat-message'

const messages = [
  {
    name: 'Miguel',
    message: 'Heeeey, cheguei',
    time: '5m',
  },
  {
    name: 'Miguel',
    message: 'E aí',
    time: '4m',
  },
  {
    name: 'Wanderson',
    message: 'Oiie',
    time: '1s',
  },
]

export const Chat = () => {
  return (
    <aside className="p-4 border-l space-y-4 hidden lg:block">
      {messages.map((message, index) => (
        <ChatMessage key={index} {...message} />
      ))}
    </aside>
  )
}
