import React,{useContext} from "react";
import "./Profile.css";
import studentP from"../../assets/student.png"
import { studentContext } from "../../../context/studentContext";
const Profile = () => {
  const{student}=useContext(studentContext)
  if(!student){
    <h2>you should sign in first</h2>
  }
  return (
    <div className="max-w-3xl mx-auto bg-violet-100 p-6 rounded-2xl shadow-xl mt-4">
    <div className="flex items-center space-x-4 pb-6 border-b border-violet-300">
      <img
        src={studentP}
        alt="Profile"
        className="w-20 h-20 rounded-full border-4 border-violet-500"
      />
      <div>
        <h2 className="text-xl font-bold text-violet-700">{student&&(student.existingStudent.name)}</h2>
        <p className="text-violet-500">{student&&(student.existingStudent.email)}</p>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4 mt-6">
      <div className="flex flex-col space-y-2">
        <label className="text-violet-700 font-medium"> Name</label>
        <input type="text" value={student&&(student.existingStudent.name)} readOnly className="p-2 border border-violet-300 rounded-lg bg-white" />
        <label className="text-violet-700 font-medium">Email</label>
        <input type="text" placeholder="Major" value={student&&(student.existingStudent.email)}  className="p-2 border border-violet-300 rounded-lg" />
       </div>

      <div className="flex flex-col space-y-2">
        {/* <label className="text-violet-700 font-medium">First Name</label>
        <input type="text" placeholder="Your First Name" className="p-2 border border-violet-300 rounded-lg" /> */}
        <label className="text-violet-700 font-medium">Major</label>
        <input type="text" placeholder="Major" value={student&&(student.existingStudent.speciality)}  className="p-2 border border-violet-300 rounded-lg" />
        <label className="text-violet-700 font-medium">univID</label>
        <input type="text" value={student&&(student.existingStudent.univId)}  placeholder="ID" className="p-2 border border-violet-300 rounded-lg" />
     
        {/* <label className="text-violet-700 font-medium">ID</label>
        <input type="text" placeholder="ID number" className="p-2 border border-violet-300 rounded-lg" /> */}
      </div>
    </div>

    <button className="mt-6 w-full bg-violet-600 text-white py-2 rounded-lg hover:bg-violet-700 transition">Edit</button>

    <div className="mt-6 bg-violet-200 p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium text-blue-800">My Curriculum Vitae</h3>
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center space-x-2 bg-white p-3 rounded-md shadow-md">
          <div className="text-2xl">📄</div>
          <span className="text-blue-500 font-extrabold">Uploaded 1 month ago</span>
        </div>
        <button className="bg-violet-600 text-white py-2 px-4 rounded-lg hover:bg-violet-700 transition">Upload CV</button>
      </div>
    </div>
  </div>
  );
};

export default Profile;