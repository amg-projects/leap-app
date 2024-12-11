'use client'

import { accessLive } from './actions'

type SideBarProps = {
  expanded: boolean
}

type Channel = {
  id: string
  name: string
  description: string
  imageURL: string
}

export const channels: Record<string, Channel> = {
  '1': {
    id: '1',
    name: 'Renato 38tao',
    description: 'E ISSO OU NAO?',
    imageURL:
      'https://m.media-amazon.com/images/S/amzn-author-media-prod/am5ok7i24vu2p15el6l540i444._SX450_CR0%2C0%2C450%2C450_.jpg',
  },
  '2': {
    id: '2',
    name: 'SUPER XANDAO',
    description: '2030 E MONACO',
    imageURL: 'https://images.uncyc.org/pt/f/f5/Xand%C3%A3oMagro.jpg',
  },
  '3': {
    id: '3',
    name: 'Channel 3',
    description: 'qualquer',
    imageURL:
      'https://media.discordapp.net/attachments/344659242000580621/1301363143230095441/New_Project_1.png?ex=675a41df&is=6758f05f&hm=e44219996d7e6da3d77daacb461614e579e1e351a9f32f9d5cb36cb4dce4d5ca&=&format=webp&quality=lossless&width=797&height=671',
  },
  '4': {
    id: '4',
    name: 'MC RYAN',
    description: 'qualquer',
    imageURL:
      'https://media.discordapp.net/attachments/344659242000580621/1301363143230095441/New_Project_1.png?ex=675a41df&is=6758f05f&hm=e44219996d7e6da3d77daacb461614e579e1e351a9f32f9d5cb36cb4dce4d5ca&=&format=webp&quality=lossless&width=797&height=671',
  },
}

const recommendedIds = ['0', '4']

const followedIds = ['1', '2', '4']

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
            <ChannelExampleN
              expanded={props.expanded}
              channelsIds={followedIds}
            />
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
            <ChannelExampleN
              expanded={props.expanded}
              channelsIds={recommendedIds}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

type MultipleChannelsProps = {
  expanded: boolean
  channelsIds: string[]
}

function ChannelExampleN(props: MultipleChannelsProps) {
  const lastID = 1
  const channelss = []

  for (let i = 0; i < props.channelsIds.length; i++) {
    if (channels[props.channelsIds[i]] === undefined) continue
    channelss.push(
      <ChannelExample
        key={lastID}
        id={lastID}
        expanded={props.expanded}
        name={channels[props.channelsIds[i]].name}
        liveCount="1.2k"
        category="Just Chatting"
      />,
    )
  }

  return <>{channelss}</>
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
