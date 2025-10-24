import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Mail, Phone, Briefcase, FileText, NotebookPen, Tags } from "lucide-react";

const UserProfile = () => {
  const { userData } = useContext(AppContext);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8">
      
      {/* --- Main Profile Card --- */}
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
      
          {/* LEFT: Avatar & Name Section */}
          <div className="flex flex-col items-center text-center md:w-1/3">
            <img
              src={userData.image}
              alt="User Avatar"
              className="w-40 h-40 rounded-full border-4 border-blue-500 object-cover shadow-md mb-4"
            />
            <h2 className="text-3xl font-bold text-gray-800">
              {userData.name}
            </h2>
            <p className="text-lg text-gray-500">{userData.role}</p>
          </div>

          {/* RIGHT: User Info Section */}
          <div className="flex-1 w-full space-y-8 md:border-l md:pl-8 border-gray-200">
      
            {/* About Section */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3 pb-2 border-b flex items-center gap-3">
                <NotebookPen size={22} className="text-blue-600" />
                About
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {userData.profile.bio || "No bio provided."}
              </p>
            </div>

            {/* Contact Info Section */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b flex items-center gap-3">
                <Phone size={22} className="text-blue-600" />
                Contact Information
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
      
                {/* Email */}
                <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <Mail className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Email</p>
                    <p className="text-gray-900 break-words">
                      {userData.email}
                    </p>
                  </div>
                </div>
      
                {/* Phone */}
                <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <Phone className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Phone</p>
                    <p className="font-medium text-gray-900">
                      {userData.phone || "Not provided"}
                    </p>
                  </div>
                </div>
      
                {/* Role */}
                <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <Briefcase className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Role</p>
                    <p className="font-medium text-gray-900">{userData.profile.role!="" ? userData.profile.role : userData.role}</p>
                  </div>
                </div>
      
                {/* Resume */}
                <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <FileText className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700">
                      Resume
                    </p>
                    {userData.profile.resume ? (
                      <a
                        href={userData.profile.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-medium inline-flex items-center gap-1"
                      >
                        View Resume
                      </a>
                    ) : (
                      <p className="text-gray-500">Not uploaded</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b flex items-center gap-3">
                <Tags size={22} className="text-blue-600" />
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {userData.profile.skills.length > 0 ? (
                  userData.profile.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-blue-100 text-blue-800 px-4 py-1.5 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">No skills listed.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
