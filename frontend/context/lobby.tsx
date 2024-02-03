'use client'

import { useSocket } from '@/hooks/socket'
import { useRouter } from 'next/navigation'
import {
  MutableRefObject,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react'

type LobbyContextProps = {
  toggleCamera: () => void
  toggleAudio: () => void
  toggleShareScreen: () => Promise<void>
  leaveCall: () => Promise<void>
  localVideo: MutableRefObject<HTMLVideoElement | null>
  cameraEnabled: boolean
  audioEnabled: boolean
  sharingScreen: boolean
}

export const LobbyContext = createContext<LobbyContextProps>(
  {} as LobbyContextProps
)

export const LobbyProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const { socket } = useSocket()
  const [cameraEnabled, setCameraEnabled] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [sharingScreen, setSharingScreen] = useState(false)
  const localStream = useRef<MediaStream | null>(null)
  const localVideo = useRef<HTMLVideoElement | null>(null)

  const initLocalCamera = async () => {
    const mediaStrem = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
      },
    })

    localStream.current = mediaStrem

    if (localVideo.current) localVideo.current.srcObject = mediaStrem

    setCameraEnabled(true)
    setAudioEnabled(true)
  }

  const toggleCamera = () => {
    setCameraEnabled(!cameraEnabled)
    localStream.current?.getVideoTracks().forEach((track) => {
      track.enabled = !cameraEnabled
    })
  }

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled)
    localStream.current?.getAudioTracks().forEach((track) => {
      track.enabled = !audioEnabled
    })
  }

  const shareScreen = async () => {
    const videoShareScreen = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    })

    localStream.current = videoShareScreen

    if (localVideo.current) localVideo.current.srcObject = videoShareScreen

    setSharingScreen(true)
  }

  const stopScreenSharing = async () => {
    localStream.current?.getTracks().forEach((track) => track.stop())
    setSharingScreen(false)

    await initLocalCamera()
  }

  const toggleShareScreen = () =>
    sharingScreen ? stopScreenSharing() : shareScreen()

  const leaveCall = async () => {
    localStream.current?.getTracks().forEach((track) => track.stop())

    socket?.disconnect()
    router.push('/')

    setAudioEnabled(false)
    setCameraEnabled(false)
    setSharingScreen(false)
  }

  useEffect(() => {
    initLocalCamera()
  }, [])

  return (
    <LobbyContext.Provider
      value={{
        toggleCamera,
        toggleAudio,
        localVideo,
        cameraEnabled,
        audioEnabled,
        sharingScreen,
        toggleShareScreen,
        leaveCall,
      }}
    >
      {children}
    </LobbyContext.Provider>
  )
}
