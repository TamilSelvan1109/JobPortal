import React, { useState } from "react";
import { Mail, Phone, Briefcase, FileText, Code2, Camera } from "lucide-react";

export default function UserDashboard() {
  const [userData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    role: "Frontend Developer",
    bio: "Passionate developer with 5+ years of experience building scalable web applications using React, Node.js, and modern UI frameworks.",
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    skills: ["React", "JavaScript", "Node.js"],
    resumeName: "John_Doe_Resume.pdf",
  });

  return (
    <div className="min-h-screen bg-blue-900 text-gray-100 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full bg-black rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-8">
        
        {/* --- LEFT: Avatar Section --- */}
        <div className="flex flex-col items-center md:w-1/3">
          <div className="relative">
            <img
              src={userData.avatarUrl}
              alt="User Avatar"
              className="w-40 h-40 rounded-full border-4 border-blue-600 object-cover shadow-md"
            />
            <div className="absolute bottom-2 right-2 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700">
              <Camera className="w-4 h-4 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold mt-4">{userData.name}</h2>
          <p className="text-gray-400">{userData.role}</p>
        </div>

        {/* --- RIGHT: User Info Section --- */}
        <div className="flex-1 w-full space-y-6">
          
          {/* Bio */}
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-1">About</h3>
            <p className="text-gray-300 leading-relaxed">{userData.bio}</p>
          </div>

          {/* Contact Info */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 bg-blue-950/50 p-3 rounded-lg border border-blue-800">
              <Mail className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-xs text-gray-400">Email</p>
                <p className="font-medium">{userData.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-blue-950/50 p-3 rounded-lg border border-blue-800">
              <Phone className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-xs text-gray-400">Phone</p>
                <p className="font-medium">{userData.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-blue-950/50 p-3 rounded-lg border border-blue-800">
              <Briefcase className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-xs text-gray-400">Role</p>
                <p className="font-medium">{userData.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-blue-950/50 p-3 rounded-lg border border-blue-800">
              <FileText className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-xs text-gray-400">Resume</p>
                <p className="font-medium">{userData.resumeName}</p>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-2 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-blue-400" />
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {userData.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-blue-800 text-blue-100 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
