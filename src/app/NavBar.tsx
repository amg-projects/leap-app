export function NavBar({ onSideBarToggle }: { onSideBarToggle: () => void }) {
  return (
    <div className="flex flex-row items-center bg-[#d9d9d9] py-3 text-black">
      <div className="flex flex-1 flex-row">
        <div
          className="ml-3 size-8 flex-none rounded-xl bg-[#676767]"
          onClick={() => onSideBarToggle()}
        />
        <div className="ml-10 h-8 w-24 flex-none rounded-2xl bg-[#676767]"></div>
      </div>
      <div className=" hidden h-8 w-[200px] flex-auto rounded-2xl bg-[#676767] lg:flex"></div>
      <div className="flex flex-1 flex-row items-center justify-end">
        <div className="mr-6 h-6 w-24 flex-none rounded-2xl bg-[#676767] lg:mr-7 xl:mr-9 2xl:mr-20"></div>
        <div className="mr-10 h-8 w-24 flex-none rounded-2xl bg-[#676767]"></div>
      </div>
    </div>
  )
}
