'use client'

import { accessLive } from './actions'

type SideBarProps = {
  expanded: boolean
}
type Pannel = {
  title?: string
  imageURL?: string
  redirect?: string
  alt?: string
  description?: string
}

type Channel = {
  id: string
  name: string
  description: string
  category: string
  liveCount: string
  imageURL: string
  pannels: Pannel[]
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
    pannels: [],
  },
  SUPERXANDAO: {
    id: 'SUPERXANDAO',
    name: 'SUPER XANDAO FRUTO DE UMA VONTADE DIVINA, FUI ENVIADO À TERRA COM O OBJETIVO DE SALVAR A HUMANIDADE DO PECADO MORTAL NO ÚLTIMO DIA DESTA EXISTÊNCIA. PORÉM, APENAS OS CAMPEÕES DE ESPÍRITO SERÃO SALVOS POR XANDÃO. SIGA-ME E IREMOS TRILHAR JUNTOS O CAMINHO DOS CAMPEÕES.',
    description: '2030 E MONACO',
    category: 'doki doki',
    liveCount: '120k',
    imageURL: 'https://images.uncyc.org/pt/f/f5/Xand%C3%A3oMagro.jpg',
    pannels: [],
  },
  '3': {
    id: '3',
    name: 'Channel 3',
    description: 'VENEZA',
    category: 'IRL',
    liveCount: '1M',
    imageURL:
      'https://p2.trrsf.com/image/fget/cf/1200/1200/middle/images.terra.com/2024/10/10/223301762-4530866-caso-p-diddy-emocao-e-vontade-de-coloc-1400x823-3.png',
    pannels: [
      {
        title: 'About Me',
        imageURL:
          'data:image/png;base64,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',
        redirect:
          'https://vagaspelomundo.com.br/wp-content/uploads/2023/11/turismo-em-veneza.jpeg',
        alt: 'image',
        description: 'Im a good guy',
      },
      {
        imageURL:
          'https://vagaspelomundo.com.br/wp-content/uploads/2023/11/turismo-em-veneza.jpeg',
        redirect:
          'https://vagaspelomundo.com.br/wp-content/uploads/2023/11/turismo-em-veneza.jpeg',
        alt: 'me',
      },
      {
        title: 'god boy',
        description:
          'golden boy',
      },
    ],
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
