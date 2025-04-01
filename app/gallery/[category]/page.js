"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"
import NavBar from "@/app/components/NavBar"
import Footer from "@/app/components/Footer"
import { Space_Grotesk } from "next/font/google"
import { createBrowserClient } from "@supabase/ssr"


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


    /***************************************/
    // // const supabase = await createClient();
    // const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

    // /* Get all the artworks for this specifc category and in
    //  * descending order to ensure the newest artworks show first: */
    // const { data, error } = await supabase
    //   .from("artworks")
    //   .select("*") /* select all columns */
    //   .eq("artCategory", categoryName) /* filter by category */
    //   .order("created_at", { ascending: false })

    // /* Error handling */
    // if (error) {
    //   console.error("Error fetching artworks: ", error);
    //   return;
    // }

    // /* Set the data - array of artworks - to the artworks state */
    // setArtworks(data);
    /***************************************/
  }
  

  /* Get data from supabase database for the specific category */
  useEffect(() => {
    async function fetchArtworks() {
      try {
        const result = await fetch(`/api/artworks/${categoryName}`);
        if (!result.ok) {
          console.error("Failed to fetch artworks");
        }
        const data = await result.json();
        setArtworks(data.artworks);
      }
      catch (error) {
        console.error("Error fetching artworks: ", error);
      }
    }
    
    /* Call the function to fetch the artworks */
    fetchArtworks();
  }, [categoryName]);



  // TODO: Might delete this
  /* Use effect to display all artworks */
  useEffect(() => {
    setArtworks([]); /* Clear existing data before fetching new ones */
  }, []); /* Re-fetch only when categoryName changes */



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


  /* Function to convert Supabase timestamp to a Date object: */
  const getDate = (timestamp) => {
    if (!timestamp) {
      return "no date";
    }
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  }


  

  return (
    /* Main container: */
    <div className="flex flex-col h-full min-h-screen bg-black">
      {/* NavBar */}
      <NavBar/>

      {/* Main Content Container: */}
      <div className="flex flex-col bg-neutral-200 grow w-[99.5%] h-full self-center justify-center items-center rounded-md mt-1 pt-24">
        {/* Header: */}
        <h1 className={`${space_grotesk.className} text-5xl sm:text-7xl font-medium uppercase`}>{categoryName}</h1>
        {artworks.length > 0 ? (
          /* Artwork: */
          <div className="flex flex-col justify-center items-center w-4/6 gap-10 mt-40">
            {/* Art number */}
            <p>{currentArtworkIndex + 1} / {artworks.length}</p>
            {/* Image */}
            <div className="w-full h-80 md:h-120 lg:h-140 overflow-hidden border-[1px] border-black -mt-3 shadow-xl">
              {/* TODO: Image: */}
              <Image src={artworks[currentArtworkIndex].imageURL} alt="Artwork" width={1920} height={1080}/>
            </div>

            {/* Details */}
            <div className="flex flex-col w-full mt-5 gap-3">
              {/* Top */}
              <div className="flex flex-row w-full justify-between gap-2">
                <p className="w-3/5 text-xl sm:text-2xl lowercase font-semibold">{artworks[currentArtworkIndex].artworkName}</p>
                <div className="flex flex-col w-2/5 text-black/85 text-sm text-end">
                  <p>{getDate(artworks[currentArtworkIndex].created_at)}</p>
                  <p>{artworks[currentArtworkIndex].artCategory}</p>
                  <p>by: {artworks[currentArtworkIndex].artistName}</p>
                </div>
              </div>

              {/* Dividing Line: */}
              <div className="w-full h-[1px] bg-neutral-400"/>

              {/* Bottom */}
              <div className="flex w-4/5 self-center items-center justify-center">
                <p className="text-center text-xs text-black/85">&quot;{artworks[currentArtworkIndex].artworkStory}&quot;</p>
              </div>
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