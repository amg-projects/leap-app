'use client'

// Credits: https://github.com/Glimesh/broadcast-box/blob/main/web/src/components/player/index.js
import dynamic from 'next/dynamic'
import { createRef, useEffect, useRef, useState } from 'react'

const whepAPIUrl = 'http://localhost:8000/whep'
export const WebRTCPlayer = dynamic(() => Promise.resolve(WebRTCPlayerImpl), {
  ssr: false,
})

function useRTCVideo(streamId: string) {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null)

  useEffect(() => {
    const peerConnection = new RTCPeerConnection()

    peerConnection.ontrack = function (event) {
      setMediaStream(event.streams[0])
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
  }, [streamId])

  return { mediaStream }
}

function WebRTCPlayerImpl({ streamId }: { streamId: string }) {
  const { mediaStream } = useRTCVideo(streamId)
  const videoRef = createRef<HTMLVideoElement>()

  useEffect(() => {
    if (videoRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(videoRef.current as any).srcObject = mediaStream
    }
  }, [videoRef, mediaStream])
  return (
    <>
      <video ref={videoRef} autoPlay className={`w-full bg-black`} />
    </>
  )
}
