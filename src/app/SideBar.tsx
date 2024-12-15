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
  renato38: {
    id: 'renato38',
    name: 'Renato 38tao',
    description: 'E ISSO OU NAO?',
    imageURL:
      'https://m.media-amazon.com/images/S/amzn-author-media-prod/am5ok7i24vu2p15el6l540i444._SX450_CR0%2C0%2C450%2C450_.jpg',
  },
  SUPERXANDAO: {
    id: 'SUPERXANDAO',
    name: 'SUPER XANDAO',
    description: '2030 E MONACO',
    imageURL: 'https://images.uncyc.org/pt/f/f5/Xand%C3%A3oMagro.jpg',
  },
  channel3: {
    id: 'channel3',
    name: 'Channel 3',
    description: 'qualquer',
    imageURL:
      'https://media.discordapp.net/attachments/344659242000580621/1301363143230095441/New_Project_1.png?ex=675a41df&is=6758f05f&hm=e44219996d7e6da3d77daacb461614e579e1e351a9f32f9d5cb36cb4dce4d5ca&=&format=webp&quality=lossless&width=797&height=671',
  },
  mcryan: {
    id: 'mcryan',
    name: 'MC RYAN',
    description: 'qualquer',
    imageURL:
      'https://media.discordapp.net/attachments/344659242000580621/1301363143230095441/New_Project_1.png?ex=675a41df&is=6758f05f&hm=e44219996d7e6da3d77daacb461614e579e1e351a9f32f9d5cb36cb4dce4d5ca&=&format=webp&quality=lossless&width=797&height=671',
  },
}

const recommendedIds = ['renato38', 'SUPERXANDAO', 'mcryan']

const followedIds = ['channel3']

export function SideBar(props: SideBarProps) {
  return (
    <div className="bg-background text-foreground z-10 flex min-w-14 flex-1 flex-col items-center shadow-[10px_-10px_10px_-10px_rgba(0,0,0,0.2)]">
      <div className="flex flex-col gap-5">
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
  const channelElements = []

  for (let i = 0; i < props.channelsIds.length; i++) {
    if (channels[props.channelsIds[i]] === undefined) {
      continue // Não faz oq ta em baixo, vai pra i = i + 1
    }

    channelElements.push(
      <ChannelExample
        key={i}
        id={channels[props.channelsIds[i]].id}
        expanded={props.expanded}
        // eslint-disable-next-line prettier/prettier
        name={((channels[((props.channelsIds)[i])]).name)}
        liveCount="1.2k"
        category="Just Chatting"
      />,
    )
  }

  return <>{channelElements}</>
}

type ChannelExampleProps = {
  expanded: boolean
  id: string
  name: string
  liveCount: string
  category: string
}

function ChannelExample(props: ChannelExampleProps) {
  const className = props.expanded ? '' : 'hidden'
  return (
    <div
      className="hover:bg-secondary flex cursor-pointer flex-row items-center hover:scale-[1.01] hover:shadow-lg"
      onClick={() => {
        accessLive(props.id)
      }}
    >
      <div className="bg-foreground m-1 size-8 rounded-full"></div>
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
