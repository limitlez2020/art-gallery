import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

export default function UploadArt () {
  return (
    <div className="flex flex-col h-full min-h-screen bg-neutral-200">
      <NavBar/>
      
      {/* Form Container */}
      <div className="flex flex-grow smt-20 w-1/2 h-[500px] justify-center self-center border-[1px] border-black">
        {/* Form */}
        <div className="flex flex-col">
          Under construction
        </div>
      </div>

      <Footer/>
    </div>
  )
}