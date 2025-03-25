"use client"

import { useState } from "react";
import Image from "next/image";
import { ArrowLeftIcon, ArrowLongLeftIcon, ArrowRightIcon, ArrowUpTrayIcon } from "@heroicons/react/24/solid"
import Link from "next/link";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Space_Grotesk } from "next/font/google";
import { Orbitron } from "next/font/google";
import { Syne } from "next/font/google";

const space_grotesk = Space_Grotesk({subsets: ["latin"]})
const orbitron = Orbitron({subsets: ["latin"]})
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
    <div className="flex flex-col h-full min-h-screen bg-neutral-200">
      {/* NavBar */}
      <NavBar/>

      {/* Main Content Container: */}
      <div className="flex flex-col w-full h-full justify-center items-center mt-20">
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
        <div className={`${syne.className} flex flex-row w-5/6 items-center mt-24 gap-10`}>
          <p className="whitespace-nowrap">March 3</p>
          <div className="w-full h-[1px] bg-black/40"/>
          <p>2025</p>
        </div>


        {/* Art of the day: */}
        <div className="flex justify-center items-center w-5/6 h-full mt-2 mb-24">

          {/* Image + Detail */}
          <div className="w-full h-60 border-[1px] border-black">
            {/* Image */}
            <div className="w-full h-full overflow-hidden cursor-pointer">
              <Image
                src={"/art-of-day-placeholder.jpg"}
                alt={"Art Category"}
                width={1920} height={60}
                className="w-fit h-fill hover:scale-105 transition-transform ease-in-out duration-700"
                priority={true}
              />
            </div>
            {/* Details */}
            <div className={`${syne.className} flex flex-col justify-between text-black/70 mt-3`}>
              <p className="text-xl font-semibold justify-start">hand of God</p>
              <p className="-mt-1 text-sm justify-start text-start">by Equavious</p>
            </div>
          </div>
        </div>


        <Footer/>
      </div>
    </div>
  );
}
