"use client"

import { useState } from "react";
import Image from "next/image";
import { ArrowLeftIcon, ArrowLongLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid"

export default function Home() {

  return (
    /* Main container: */
    <div className="flex flex-col h-full min-h-screen bg-neutral-200">
      {/* NavBar */}
      <div className="flex justify-center w-full bg-black text-white p-2">
        <div className="flex flex-row justify-between items-center w-[95%] gap-20">
          <p>collart</p>
          <p className="text-sm">upload</p>
        </div>
      </div>
      {/* Main Content Container: */}
      <div className="flex flex-col w-full h-full gap-20 justify-center items-center my-20">
        {/* Header */}
        <div className="flex flex-col">
          <div className="flex flex-row gap-4 items-end">
            <h1 className="text-9xl font-medium">Art</h1>
            <p className="text-sm pb-4 text-neutral-700">home of unique art by college artist</p>
          </div>
          <h1 className="text-9xl font-medium -mt-4">Gallery</h1>
        </div>

        {/* Dividing Line: */}
        <div className="w-5/6 h-[1px] bg-black/40 mt-10"/>

        {/* Gallery: */}
        <div className="flex justify-between items-center boder-2 border-black w-5/6 h-full mt-10 gap-10">
          {/* Previous Arrow */}
          <button className="flex justify-center items-center w-10 h-10 rounded-full border-black border-[1px]">
            <ArrowLeftIcon className="size-5"/>
          </button>
          {/* Gallery Images + Detail */}
          <div className="w-2/3 h-60 sm:h-96">
            {/* Image */}
            <div className="w-full h-full overflow-hidden cursor-pointer">
              <Image
                src={"/abstract_img.jpg"}
                alt={"Abstract Art"}
                width={1920} height={1080}
                className="w-fit h-fit hover:scale-105 transition-transform ease-in-out duration-1000"
              />
            </div>
            {/* Details */}
            <div className="flex flex-row justify-between gap-14 text-black/70 mt-1">
              <p className="flex text-xs w-5/6 justify-start">Little description about the artwork we see above</p>
              <p className="flex text-xs w-1/6 justify-end">Jan. 2019</p>
            </div>
          </div>
          {/* Next Arrow: */}
          <button className="flex justify-center items-center w-10 h-10 rounded-full border-black border-[1px]">
            <ArrowRightIcon className="size-5"/>
          </button>
        </div>


        {/* Footer: */}
        <div>
          Footer
        </div>
      </div>
    </div>
  );
}
