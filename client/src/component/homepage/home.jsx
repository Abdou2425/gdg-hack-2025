import React from "react";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
    const [activeSlide, setActiveSlide] = useState(0);
  
  const slides = [
    {
      title: "For Students",
      description: "Find challenges, prove your skills, and earn internships based on performance!",
      bgColor: "bg-violet-200"
    },
    {
      title: "For Companies",
      description: "Post challenges, discover top talent, and select the best candidates on a efficiently!",
      bgColor: "bg-violet-300"
    }
  ];

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      
      {/* <h3 className='text-lg	text-red-500'>hello home page</h3> */}
      <div className="bg-violet-100 text-gray-800 min-h-screen flex  justify-center">
        
        <div className="text-center p-8 max-w-2xl">
        {/* <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-violet-200 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-violet-700">For Students</h2>
            <p className="mt-2 text-gray-700">Find challenges, prove your skills, and earn internships based on performance!</p>
          </div>
          <div className="bg-violet-300 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-violet-700">For Companies</h2>
            <p className="mt-2 text-gray-700">Post challenges, discover top talent, and select the best candidates efficiently!</p>
          </div>
        </div> */}
        
          <h1 className="text-4xl font-bold text-violet-700 mt-6">
            Prove Your Skills. Win Your Internship.
          </h1>
          <p className=" text-lg text-gray-700 mt-7">
            Join top companies by solving real-world challenges. Earn
            internships based on your skills, not just grades!
          </p>
          <div className="relative w-full flex items-center justify-center px-1.5 mt-11">
          <button onClick={prevSlide} className="absolute  left-2 p-2 bg-violet-500 text-white rounded-full hover:bg-violet-700 transition">
            <ChevronLeft size={24} />
          </button>
          <div className={`p-6 rounded-lg shadow-md transition-all w-full  text-center ${slides[activeSlide].bgColor}`}>
            <h2 className="text-2xl font-bold text-violet-700">{slides[activeSlide].title}</h2>
            <p className="mt-2 text-gray-700">{slides[activeSlide].description}</p>
          </div>
          <button onClick={nextSlide} className="absolute right-2 p-2 bg-violet-500 text-white rounded-full hover:bg-violet-700 transition">
            <ChevronRight size={24} />
          </button>
        </div>
          <div className="mt-11 flex justify-center gap-4">
            <button onClick={() => { navigate(`/company/signin`);}} className="bg-violet-600 text-white px-6 py-3 rounded-lg hover:bg-violet-700 transition"> 
          
              Explore Challenges
            </button>
            <button onClick={() => { navigate(`/student/signin`);}} className="bg-white text-violet-600 border border-violet-600 px-6 py-3 rounded-lg hover:bg-violet-50 transition">
            <i class="fa-sharp-duotone fa-solid fa-graduation-cap mr-3"></i>
              Join as a Student
            </button>
          </div>
          
        </div>
      </div>
      
    </>
  );
}
