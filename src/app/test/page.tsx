'use client'
import { trpc } from '../_trpc/client'

export default function page() {
  const chat = trpc.chat.useQuery()
  const mutation = trpc.newMessage.useMutation()
  const messages = chat.data ?? []

  return (
    <div
      className="h-screen border border-green-900 bg-black"
      onClick={() => {
        mutation.mutate({ message: 'hello' })
        chat.refetch()
      }}
    >
      {messages.map(criaDiv)}
    </div>
  )
}

function criaDiv(texto: string, indice: number) {
  let className
  if (indice % 2 === 0) {
    className = 'bg-gray-300 text-black'
  } else {
    className = 'bg-white text-black'
  }
  return (
    <div key={indice} className={className}>
      {texto} - {indice}
    </div>
  )
}
