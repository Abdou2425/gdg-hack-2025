import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoH from "../../assets/logoH.png";
import signin from "../../assets/signin.png";
//axios and toast
import { toast } from "react-toastify";
import axios from "axios";
export default function RegisterCompany() {
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);
  const options = ["security", "data", "reseaux"];
  const Navigate = useNavigate();
    const [companydata, setcompanydata] = useState({
      name: "",
      location:"",
      domaine:"",
      email: "",
      password: "",
      website: "",
      description: "",
      certificate:null
    });
    async function companylogin(e){
      e.preventDefault();
    const {name, location, domaine, email, password, website, description,certificate} = companydata;
    console.log(companydata);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("location", location);
      formData.append("domaine", domaine);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("website", website);
      formData.append("description", description);
      if (certificate) {
        formData.append("certificate", certificate);
      }
      // Make POST request with FormData
      const { data } = await axios.post(
        `company/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the appropriate header for file uploads
          },
        }
      );
      toast.success(data.msg);
      setLoading(false);
      console.log(data);
      setcompanydata({ email: "", password: "" });
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
  return (
    <>
      <div className="font-sans min-h-screen flex items-center justify-center py-6 px-4 bg-violet-100 text-gray-900">
        <div className="grid md:grid-cols-2 items-center gap-6 max-w-6xl w-full">
          <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-lg bg-white max-md:mx-auto ">
            <form onSubmit={companylogin} className="space-y-4">
              <div className="flex flex-col items-center mb-8 text-center">
                <img className="w-[120px]  " src={logoH} alt="" />
                <h3 className="text-violet-700 text-3xl font-bold">Register</h3>
                <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                  register to your account and explore a world of possibilities.
                  Your journey begins here.
                </p>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                 Name
                </label>
                <input
                  name="username"
                  type="text"
                  required
                  value={companydata.name}
                  onChange={(e) => {
                    setcompanydata({ ...companydata, name: e.target.value });
                  }}
                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-violet-600"
                  placeholder="Enter user name"
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                 Location
                </label>
                <input
                  name="username"
                  type="text"
                  required
                  value={companydata.location}
                  onChange={(e) => {
                    setcompanydata({ ...companydata, location: e.target.value });
                  }}
                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-violet-600"
                  placeholder="Enter user name"
                />
              </div>
              <div>
              <label className="text-gray-800 text-sm mb-2 block">
                  Domaine
                </label>
                <div className="relative inline-block w-96">
                <select
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:violet-600 focus:violet-600 outline-violet-600"
                      // value={selected}
                      // onChange={(e) => setSelected(e.target.value)}
                      value={companydata.domaine}
                      onChange={(e) => {
                        setcompanydata((prev) => ({
                          ...prev,
                          domaine: e.target.value,
                        }));
                      }}
                    >
                      <option value="" disabled>
                        Select Speciality
                      </option>
                      {options.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                </div>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Email
                </label>
                <input
                  name="name"
                  type="email"
                  required
                  value={companydata.email}
                  onChange={(e) => {
                    setcompanydata({ ...companydata, email: e.target.value });
                  }}
                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-violet-600"
                  placeholder="Enter password"
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  value={companydata.password}
                  onChange={(e) => {
                    setcompanydata({ ...companydata, password: e.target.value });
                  }}
                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-violet-600"
                  placeholder="Enter password"
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Website
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  value={companydata.website}
                  onChange={(e) => {
                    setcompanydata({ ...companydata, website: e.target.value });
                  }}
                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-violet-600"
                  placeholder="Enter password"
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Description
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  value={companydata.description}
                  onChange={(e) => {
                    setcompanydata({ ...companydata, description: e.target.value });
                  }}
                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-violet-600"
                  placeholder="Enter password"
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Certificate
                </label>
                <input
                  name="name"
                  type="file"
                  required
                  onChange={(e) => {
                    setcompanydata({ ...companydata, certificate: e.target.files[0] });
                  }}
                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-violet-600"
                  placeholder="Enter password"
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 text-sm text-gray-800"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="text-sm text-violet-600 hover:underline font-semibold"
                >
                  Forgot your password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-lg text-white bg-violet-600 hover:bg-violet-700 transition"
              >
                Sign in
              </button>

              <p className="text-sm text-center text-gray-500 mt-6">
                have an account?
                <a
                  href="/company/signin"
                  className="text-violet-600 font-semibold hover:underline ml-1"
                >
                  Signin here
                </a>
              </p>
            </form>
          </div>
          <div className="max-md:mt-8">
            <img
              src={signin}
              className="w-full aspect-[71/50] max-md:w-4/5 mx-auto block object-cover rounded-lg "
              alt="Sign in illustration"
            />
          </div>
        </div>
      </div>
    </>
  );
}
