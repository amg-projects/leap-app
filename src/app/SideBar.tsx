'use client'

import { accessLive } from './actions'

type SideBarProps = {
  expanded: boolean
}

export function SideBar(props: SideBarProps) {
  return (
    <div className="z-10 shadow-[0_35px_60px_-15px_rgba(0,0,0,1)] transition duration-500 ease-in">
      <div className="flex flex-col bg-white text-black">
        <div className="flex flex-col">
          <div className={props.expanded ? '' : 'hidden'}>
            FOLLOWED CHANNELS
          </div>
          <ChannelExampleN expanded={props.expanded} exampleCount={12} />
        </div>
        <div className="mt-20 flex flex-col">
          <div className={props.expanded ? '' : 'hidden'}>
            RECOMMENDED CHANNELS
          </div>
          <ChannelExampleN expanded={props.expanded} exampleCount={12} />
        </div>
      </div>
    </div>
  )
}

type MultipleChannelsProps = {
  expanded: boolean
  exampleCount: number
}

function ChannelExampleN(props: MultipleChannelsProps) {
  let lastID = 1
  const channels = []

  for (let i = 0; i < props.exampleCount; i++) {
    channels.push(
      <ChannelExample
        key={lastID}
        id={lastID}
        expanded={props.expanded}
        name={'Channel Name' + lastID++}
        liveCount="1.2k"
        category="Just Chatting"
      />,
    )
  }

  return <>{channels}</>
}

type ChannelExampleProps = {
  expanded: boolean
  id: number
  name: string
  liveCount: string
  category: string
}

function ChannelExample(props: ChannelExampleProps) {
  const className = props.expanded ? '' : 'hidden'
  return (
    <div
      className="flex flex-row items-center"
      onClick={() => {
        accessLive(props.id)
      }}
    >
      <div className="m-1 size-8 rounded-full bg-black"></div>
      <div className={`ml-1 flex-1 ${className}`}>
        <div className="flex flex-row items-center">
          <div className="flex-1">{props.name}</div>
          <div className="ml-2 mr-1 text-xs">🔴 {props.liveCount}</div>
        </div>
        <div className="text-xs">{props.category}</div>
      </div>
    </div>
  )
}
