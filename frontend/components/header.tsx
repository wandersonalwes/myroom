import { Logo } from './logo'
import { Button } from './ui/button'

export const Header = () => {
  return (
    <header className="h-16 flex items-center sticky top-0 backdrop-blur-2xl z-50">
      <div className="container flex justify-between items-center">
        <Logo />

        <div className="spaceq-x-4">
          <Button variant="ghost" rounded="full">
            Entrar
          </Button>
          <Button variant="outline" rounded="full">
            Criar conta
          </Button>
        </div>
      </div>
    </header>
  )
}
