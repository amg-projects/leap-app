import { NavBar } from './NavBar'
import { SideBar } from './SideBar'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col border border-purple-700">
      <NavBar />
      <div className="flex flex-1 flex-row">
        <SideBar />
        <Recomendations />
      </div>
    </div>
  )
}

function Recomendations() {
  return <div className="flex-1 bg-yellow-900"></div>
}
