import { LobbyContext } from '@/context/lobby'
import { useContext } from 'react'

export const useLobby = () => {
  const context = useContext(LobbyContext)

  if (!context) throw new Error('useLobby must be wrapped by LobbyContext')

  return context
}
