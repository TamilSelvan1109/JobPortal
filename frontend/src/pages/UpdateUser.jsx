import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";


const UpdateUser = () => {

    const {userData, backendUrl}= useContext(AppContext);
    const [isEdit, setIsEdit] = useState(false);
    const [resume, setResume] = useState(userData ? userData.profile.resume : null);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(userData ? userData.image : "");
    const [name, setName] = useState(userData ? userData.name : "");
    const [phone, setPhone] = useState(userData ? userData.phone : "");
    const [bio, setBio] = useState(userData ? userData.profile.bio : "");
    const [skills, setSkills] = useState(userData ? userData.profile.skills.join(", ") : "");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleResumeClick = (e) => {
        if(!resume){
            e.preventDefault();
            toast.error("No resume uploaded!");
        }
    };

    const handleUpdateUser = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("phone", phone);
        formData.append("bio", bio);
        formData.append("skills", skills);
        if(image){
            formData.append("image", image);
        }
        if(resume){
            formData.append("resume", resume);
        }

        const {data} = await axios.post(`${backendUrl}/api/users/profile/update`, formData, {
            withCredentials: true,
        });
        if(data.success){
            toast.success("Profile updated successfully!");
            window.location.reload();
        } else {
            toast.error(data.message);
        }
    }

  return (
    <div className="m-10">
        <h2 className="text-2xl font-bold mb-4">Update User Profile</h2>
        {/* Form fields for updating user profile */}
        <form className="space-y-4">

            <div>
                <label htmlFor="profileImage" className="cursor-pointer mb-4">
                <div className="w-32 h-32 rounded-full border-2 border-dashed border-sky-300 flex items-center justify-center bg-sky-50 text-sky-600 hover:bg-sky-100 transition">
                    {imagePreview ? <img src={imagePreview} alt="Preview" className="w-full h-full rounded-full object-cover" /> : <span className="text-4xl font-light">+</span>}
                </div>
            </label>
            <input type="file" id="profileImage" className="hidden" accept="image/*" onChange={handleImageChange} required />
            </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>    
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              onChange={(e)=> setName(e.target.value)}
              value={name}
            />
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700">
                Phone
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              onChange={(e)=> setPhone(e.target.value)}
              value={phone}
            />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700">
                Bio
            </label>
            <textarea
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              onChange={(e)=> setBio(e.target.value)}
              value={bio}
            ></textarea>
            </div>

              <div>
            <label className="block text-sm font-medium text-gray-700">
                Skills(comma separated)
            </label>
            <textarea
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={skills}
              onChange={(e)=> setSkills(e.target.value)}
            ></textarea>
            </div>  

    <div className="flex gap-2 mb-6 mt-3">
                {isEdit ? (
                <>
                    <label
                    className="flex items-center cursor-pointer"
                    htmlFor="resumeUpload"
                    >
                    <p className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2">
                        Select Resume
                    </p>
                    <input
                        id="resumeUpload"
                        onChange={(e) => setResume(e.target.files[0])}
                        accept="application/pdf"
                        type="file"
                        hidden
                    />
                    <img
                        className="cursor-pointer"
                        src={assets.profile_upload_icon}
                        alt=""
                    />
                    </label>
                    <button
                    onClick={(e) => setIsEdit(false)}
                    className="bg-green-100 border border-green-400 rounded-lg px-4 py-2 text-green-700 cursor-pointer"
                    >
                    Save
                    </button>
                    <button
                    onClick={(e) => setIsEdit(false)}
                    className="bg-red-100 border border-red-400 rounded-lg px-4 py-2 text-red-700 cursor-pointer"
                    >
                    Cancel
                    </button>
                </>
                ) : (
                <div className="flex gap-2">
                    <a
                    className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg"
                    href={`${userData.profile.resume}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleResumeClick}
                    >
                    View Resume
                    </a>
                    <button
                    onClick={() => setIsEdit(true)}
                    className="text-gray-500 border border-gray-300 rounded-lg px-4 py-2"
                    >
                    Edit
                    </button>
                </div>
                )}
            </div>
            

            <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={handleUpdateUser}
          >
            Update Profile
            </button>
        </form>
    </div>
  );
};
export default UpdateUser;