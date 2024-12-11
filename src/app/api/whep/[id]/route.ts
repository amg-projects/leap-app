const whepAPIUrl = 'http://leap-webrtc.fly.dev/whep'
// const whepAPIUrl = 'http://127.0.0.1:6060/whep'

export async function POST(req: Request) {
  const id = req.url.split('/').pop()

  const text = await req.text()

  // Send via fetch to whepAPIUrl
  const response = await fetch(`${whepAPIUrl}/${id}`, {
    method: 'POST',
    body: text,
    headers: req.headers,
  })

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  })
}
