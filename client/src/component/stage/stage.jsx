import { useState, useEffect } from "react";
import React from "react";
import image from "../../assets/image.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Stage() {
  const [stages, setstages] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    async function getstages() {
      try {
        const { data } = await axios.get(`engaement/getAllInterships`);
        setstages(data);
      } catch (error) {
        console.error("errrrrrrr", error);
      }
    }
    getstages();
  }, []);
  const baseURL = "http://localhost:5000/images/";
  if (stages) {
    console.log("gg" + stages[0].title);
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5 ml-5">
        {stages &&
          stages.map((e, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
            >
              <a href="#">
                <img
                  className="rounded-t-lg"
                  src={e.image.replace(/^.*\\images\\/, baseURL)}
                  alt=""
                />
              </a>
              <div className="p-5">
                <h6>{e.company.name}</h6>
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {e.title}
                  </h5>
                </a>
                <span className="flex items-center space-x-1 m-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-yellow-400 cursor-pointer"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <p>4/5</p>
                </span>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                 
                  {e.description.length > 20
                    ? e.description.slice(0, 20) + " ..."
                    : e.description}
                </p>
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                  {e.location}
                </p>
                <p className="mb-3 font-normal text-black dark:text-gray-400">
                  {e.duration}
                </p>
                <button
      onClick={() => navigate(`/stages/${e._id}`)}
      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-violet-600 hover:bg-violet-700 transition rounded-lg"
                    >
     
                  Read more
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                  </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
