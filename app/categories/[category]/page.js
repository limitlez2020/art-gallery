"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid"
import NavBar from "@/app/components/NavBar"
import Footer from "@/app/components/Footer"


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
      <NavBar/>

      {/* Main Content Container: */}
      <div className="flex flex-col grow w-full h-full justify-center items-center mt-28">
        {/* Header: */}
        <h1 className="text-3xl font-medium">{categoryName}</h1>
        {/* Category Artworks: */}
        <div className="flex flex-col justify-center items-center w-full gap-10 mt-8">
          {/* Artwork */}
          <div className="flex flex-col justify-center items-center">
            {/* Art-frame: */}
            <div className="w-72 h-96 border-[1px] border-black -mt-3 shadow-xl">
              {/* TODO: Image: */}
              {/* <Image src={art_url} alt="Artwork" width={1920} height={1080}/> */}
            </div>
          </div>

          {/* Dividing Line: */}
          <div className="w-5/6 h-[1px] bg-neutral-400 mt-8"/>
        </div>
      </div>

      {/* Footer: */}
      <Footer/>
    </div>
  
  )
}