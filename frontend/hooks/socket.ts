import { SocketContext } from '@/context/socket'
import { useContext } from 'react'

export const useSocket = () => {
  const context = useContext(SocketContext)

  if (!context) throw new Error('useSocket must be wrapped by SocketContext')

  return context
}
