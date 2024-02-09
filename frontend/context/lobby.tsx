'use client'

import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import { useSocket } from '@/hooks/socket'
import { User } from '@supabase/supabase-js'
import { useParams, useRouter } from 'next/navigation'
import {
  MutableRefObject,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

type DataStream = {
  id: string
  stream: MediaStream
  username: string
}

type SDPData = {
  sender: string
  description: RTCSessionDescriptionInit
}

type CandidateData = {
  sender: string
  candidate: RTCIceCandidate
}

type MessageType = {
  id: string
  username: string
  message: string
  date: string
  roomId: string
}

type LobbyContextProps = {
  toggleCamera: () => void
  toggleAudio: () => void
  toggleShareScreen: () => Promise<void>
  leaveCall: () => Promise<void>
  localVideo: MutableRefObject<HTMLVideoElement | null>
  cameraEnabled: boolean
  audioEnabled: boolean
  sharingScreen: boolean
  messages: MessageType[]
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>
  remoteStreams: DataStream[]
}

export const LobbyContext = createContext<LobbyContextProps>(
  {} as LobbyContextProps
)

export const LobbyProvider = ({
  children,
  user,
}: {
  children: React.ReactNode
  user: User
}) => {
  const router = useRouter()
  const { socket } = useSocket()
  const { toast } = useToast()
  const soundRef = useRef<HTMLAudioElement>(null)
  const [cameraEnabled, setCameraEnabled] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [sharingScreen, setSharingScreen] = useState(false)
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const localVideo = useRef<HTMLVideoElement | null>(null)
  const peerConnections = useRef<Record<string, RTCPeerConnection>>({})
  const [remoteStreams, setRemoteStreams] = useState<DataStream[]>([])
  const [videoMediaStream, setVideoMediaStream] = useState<MediaStream | null>(
    null
  )
  const [localVideoShareScreen, setLocalVideoShareScreen] =
    useState<MediaStream | null>(null)

  const params = useParams<{ id: string }>()

  const roomId = useMemo(() => params.id, [params.id])

  const [messages, setMessages] = useState<MessageType[]>([])

  const initLocalCamera = useCallback(async () => {
    const mediaStrem = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
      },
    })

    setLocalStream(mediaStrem)

    if (localVideo.current) localVideo.current.srcObject = mediaStrem

    setVideoMediaStream(mediaStrem)
    setCameraEnabled(true)
    setAudioEnabled(true)
  }, [])

  const initRemoteCamera = async () => {
    const mediaStrem = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
      },
    })

    return mediaStrem
  }

  const toggleCamera = () => {
    setCameraEnabled(!cameraEnabled)
    localStream?.getVideoTracks().forEach((track) => {
      track.enabled = !cameraEnabled
    })

    Object.values(peerConnections.current).forEach((peerConnection) => {
      peerConnection.getSenders().forEach((sender) => {
        if (sender.track?.kind === 'video') {
          sender.replaceTrack(
            localStream
              ?.getVideoTracks()
              .find((track) => track.kind === 'video') || null
          )
        }
      })
    })
  }

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled)
    localStream?.getAudioTracks().forEach((track) => {
      track.enabled = !audioEnabled
    })

    Object.values(peerConnections.current).forEach((peerConnection) => {
      peerConnection.getSenders().forEach((sender) => {
        if (sender.track?.kind === 'audio') {
          if (localStream && localStream.getAudioTracks().length > 0) {
            sender.replaceTrack(
              localStream
                ?.getAudioTracks()
                .find((track) => track.kind === 'audio') || null
            )
          }
        }
      })
    })
  }

  const shareScreen = async () => {
    const videoShareScreen = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    })

    if (localVideo.current) localVideo.current.srcObject = videoShareScreen

    Object.values(peerConnections.current).forEach((peerConnection) => {
      peerConnection.getSenders().forEach((sender) => {
        if (sender.track?.kind === 'video') {
          sender.replaceTrack(videoShareScreen?.getVideoTracks()[0] || null)
        }
      })
    })

    setLocalVideoShareScreen(videoShareScreen)
    setSharingScreen(true)
  }

  const stopScreenSharing = async () => {
    if (localVideo.current) localVideo.current.srcObject = videoMediaStream

    localVideoShareScreen?.getVideoTracks().map((track) => {
      track.stop()
    })

    Object.values(peerConnections.current).forEach((peerConnection) => {
      peerConnection.getSenders().forEach((sender) => {
        if (sender.track?.kind === 'video') {
          sender.replaceTrack(videoMediaStream?.getVideoTracks()[0] || null)
        }
      })
    })

    setSharingScreen(false)
  }

  const toggleShareScreen = () =>
    sharingScreen ? stopScreenSharing() : shareScreen()

  const leaveCall = async () => {
    localStream?.getTracks().forEach((track) => track.stop())

    Object.values(peerConnections.current).forEach((peerConnection) => {
      peerConnection.close()
    })

    socket?.disconnect()
    router.push('/dashboard')

    setAudioEnabled(false)
    setCameraEnabled(false)
    setSharingScreen(false)
  }

  const handleSDP = useCallback(
    async (data: SDPData) => {
      const peerConnection = peerConnections.current[data.sender]

      if (data.description.type === 'offer') {
        await peerConnection.setRemoteDescription(data.description)

        const answer = await peerConnection.createAnswer()
        await peerConnection.setLocalDescription(answer)

        socket?.emit('peer:answer', {
          to: data.sender,
          sender: user.id,
          description: peerConnection.localDescription,
        })
      } else if (data.description.type === 'answer') {
        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(data.description)
        )
      }
    },
    [socket, user.id]
  )

  const handleIceCandidate = async (data: CandidateData) => {
    const peerConnection = peerConnections.current[data.sender]
    if (data.candidate) {
      await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate))
    }
  }

  const createPeerConnection = useCallback(
    async (userId: string, createOffer: boolean, username?: string) => {
      try {
        const peerConnection = peerConnections.current[userId]

        if (peerConnection) return

        const config = {
          iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
        }

        const peer = new RTCPeerConnection(config)

        peerConnections.current[userId] = peer

        if (videoMediaStream) {
          videoMediaStream.getTracks().forEach((track) => {
            peer.addTrack(track, videoMediaStream)
          })
        } else {
          const video = await initRemoteCamera()
          video.getTracks().forEach((track) => peer.addTrack(track, video))
        }

        if (createOffer) {
          const offer = await peer.createOffer()
          await peer.setLocalDescription(offer)

          socket?.emit('peer:offer', {
            to: userId,
            sender: user.id,
            description: peer.localDescription,
          })
        }

        peer.ontrack = (event) => {
          const remoteStream = event.streams[0]

          if (videoMediaStream) {
          }

          const dataStream: DataStream = {
            id: userId,
            stream: remoteStream,
            username: username ?? '',
          }

          setRemoteStreams((prevState: DataStream[]) => {
            if (!prevState.some((stream) => stream.id === userId)) {
              return [...prevState, dataStream]
            }
            return prevState
          })

          setRemoteStreams((prevState: DataStream[]) => {
            if (!prevState.some((stream) => stream.id === userId)) {
              return [...prevState, dataStream]
            }
            return prevState
          })
        }

        peer.onicecandidate = (event) => {
          console.log('onicecandidate', event)
          if (event.candidate) {
            socket?.emit('peer:icecandidate', {
              to: userId,
              sender: user.id,
              candidate: event.candidate,
            })
          }
        }

        peer.onicecandidateerror = (event) => {
          console.log('onicecandidateerror', event)
        }

        peer.onsignalingstatechange = () => {
          console.log('onsignalingstatechange', peer.signalingState)

          if (peer.signalingState === 'closed') {
            setRemoteStreams((prevState) =>
              prevState.filter((stream) => stream.id !== userId)
            )
          }
        }

        peer.onconnectionstatechange = () => {
          console.log('onconnectionstatechange', peer.connectionState)

          const states = ['disconnected', 'failed', 'closed']

          if (states.includes(peer.connectionState)) {
            setRemoteStreams((prevState) =>
              prevState.filter((stream) => stream.id !== userId)
            )
          }
        }
      } catch (error) {
        console.log('createPeerConnection:', error)
      }
    },
    [socket]
  )

  useEffect(() => {
    const timeout = setTimeout(initLocalCamera, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [initLocalCamera])

  useEffect(() => {
    socket?.on('connect', async () => {
      console.log('connected', socket.id)

      socket.emit('subscribe', {
        roomId,
        userId: user.id,
        username: user.user_metadata.name,
      })
    })

    socket?.on('chat:received', (data: MessageType) => {
      soundRef.current?.play()

      toast({
        title: data.username,
        description: data.message,
        action: <ToastAction altText="Responder">Responder</ToastAction>,
      })
      setMessages((currentMessages) => [...currentMessages, data])
    })

    socket?.on('peer:start', async (data) => {
      console.log('peer:start', data)
      createPeerConnection(data.userId, false)

      socket.emit('peer:active_user', {
        to: data.userId,
        sender: user.id,
        username: user.user_metadata.name,
      })
    })

    socket?.on('peer:active_user', (data) => {
      console.log('peer:active_user', data)

      createPeerConnection(data.sender, true, data.username)
    })

    socket?.on('peer:offer', async (data) => {
      console.log('peer:offer', data)
      await handleSDP(data)
    })

    socket?.on('peer:answer', async (data) => {
      console.log('peer:answer', data)

      await handleSDP(data)
    })

    socket?.on('peer:icecandidate', handleIceCandidate)
  }, [
    createPeerConnection,
    handleSDP,
    roomId,
    socket,
    toast,
    user.id,
    user.user_metadata.name,
  ])

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
        messages,
        setMessages,
        remoteStreams,
      }}
    >
      {children}
      <audio ref={soundRef} src="/notification.mp3"></audio>
    </LobbyContext.Provider>
  )
}
