'use client'

import { accessLive } from './actions'

type SideBarProps = {
  expanded: boolean
}

type Channel = {
  id: string
  name: string
  description: string
  category: string
  liveCount: string
  imageURL: string
}

export const channels: Record<string, Channel> = {
  '1': {
    id: '1',
    name: 'Renato 38tao',
    description: 'E ISSO OU NAO?',
    category: 'bitcoin',
    liveCount: '14k',
    imageURL:
      'https://m.media-amazon.com/images/S/amzn-author-media-prod/am5ok7i24vu2p15el6l540i444._SX450_CR0%2C0%2C450%2C450_.jpg',
  },
  SUPERXANDAO: {
    id: 'SUPERXANDAO',
    name: 'SUPER XANDAO FRUTO DE UMA VONTADE DIVINA, FUI ENVIADO À TERRA COM O OBJETIVO DE SALVAR A HUMANIDADE DO PECADO MORTAL NO ÚLTIMO DIA DESTA EXISTÊNCIA. PORÉM, APENAS OS CAMPEÕES DE ESPÍRITO SERÃO SALVOS POR XANDÃO. SIGA-ME E IREMOS TRILHAR JUNTOS O CAMINHO DOS CAMPEÕES.',
    description: '2030 E MONACO',
    category: 'doki doki',
    liveCount: '120k',
    imageURL: 'https://images.uncyc.org/pt/f/f5/Xand%C3%A3oMagro.jpg',
  },
  '3': {
    id: '3',
    name: 'Channel 3',
    description: 'VENEZA',
    category: 'IRL',
    liveCount: '1M',
    imageURL:
      'https://static.nationalgeographicbrasil.com/files/styles/image_3200/public/nationalgeographic2743988.webp?w=1600&h=900',
  },
  '4': {
    id: '4',
    name: 'MC RYAN',
    description: 'qualquer',
    category: 'IRL',
    liveCount: '2k',
    imageURL: 'https://static.preparaenem.com/2024/04/2-paisagem-nos-alpes.jpg',
  },
}

const recommendedIds = ['0', '4']

const followedIds = ['1', '2', '3']

export function SideBar(props: SideBarProps) {
  return (
    <div className="z-10 flex min-w-14 flex-1 select-none flex-col items-center bg-background text-foreground shadow-[10px_-10px_10px_-10px_rgba(0,0,0,0.2)]">
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
        liveCount={channels[props.channelsIds[i]].liveCount}
        category={channels[props.channelsIds[i]].category}
        imageURL={channels[props.channelsIds[i]].imageURL}
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
  imageURL: string
}

function ChannelExample(props: ChannelExampleProps) {
  if (!props.expanded)
    return (
      <div
        className="flex cursor-pointer flex-row items-center hover:scale-[1.20] hover:rounded-full hover:bg-secondary hover:shadow-lg"
        onClick={() => {
          accessLive(props.id)
        }}
      >
        <div className="m-1 size-8 overflow-hidden rounded-full bg-foreground">
          <img src={props.imageURL} alt={props.name} />
        </div>
      </div>
    )
  else
    return (
      <div
        className="hover:roudend-lg flex cursor-pointer flex-row items-center px-1 hover:scale-[1.01] hover:bg-secondary hover:shadow-lg"
        onClick={() => {
          accessLive(props.id)
        }}
      >
        <div className="m-1 size-8 overflow-hidden rounded-full bg-foreground">
          <img src={props.imageURL} alt={props.name} />
        </div>
        <div className={`ml-1 flex-1`}>
          <div className="flex flex-row items-center">
            <div className="min-w-32 max-w-32 flex-1 overflow-hidden text-ellipsis text-nowrap">
              {props.name}
            </div>
            <div className="flex w-12 max-w-14 items-center justify-between">
              <div className="text-[0.65rem]">🔴</div>
              <div className=" text-[0.85rem]">{props.liveCount}</div>
            </div>
          </div>
          <div className="text-xs">{props.category}</div>
        </div>
      </div>
    )
}
