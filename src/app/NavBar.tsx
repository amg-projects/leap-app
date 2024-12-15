'use client'

import { ModeToggle } from '@/components/ui/mode-toggle'
import { accessHome } from './actions'

import Menu from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import { AspectRatio } from '@/components/ui/aspect-ratio'

export function NavBar({ onSideBarToggle }: { onSideBarToggle: () => void }) {
  return (
    <div className="bg-background sticky top-0 z-20 flex flex-row items-center py-3  drop-shadow-md">
      <div className="flex flex-1 flex-row">
        <ExpandButton onSideBarToggle={onSideBarToggle} />
        <Logo />
      </div>
      <SearchBar />
      <div className="flex flex-1 flex-row items-center justify-end gap-1">
        <ButtonExtra />
        <ModeToggle />
        <ButtonLogin />
      </div>
    </div>
  )
}

function ExpandButton({ onSideBarToggle }: { onSideBarToggle: () => void }) {
  return (
    <div
      className="text-primary hover:bg-secondary ml-3 size-8 flex-none rounded-xl text-center text-xl transition-all hover:scale-105 hover:cursor-pointer active:scale-95"
      onClick={() => onSideBarToggle()}
    >
      <Menu />
    </div>
  )
}

function Logo() {
  return (
    <div
      className="ml-10 flex h-8 w-28 flex-none items-center hover:cursor-pointer"
      onClick={() => accessHome()}
    >
      <AspectRatio ratio={591 / 910} className="flex w-10 items-center">
        <img
          src="/leaplogo.png"
          alt="logo"
          className="animate-bounce hover:animate-spin"
        />
      </AspectRatio>
      <AspectRatio ratio={1479 / 458} className="-ml-2 flex w-20 items-center">
        <img
          src="/leapleap.png"
          alt="logo"
          className="transition-all hover:scale-105 hover:cursor-pointer"
        />
      </AspectRatio>
    </div>
  )
}

function SearchBar() {
  return (
    <div className="bg-secondary text-foreground hidden h-8 w-[200px] flex-auto overflow-hidden text-clip rounded-2xl border border-[#00000028] lg:flex">
      <input
        type="text"
        placeholder="Search on Leap"
        className="text-foreground w-full rounded-l-full bg-transparent px-4"
      />
      <div className="text-foreground w-10 bg-[#00000017] pt-1 text-center">
        <SearchIcon />
      </div>
    </div>
  )
}

function ButtonExtra() {
  return (
    <div className="mr-6 h-6 w-24 flex-none rounded-2xl bg-[#676767] lg:mr-7 xl:mr-9 2xl:mr-20"></div>
  )
}

function ButtonLogin() {
  return (
    <div className="bg-secondary text-foreground hover:bg-accent mr-10 flex h-8 w-24 flex-none items-center rounded-2xl border border-[#00000034] hover:scale-105 hover:cursor-pointer ">
      <span className="w-full text-center">Login</span>
    </div>
  )
}
