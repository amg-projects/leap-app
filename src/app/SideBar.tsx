'use client'

import { accessLive } from './actions'

type SideBarProps = {
  expanded: boolean
}

export function SideBar(props: SideBarProps) {
  return (
    <div className="z-10 flex min-w-14 flex-1 flex-col items-center bg-white shadow-[10px_-10px_10px_-10px_rgba(0,0,0,0.2)]">
      <div className="flex flex-col gap-5 text-black">
        <div className="flex flex-col pt-5">
          <div
            className={`mb-2 ${props.expanded ? '' : 'hidden'} px-2 text-left font-bold`}
          >
            FOLLOWED
          </div>
          <div className="flex flex-col gap-1">
            <ChannelExampleN expanded={props.expanded} exampleCount={12} />
          </div>
        </div>

        <div className="h-1 border-b-2" />

        <div className="flex flex-col">
          <div
            className={`mb-2 ${props.expanded ? '' : 'hidden'} px-2 text-left font-bold`}
          >
            RECOMMENDED
          </div>
          <div className="flex flex-col gap-1">
            <ChannelExampleN expanded={props.expanded} exampleCount={12} />
          </div>
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
        name={'Channel Name ' + lastID++}
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
      className="flex cursor-pointer flex-row items-center hover:scale-[1.01] hover:bg-gray-100 hover:shadow-lg"
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
