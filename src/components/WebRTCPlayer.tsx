'use client'

// Credits: https://github.com/Glimesh/broadcast-box/blob/main/web/src/components/player/index.js
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'

export const WebRTCPlayer = dynamic(() => Promise.resolve(PlayerPage), {
  ssr: false,
})

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

function PlayerPage(): JSX.Element {
  return (
    <div className={`container mx-auto flex flex-col items-center p-2`}>
      <Player cinemaMode={false} />
    </div>
  )
}

interface PlayerProps {
  cinemaMode: boolean
}

function Player({ cinemaMode }: PlayerProps): JSX.Element {
  const videoRef = React.createRef<HTMLVideoElement>()
  const [videoLayers] = useState<string[]>([])
  const [mediaSrcObject, setMediaSrcObject] = useState<MediaStream | null>(null)
  const [layerEndpoint] = useState<string>('')

  const onLayerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    fetch(layerEndpoint, {
      method: 'POST',
      body: JSON.stringify({ mediaId: '1', encodingId: event.target.value }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = mediaSrcObject
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.muted = false
        }
      }, 5000)
    }
  }, [mediaSrcObject, videoRef])

  useEffect(() => {
    const peerConnection = new RTCPeerConnection(pcConfig)

    peerConnection.ontrack = (event) => {
      setMediaSrcObject(event.streams[0])
    }

    peerConnection.addTransceiver('audio', { direction: 'recvonly' })
    peerConnection.addTransceiver('video', { direction: 'recvonly' })

    peerConnection.createOffer().then((offer) => {
      if (!offer.sdp) {
        return
      }
      offer.sdp = offer.sdp.replace('useinbandfec=1', 'useinbandfec=1;stereo=1')
      peerConnection.setLocalDescription(offer)

      fetch('/whep', {
        method: 'POST',
        body: offer.sdp,
        headers: {
          Authorization: `Bearer ${location.pathname.split('/').pop()}`,
          'Content-Type': 'application/sdp',
        },
      })
        .then((r) => {
          // const parsedLinkHeader = parseLinkHeader(r.headers.get('Link') || '')
          // setLayerEndpoint(
          //   `${window.location.protocol}//${parsedLinkHeader['urn:ietf:params:whep:ext:core:layer'].url}`,
          // )

          // const evtSource = new EventSource(
          //   `${window.location.protocol}//${parsedLinkHeader['urn:ietf:params:whep:ext:core:server-sent-events'].url}`,
          // )
          // evtSource.onerror = () => evtSource.close()

          // evtSource.addEventListener('layers', (event: MessageEvent) => {
          //   const parsed = JSON.parse(event.data)
          //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
          //   setVideoLayers(parsed['1'].layers.map((l: any) => l.encodingId))
          // })

          return r.text()
        })
        .then((answer) => {
          peerConnection.setRemoteDescription({
            sdp: answer,
            type: 'answer',
          })
        })
    })

    return () => {
      peerConnection.close()
    }
  }, [location.pathname])

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        muted
        controls
        playsInline
        className={`w-full bg-black ${cinemaMode && 'h-full'}`}
        style={
          cinemaMode
            ? {
                maxHeight: '100vh',
                maxWidth: '100vw',
              }
            : {}
        }
      />

      {videoLayers.length >= 2 && (
        <select
          defaultValue="disabled"
          onChange={onLayerChange}
          className="focus:shadow-outline w-full appearance-none rounded border border-gray-700 bg-gray-700 px-3 py-2 leading-tight text-white shadow-md placeholder:text-gray-200 focus:outline-none"
        >
          <option value="disabled" disabled>
            Choose Quality Level
          </option>
          {videoLayers.map((layer) => (
            <option key={layer} value={layer}>
              {layer}
            </option>
          ))}
        </select>
      )}
    </>
  )
}

export default PlayerPage
