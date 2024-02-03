'use client'

import { SOCKET_URL } from '@/env'
import { createContext, useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client'

type SocketContextProps = {
  socket: Socket | null
}

export const SocketContext = createContext<SocketContextProps>({ socket: null })

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const _socket = io(SOCKET_URL, { transports: ['websocket'] })

    setSocket(_socket)

    return () => {
      _socket.off()
    }
  }, [])

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}
