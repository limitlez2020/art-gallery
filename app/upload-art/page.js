"use client"

import { useRef, useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { FileUpload } from "@/components/ui/file-upload";
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from "@/components/ui/select"
import { db, storage } from "@/firebase.js"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import Link from "next/link";
import { Space_Grotesk } from "next/font/google";


const space_grotesk = Space_Grotesk({subsets: ["latin"]})


export default function UploadArt () {

  /* States for the form elements: */
  const [artistName, setArtistName] = useState("")
  const [artworkName, setArtworkName] = useState("")
  const [artCategory, setArtCategory] = useState("")
  const [artworkStory, setArtworkStory] = useState("")
  const [artworkImage, setArtworkImage] = useState(null)
  const [uploading, setUploading] = useState(false) /* Track if form is uploading to database */
  const [submitted, setSubmitted] = useState(false) /* Track if form is submitted */


  /* Function to upload artwork image to the firebase database: */
  const uploadImage = async (file) => {
    /* Make sure file exists: */
    if (!file) { return null }

    try {
      /* Create a reference to the storage: */
      const storageRef = ref(storage, `artworks/${file.name}`);
      /* Upload the file to the storage: */
      await uploadBytes(storageRef, file);
      /* Get the download URL of the uploaded file: */
      const imageURL = await getDownloadURL(storageRef);
      return imageURL;
    }
    catch (error) {
      console.error("Error uploading image: ", error)
      return null;
    }
  }


  /* Function to get all the data submitted from the form
   * and upload them all to the database: */
  const handleSubmit = async (event) => {
    /* Prevent page reload */
    event.preventDefault();
    setUploading(true);

    try {
      // TODO: Have to do image coz they want to charge me for storage - use cloudinary
      // const imageUrl = await uploadImage(artworkImage)
  
      /* Turn data gotten from the formelements into one object */
      const artworkData = {
        artistName,
        artworkName,
        artCategory,
        artworkStory,
        // TODO: uncomment below
        // imageUrl,
        timestamp: serverTimestamp()
      };

      /* Save the artwork data to the database */
      await addDoc(collection(db, "artworks"), artworkData);

      /* Update submit state */
      setSubmitted(true)
    }
    catch (error) {
      console.error("Error submitting artwork: ", error)
    }
    finally {
      setUploading(false);
    }
  }





  return (
    <div className="flex flex-col h-full min-h-screen bg-black">
      <NavBar/>
      
      {/* Form Container */}
      <div className="flex flex-grow bg-neutral-200 py-20 mt-1 w-[99.5%] justify-center items-center self-center rounded-md">
        {submitted ? (
          /* Display message that the artwork has been submitted */
          <div className={`${space_grotesk.className} flex flex-col bg-lack items-center justify-center`}>
            <p className="text-7xl font-semibold leading-12">artwork</p>
            <p className="text-7xl font-semibold">uploaded</p>
            <Link className="mt-4 flex flex-row justify-center items-center gap-1" href={`/gallery/${artCategory}`}>
              <p className="border-b-[1px] border-black/25 text-sm hover:scale-[100.5%]">check gallery to see your artwork</p>
              <p>🖼️</p>
            </Link>
          </div>
        ) : (
          /* Form */
          <form className="flex flex-col w-[95%] items-center py-8 mb-10"
                onSubmit={handleSubmit}>
            {/* Header: */}
            <div className="flex flex-col items-center justify- text-center">
              <p className={`${space_grotesk.className} text-4xl sm:text-6xl font-medium`}>Upload Artwork</p>
              <p className="font-normal text-neutral-600 text-sm sm:text-base">Fill out the form below to upload your artwork.</p>
            </div>

            {/* Upload area */}
            <div className="flex flex-col p-2 mt-24 w-5/6 items-center justify-center border-[2px] border-black border-dotted">
              <FileUpload onChange={(file) => setArtworkImage(file)}/>
            </div>

            {/* Artist and artwork details: */}
            <div className="flex flex-col mt-4 w-5/6 gap-4 text-sm">
              {/* Artist Name: */}
              <div className="flex flex-col w-full">
                <p>Name</p>
                <input
                  required 
                  type="text" 
                  className="w-full border-[1px] border-black p-2 rounded-sm"
                  placeholder="Type your name"
                  value={artistName}
                  onChange={(e) => {setArtistName(e.target.value)}}
                />
              </div>

              {/* Artwork Name: */}
              <div className="flex flex-col w-full">
                <p className="text-sm">Artwork Name</p>
                <input
                  required 
                  type="text" 
                  className="w-full border-[1px] border-black p-2 rounded-sm"
                  placeholder="Type the name of your artwork"
                  value={artworkName}
                  onChange={(e) => {setArtworkName(e.target.value)}}
                />
              </div>

              {/* Artwork Category: */}
              <div className="flex flex-col w-full">
                <p>Artwork Category</p>
                <Select onValueChange={setArtCategory}>
                  <SelectTrigger className="w-full rounded-sm border-black">
                    <SelectValue placeholder="Select an art category" />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-300">
                    <SelectGroup>
                      <SelectLabel className="text-xs text-black/70">category</SelectLabel>
                      <SelectItem value="abstract" className="text-sm">Abstract</SelectItem>
                      <SelectItem value="minimalism" className="text-sm">Minimalism</SelectItem>
                      <SelectItem value="renaissance" className="text-sm">Renaissance</SelectItem>
                      <SelectItem value="surrealism" className="text-sm">Surrealism</SelectItem>
                      <SelectItem value="ai" className="text-sm">AI</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>


              {/* Story behind artwork */}
              <div className="flex flex-col w-full">
                <p>Artwork Story</p>
                <textarea
                  required
                  className="text-w-full border-[1px] h-20 border-black p-2 rounded-sm"
                  placeholder="Story behind your artwork"
                  value={artworkStory}
                  onChange={(e) => setArtworkStory(e.target.value)}
                />
              </div>
            </div>

            {/* Submit the form */}
            <button className={` ${space_grotesk.className} flex self-center justify-center bg-neutral-800 text-white mt-5 py-2 px-7 text-sm cursor-pointer`}>
              {uploading ? (
                <p>Uploading...</p>
              ) : (
                <div className="flex flex-row justify-center items-center gap-2">
                  Submit
                </div>
              )}
            </button>

          </form>
        )}

      
      </div>

      <Footer/>
    </div>
  )
}