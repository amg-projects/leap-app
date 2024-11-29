import { accessHome } from './actions'

export function NavBar({ onSideBarToggle }: { onSideBarToggle: () => void }) {
  return (
    <div className="flex flex-row items-center  bg-white py-3 text-black  drop-shadow-md">
      <div className="flex flex-1 flex-row">
        <ExpandButton onSideBarToggle={onSideBarToggle} />
        <Logo />
      </div>
      <SearchBar />
      <div className="flex flex-1 flex-row items-center justify-end">
        <ButtonExtra />
        <ButtonLogin />
      </div>
    </div>
  )
}

function ExpandButton({ onSideBarToggle }: { onSideBarToggle: () => void }) {
  return (
    <div
      className="ml-3 size-8 flex-none rounded-xl bg-[#676767]"
      onClick={() => onSideBarToggle()}
    >
      Expand
    </div>
  )
}

function Logo() {
  return (
    <div
      className="ml-10 h-8 w-24 flex-none rounded-2xl bg-[#676767]"
      onClick={() => accessHome()}
    >
      Logo
    </div>
  )
}

function SearchBar() {
  return (
    <div className="hidden h-8 w-[200px] flex-auto overflow-hidden text-clip rounded-2xl bg-[#F0FFF5] text-white lg:flex">
      <input type="text" className="w-full bg-transparent px-4 text-black" />
      <div className="w-10 bg-[#00000017] pt-1 text-center">🔍</div>
    </div>
  )
}

function ButtonExtra() {
  return (
    <div className="mr-6 h-6 w-24 flex-none rounded-2xl bg-[#676767] lg:mr-7 xl:mr-9 2xl:mr-20">
      Btn Extra
    </div>
  )
}

function ButtonLogin() {
  return (
    <div className="mr-10 h-8 w-24 flex-none rounded-2xl bg-[#676767]">
      {' '}
      Login{' '}
    </div>
  )
}
