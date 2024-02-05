export type EventSubscribeData = {
  roomId: string
  socketId: string
}

export type EventChatPublishedData = {
  id: string
  message: string
  date: string
  username: string
  roomId: string
}
