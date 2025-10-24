import axios from "axios";
import {
  Camera, // Used this icon
  Edit,
  Eye,
  FileText,
  NotebookPen,
  Phone,
  Save,
  Tags,
  Upload,
  User,
  UserCog,
  X,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const UpdateUser = () => {
  const { userData, backendUrl, setUserData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const [resumeUrl, setResumeUrl] = useState(null);
  const [newResumeFile, setNewResumeFile] = useState(null);

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [role, setRole] = useState("")

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleResumeClick = (e) => {
    if (!resumeUrl) {
      e.preventDefault();
      toast.error("No resume uploaded!");
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("bio", bio);
      formData.append("skills", skills);
      formData.append("role", role);
      if (image) {
        formData.append("image", image);
      }

      const { data } = await axios.post(
        `${backendUrl}/api/users/profile/update`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        toast.success("Profile updated successfully!");
        setUserData(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
      return;
    }
  };

  const handleUpdateResume = async (e) => {
    e.preventDefault();
    
    if (!newResumeFile) {
      toast.error("Please select a new resume file to upload.");
      return;
    }

    try {
      const formdata = new FormData();
      formdata.append("resume", newResumeFile); 

      const { data } = await axios.patch(
        `${backendUrl}/api/users/profile/update-resume`,
        formdata,
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        toast.success("Resume updated successfully!");
        setUserData(data.user);
        setIsEdit(false);
        setNewResumeFile(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (userData) {
      setName(userData.name || "");
      setPhone(userData.phone || "");
      setImagePreview(userData.image || "");

      if (userData.profile) {
        setResumeUrl(userData.profile.resume || null);
        setBio(userData.profile.bio || "");
        setRole(userData.profile.role || "");
        setSkills(
          userData.profile.skills ? userData.profile.skills.join(", ") : ""
        );
      }
    }
  }, [userData]);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 space-y-8">
      <form
        className="bg-white p-6 sm:p-8 rounded-xl shadow-lg"
        onSubmit={handleUpdateUser}
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4 flex items-center gap-3">
          <UserCog size={30} className="text-blue-600" />
          Profile Details
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="flex flex-col items-center lg:items-start">
            <label htmlFor="profileImage" className="cursor-pointer group">
              <div className="w-40 h-40 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 text-gray-400 relative overflow-hidden group-hover:border-blue-500 transition">
  
                {/* Changed to truthy check and used Camera icon */}
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <Camera size={64} className="text-gray-300" />
                )}
                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-70 flex flex-col items-center justify-center transition">
                  <Edit
                    size={32}
                    className="text-blue-900 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <span className="text-blue-900 opacity-0 group-hover:opacity-100 transition-opacity text-sm mt-1">
                    Change
                  </span>
                </div>
              </div>
              <input
                type="file"
                id="profileImage"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* Right Column – Inputs */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="sm:col-span-1">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2"
              >
                <User size={16} className="text-gray-500" />
                Name
              </label>
              <input
                id="name"
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>

            <div className="sm:col-span-1">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2"
              >
                <Phone size={16} className="text-gray-500" />
                Phone
              </label>
              <input
                id="phone"
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2"
              >
                <NotebookPen size={16} className="text-gray-500" />
                Bio
              </label>
              <textarea
                id="bio"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
                rows="3"
                onChange={(e) => setBio(e.target.value)}
                value={bio}
              ></textarea>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="skills"
                className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2"
              >
                <Tags size={16} className="text-gray-500" />
                Skills (comma separated)
              </label>
              <textarea
                id="skills"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
                rows="3"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              ></textarea>
            </div>

            {/* Update Button (Full Width) */}
            
            <div className="sm:col-span-3">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2"
              >
                <User size={16} className="text-gray-500" />
                Role
              </label>
              <input
                id="roll"
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => setRole(e.target.value)}
                value={role}
              />
            </div>

            <div className="sm:col-span-3 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center gap-2"
              >
                <Save size={18} />
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Card 2: Resume Update Section */}
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4 flex items-center gap-3">
          <FileText size={30} className="text-blue-600" />
          Manage Resume
        </h2>

        {isEdit ? (
          /* --- EDITING STATE --- */
          <form onSubmit={handleUpdateResume} className="space-y-4">
            <div>
              <label
                htmlFor="resumeUpload"
                className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
              >
                <Upload size={16} className="text-gray-500" />
                Upload a new resume (PDF only)
              </label>
              <input
                id="resumeUpload"
                onChange={(e) => setNewResumeFile(e.target.files[0])}
                accept="application/pdf"
                type="file"
                required
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100 cursor-pointer"
              />
            </div>
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsEdit(false);
                  setNewResumeFile(null);
                }}
                className="px-5 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <X size={18} />
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center gap-2"
              >
                <Save size={18} />
                Save Resume
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-gray-600">
                {resumeUrl
                  ? "Your current resume is on file."
                  : "No resume uploaded."}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a
                className={`px-5 py-2.5 font-semibold rounded-lg transition-colors flex items-center gap-2 ${
                  !resumeUrl
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                }`}
                href={resumeUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleResumeClick}
                aria-disabled={!resumeUrl}
              >
                <Eye size={18} />
                View Resume
              </a>
              <button
                onClick={() => setIsEdit(true)}
                className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center gap-2"
              >
                {resumeUrl ? <Edit size={18} /> : <Upload size={18} />}
                {resumeUrl ? "Change Resume" : "Upload Resume"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default UpdateUser;