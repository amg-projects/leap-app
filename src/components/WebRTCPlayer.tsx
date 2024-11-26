'use client'

// Credits: https://github.com/Glimesh/broadcast-box/blob/main/web/src/components/player/index.js
import dynamic from 'next/dynamic'
import { createRef, useEffect, useState } from 'react'

const whepAPIUrl = 'http://[2804:14d:7e81:8a8f:b255:3176:a2d2:c21b]:6060/whep'
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
      })
        .then(async (response) => {
          peerConnection.setRemoteDescription({
            sdp: await response.text(),
            type: 'answer',
          })
        })
        .catch((err) => {
          console.dir(err)
          alert(err)
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

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     window.location.reload(true); // Forces a hard reload
  //   }, 20000);

  //   return () => clearInterval(intervalId); // Cleanup interval on component unmount
  // }, []);
  return (
    <>
      <video ref={videoRef} autoPlay muted className={`w-full bg-black`} />
    </>
  )
}
