'use client'

// Credits: https://github.com/Glimesh/broadcast-box/blob/main/web/src/components/player/index.js
import dynamic from 'next/dynamic'
import { createRef, useEffect, useState } from 'react'

// const whepAPIUrl = 'http://[2804:14d:7e81:8a8f:b255:3176:a2d2:c21b]:6060/whep'
const whepAPIUrl = 'http://187.21.161.185:6060/whep'

export const WebRTCPlayer = dynamic(() => Promise.resolve(WebRTCPlayerImpl), {
  ssr: false,
})

const peerConnectionCache = new Map<string, RTCPeerConnection>()

const pcConfig: RTCConfiguration = {
  iceServers: [
    {
      urls: 'stun:187.21.161.185:3478',
    },
    {
      urls: 'turn:187.21.161.185:3478',
      username: 'username',
      credential: 'password',
    },
  ],
}

function useRTCVideo(streamId: string) {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null)

  useEffect(() => {
    const firstTime = !peerConnectionCache.has(streamId)
    const peerConnection =
      peerConnectionCache.get(streamId) || new RTCPeerConnection(pcConfig)
    peerConnectionCache.set(streamId, peerConnection)

    const oldOnTrack = peerConnection.ontrack
    peerConnection.ontrack = function (event) {
      // Renew the timeout every packet received

      // event.streams[0].getTracks().forEach((track) => {
      //   track.onended = () => {
      //     setTimeout(() => window.location.reload(), 1000)
      //   }
      // })

      setMediaStream(event.streams[0])
      if (oldOnTrack) {
        oldOnTrack(event)
      }
    }

    peerConnection.oniceconnectionstatechange = function () {
      // if failed or disconnected, reload the page
      if (
        peerConnection.iceConnectionState === 'failed' ||
        peerConnection.iceConnectionState === 'disconnected'
      ) {
        // setTimeout(() => window.location.reload(), 1000)
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
          peerConnection
            .setRemoteDescription({
              sdp: await response.text(),
              type: 'answer',
            })
            .catch((err) => {
              // Reload the page if the connection fails
              console.dir(err)
              setTimeout(() => window.location.reload(), 1000)
            })
        })
        .catch((err) => {
          console.dir(err)
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
  //     () => window.location.reload()(true); // Forces a hard reload
  //   }, 20000);

  //   return () => clearInterval(intervalId); // Cleanup interval on component unmount
  // }, []);
  return (
    <>
      <video ref={videoRef} autoPlay muted className={`w-full bg-black`} />
    </>
  )
}
