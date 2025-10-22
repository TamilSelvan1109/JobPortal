import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Mail, Phone, Briefcase, FileText, Code2, Camera } from "lucide-react";


const UserProfile = () => {

    const {userData}= useContext(AppContext)
    
  return (
    <div>
        {/* --- Main Content: Your User Profile (Restyled) --- */}
        <div className="w-full p-6 sm:p-8">
          <div className="max-w-5xl w-full bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row items-start gap-8">
            
            {/* LEFT: Avatar Section */}
            <div className="flex flex-col items-center text-center md:w-1/3">
              <div className="relative">
                <img
                  src={userData.image}
                  alt="User Avatar"
                  className="w-40 h-40 rounded-full border-4 border-blue-600 object-cover shadow-md"
                />
                
              </div>
              <h2 className="text-2xl font-bold mt-4 text-gray-800">{userData.name}</h2>
              <p className="text-gray-500">{userData.role}</p>
            </div>

            {/* RIGHT: User Info Section */}
            <div className="flex-1 w-full space-y-6">
              
              {/* Bio */}
              <div>
                <h3 className="text-lg font-semibold text-blue-800 mb-1">About</h3>
                <p className="text-gray-600 leading-relaxed">{userData.bio}</p>
              </div>

              {/* Contact Info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg border border-gray-200">
                  {/* <Mail className="w-5 h-5 text-blue-600" /> */}
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{userData.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg border border-gray-200">
                  {/* <Phone className="w-5 h-5 text-blue-600" /> */}
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">{userData.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg border border-gray-200">
                  {/* <Briefcase className="w-5 h-5 text-blue-600" /> */}
                  <div>
                    <p className="text-xs text-gray-500">Role</p>
                    <p className="font-medium text-gray-900">{userData.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg border border-gray-200">
                  {/* <FileText className="w-5 h-5 text-blue-600" /> */}
                  <div>
                    <p className="text-xs text-gray-500">Resume</p>
                    <p className="font-medium text-gray-900">{userData.resumeName}</p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2 flex items-center gap-2">
                  {/* <Code2 className="w-5 h-5 text-blue-800" /> */}
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {userData.profile.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
  );
}

export default UserProfile;