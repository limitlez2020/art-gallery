"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"
import NavBar from "@/app/components/NavBar"
import Footer from "@/app/components/Footer"
import { db } from "@/firebase"
import  { collection, query, where, getDoc, getDocs } from "firebase/firestore"
import { Space_Grotesk } from "next/font/google"
import { time } from "framer-motion"


const space_grotesk = Space_Grotesk({subsets: ["latin"]})



export default function Category () {
  /* Array of all the artwork objects for this catgeory */
  const [artworks, setArtworks] = useState([]) 
  /* Keep track of current artwork being displayed */
  const [currentArtworkIndex, setCurrentArtworkIndex] = useState(0)
  
  /* Get the parameter */
  const params = useParams();
  /* Acces the category name from the parameter */
  const categoryName = params.category;


  /* Get data from firebase database for the specific category */
  const getArtworks = async() => {
    /* 1. Query to get all the documents where their artCategory field is minimalism */
    const q = query(collection(db, "artworks"), where("artCategory", "==", categoryName));
    /* 2. Get all such documents */
    const querySnapshot = await getDocs(q)
    /* 3. Get the data from the documents into an array */
    const artworksArray = querySnapshot.docs.map((doc) => doc.data());
    /* 4. Set the artworks array to the state */
    setArtworks(artworksArray)
  }



  /* Use effect to display all artworks */
  useEffect(() => {
    setArtworks([]); /* Clear existing data before fetching new ones */
    getArtworks();
  }, [categoryName]); /* Re-fetch only when categoryName changes */



  /* Function to go to next artwork in the array of artworks */
  function nextArtwork () {
    /* When at end -- Wrap to begining */
    if (currentArtworkIndex === artworks.length - 1) {
      setCurrentArtworkIndex(0)
    }
    else {
      setCurrentArtworkIndex(currentArtworkIndex + 1)
    }
  }
  

  /* Function to go to previous artwork in the array of artworks */
  function prevArtwork () {
    /* When at beginning -- Wrap to end */
    if (currentArtworkIndex === 0) {
      setCurrentArtworkIndex(artworks.length - 1)
    }
    else {
      setCurrentArtworkIndex(currentArtworkIndex - 1)
    }
  }


  /* Function to convert Firestor timestamp to a Date object: */
  const getDate = (time) => {
    const date = time.toDate();
    const formattedDate = date ? date.toLocaleDateString() : "no date";
    return formattedDate;
  }


  

  return (
    /* Main container: */
    <div className="flex flex-col h-full min-h-screen bg-black">
      {/* NavBar */}
      <NavBar/>

      {/* Main Content Container: */}
      <div className="flex flex-col bg-neutral-200 grow w-[99.5%] h-full self-center justify-center items-center rounded-md mt-1 pt-24">
        {/* Header: */}
        <h1 className={`${space_grotesk.className} text-7xl font-medium uppercase`}>{categoryName}</h1>
        {artworks.length > 0 ? (
          /* Artwork: */
          <div className="flex flex-col justify-center items-center w-4/6 gap-10 mt-40">
            {/* Art number */}
            <p>{currentArtworkIndex + 1} / {artworks.length}</p>
            {/* Image */}
            <div className="w-full h-80 md:h-120 lg:h-140 overflow-hidden border-[1px] border-black -mt-3 shadow-xl">
              {/* TODO: Image: */}
              {/* <Image src={art_url} alt="Artwork" width={1920} height={1080}/> */}
            </div>

            {/* Details */}
            <div className="flex flex-col w-full mt-5 gap-3">
              {/* Top */}
              <div className="flex flex-row w-full justify-between gap-10">
                <p className="text-2xl lowercase font-semibold">{artworks[currentArtworkIndex].artworkName}</p>
                <div className="flex flex-col text-black/85 text-sm">
                  <p>date: {getDate(artworks[currentArtworkIndex].timestamp)}</p>
                  <p>category: {artworks[currentArtworkIndex].artCategory}</p>
                  <p>by: {artworks[currentArtworkIndex].artistName}</p>
                </div>
              </div>

              {/* Dividing Line: */}
              <div className="w-full h-[1px] bg-neutral-400"/>

              {/* Bottom */}
              <p className="flex self-center text-sm text-black/85">"{artworks[currentArtworkIndex].artworkStory}"</p>
            </div>


            {/* Button Controls */}
            <div className="flex flex-row w-full justify-between mt-6 mb-32">
              <button className="bg-black p-2 cursor-pointer rounded-sm" onClick={prevArtwork}>
                <ChevronLeftIcon className="size-7 text-white"/>
              </button>
              <button className="bg-black p-2 cursor-pointer rounded-sm" onClick={nextArtwork}>
                <ChevronRightIcon className="size-7 text-white"/>
              </button>
            </div>
          </div>

        ) : (
          <p>Loading artworks...</p>
        )}

      </div>

      {/* Footer: */}
      <Footer/>
    </div>
  
  )
}