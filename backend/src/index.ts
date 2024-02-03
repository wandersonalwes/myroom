import cors from 'cors'
import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'node:http'

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
})

server.listen(port, () => {
  console.log(`🎉 Server running on the port: ${port}`)
})
