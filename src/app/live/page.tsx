import { NavBar } from '../NavBar'
import { SideBar } from '../SideBar'
import { VideoPreview } from '../VideoPreview'

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col border border-purple-700">
      <NavBar />
      <div className="flex flex-1 flex-row">
        <SideBar expanded={false} />
        <LivePageContent />
      </div>
    </div>
  )
}

function LivePageContent() {
  return (
    <div className="flex flex-1 gap-9 bg-[#F0FFF5] pl-9 pr-16 pt-8">
      <LeftSide />
      <RightSide />
    </div>
  )
}

function LeftSide() {
  return (
    <div className="flex flex-1 flex-col">
      <VideoPreview className="" />
      <LiveDetails />
    </div>
  )
}

function LiveDetails() {
  return (
    <div className="flex">
      <ChannelImage />
      <LiveDetailsText />
    </div>
  )
}

function ChannelImage() {
  return (
    <div className="p-4">
      <div className="size-24 rounded-full bg-[#d9d9d9]"></div>
    </div>
  )
}

function LiveDetailsText() {
  return (
    <div className="flex w-full flex-col gap-2 pt-6 text-black">
      <div className="text-xl font-bold">marucs</div>
      <div className="flex justify-between gap-2 pr-4">
        <DescriptionSection />
        <ButtonsSection />
      </div>
    </div>
  )
}

function DescriptionSection() {
  return (
    <div className="flex items-center">
      <div className="text-xl font-bold">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa Lorem amet
        consectetur adipisicing elit. Ipsa Loremasdfa.
      </div>
    </div>
  )
}

function ButtonsSection() {
  return (
    <div className="flex gap-2 ">
      <div className="size-10 rounded-full bg-[#d9d9d9] p-1 text-center text-white"></div>
      <div className="size-10 rounded-full bg-[#d9d9d9] p-1 text-center text-white"></div>
      <div className="h-10 w-28 rounded-2xl bg-[#d9d9d9] p-1 px-2 text-center text-white"></div>
    </div>
  )
}

function RightSide() {
  return <div className="mb-10 max-w-96 flex-1 rounded-2xl bg-[#d9d9d9]"></div>
}
