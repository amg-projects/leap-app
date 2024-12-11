'use client'

import { use, useState } from 'react'
import { NavBar } from '../../NavBar'
import { SideBar, channels } from '../../SideBar'
import { VideoPreview } from '../../VideoPreview'

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [sideBarExpadend, setSideBarExpanded] = useState(true)

  const { id } = use(params)

  return (
    <div className="flex h-screen flex-col overflow-hidden">
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
    <div className="flex flex-1 gap-9 bg-[#F0FFF5] pl-9 pr-16 pt-8">
      <LeftSide id={id} />
      <RightSide />
    </div>
  )
}

function LeftSide({ id }: { id: string }) {
  return (
    <div className="flex flex-1 flex-col">
      <VideoPreview className="" />
      <LiveDetails id={id} />
    </div>
  )
}

function LiveDetails({ id }: { id: string }) {
  return (
    <div className="flex">
      <ChannelImage imageURL={channels[id].imageURL} />
      <div className="flex flex-col">
        <LiveDetailsText
          name={channels[id].name}
          description={channels[id].description}
        />
      </div>
    </div>
  )
}

function ChannelImage({ imageURL }: { imageURL: string }) {
  return (
    <div className="p-4">
      <div className="size-24 overflow-hidden rounded-full bg-[#000000]">
        <img src={imageURL} alt="oi" />
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
    <div className="flex w-full flex-col gap-2 pt-6 text-black">
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

function ButtonsSection() {
  return (
    <div className="flex gap-2 ">
      <div className="size-10 rounded-full bg-[#F0FFF5] p-1 text-center text-white"></div>
      <div className="size-10 rounded-full bg-[#F0FFF5] p-1 text-center text-white"></div>
      <div className="h-10 w-28 rounded-2xl bg-[#F0FFF5] p-1 px-2 text-center text-white"></div>
    </div>
  )
}

function RightSide() {
  return <div className="mb-32 max-w-96 flex-1 rounded-2xl bg-[#c7d6cc]"></div>
}
