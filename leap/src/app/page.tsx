import { NavBar } from "./NavBar";
import { SideBar } from "./SideBar";

export default function Home() {
  return (
    <div className="border border-purple-700 min-h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-row flex-1">
        <SideBar />
        <Recomendations />
      </div>
    </div>
  );
}

function Recomendations() {
  return (
    <div className="flex-1 bg-yellow-900">
    </div>
  )
}
