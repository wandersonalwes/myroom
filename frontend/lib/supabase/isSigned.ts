import { getUserByServer } from './getUserByServer'

export const isSigned = async () => {
  const user = await getUserByServer()
  return !!user
}
