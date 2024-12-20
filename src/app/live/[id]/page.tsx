'use client'

import { use, useState } from 'react'
import { NavBar } from '../../NavBar'
import { SideBar, channels } from '../../SideBar'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { WebRTCPlayer } from '@/components/WebRTCPlayer'
import { ButtonsSection } from './Buttons'

type PageProps = { params: Promise<{ id: string }> }

export default function Page(props: PageProps) {
  const [sideBarExpadend, setSideBarExpanded] = useState(true)

  const { id } = use(props.params)

  return (
    <div className="flex min-h-screen flex-col ">
      <NavBar onSideBarToggle={() => setSideBarExpanded(!sideBarExpadend)} />
      <div className="flex h-screen flex-1 flex-row">
        <div className="flex flex-col overflow-auto">
          <SideBar expanded={sideBarExpadend} />
        </div>
        <div className="flex flex-1 flex-col overflow-auto">
          <LivePageContent id={id} />
        </div>
      </div>
    </div>
  )
}

function LivePageContent({ id }: { id: string }) {
  return (
    <div className="flex flex-1 gap-9 bg-background pl-9 pr-16 pt-8 shadow-inner ">
      <LeftSide id={id} />
      <RightSide />
    </div>
  )
}

function LeftSide({ id }: { id: string }) {
  return (
    <div className="flex flex-1 flex-col">
      <AspectRatio ratio={16 / 9} className="flex-1">
        <WebRTCPlayer livestreamID={id} />
      </AspectRatio>
      <LiveDetails id={id} />
      <LivePannels id={id} />
    </div>
  )
}

function LiveDetails({ id }: { id: string }) {
  return (
    <div className="flex">
      <ChannelImage imageURL={channels[id]?.imageURL} />
      <div className="flex flex-1 flex-col">
        <LiveDetailsText
          name={channels[id]?.name}
          description={channels[id]?.description}
        />
      </div>
    </div>
  )
}

function Pannel({ id, npannel }: { id: string; npannel: number }) {
  return (
    <div>
      <div className="text-2xl font-bold">
        {channels[id]?.pannels?.[npannel]?.title}
      </div>
      <div>
        <a href={channels[id]?.pannels?.[npannel]?.redirect}>
          <img
            src={channels[id]?.pannels?.[npannel]?.imageURL}
            alt={channels[id]?.pannels?.[npannel]?.alt}
          />
        </a>
      </div>
      <div className="">{channels[id]?.pannels?.[npannel]?.description}</div>
    </div>
  )
}

function LivePannels({ id }: { id: string }) {
  return (
    <div className="flex h-96 ">
      <div className="m-5 flex flex-1 flex-col ">
        <Pannel id={id} npannel={0} />
      </div>
      <div className="m-5 flex flex-1 flex-col">
        <Pannel id={id} npannel={1} />
      </div>
      <div className="m-5 flex flex-1 flex-col">
        <Pannel id={id} npannel={2} />
      </div>
    </div>
  )
}

function ChannelImage({ imageURL }: { imageURL: string }) {
  return (
    <div className="relative p-4">
      <div className="shadow-inner- size-24 overflow-hidden rounded-full">
        <img className="size-24" src={imageURL} alt="oi" />
      </div>
      <div className="absolute bottom-3 w-24 rounded-xl bg-red-600 text-center font-bold tracking-widest text-white">
        LIVE
      </div>
    </div>
  )
}

function LiveDetailsText({
  name,
  description,
}: {
  name: string
  description: string
}) {
  return (
    <div className="flex w-full flex-col gap-2 pt-6 text-foreground">
      <div className="text-xl font-bold"> {name} </div>
      <div className="flex justify-between gap-2 pr-4">
        <DescriptionSection description={description} />
        <ButtonsSection />
      </div>
    </div>
  )
}

type DescriptionSectionProps = {
  description: string
}

function DescriptionSection(props: DescriptionSectionProps) {
  const description = props.description
  return (
    <div className="flex items-center">
      <div className="text-xl font-bold">{description}</div>
    </div>
  )
}

function RightSide() {
  return <div className="mb-32 max-w-96 flex-1 rounded-2xl bg-secondary"></div>
}
