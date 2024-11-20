'use client'
import { useState } from 'react'

export function SideBar({ expanded }: { expanded: boolean }) {
  const sideBarWidthCollapsed = 'min-w-10'
  const sideBarWidthExpanded = 'min-w-56'

  const [sideBar, setSideBar] = useState(false)
  const sideBarWidth = sideBar ? sideBarWidthExpanded : sideBarWidthCollapsed
  return (
    <>
      <button onClick={() => setSideBar(!sideBar)}>a</button>
      {sideBar.toString()}
      {sideBar ? (
        <ExpandedSideBarContent sideBarWidth={sideBarWidth} />
      ) : (
        <CollapsedSideBarContent sideBarWidth={sideBarWidth} />
      )}
    </>
  )
}
function CollapsedSideBarContent({ sideBarWidth }: { sideBarWidth: string }) {
  return (
    <div className={`bg-[#d9d9d9] ${sideBarWidth} flex flex-col text-black `}>
      <div className="flex flex-col">
        <ChannelExample12 collapsed={true} />
      </div>
      <div className="mt-20 flex flex-col">
        <ChannelExample12 collapsed={true} />
      </div>
    </div>
  )
}
function ExpandedSideBarContent({ sideBarWidth }: { sideBarWidth: string }) {
  return (
    <div className={`bg-[#d9d9d9] ${sideBarWidth} flex flex-col text-black `}>
      {/* <button onClick={() => setSideBar(!sideBar)}>a</button> */}
      {/* {sideBar.toString()} */}
      <div className="flex flex-col">
        <div>FOLLOWED CHANNELS</div>
        <ChannelExample12 collapsed={false} />
      </div>
      <div className="mt-20 flex flex-col">
        RECOMMENDED CHANNELS
        <ChannelExample12 collapsed={false} />
      </div>
    </div>
  )
}
function ChannelExample12({ collapsed }: { collapsed: boolean }) {
  return (
    <>
      <ChannelExample collapsed={collapsed} />
      <ChannelExample collapsed={collapsed} />
      <ChannelExample collapsed={collapsed} />
      <ChannelExample collapsed={collapsed} />
      <ChannelExample collapsed={collapsed} />
      <ChannelExample collapsed={collapsed} />
      <ChannelExample collapsed={collapsed} />
      <ChannelExample collapsed={collapsed} />
      <ChannelExample collapsed={collapsed} />
      <ChannelExample collapsed={collapsed} />
      <ChannelExample collapsed={collapsed} />
      <ChannelExample collapsed={collapsed} />
    </>
  )
}

function ChannelExample({ collapsed }: { collapsed: boolean }) {
  const className = collapsed ? 'hidden' : ''
  return (
    <div className="flex flex-row items-center border border-black">
      <div className="m-1 size-8 rounded-full bg-black"></div>
      <div className={`ml-1 flex-1 ${className}`}>
        <div className="flex flex-row items-center">
          <div className="flex-1">JOAOZINHOGG</div>
          <div className="ml-2 mr-1 text-xs">🔴​14K</div>
        </div>
        <div className="text-xs">ROBLOX</div>
      </div>
    </div>
  )
}
