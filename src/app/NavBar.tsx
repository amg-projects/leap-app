export function NavBar() {
  return (
    <div className="flex flex-row bg-[#d9d9d9] text-black">
      <div className="flex flex-1 flex-row">
        <div className="ml-3 size-8 self-center rounded-xl bg-[#676767]"></div>
        <div className="ml-6 h-8 w-24 self-center rounded-2xl bg-[#676767]"></div>
      </div>
      <div className="m-3 h-8 w-[630px] rounded-2xl bg-[#676767]"></div>
      <div className="flex flex-1 flex-row-reverse">
        <div className="mr-3 h-8 w-24 self-center rounded-2xl bg-[#676767]"></div>
        <div className="mr-28 h-6 w-24 self-center rounded-2xl bg-[#676767]"></div>
      </div>
    </div>
  )
}
