import React,{useState} from "react";
import logoH from"../../assets/logoH.png"
import signin from"../../assets/signin.png"
import axios, { Axios } from "axios";
import { useNavigate } from "react-router-dom";
// toast
import {  toast } from 'react-toastify';
export default function SigninCompany(){
  const Navigate = useNavigate();
  const [companydata, setcompanydata] = useState({
    email: "",
    password: "",
  });
  async function loginuser(e) {
    e.preventDefault();
    const { email, password } = companydata;
    try {
      const { data } = await axios.post("company/login", {
        email,
        password,
      });
  //  localStorage.setItem("user_type", "student");  
      toast.success(data.msg)
      setdata({});
      Navigate("/profiles");
    } catch (error) {
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        toast.error(error.response.data.err);
        
      }
      console.log(error);
      setdata({email:"",password:""});
    }
    
  }
    return<>
     <div className="font-sans min-h-screen flex items-center justify-center py-6 px-4 bg-violet-100 text-gray-900">
      <div className="grid md:grid-cols-2 items-center gap-6 max-w-6xl w-full">
        <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-lg bg-white max-md:mx-auto">
          <form onSubmit={loginuser}  className="space-y-4">
            <div className="flex flex-col items-center mb-8 text-center">
                <img className="w-[120px]  " src={logoH} alt="" />
              <h3 className="text-violet-700 text-3xl font-bold">Sign in</h3>
              <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                Sign in to your account and explore a world of possibilities. Your journey begins here.
              </p>
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">company email</label>
              <input
                name="username"
                type="email"
                required
                value={companydata.email}
                onChange={(e) => {
                  setcompanydata({ ...companydata, email: e.target.value });
                }}
                className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-violet-600"
                placeholder="Enter user name"
              />
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">Password</label>
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

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center">
                <input id="remember-me" type="checkbox" className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-3 text-sm text-gray-800">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-violet-600 hover:underline font-semibold">
                Forgot your password?
              </a>
            </div>
           
            <button type="submit" className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-lg text-white bg-violet-600 hover:bg-violet-700 transition">
              Sign in
            </button>

            <p className="text-sm text-center text-gray-500 mt-6">
              Don't have an account?
              <a href="/company/register" className="text-violet-600 font-semibold hover:underline ml-1">
                Register here
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
}