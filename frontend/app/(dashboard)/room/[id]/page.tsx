import { Room } from '@/components/room'
import { getUserByServer } from '@/lib/supabase/getUserByServer'
import { redirect } from 'next/navigation'

export default async function RoomPage() {
  const user = await getUserByServer()

  if (!user) return redirect('/login')

  return <Room user={user} />
}
