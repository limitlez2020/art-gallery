import { ArrowUpTrayIcon } from "@heroicons/react/24/solid"
import { PercentBadgeIcon } from "@heroicons/react/24/outline"
import { SP } from "next/dist/shared/lib/utils"
import { Space_Grotesk } from "next/font/google"
import Link from "next/link"

const space_grotesk = Space_Grotesk({subsets: ["latin"]})


export default function NavBar () {
  return (
    <div className="flex justify-between items-center self-center w-[99.5%] gap-[3px] h-11 mt-[5px]">
      {/* Left */}
      <div className="flex justify-center self-center w-2/3 bg-neutral-200 p-2 h-full rounded-md">
        {/* Container */}
        <div className="flex flex-row justify-between items-center w-[95%] gap-20">
          {/* Logo */}
          <Link href={"/"} className={`${space_grotesk.className} font-medium`}>COLLART</Link>
          {/* Gallery */}
          <Link href={"/"} className="hover:font-semibold underline">gallery</Link>
        </div>
      </div>
  
      {/* Right */}
      <div className="flex bg-neutral-200 w-1/3 justify-between items-center p-2 h-full rounded-md">
        {/* Icon */}
        <PercentBadgeIcon className="size-5 fill-black"/>
        {/* Button */}
        <Link href={"/upload-art"}>
          <button className="flex flex-row justify-center items-center underline cursor-pointer hover:font-semibold">
            <p>upload art</p>
          </button>
        </Link>
      </div>

    </div>
  )
}