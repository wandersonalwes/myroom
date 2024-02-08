import cors from 'cors'
import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'node:http'
import {
  EventChatPublishedData,
  EventPeerActiveUserData,
  EventSubscribeData,
} from './types/socket'
import { logger } from './utils/logger'

const port = process.env.PORT || 4000

const app = express()
app.use(cors({ origin: '*' }))
const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['POST'],
  },
})

io.on('connection', (socket) => {
  console.log(`connected: ${socket.id}`)

  socket.on('subscribe', (data: EventSubscribeData) => {
    logger('subscribe', data)
    socket.join(data.roomId)
    socket.join(data.socketId)

    const roomSession = Array.from(socket.rooms)

    if (roomSession.length > 1) {
      socket.to(data.roomId).emit('peer:start', {
        socketId: data.socketId,
        username: data.username,
      })
    }
  })

  socket.on('peer:active_user', (data: EventPeerActiveUserData) => {
    logger('peer:active_user', data)

    socket.to(data.to).emit('peer:active_user', {
      sender: data.sender,
      username: data.username,
    })
  })

  socket.on('peer:offer', (data) => {
    logger('peer:offer', data)

    socket.to(data.to).emit('peer:offer', {
      description: data.description,
      sender: data.sender,
    })
  })

  socket.on('peer:answer', (data) => {
    logger('peer:answer', data)

    socket.to(data.to).emit('peer:answer', {
      description: data.description,
      sender: data.sender,
    })
  })

  socket.on('peer:icecandidate', (data) => {
    logger('peer:icecandidate', data)

    socket.to(data.to).emit('peer:icecandidate', {
      candidate: data.candidate,
      sender: data.sender,
    })
  })

  socket.on('chat:published', (data: EventChatPublishedData) => {
    logger('chat:published', data)
    socket.broadcast.to(data.roomId).emit('chat:received', data)
  })
})

server.listen(port, () => {
  console.log(`🎉 Server running on the port: ${port}`)
})
