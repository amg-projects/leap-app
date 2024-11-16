'use client'

// Credits: https://github.com/Glimesh/broadcast-box/blob/main/web/src/components/player/index.js
import dynamic from 'next/dynamic'
import { createRef, useEffect, useState } from 'react'

const whepAPIUrl = 'http://localhost:8080/whep'
// const whepAPIUrl = 'https://leap-webrtc.fly.dev/whep'

export const WebRTCPlayer = dynamic(() => Promise.resolve(WebRTCPlayerImpl), {
  ssr: false,
})

const peerConnectionCache = new Map<string, RTCPeerConnection>()

function useRTCVideo(streamId: string) {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null)

  useEffect(() => {
    const firstTime = !peerConnectionCache.has(streamId)
    const peerConnection =
      peerConnectionCache.get(streamId) || new RTCPeerConnection()
    peerConnectionCache.set(streamId, peerConnection)

    const oldOnTrack = peerConnection.ontrack
    peerConnection.ontrack = function (event) {
      setMediaStream(event.streams[0])
      if (oldOnTrack) {
        oldOnTrack(event)
      }
    }

    if (!firstTime) {
      return
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

    return () => {
      peerConnection.close()
      peerConnectionCache.delete(streamId)
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
