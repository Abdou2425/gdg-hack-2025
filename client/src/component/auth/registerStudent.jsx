import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoH from "../../assets/logoH.png";
import signin from "../../assets/signin.png";
//axios and toast
import { toast } from "react-toastify";
import axios from "axios";
export default function RegisterStudent() {
  const [selected, setSelected] = useState("");
  const [studentId, setstudentId] = useState("");
  const [otpcode, setotpcode] = useState({ otp: "" });
  const options = ["security", "data", "reseaux"];
  const [loading, setLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(() => {
    return JSON.parse(localStorage.getItem("isOtpSent")) || false;
  });
  useEffect(() => {
    localStorage.removeItem("isOtpSent");
    const savedOtp = localStorage.getItem("otp");
  }, [isOtpSent]);
  const Navigate = useNavigate();
  const [studentdata, setstudentdata] = useState({
    name: "",
    email: "",
    password: "",
    univId: "",
    speciality: "",
  });
  async function handlestudent(e) {
    console.log(studentdata);
    e.preventDefault();
    setLoading(true);
    const { name, email, password, univId, speciality } = studentdata;
    try {
      const { data } = await axios.post("student/register", {
        name,
        email,
        password,
        univId,
        speciality,
      });
      setstudentId(data.data.studentId);
      setIsOtpSent(true); // ✅ Update state immediately
      localStorage.setItem("isOtpSent", true); // ✅ Update localStorage
      toast.success(data.msg);
      setLoading(false);
      setdata({
        name: "",
        email: "",
        password: "",
        univId: "",
        speciality: "",
      });
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        toast.error(error.response.data.err);
      }
      console.log(error);
      setdata({
        name: "",
        email: "",
        password: "",
        univId: "",
        speciality: "",
      });
    } finally {
      setLoading(false); // Stop loading
    }
  }
  async function otpverifcation(e) {
    e.preventDefault();
    setLoading(true);
    const { otp } = otpcode;
    console.log(otp + "g" + studentId);
    if (!studentId || !otp) {
      toast.error("Please enter OTP and Student ID");
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post("student/verifyOTP", {
        studentId,
        otp,
      });

      localStorage.removeItem("isOtpSent");
      toast.success(data.msg);
      Navigate("/student/signin");
      setotpcode({ otp: "" });
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.err);
      }
      console.error(error);
      setData({
        name: "",
        email: "",
        password: "",
        univId: "",
        speciality: "",
      });
    } finally {
      setLoading(false); // Stop loading in all cases
    }
  }
  return (
    <>
      <div className="font-sans min-h-screen flex items-center justify-center py-6 px-4 bg-violet-100 text-gray-900">
        <div className="grid md:grid-cols-2 items-center gap-6 max-w-6xl w-full">
          <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-lg bg-white max-md:mx-auto">
            {!isOtpSent ? (
              <form className="space-y-4" onSubmit={handlestudent}>
                <div className="flex flex-col items-center mb-8 text-center">
                  <img className="w-[120px]  " src={logoH} alt="" />
                  <h3 className="text-violet-700 text-3xl font-bold">
                    Register
                  </h3>
                  {loading && (
                    <h6 style={{ color: "#000", fontFamily: "cursive" }}>
                      Loading...
                    </h6>
                  )}
                  <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                    register to your account and explore a world of
                    possibilities. Your journey begins here.
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
                    value={studentdata.name}
                    onChange={(e) => {
                      setstudentdata({ ...studentdata, name: e.target.value });
                    }}
                    className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-violet-600"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    Email
                  </label>
                  <input
                    name="name"
                    type="email"
                    required
                    value={studentdata.email}
                    onChange={(e) => {
                      setstudentdata({ ...studentdata, email: e.target.value });
                    }}
                    className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-violet-600"
                    placeholder="Enter email"
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
                    value={studentdata.password}
                    onChange={(e) => {
                      setstudentdata({
                        ...studentdata,
                        password: e.target.value,
                      });
                    }}
                    className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-violet-600"
                    placeholder="Enter password"
                  />
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    univID
                  </label>
                  <input
                    name="password"
                    type="number"
                    required
                    value={studentdata.univId}
                    onChange={(e) => {
                      setstudentdata({
                        ...studentdata,
                        univId: e.target.value,
                      });
                    }}
                    className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-violet-600"
                    placeholder="Enter your id"
                  />
                </div>

                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    Specialite
                  </label>
                  <div className="relative inline-block w-96">
                    <select
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:violet-600 focus:violet-600 outline-violet-600"
                      // value={selected}
                      // onChange={(e) => setSelected(e.target.value)}
                      value={studentdata.speciality}
                      onChange={(e) => {
                        setstudentdata((prev) => ({
                          ...prev,
                          speciality: e.target.value,
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
                  disabled={loading}
                  className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-lg text-white bg-violet-600 hover:bg-violet-700 transition"
                >
                  register
                </button>

                <p className="text-sm text-center text-gray-500 mt-6">
                  have an account?
                  <a
                    href="/student/signin"
                    className="text-violet-600 font-semibold hover:underline ml-1"
                  >
                    Signin here
                  </a>
                </p>
              </form>
            ) : (
              <div>
                <form onSubmit={otpverifcation}>
                  <input
                    value={otpcode.otp}
                    onChange={(e) => setotpcode({ otp: e.target.value })}
                    // value={userOtp}
                    // onChange={(e) => setUserOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 rounded-lg text-white bg-violet-600 hover:bg-violet-700 transition"
                  >
                    Verify OTP
                  </button>
                </form>
                {/* <form>
              <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-lg">resend otp</button>
              </form> */}
              </div>
            )}
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
