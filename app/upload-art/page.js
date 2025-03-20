"use client"

import { useRef, useState } from "react";
import { ArrowDownTrayIcon, ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { FileUpload } from "@/components/ui/file-upload";
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from "@/components/ui/select"
import { db, storage } from "@/firebase.js"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function UploadArt () {

  /* States for the form elements: */
  const [artistName, setArtistName] = useState("")
  const [artworkName, setArtworkName] = useState("")
  const [artCategory, setArtCategory] = useState("")
  const [artworkStory, setArtworkStory] = useState("")
  const [artworkImage, setArtworkImage] = useState(null)
  const [uploading, setUploading] = useState(false) /* Track if form is submitting */


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
      // TODO: Have to do image coz they want to charge me for storage
      // const imageUrl = await uploadImage(artworkImage)
  
      /* Turn data gotten from the formelements into one object */
      const artworkData = {
        artistName,
        artworkName,
        artCategory,
        artworkStory,
        // TODO: uncomment below
        // imageUrl,
      };
  
      // TODO: test - print the data
      console.log(artworkData)

      /* Save the artwork data to the database */
      await addDoc(collection(db, "artworks"), artworkData);
      console.log("Artwork added to database", artworkData);
    }
    catch (error) {
      console.error("Error submitting artwork: ", error)
    }
    finally {
      setUploading(false);
    }
  }


  return (
    <div className="flex flex-col h-full min-h-screen bg-neutral-200">
      <NavBar/>
      
      {/* Form Container */}
      <div className="flex my-20 w-[93%] justify-center items-center self-center">
        {/* Form */}
        <form className="flex flex-col w-[90%] border-[1px] items-center bg-white py-8"
              onSubmit={handleSubmit}>
          {/* Header: */}
          <div className="flex flex-col items-center">
            <p className="text-base font-medium">Upload Artwork</p>
            <p
            className="font-normal text-neutral-400 dark:text-neutral-400 text-xs text-center">
            Drag or drop your files here or click to upload
          </p>
          </div>

          {/* Upload area */}
          <div className="flex flex-col p-2 mt-5 w-5/6 items-center justify-center border-[1px] border-neutral-300 border-dotted">
            <FileUpload onChange={(file) => setArtworkImage(file)}/>
          </div>

          {/* Artist and artwork details: */}
          <div className="flex flex-col mt-5 w-5/6 gap-4">
            {/* Artist Name: */}
            <div className="flex flex-col w-full">
              <p className="text-xs">Name</p>
              <input
                required 
                type="text" 
                className="w-full border-[1px] border-neutral-200 text-xs p-2"
                placeholder="Type your name"
                value={artistName}
                onChange={(e) => {setArtistName(e.target.value)}}
              />
            </div>

            {/* Artwork Name: */}
            <div className="flex flex-col w-full">
              <p className="text-xs">Artwork Name</p>
              <input
                required 
                type="text" 
                className="w-full border-[1px] border-neutral-200 text-xs p-2"
                placeholder="Type the name of your artwork"
                value={artworkName}
                onChange={(e) => {setArtworkName(e.target.value)}}
              />
            </div>

            {/* Artwork Category: */}
            <div className="flex flex-col w-full">
              <p className="text-xs">Artwork Category</p>
              <Select onValueChange={setArtCategory}>
                <SelectTrigger className="w-full rounded-none text-xs">
                  <SelectValue placeholder="Select an art category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="abstract" className="text-sm">Abstract</SelectItem>
                    <SelectItem value="minimalism" className="text-sm">Minimalism</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>


            {/* Story behind artwork */}
            <div className="flex flex-col w-full">
              <p className="text-xs">Artwork Story</p>
              <textarea
                required
                className="text-w-full border-[1px] h-20 border-neutral-200 text-xs p-2"
                placeholder="Story behind your artwork"
                value={artworkStory}
                onChange={(e) => setArtworkStory(e.target.value)}
              />
            </div>
          </div>

          {/* Submit the form */}
          <button className="flex self-center justify-center bg-black mt-4 p-2 px-10 text-white text-xs cursor-pointer">
            Submit
          </button>

        </form>
      </div>

      <Footer/>
    </div>
  )
}