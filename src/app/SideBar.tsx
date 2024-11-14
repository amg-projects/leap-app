const profiles: string[] = []

export function SideBar() {
  return (
    <div className="min-w-56 bg-[#d9d9d9]">
      {profiles.map((profile, idx) => (
        <div key={idx} className="text-black">
          {profile}
        </div>
      ))}
    </div>
  )
}
