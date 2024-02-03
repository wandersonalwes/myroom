import { Send } from 'lucide-react'

export const SendMessage = () => {
  return (
    <div className="relative border-l hidden lg:block">
      <input
        type="text"
        placeholder="Enviar mensagem"
        className="absolute inset-0 outline-none bg-transparent px-4"
      />

      <button className="absolute top-8 right-4">
        <Send />
      </button>
    </div>
  )
}
