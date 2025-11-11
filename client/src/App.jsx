import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
//home page
import HomePage from "./pages/home";
//signn page
import SigninS from "./pages/signinstudent";
import SigninC from "./pages/signincompany";
//register page
import RegisterS from "./pages/registerstudent";
import RegisterC from "./pages/registercompany";
//stage
import StagePage from "./pages/stage";
import StageCompletePage from "./pages/stagecomplet";
//profile
import ProfilePage from "./pages/profile";
import ProfileCompanyPage from "./pages/profilecompany";
import Navbar from "./component/homepage/navbar";
import axios from "axios";
//context
import { Companycontextprovider } from "../context/companyContext";
import { Studentcontextprovider } from "../context/studentContext";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
  },
  {
path:"/student/signin",
element:<SigninS></SigninS>
  },
  {
    path:"/student/register",
    element:<RegisterS></RegisterS>
  },
  {
    path:"/company/signin",
    element:<SigninC></SigninC>
  },
  {
    path:"/company/register",
    element:<RegisterC></RegisterC>
  },
  {
    path:"/Stage",
    element:<StagePage></StagePage>
  },
  {
    path:"student/profile",
    element:<ProfilePage></ProfilePage>
  },{
    path:"company/profile",
    element:<ProfileCompanyPage></ProfileCompanyPage>
  },{
    path:"/stages/:stageId",
    element:<StageCompletePage></StageCompletePage>
  },
]);
function App() {
  return (
    <>
      {/* navbar */}
      <Navbar></Navbar>
      <Studentcontextprovider>
      <Companycontextprovider>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        theme="colored"
        closeOnClick
        pauseOnHover={false}
      />
      <RouterProvider router={router} />
      </Companycontextprovider>
      </Studentcontextprovider>
      {/* footer */}
    </>
  );
}

export default App;
