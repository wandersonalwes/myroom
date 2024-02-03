import {
  Camera,
  CameraOff,
  Mic,
  MicOff,
  Phone,
  ScreenShare,
  ScreenShareOff,
} from 'lucide-react'
import { Button } from './ui/button'
import { useLobby } from '@/hooks/useLobby'

export const RoomFooter = () => {
  const {
    toggleAudio,
    toggleCamera,
    cameraEnabled,
    audioEnabled,
    sharingScreen,
    toggleShareScreen,
    leaveCall,
  } = useLobby()
  return (
    <footer className="px-4 flex justify-center items-center gap-3 ">
      <Button
        onClick={toggleAudio}
        size="icon"
        variant={audioEnabled ? 'secondary' : 'outline'}
        className="w-14"
      >
        {audioEnabled ? <Mic /> : <MicOff />}
      </Button>

      <Button
        onClick={toggleCamera}
        size="icon"
        variant={cameraEnabled ? 'secondary' : 'outline'}
        className="w-14"
      >
        {cameraEnabled ? <Camera /> : <CameraOff />}
      </Button>

      <Button
        onClick={toggleShareScreen}
        size="icon"
        variant={sharingScreen ? 'secondary' : 'outline'}
        className="w-14"
      >
        {sharingScreen ? <ScreenShareOff /> : <ScreenShare />}
      </Button>

      <Button
        onClick={leaveCall}
        size="icon"
        variant="destructive"
        className="w-14"
      >
        <Phone />
      </Button>
    </footer>
  )
}
