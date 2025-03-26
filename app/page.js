"use client"

import { useState } from "react";
import Image from "next/image";
import { ArrowLeftIcon, ArrowLongLeftIcon, ArrowRightIcon, ArrowUpTrayIcon } from "@heroicons/react/24/solid"
import { ArrowLongRightIcon } from "@heroicons/react/24/outline"
import Link from "next/link";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Space_Grotesk } from "next/font/google";
import { Orbitron } from "next/font/google";
import { Space_Mono } from "next/font/google";
import { Syne } from "next/font/google";

const space_grotesk = Space_Grotesk({subsets: ["latin"]})
const orbitron = Orbitron({subsets: ["latin"]})
const space_mono = Space_Mono({subsets: ["latin"], weight: ["400", "700"]})
const syne = Syne({subsets: ["latin"]})


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
      image: "/minimal.jpg",
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
    <div className="flex flex-col h-full min-h-screen bg-black">
      {/* NavBar */}
      <NavBar/>

      {/* Main Content Container: */}
      <div className="bg-neutral-200 flex flex-col w-[99.5%] h-full self-center justify-center items-center mt-1 pt-20 rounded-md">
        {/* Header Container */}
        <div className="flex flex-col w-full items-center">
          {/* Header */}
          <div className="flex flex-col items-start">
            <div className="flex flex-row gap-4 items-end">
              <h1 className={`${space_grotesk.className} text-7xl sm:text-9xl font-medium`}>Art</h1>
              {/* Subheading: PC + Tablet */}
              <p className="hidden sm:block text-sm pb-4 text-neutral-700">home of unique art by college artist</p>
            </div>
            <h1 className={`${space_grotesk.className} text-7xl sm:text-9xl font-medium -mt-4`}>Gallery</h1>
          </div>
          {/* Subheading: Phone*/}
          <p className="sm:hidden block text-xs pt-2 text-neutral-700">home of unique art by college artist</p>
        </div>


        {/* Dividing Line: */}
        {/* TODO: have the upload date of the art of the day here */}
        <div className="flex flex-row w-5/6 items-center mt-24 gap-10">
          <p className="whitespace-nowrap">March 3</p>
          <div className="w-full h-[1px] bg-black/40"/>
          <p>2025</p>
        </div>


        {/* TODO: Get real art from database */}
        {/* Art of the day: */}
        <div className="flex flex-col justify-center items-center w-5/6 h-full mt-2">

          {/* Image + Detail */}
          <div className="w-full flex flex-col">
            {/* Image */}
            <div className="w-full h-80 md:h-120 lg:h-140 overflow-hidden cursor-pointer">
              <Image
                src={"/art-of-day-placeholder.jpg"}
                alt={"Art Category"}
                width={1920} height={1080}
                className="w-[100%] h-[100%] object-cover hover:scale-105 transition-transform ease-in-out duration-700"
                priority={true}
              />
            </div>
            {/* Details */}
            <div className="flex flex-row justify-between items-end text-black/70 mt-3 gap-3">
              {/* Title & Artist */}
              <div className="flex flex-col">
                <p className="text-xl md:text-2xl font-semibold justify-start">hand of man</p>
                <p className="-mt-1 text-sm justify-start text-start">by Equavious</p>
                {/* Genre */}
                <p className="-mt-1 text-sm justify-start text-start">genre: classical</p>
              </div>

              <div className="flex flex-col">
                {/* Button to view artwork */}
                <button className={`${space_grotesk.className} flex flex-row border-black border-b-[1px] hover:text-black justify-center items-center gap-3 cursor-pointer`}>
                  <p className="text-base md:text-lg">view artwork</p>
                  <ArrowLongRightIcon className="size-7 stroke-[0.6]"/>
                </button>
              </div>
            </div>
          </div>
        </div>


        <div className="flex flex-col mt-34 mb-34 w-5/6 border-b-[1px] border-black"/>


        {/* Categories: */}
        <div className="flex flex-col w-5/6 h-full mb-24 gap-3">
          {/* Header: */}
          <p className={`${space_grotesk.className} self-center text-xl font-medium mb-3`}>CATEGORIES</p>
          
          {/* Abstract */}
          <button className="flex flex-row items-center justify-between gap-5 p-4 px-6 rounded-full border-[1px] border-black  cursor-pointer hover:bg-black/85 hover:text-white">
            <p className="text-4xl">abstract</p>
            <ArrowLongRightIcon className="size-10 stroke-1"/>
          </button>

          {/* Minimalism */}
          <button className="flex flex-row items-center justify-between gap-5 p-4 px-6 rounded-full border-[1px] border-black cursor-pointer hover:bg-black/85 hover:text-white">
            <p className="text-4xl">minimalism</p>
            <ArrowLongRightIcon className="size-10 stroke-1"/>
          </button>

          {/* Realism */}
          <button className="flex flex-row items-center justify-between gap-5 p-4 px-6 rounded-full border-[1px] border-black cursor-pointer hover:bg-black/85 hover:text-white">
            <p className="text-4xl">realism</p>
            <ArrowLongRightIcon className="size-10 stroke-1"/>
          </button>

          {/* Surrealism */}
          <button className="flex flex-row items-center justify-between gap-5 p-4 px-6 rounded-full border-[1px] border-black cursor-pointer hover:bg-black/85 hover:text-white">
            <p className="text-4xl">surrealism</p>
            <ArrowLongRightIcon className="size-10 stroke-1"/>
          </button>

          {/* AI */}
          <button className="flex flex-row items-center justify-between gap-5 p-4 px-6 rounded-full border-[1px] border-black cursor-pointer hover:bg-black/85 hover:text-white">
            <p className="text-4xl">ai</p>
            <ArrowLongRightIcon className="size-10 stroke-1"/>
          </button>

        </div>


        <Footer/>
      </div>
    </div>
  );
}
