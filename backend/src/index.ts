import cors from 'cors'
import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'node:http'
import { EventChatPublishedData, EventSubscribeData } from './types/socket'
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
  })

  socket.on('chat:published', (data: EventChatPublishedData) => {
    logger('chat:published', data)
    socket.broadcast.to(data.roomId).emit('chat:received', data)
  })
})

server.listen(port, () => {
  console.log(`🎉 Server running on the port: ${port}`)
})
