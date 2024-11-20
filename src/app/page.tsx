import { NavBar } from './NavBar'
import { SideBar } from './SideBar'
import { VideoPreview } from './VideoPreview'

// TODO: Próximos passos
// NavBar Sticky
// Títulos de categorias

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col border border-purple-700">
      <NavBar />
      <div className="flex flex-1 flex-row">
        <SideBar expanded={true} />
        <Recomendations />
      </div>
    </div>
  )
}

function Recomendations() {
  return (
    <div className="flex-1 bg-white pt-20 text-black">
      <AfilliateRecomendations />
      <hr className="my-4" />
      <CategoryRecomendations category="youwilllike" />
      <hr className="my-4" />
      <CategoryRecomendations category="fps" />
      <hr className="my-4" />
      <CategoryRecomendations category="irl" />
    </div>
  )
}

function AfilliateRecomendations() {
  return (
    <div className="flex grid-flow-col grid-rows-1">
      <div className="flex flex-1 items-center">
        <FourVideosGrid />
      </div>
      <div className="flex flex-1 items-center">
        <div className="h-fit flex-1">
          <VideoPreview />
        </div>
      </div>
      <div className="flex flex-1 items-center">
        <FourVideosGrid />
      </div>
    </div>
  )
}

function FourVideosGrid() {
  return (
    <div className="grid flex-1 grid-flow-col grid-rows-2 flex-col gap-1 p-2 lg:gap-4 lg:p-4">
      <VideoPreview />
      <VideoPreview />
      <VideoPreview />
      <VideoPreview />
    </div>
  )
}

function CategoryRecomendations({ category }: { category: string }) {
  const COLS = 6
  const ROWS = 2
  const VIDEO_COUNT = COLS * ROWS

  // eslint-disable-next-line prefer-spread
  const videos = Array.apply(null, Array(VIDEO_COUNT)).map((_, idx) => (
    <VideoPreview key={idx} />
  ))

  return (
    <div className="flex flex-col">
      <h1>{category}</h1>
      <div className="grid flex-1 grid-flow-col grid-rows-2 items-center gap-2 px-12 lg:px-24">
        {videos}
      </div>
    </div>
  )
}
