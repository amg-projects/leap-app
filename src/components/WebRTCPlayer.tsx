'use client'

// Credits: https://github.com/Glimesh/broadcast-box/blob/main/web/src/components/player/index.js
import dynamic from 'next/dynamic'
import { createRef, useEffect, useState } from 'react'

export const WebRTCPlayer = dynamic(() => Promise.resolve(WebRTCPlayerImpl), {
  ssr: false,
})

function WebRTCPlayerImpl({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  streamId,
  whepAPIUrl = 'http://localhost:8000/whep',
}: {
  streamId: string
  whepAPIUrl?: string
}) {
  const videoRef = createRef<HTMLVideoElement>()
  const [mediaSrcObject, setMediaSrcObject] = useState<MediaStream | null>(null)

  useEffect(() => {
    if (videoRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(videoRef.current as any).srcObject = mediaSrcObject
    }
  }, [mediaSrcObject, videoRef])

  useEffect(() => {
    const peerConnection = new RTCPeerConnection()

    peerConnection.ontrack = function (event) {
      setMediaSrcObject(event.streams[0])
    }

    peerConnection.addTransceiver('audio', { direction: 'recvonly' })
    peerConnection.addTransceiver('video', { direction: 'recvonly' })

    peerConnection.createOffer().then((offer) => {
      peerConnection.setLocalDescription(offer)

      fetch(whepAPIUrl, {
        method: 'POST',
        body: offer.sdp,
        headers: {
          // Authorization: `Bearer ${streamId}`,
          Authorization: `Bearer none`,
          'Content-Type': 'application/sdp',
        },
      }).then(async (response) => {
        peerConnection.setRemoteDescription({
          sdp: await response.text(),
          type: 'answer',
        })
      })
    })

    return function cleanup() {
      peerConnection.close()
    }
  }, [whepAPIUrl])

  return (
    <>
      <video ref={videoRef} autoPlay className={`w-full bg-black`} />
    </>
  )
}
