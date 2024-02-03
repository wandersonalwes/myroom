import { Camera, Mic, Phone, ScreenShare } from 'lucide-react'
import { Button } from './ui/button'

export const RoomFooter = () => {
  return (
    <footer className="px-4 flex justify-center items-center gap-3 ">
      <Button size="icon" variant="outline" className="w-14">
        <Mic />
      </Button>
      <Button size="icon" variant="outline" className="w-14">
        <Camera />
      </Button>

      <Button size="icon" variant="outline" className="w-14">
        <ScreenShare />
      </Button>

      <Button size="icon" variant="destructive" className="w-14">
        <Phone />
      </Button>
    </footer>
  )
}
