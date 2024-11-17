const profiles: string[] = []

export function SideBar({ expanded }: { expanded: boolean }) {
  const sideBarWidthCollapsed = 'min-w-24'
  const sideBarWidthExpanded = 'min-w-56'

  const sideBarWidth = expanded ? sideBarWidthExpanded : sideBarWidthCollapsed

  return (
    <div className={`bg-[#d9d9d9] ${sideBarWidth} `}>
      {profiles.map((profile, idx) => (
        <div key={idx} className="text-black">
          {profile}
        </div>
      ))}
    </div>
  )
}
