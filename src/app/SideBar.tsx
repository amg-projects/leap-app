type SideBarProps = {
  expanded: boolean
}

export function SideBar(props: SideBarProps) {
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
        <ChannelExampleN expanded={false} exampleCount={12} />
      </div>
      <div className="mt-20 flex flex-col">
        <ChannelExampleN expanded={false} exampleCount={12} />
      </div>
    </div>
  )
}

function ExpandedSideBarContent() {
  return (
    <div className="flex min-w-56 flex-col bg-[#d9d9d9] text-black">
      <div className="flex flex-col">
        <div>FOLLOWED CHANNELS</div>
        <ChannelExampleN expanded={true} exampleCount={12} />
      </div>
      <div className="mt-20 flex flex-col">
        <div>RECOMMENDED CHANNELS</div>
        <ChannelExampleN expanded={true} exampleCount={12} />
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
        expanded={props.expanded}
        name={'Channel Name' + lastID++}
        liveCount="1.2k"
        category="Just Chatting"
      />,
    )
  }

  return <>{channels}</>
}

type ChannelExampleProps = {
  expanded: boolean
  name: string
  liveCount: string
  category: string
}

function ChannelExample(props: ChannelExampleProps) {
  const className = props.expanded ? '' : 'hidden'
  return (
    <div className="flex flex-row items-center ">
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
