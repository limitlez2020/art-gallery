"use client"

import { useState } from "react";
import Image from "next/image";
import { ArrowLeftIcon, ArrowLongLeftIcon, ArrowRightIcon, ArrowUpTrayIcon } from "@heroicons/react/24/solid"

export default function Home() {

  return (
    /* Main container: */
    <div className="flex flex-col h-full min-h-screen bg-neutral-200">
      {/* NavBar */}
      <div className="flex justify-center w-full bg-black text-white p-2">
        {/* Container */}
        <div className="flex flex-row justify-between items-center w-[95%] gap-20">
          <p>collart</p>
          <div className="flex flex-row justify-center items-center gap-2 border-[1px] border-white px-3 py-1 text-sm cursor-pointer">
            <p>upload</p>
            <ArrowUpTrayIcon className="size-3"/>
          </div>
        </div>
      </div>

      {/* Main Content Container: */}
      <div className="flex flex-col w-full h-full gap-20 justify-center items-center mt-20">
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
          <button className="flex justify-center items-center w-10 h-10 rounded-full border-black border-[1px] cursor-pointer">
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
          <button className="flex justify-center items-center w-10 h-10 rounded-full border-black border-[1px] cursor-pointer">
            <ArrowRightIcon className="size-5"/>
          </button>
        </div>


        {/* Footer: */}
        <div className="flex flex-col w-full h-64 mt-20 bg-black text-neutral-100 items-center">
          {/* CTA */}
          <div className="flex flex-col items-center justify-center text-6xl font-semibold mt-5">
            <p className="text-neutral-500 -mb-1">CREATE & SHARE</p>
            <p>YOUR ARTWORK</p>
          </div>
          {/* Button: */}
          <button className="flex justify-center items-center mt-4 bg-neutral-200 
                             w-fit text-black text-sm px-4 py-1 cursor-pointer">
            upload
            <ArrowUpTrayIcon className="ml-2 size-3"/>
          </button>
          {/* Copyright stuff: */}
          <p className="text-neutral-500 mt-10 text-xs">2025 Art Gallery. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
