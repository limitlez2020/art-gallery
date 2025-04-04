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
import Image from "next/image";
import { Space_Grotesk } from "next/font/google";


const space_grotesk = Space_Grotesk({subsets: ["latin"]})


export default function UploadArt () {

  /* States for the form elements: */
  const [artistName, setArtistName] = useState("")
  const [artworkName, setArtworkName] = useState("")
  const [artCategory, setArtCategory] = useState("")
  const [artworkStory, setArtworkStory] = useState("")
  /* In the upload tab: contains an actual image file
   * In ai generate tab: contains the public url to image from supabase storage */
  const [artworkImage, setArtworkImage] = useState(null)
  const [uploading, setUploading] = useState(false) /* Track if form is uploading to database */
  const [submitted, setSubmitted] = useState(false) /* Track if form is submitted */
  const [selectedTab, setSelectedTab] = useState("upload") /* Track what option is selectedTab in the mini navbar */
  const [aiArtPrompt, setAiArtPrompt] = useState("")
  const [generatingImage, setGeneratingImage] = useState(false) 



  /* Function to handle the toggle between mini navbar options: */
  const toggleSelect = () => {
    if (selectedTab === "upload") {
      setSelectedTab("generate");
      /* Set the category of the art to be automatically AI */
      setArtCategory("ai");
    }
    else if (selectedTab === "generate") {
      setSelectedTab("upload")
    }

    /* Clear the form when tab is switched */
    setArtistName("");
    setArtworkName("");
    setArtworkStory("");
  }



  /* Function to take the art prompt and send it to the api route and get the ai image url */
  const generateArt = async () => {
    try {
      setGeneratingImage(true);

      /* Get the generated art */
      const response = await fetch("/api/generate-art", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: aiArtPrompt })
      })

      /* Get the image URL */
      const data = await response.json();
      const imageUrl = data.imageUrl;
      console.log("url gotten from the art generation: ", imageUrl);

      /* Set the artwork image url */
      setArtworkImage(imageUrl);
    }
    catch (error) {
      console.error("Error in generating AI art: ", error)
    }
    finally {
      setGeneratingImage(false);
    }
  }

  

  /* Use for submitting upload form */
  /* Function to upload the artwork image to storage
   * and store the image URL alongside the artwork details
   * in the supabase databse (table) */
  const handleSubmitUpload = async (event) => {
    /* Prevent the page from reloading */
    event.preventDefault();
    setUploading(true);


    try {
      
      /* Ensure all required fields are filled */
      // TODO: look for a better way to do this in the divs themselves
      if (!artistName || !artworkName || !artworkStory || !artworkImage || !artCategory) {
        alert("Please fill out all required fields.");
        setUploading(false);
        return;
      }


      /* NOTE:
       * Artwork Image is an array that cotains the file,
       * the file is the only element of artwork image
       * so to access the actual file you have to do artworkImage[0] */

      /* Upload Image to supabase storage */
      const formData = new FormData();
      formData.append("file", artworkImage[0]);
      formData.append("fileName", `${Date.now()}-${artworkImage[0].name}`);


      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      /* Get the image URL */
      const responseData = await response.json();
      const imageUrl = responseData.imageUrl;
      if (!imageUrl) {
        alert("image upload failed.");
        setUploading(false);
        return;
      }

      
      /* Store artwork details to supabase database */
      const storeResponse = await fetch("/api/store-artwork", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: artworkName,   
          artist: artistName,   
          category: artCategory,
          story: artworkStory,  
          image_url: imageUrl,
        }),
      });

      /* Get the stored data - artwork details */
      const storedData = await storeResponse.json();
      if (!storedData) {
        alert("Failed to store artwork details.");
        setUploading(false);
        return;
      }


      /* Mark the form as submitted */
      setSubmitted(true);
    }
    catch (error) {
      console.error("Error submitting artwork: ", error)
    }
    finally {
      setUploading(false);
    }
  }





  /* Use for submitting the generate art form: */
  const handleSubmitGenerate = async (event) => {
    /* Prevent the page from reloading */
    event.preventDefault();
    setUploading(true);


    try {
      
      /* Ensure all required fields are filled */
      // TODO: look for a better way to do this in the divs themselves
      if (!artistName || !artworkName || !artworkStory || !artworkImage) {
        alert("Please fill out all required fields.");
        setUploading(false);
        return;
      }

      
      /* Store artwork details to supabase database */
      /* In this case, the artwork image is already a publicurl
       * from supabase storage, so we just pass it in */
      const storeResponse = await fetch("/api/store-artwork", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: artworkName,   
          artist: artistName,   
          category: artCategory,
          story: artworkStory,  
          image_url: artworkImage,
        }),
      });

      /* Get the stored data - artwork details */
      const storedData = await storeResponse.json();
      if (!storedData) {
        alert("Failed to store artwork details.");
        setUploading(false);
        return;
      }


      /* Mark the form as submitted */
      setSubmitted(true);
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

          /* Container */
          <div className="flex flex-col w-[95%] items-center mb-10">
            {/* Inner Navbar */}
            <div className="flex flex-row items-center justify-between gap-1 px-1 bg-neutral-200 w-56 h-12 border-black border-[1px] mb-24">
              {/* Upload art */}
              <button className={`flex items-center justify-center w-1/2 h-[80%] rounded-sm cursor-pointer ${selectedTab === "upload" ? "text-white bg-black" : ""}`}
                      onClick={toggleSelect}>
                  upload
              </button>

              {/* Generate art */}
              <button className={`flex items-center justify-center w-1/2 h-[80%] rounded-sm cursor-pointer ${selectedTab === "generate" ? "text-white bg-black" : ""}`}
                      onClick={toggleSelect}>
                generate
              </button>
            </div>


            {selectedTab === "upload" ? (
              /* Upload Form */
              <form className="flex flex-col w-full items-center"
                    onSubmit={handleSubmitUpload}>
                {/* Header: */}
                <div className="flex flex-col items-center justify- text-center">
                  <p className={`${space_grotesk.className} text-3xl sm:text-3xl font-medium`}>Upload Artwork</p>
                  {/* <p className="font-normal text-neutral-600 text-sm sm:text-base">Fill out the form below to upload your artwork.</p> */}
                </div>

                {/* Upload area */}
                <div className="flex flex-col p-2 mt-7 w-5/6 items-center justify-center border-[2px] border-black border-dotted">
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
            
            ) : (

              /*******************  Generate Art  *************************/
              <div className="flex flex-col w-full items-center">
                
                {/* Header: */}
                <div className="flex flex-col items-center justify- text-center">
                  <p className={`${space_grotesk.className} text-3xl sm:text-3xl font-medium`}>Generate Artwork</p>
                  {/* <p className="font-normal text-neutral-600 text-sm sm:text-base">Fill out the form below to upload your artwork.</p> */}
                </div>


                {/* Art Area */}
                <div className="flex flex-col mt-10 justify-center w-5/6 border-[1px] p-2 gap-2 rounded-sm">
                  {/* Image */}
                  {artworkImage && (
                    <div className="flex w-full h-80 md:h-120 lg:h-140 overflow-hidden border-[1px] border-black shadow-xl">
                      <Image
                        src={artworkImage}
                        alt="Artwork"
                        width={1920} height={1080}
                        className="w-[100%] h-[100%] object-fit"
                        priority={true}
                      />
                    </div>
                  )}
                  <textarea className="flex flex-col p-2 w-full h-28 text-sm border-dotted border-[1px]"
                            placeholder="Describe the art you want to generate"
                            onChange={(e) => setAiArtPrompt(e.target.value)}
                  />
                  <button className="flex justify-center self-end bg-black text-white text-xs py-1 px-2 cursor-pointer"
                          onClick={generateArt}>
                    {generatingImage ? (
                      <p>Generating...</p>
                    ) : (
                      <p>Generate</p>
                    )}
                  </button>
                </div>



                <form className="flex flex-col w-full items-center"
                      onSubmit={handleSubmitGenerate}>

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

                    {/* Story behind artwork */}
                    <div className="flex flex-col w-full">
                      <p>Artwork Story</p>
                      <textarea
                        required
                        className="w-full border-[1px] h-20 border-black p-2 rounded-sm"
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
              </div>
            )}
          </div>
        )}

      
      </div>

      <Footer/>
    </div>
  )
}