import { Server } from 'socket.io'
import { createServer } from 'node:http'
import express from 'express'

const port = process.env.PORT || 4000

const app = express()
const server = createServer(app)

const io = new Server({
  cors: {
    origin: ['*'],
  },
})

io.on('connection', (data) => {
  console.log('connected', data.id)
})

server.listen(port, () => {
  console.log(`🎉 Server running on the port: ${port}`)
})
