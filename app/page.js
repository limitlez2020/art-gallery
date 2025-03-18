"use client"

import { useState } from "react";
import Image from "next/image";
import { ArrowLeftIcon, ArrowLongLeftIcon, ArrowRightIcon, ArrowUpTrayIcon } from "@heroicons/react/24/solid"
import Link from "next/link";
import NavBar from "./components/NavBar";

export default function Home() {
  /* State for the different art categories: */
  const [currentCategory, setCurrentCategory] = useState(0);


  /* Array of categories: */
  const categories = [
    {
      image: "/abstract.jpg",
      name: "ABSTRACT",
      art_total: 2
    },

    {
      image: "/minimal_1.jpg",
      name: "MINIMALISM",
      art_total: 3
    },
  ]


  /* Function to move to prev category: */
  const handlePrev = () => {
    if (currentCategory > 0) {
      setCurrentCategory(currentCategory - 1);
    }
    else if (currentCategory === 0) {
      /* Wrap to the last category */
      setCurrentCategory(categories.length - 1);
    }
  }


  /* Function to move to next category: */
  const handleNext = () => {
    if (currentCategory < categories.length - 1) {
      setCurrentCategory(currentCategory + 1);
    }
    else if (currentCategory === categories.length - 1) {
      /* Wrap to the first category */
      setCurrentCategory(0);
    }
  }



  return (
    /* Main container: */
    <div className="flex flex-col h-full min-h-screen bg-neutral-200">
      {/* NavBar */}
      <NavBar/>

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
          <button className="flex justify-center items-center size-16 rounded-full border-black border-[1px] cursor-pointer"
                  onClick={handlePrev}>
            <ArrowLeftIcon className="size-7 hover:size-6"/>
          </button>

          {/* Gallery Images + Detail */}
          <div className="w-2/3 h-60 sm:h-132 border-[1px] border-black">
            {/* Image */}
            {/* Link to the dynamic route segment: */}
            <Link href={`/categories/${categories[currentCategory].name.toLowerCase()}`}>
              <div className="w-full h-full overflow-hidden cursor-pointer">
                <Image
                  src={categories[currentCategory].image}
                  alt={"Art Category"}
                  width={1920} height={1080}
                  className="w-fit h-fit hover:scale-105 transition-transform ease-in-out duration-700"
                />
              </div>
            </Link>
            {/* Details */}
            <div className="flex flex-col justify-between text-black/70 mt-3">
              <p className="text-2xl md:text-4xl lg:text-6xl font-semibold justify-start">{categories[currentCategory].name}</p>
              <p className="text-lg justify-start text-start">{categories[currentCategory].art_total} artworks</p>
            </div>
          </div>

          {/* Next Arrow: */}
          <button className="flex justify-center items-center size-16 rounded-full border-black border-[1px] cursor-pointer"
                  onClick={handleNext}>
            <ArrowRightIcon className="size-7 hover:size-6"/>
          </button>
        </div>


        {/* Footer: */}
        {/* <div className="flex flex-col w-full h-64 mt-56 bg-black text-neutral-100 items-center"> */}
        <div className="flex flex-col w-full h-10 mt-56 bg-black text-neutral-100 items-center justify-center">
          {/* CTA */}
          {/* <div className="flex flex-col items-center justify-center text-6xl font-semibold mt-7">
            <p className="text-neutral-500 -mb-1">CREATE & SHARE</p>
            <p>YOUR ARTWORK</p>
          </div> */}

          {/* Button: */}
          {/* <button className="flex justify-center items-center mt-4 bg-neutral-200 
                             w-fit text-black text-sm px-4 py-1 cursor-pointer">
            upload
            <ArrowUpTrayIcon className="ml-2 size-3"/>
          </button> */}
          {/* Copyright stuff: */}
          <p className="flex text-neutral-500 text-xs">2025 Art Gallery. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
