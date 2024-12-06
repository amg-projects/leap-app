const whepAPIUrl = 'http://leap-webrtc.fly.dev/whep'

export async function POST(req: Request) {
  const text = await req.text()

  // Send via fetch to whepAPIUrl
  const response = await fetch(whepAPIUrl, {
    method: 'POST',
    body: text,
    headers: req.headers,
  })

  return new Response(response.body)
}
