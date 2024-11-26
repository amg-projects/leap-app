type ExpandedProps = {
  expanded: boolean
}

export function SideBar(props: ExpandedProps) {
  if (props.expanded) {
    return <ExpandedSideBarContent />
  } else {
    return <CollapsedSideBarContent />
  }
}

function CollapsedSideBarContent() {
  return (
    <div className="flex min-w-10 flex-col bg-[#d9d9d9] text-black">
      <div className="flex flex-col">
        <ChannelExample12 expanded={false} />
      </div>
      <div className="mt-20 flex flex-col">
        <ChannelExample12 expanded={false} />
      </div>
    </div>
  )
}

function ExpandedSideBarContent() {
  return (
    <div className="flex min-w-56 flex-col bg-[#d9d9d9] text-black">
      <div className="flex flex-col">
        <div>FOLLOWED CHANNELS</div>
        <ChannelExample12 expanded={true} />
      </div>
      <div className="mt-20 flex flex-col">
        <div>RECOMMENDED CHANNELS</div>
        <ChannelExample12 expanded={true} />
      </div>
    </div>
  )
}

function ChannelExample12(props: ExpandedProps) {
  return (
    <>
      <ChannelExample expanded={props.expanded} />
      <ChannelExample expanded={props.expanded} />
      <ChannelExample expanded={props.expanded} />
      <ChannelExample expanded={props.expanded} />
      <ChannelExample expanded={props.expanded} />
      <ChannelExample expanded={props.expanded} />
      <ChannelExample expanded={props.expanded} />
      <ChannelExample expanded={props.expanded} />
      <ChannelExample expanded={props.expanded} />
      <ChannelExample expanded={props.expanded} />
      <ChannelExample expanded={props.expanded} />
      <ChannelExample expanded={props.expanded} />
    </>
  )
}

function ChannelExample(props: ExpandedProps) {
  const className = props.expanded ? '' : 'hidden'
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
