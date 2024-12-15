export default function page() {
  const messages = [
    'oi, tudo bem?',
    'tudo sim, e voce?',
    'talvez eu mereca tudo isso',
    'gary -1 ponto',
  ]

  return (
    <div className="h-screen border border-green-900 bg-black">
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
    <div className={className}>
      {texto}
      {indice}
    </div>
  )
}
