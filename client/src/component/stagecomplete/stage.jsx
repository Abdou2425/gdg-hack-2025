import React, { use, useContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { X } from "lucide-react";
import image from "../../assets/image.jpg";
import { toast } from "react-toastify";
import { companyContext } from "../../../context/companyContext";
import { studentContext } from "../../../context/studentContext";
const challenges = [
  { id: 1, title: "Challenge 1", pdf: "/challenges/challenge1.pdf" },
  { id: 2, title: "Challenge 2", pdf: "/challenges/challenge2.pdf" },
  { id: 3, title: "Challenge 3", pdf: "/challenges/challenge3.pdf" },
];

export default function StageComplete() {
  const [ID, setID] = useState("");
  const { company } = useContext(companyContext);
  const { student } = useContext(studentContext);
  const [stage, setstage] = useState("");
  const [getchalenge, setgetchalenge] = useState("");
  const [submit, setsubmit] = useState({ attachment: "" });
  const { stageId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [submisions, setsubmisions] = useState("");

  const [chalenge, setchalenge] = useState({
    title: "",
    description: "",
    level: "",
    expireAt: "",
    exattachment: "",
  });
  useEffect(() => {
    async function getonestage() {
      try {
        const { data } = await axios.get(`company/getOneIntership/${stageId}`);
        setstage(data);
      } catch (error) {
        console.error("errrrrrrr", error);
      }
    }
    async function getallchalanges() {
      try {
        const { data } = await axios.get(`company/getAllChallenges/${stageId}`);
        setgetchalenge(data.theChallenges);
      } catch (error) {
        console.error("errrrrrrr", error);
      }
    }

    getonestage();
    getallchalanges();
  }, [stageId]);
  async function addchalenge(e) {
    e.preventDefault();
    const { title, description, level, expireAt, challenge } = chalenge;
    console.log(chalenge);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("level", level);
      formData.append("expireAt", expireAt);
      if (challenge) {
        formData.append("challenge", challenge); // Append the image file
      }
      // Make POST request with FormData
      const { data } = await axios.post(
        `company/createChallenge/${stageId}`,
        formData,
        {}
      );
      toast.success(data.msg);
      console.log(data);
      setchalenge({ title: "", description: "" });
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
  //submit challenge
  async function submitchllenge(id) {
    // e.preventDefault();
    const { attachment } = submit;
    console.log(submit);
    try {
      const formData = new FormData();
      if (attachment) {
        formData.append("attachment", attachment); // Append the image file
      }
      // Make POST request with FormData
      const { data } = await axios.post(
        `engaement/challengeSubmission/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the appropriate header for file uploads
          },
        }
      );
      toast.success(data.msg);
      console.log(data);
      setsubmit({ attachment: "" });
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
  if (ID) {
    async function getallsubmisions() {
      try {
        const { data } = await axios.get(`company/getAllSubmissions/${ID}`);
        setsubmisions(data);
      } catch (error) {
        console.error("errrrrrrr", error);
      }
    }
    getallsubmisions();
  }
  console.log(submisions + "ggfg");
  const baseURL = "http://localhost:5000/images/";
  const baseURL2 = "http://localhost:5000/challenges/";
  const baseURL3 = "http://localhost:5000/submissions/";

  console.log(stage + "ff" + getchalenge);
  return (
    <>
      <div className="w-full h-full p-4 bg-white shadow-lg rounded-2xl flex flex-col items-end gap-4">
        <div className="w-full h-[1136px] p-6 flex flex-col  items-start gap-5">
          {/* Profile Section */}
          <div className="w-full flex items-start gap-4">
            <img
              className="w-24 h-24 rounded-full"
              src={
                stage &&
                stage.theIntership.image.replace(/^.*\\images\\/, baseURL)
              }
              alt="Profile"
            />
            <div className="flex-1 flex flex-col gap-1 mt-3">
              <div className="text-black text-2xl font-medium">
                {stage && stage.theIntership.company.name}
              </div>
              <div className="flex items-center gap-4 text-gray-700">
                <div className="w-16 text-center text-lg">
                  {stage && stage.theIntership.title}
                </div>
              </div>
            </div>
          </div>

          {/* Internship Details */}
          <div className="flex flex-col gap-3">
            <div className="text-2xl font-medium">
              Stage: <span className="font-normal">Développeur logiciel</span>
            </div>
            <div className="text-2xl font-medium">
              Type de stage:{" "}
              <span className="font-normal">Stage de fin d’étude</span>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-3">
            <div className="text-2xl font-medium">Description du stage</div>
            <div className="text-lg font-normal">
              {stage && stage.theIntership.title}
            </div>
          </div>

          {/* Missions */}
          <div className="flex flex-col gap-3">
            <div className="text-xl font-semibold">Missions principales :</div>
            <ul className="list-disc pl-5 text-lg">
              <li>
                Participer à la conception et au développement d’une application
                web/mobile
              </li>
              <li>
                Implémenter des fonctionnalités en Kotlin / Flutter / React.js /
                Node.js
              </li>
              <li>Optimiser la performance et la sécurité des applications</li>
            </ul>
          </div>

          {/* Profile Requirements */}
          <div className="flex flex-col gap-3">
            <div className="text-2xl font-medium">Profil recherché</div>
            <div className="text-xl font-semibold">Formation :</div>
            <div className="text-lg font-normal">
              Étudiant en dernière année d’école d’ingénieur ou Master (Bac+5)
              en Informatique / Développement Logiciel.
            </div>
          </div>

          {/* Skills Required */}
          <div className="flex flex-col gap-3">
            <div className="text-xl font-semibold">Compétences requises :</div>
            <ul className="list-disc pl-5 text-lg">
              <li>Développement web et mobile</li>
              <li>Maîtrise de Kotlin, Flutter, React.js, Node.js</li>
              <li>
                Optimisation de la performance et sécurité des applications
              </li>
            </ul>
          </div>

          {/* Duration & Period */}
          <div className="flex flex-col gap-3">
            <div className="text-xl font-medium">Durée & Période du stage</div>
            <div className="flex items-center gap-4 text-lg">
              <div className="font-semibold">Durée :</div>
              <div className="font-normal">
                {stage && stage.theIntership.duration}
              </div>
            </div>
            <div className="flex items-center gap-4 text-lg">
              <div className="font-semibold">Période :</div>
              <div className="font-normal">Février 2025 – Juillet 2025</div>
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-col gap-3">
            <div className="text-xl font-medium">Localisation du stage</div>
            <div className="flex items-center gap-4 text-lg">
              <div className="w-4 h-5 bg-blue-700"></div>
              <div className="font-normal">
                {stage && stage.theIntership.location}
              </div>
            </div>
          </div>
        </div>

        {/* Send Request Button */}

        <div>
          {company && (
            <button
              onClick={() => setIsOpen(true)}
              className="rounded-md mt-3 mr-10 mb-8  bg-blue-600 py-2 px-8 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 active:bg-slate-700 disabled:pointer-events-none disabled:opacity-50 ml-2"
            >
              Add chalanges
            </button>
          )}

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
                  <form onSubmit={addchalenge}>
                    <div className="relative flex items-center justify-center text-white h-24 bg-violet-500 rounded-md">
                      <h3 className="text-2xl">ADD chalanges</h3>
                      <button
                        className="absolute right-4 top-4 text-white"
                        onClick={() => setIsOpen(false)}
                      >
                        <X size={20} />
                      </button>
                    </div>
                    <div className="flex flex-col gap-4 p-6">
                      <div>
                        <label className="block mb-2 text-sm text-slate-600">
                          Title
                        </label>
                        <input
                          value={chalenge.title}
                          onChange={(e) => {
                            setchalenge({ ...chalenge, title: e.target.value });
                          }}
                          type="text"
                          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
                          placeholder="Your Email"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm text-slate-600">
                          Description
                        </label>
                        <input
                          value={chalenge.description}
                          onChange={(e) => {
                            setchalenge({
                              ...chalenge,
                              description: e.target.value,
                            });
                          }}
                          type="text"
                          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
                          placeholder="Your Email"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm text-slate-600">
                          Level
                        </label>
                        <input
                          value={chalenge.level}
                          onChange={(e) => {
                            setchalenge({ ...chalenge, level: e.target.value });
                          }}
                          type="text"
                          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
                          placeholder="Your Email"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm text-slate-600">
                          expireAT(days)
                        </label>
                        <input
                          value={chalenge.expireAt}
                          onChange={(e) => {
                            setchalenge({
                              ...chalenge,
                              expireAt: e.target.value,
                            });
                          }}
                          type="number"
                          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
                          placeholder="Your Email"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm text-slate-600">
                          File
                        </label>
                        <input
                          type="file"
                          required=""
                          onChange={(e) => {
                            setchalenge({
                              ...chalenge,
                              challenge: e.target.files[0],
                            });
                          }}
                          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
                          placeholder="Your image"
                        />
                      </div>
                    </div>
                    <div className="p-6 pt-0">
                      <button
                        type="submit"
                        className="w-full rounded-md bg-violet-600 py-2 px-4 text-white text-sm shadow-md hover:shadow-lg focus:bg-slate-700 active:bg-slate-700 disabled:opacity-50"
                      >
                        ADD
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
      </div>
      <div className="min-h-screen bg-violet-100 flex flex-col items-center py-10">
        <h1 className="text-4xl font-bold text-violet-700 mb-6">Challenges</h1>
        <div className="flex flex-col w-3/4 space-y-4">
          {getchalenge &&
            getchalenge.map((e, i) => (
              <div
                key={i}
                className="bg-white shadow-lg rounded-2xl p-4 text-center w-full"
              >
                <h2 className="text-xl font-semibold text-violet-700 mt-3">
                  {e.title}
                </h2>
                <span className="text-gray-600 text-sm">
                  Level: {e.level} | Expires: {e.expireAt.split("T")[0]}
                </span>
                <br />
                <a
                  href={e.challenge.replace(/^.*\\challenges\\/, baseURL2)}
                  download // Ensures the file is downloaded
                  //  // Prevents default navigation
                  style={{
                    textDecoration: "none",
                    fontSize: "23px",
                    fontFamily: "cursive",
                  }}
                >
                  {e.title}
                </a>
                <div className="mt-4 flex justify-center space-x-4">
                  {student && (
                    <button
                      onClick={() => setIsOpen2(true)}
                      className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-md"
                    >
                      Submit
                    </button>
                  )}

                  {isOpen2 && (
                    <div
                      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
                      onClick={() => setIsOpen2(false)}
                    >
                      <div
                        className="relative w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="relative flex flex-col bg-white">
                          <form
                            onSubmit={(event) => {
                              event.preventDefault();
                              submitchllenge(e._id);
                            }}
                          >
                            <div className="relative flex items-center justify-center text-white h-24 bg-violet-500 rounded-md">
                              <h3 className="text-2xl">submit chalanges</h3>
                              <button
                                className="absolute right-4 top-4 text-white"
                                onClick={() => setIsOpen2(false)}
                              >
                                <X size={20} />
                              </button>
                            </div>
                            <div className="flex flex-col gap-4 p-6">
                              <div>
                                <label className="block mb-2 text-sm text-slate-600">
                                  File
                                </label>
                                <input
                                  type="file"
                                  required=""
                                  onChange={(e) => {
                                    setsubmit({
                                      ...submit,
                                      attachment: e.target.files[0],
                                    });
                                  }}
                                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
                                  placeholder="Your image"
                                />
                              </div>
                            </div>
                            <div className="p-6 pt-0">
                              <button
                                type="submit"
                                className="w-full rounded-md bg-violet-600 py-2 px-4 text-white text-sm shadow-md hover:shadow-lg focus:bg-slate-700 active:bg-slate-700 disabled:opacity-50"
                              >
                                ADD
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
                  {company && (
                    <button
                      onClick={() => {
                        setID(e._id);
                        setIsOpen3(true);
                      }}
                      className="bg-blue-500 hover:bg-blue-900 text-white px-4 py-2 rounded-md"
                    >
                      Show Submissions
                    </button>
                  )}
                  {isOpen3 && (
                    <div
                      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
                      onClick={() => setIsOpen3(false)}
                    >
                      <div
                        className="relative w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="relative flex flex-col bg-white">
                          <form>
                            <div className="relative flex items-center justify-center text-white h-24 bg-violet-500 rounded-md">
                              <h3 className="text-2xl">submit chalanges</h3>
                              <button
                                className="absolute right-4 top-4 text-white"
                                onClick={() => {
                                  setIsOpen3(false);
                                }}
                              >
                                <X size={20} />
                              </button>
                            </div>
                            {submisions&& submisions.map((el,i)=>{
                            <div>
                            <h2 className="text-xl font-semibold text-violet-700 mt-3">
                             {i+1}
                            </h2>
                            {/* <span className="text-gray-600 text-sm">
                              Level: {e.level} | Expires:{" "}
                              {e.expireAt.split("T")[0]}
                            </span> */}
                            <br />
                            <a
                              href={el.attachment.replace(
                                /^.*\\submissions\\/,
                                baseURL3
                              )}
                              download // Ensures the file is downloaded
                              //  // Prevents default navigation
                              style={{
                                textDecoration: "none",
                                fontSize: "23px",
                                fontFamily: "cursive",
                              }}
                            >
                              project
                            </a>
                            </div>
                            })}
                            <div className="p-6 pt-0"></div>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
