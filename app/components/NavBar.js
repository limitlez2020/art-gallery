import { ArrowUpTrayIcon } from "@heroicons/react/24/solid"
import Link from "next/link"


export default function NavBar () {
  return (
    <div className="flex justify-center self-center w-[99.5%] bg-neutral-200 p-2 rounded-md">
      {/* Container */}
      <div className="flex flex-row justify-between items-center w-[95%] gap-20">
        {/* Logo */}
        <Link href={"/"}>collart</Link>
        {/* Button */}
        <Link href={"/upload-art"}>
          <button className="flex flex-row justify-center items-center gap-2 border-[1px] border-black px-3 py-1 text-sm cursor-pointer rounded-sm">
            <p>upload</p>
            <ArrowUpTrayIcon className="size-3"/>
          </button>
        </Link>
      </div>
    </div>
  )
}