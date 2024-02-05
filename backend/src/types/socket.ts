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

export type EventPeerActiveUserData = {
  to: string
  sender: string
  username: string
}