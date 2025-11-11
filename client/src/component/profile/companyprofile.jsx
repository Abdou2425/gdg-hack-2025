import { useState,useContext } from "react";
import React from "react";
import image from"../../assets/image.jpg"
import { X } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { companyContext } from "../../../context/companyContext";
const ProfileCompany = () => {
    const {company}=useContext(companyContext)
    const [isOpen, setIsOpen] = useState(false);
    const[stage,setstage]=useState({
        title:"",
        description:"",
        location:"",
        duration:"",
        image:null
    })
    async function addstage(e) {
        e.preventDefault();
        const { title, description, location, duration, image } = stage;
        console.log(stage);
        try {
          const formData = new FormData();
          formData.append("title", title);
          formData.append("description", description);
          formData.append("location", location);
          formData.append("duration", duration);
          if (image) {
            formData.append("image", image); // Append the image file
          }
    
          // Make POST request with FormData
          const { data } = await axios.post("company/createIntership", formData, {
            headers: {
              "Content-Type": "multipart/form-data", // Set the appropriate header for file uploads
            },
          });
          toast.success(data.msg);
          console.log(data);
          setstage({ title: "", description: "", location: "", duration: "", image: null });
        } catch (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            toast.error(error.response.data.err);
            console.log(error.response);
          }
          console.log(error);
        }
      }
      console.log(company)
      if(!company){
        return<>
        <h2 className="text-black">you cant access here</h2>
        </>
      }
  return (
    <div className="max-w-3xl mx-auto bg-violet-100 p-6 rounded-2xl shadow-xl mt-4">
    <div className="flex items-center space-x-4 pb-6 border-b border-violet-300">
      <img
        src={image}
        alt="Profile"
        className="w-20 h-20 rounded-full border-4 border-violet-500"
      />
      <div>
        <h2 className="text-xl font-bold text-violet-700">{company&&(company.existingCompany.name)}</h2>
        <p className="text-violet-500">{company&&(company.existingCompany.email)}</p>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4 mt-6">
      <div className="flex flex-col space-y-2">
        <label className="text-violet-700 font-medium"> Name</label>
        <input type="text" value={company&&(company.existingCompany.name)} readOnly className="p-2 border border-violet-300 rounded-lg bg-white" />
        <label className="text-violet-700 font-medium">email</label>
        <input type="text" value={company&&(company.existingCompany.email)} placeholder="Major" className="p-2 border border-violet-300 rounded-lg" />
        <label className="text-violet-700 font-medium">domaine</label>
        <input type="text" value={company&&(company.existingCompany.domaine)} placeholder="ID" className="p-2 border border-violet-300 rounded-lg" />
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-violet-700 font-medium">location</label>
        <input type="text" value={company&&(company.existingCompany.location)} placeholder="Your First Name" className="p-2 border border-violet-300 rounded-lg" />
        <label className="text-violet-700 font-medium">zebsitz</label>
        <input type="text" value={company&&(company.existingCompany.website)} placeholder="Major" className="p-2 border border-violet-300 rounded-lg" />
        <label className="text-violet-700 font-medium">description</label>
        <input type="text" value={company&&(company.existingCompany.description)} placeholder="ID number" className="p-2 border border-violet-300 rounded-lg" />
      </div>
    </div>

    <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal"  className="mt-6 w-full bg-violet-600 text-white py-2 rounded-lg hover:bg-violet-700 transition">EDIT</button>
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-md mt-3  bg-blue-600 py-2 px-8 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 active:bg-slate-700 disabled:pointer-events-none disabled:opacity-50 ml-2"
      >
       Add Stage
      </button>
      
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex flex-col bg-white">
            <form onSubmit={addstage} >
              <div className="relative flex items-center justify-center text-white h-24 bg-violet-500 rounded-md">
                <h3 className="text-2xl">ADD Stage</h3>
                <button
                  className="absolute right-4 top-4 text-white"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex flex-col gap-4 p-6">
               
                <div>
                  <label className="block mb-2 text-sm text-slate-600">Title</label>
                  <input
                    value={stage.title}
                    onChange={(e) => {
                        setstage({ ...stage, title: e.target.value });
                      }}
                    type="text"
                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
                    placeholder="Your Email"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm text-slate-600">Description</label>
                  <input
                    value={stage.description}
                    onChange={(e) => {
                        setstage({ ...stage, description: e.target.value });
                      }}
                    type="text"
                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
                    placeholder="Your description"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm text-slate-600">Location</label>
                  <input
                    value={stage.location}
                    onChange={(e) => {
                        setstage({ ...stage, location: e.target.value });
                      }}
                    type="text"
                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
                    placeholder="Your location"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm text-slate-600">Durtion</label>
                  <input
                    value={stage.duration}
                    onChange={(e) => {
                        setstage({ ...stage, duration: e.target.value });
                      }}
                    type="text"
                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
                    placeholder="Your duration"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm text-slate-600">Image</label>
                  <input
                  type="file"
                  required=""
                    onChange={(e) => {
                        setstage({ ...stage, image: e.target.files[0] });
                      }}
                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
                    placeholder="Your image"
                  />
                </div>
                
              </div>
              <div className="p-6 pt-0">
                <button type="submit" className="w-full rounded-md bg-violet-600 py-2 px-4 text-white text-sm shadow-md hover:shadow-lg focus:bg-slate-700 active:bg-slate-700 disabled:opacity-50">
                  Sign In
                </button>
                {/* <p className="flex justify-center mt-6 text-sm text-slate-600">
                  Don&apos;t have an account?
                  <a href="#signup" className="ml-1 font-semibold text-slate-700 underline">Sign up</a>
                </p> */}
              </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
    {/* <div className="mt-6 bg-violet-200 p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium text-blue-800">My Curriculum Vitae</h3>
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center space-x-2 bg-white p-3 rounded-md shadow-md">
          <div className="text-2xl">📄</div>
          <span className="text-blue-500 font-extrabold">Uploaded 1 month ago</span>
        </div>
        <button className="bg-violet-600 text-white py-2 px-4 rounded-lg hover:bg-violet-700 transition">Upload CV</button>
      </div>
    </div> */}
  </div>
  );
};

export default ProfileCompany;