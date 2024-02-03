import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SocketProvider } from '@/context/socket'
import { LobbyProvider } from '@/context/lobby'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'myroom',
  description: 'Crie, Conecte, Relacione',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={inter.className}>
        <SocketProvider>
          <LobbyProvider>{children}</LobbyProvider>
        </SocketProvider>
      </body>
    </html>
  )
}
