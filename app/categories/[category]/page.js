"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid"


export default function Category () {
  /* Get the parameter */
  const params = useParams();
  /* Acces the category name from the parameter */
  const categoryName = params.category;

  /* Test Image: TODO: art depending on the category */
  var art_url;
  if (categoryName === "abstract") {
    art_url = "/abstract_art1.jpg";
  }
  else if (categoryName === "minimalism") {
    art_url = "/minimal_art1.jpg";
  }
  else {
    /* Incase of errors: */
    art_url = "/error.jpg";
  }

  

  return (
    /* Main container: */
    <div className="flex flex-col h-full min-h-screen bg-neutral-200">
      {/* NavBar */}
      <div className="flex justify-center w-full bg-black text-white p-2">
        {/* Container */}
        <div className="flex flex-row justify-between items-center w-[95%] gap-20">
          <Link href={"/"}>collart</Link>
          <div className="flex flex-row justify-center items-center gap-2 border-[1px] border-white px-3 py-1 text-sm cursor-pointer">
            <p>upload</p>
            <ArrowUpTrayIcon className="size-3"/>
          </div>
        </div>
      </div>

      {/* Main Content Container: */}
      <div className="flex flex-col w-full h-full justify-center items-center mt-28">
        {/* Header: */}
        <h1 className="text-3xl font-medium">{categoryName}</h1>
        {/* Category Artworks: */}
        <div className="flex flex-col justify-center items-center w-full gap-10 mt-8">
          {/* Artwork */}
          <div className="flex flex-col justify-center items-center">
            {/* Dot: */}
            <div className="size-5 rounded-full border-[4px] border-black"/>
            {/* Art-frame: */}
            <div className="w-72 h-fit border-[10px] border-black -mt-3 shadow-xl">
              {/* Image: */}
              <Image src={art_url} alt="Artwork" width={1920} height={1080}/>
            </div>
          </div>

          {/* Dividing Line: */}
          <div className="w-5/6 h-[1px] bg-neutral-400 mt-8"/>
        </div>
      </div>
    </div>
  
  )
}