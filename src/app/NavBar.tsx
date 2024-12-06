'use client'

import { ModeToggle } from '@/components/ui/mode-toggle'
import { accessHome } from './actions'

import Menu from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'

export function NavBar({ onSideBarToggle }: { onSideBarToggle: () => void }) {
  return (
    <div className="sticky top-0 z-20 flex flex-row items-center bg-background py-3  drop-shadow-md">
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
      className="ml-3 size-8 flex-none rounded-xl text-center text-xl text-primary transition-all hover:scale-105 hover:cursor-pointer hover:bg-secondary active:scale-95"
      onClick={() => onSideBarToggle()}
    >
      <Menu />
    </div>
  )
}

function Logo() {
  return (
    <div
      className="ml-10 h-8 w-24 flex-none rounded-2xl bg-[#676767]"
      onClick={() => accessHome()}
    ></div>
  )
}

function SearchBar() {
  return (
    <div className="hidden h-8 w-[200px] flex-auto overflow-hidden text-clip rounded-2xl border border-[#00000028] bg-secondary text-foreground lg:flex">
      <input
        type="text"
        placeholder="Search on Leap"
        className="w-full rounded-l-full bg-transparent px-4 text-foreground"
      />
      <div className="w-10 bg-[#00000017] pt-1 text-center text-foreground">
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
    <div className="mr-10 flex h-8 w-24 flex-none items-center rounded-2xl border border-[#00000034] bg-secondary text-foreground hover:scale-105 hover:cursor-pointer hover:bg-accent ">
      <span className="w-full text-center">Login</span>
    </div>
  )
}
