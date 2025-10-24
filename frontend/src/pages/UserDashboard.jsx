import React, { useContext, useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const UserDashboard=()=> {
  
  const { userData , setUserData, backendUrl} = useContext(AppContext)
  
  const navigate = useNavigate();

  const logout = async() => {
    try{
      const {data} = await axios.get(`${backendUrl}/api/users/logout`, { withCredentials: true });
      if(!data.success){
        return toast.error(data.message);
      }
      toast.success("Logged out successfully");
      setUserData(null);
      window.location.href = "/";
    }catch(error){
      toast.error(error.message);
    }
  }

    useEffect(() => {
  if (userData) {
    navigate("/user-dashboard/profile");
  }
}, [userData]);



  return (
    <div className="min-h-screen bg-gray-50">
      {/* --- Navbar for User Panel (from sample) --- */}
      <div className="shadow py-4 bg-white">
        <div className="px-5 flex justify-between items-center">
          <h1
            className="text-3xl font-extrabold cursor-pointer max-sm:w-32"
            onClick={() => navigate("/")}
          >
            <span className="text-blue-900">Spot</span>
            <span className="text-black">Jobs</span>
          </h1>

          {userData && (
            <div className="flex items-center gap-3">
              <p className="max-sm:hidden font-medium text-gray-700">Welcome, {userData.name}</p>
              <div className="relative group">
                <img
                  className="w-10 h-10 rounded-full border-2 border-blue-800 object-cover"
                  src={userData.image}
                  alt="User Avatar"
                />
                <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                  <ul className="list-none m-0 p-2 bg-white border border-gray-400 rounded-md text-sm">
                    <li
                      className="py-1 px-4 text-lg cursor-pointer pr-5 text-red-600 hover:text-white hover:bg-red-300"
                      onClick={logout}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-start">
        {/* --- Left Sidebar (from sample) --- */}
        <div className="sticky top-0 inline-block min-h-screen border-r-2 border-gray-200 bg-white">
          <ul className="flex flex-col items-start pt-4 text-gray-800">
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-3 w-full hover:bg-gray-100 ${
                  isActive ? `bg-blue-100 border-r-4 border-blue-900 text-blue-900 font-semibold` : ''
                }`
              }
              to={"/user-dashboard/profile"}
            >
              {/* <UserCircle className="w-5 h-5"/> */}
              <p className="max-sm:hidden">My Profile</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-3 w-full hover:bg-gray-100 ${
                  isActive ? `bg-blue-100 border-r-4 border-blue-900 text-blue-900 font-semibold` : ''
                }`
              }
              to={"/user-dashboard/edit-user"}
            >
              {/* <FileText className="w-5 h-5" /> */}
              <p className="max-sm:hidden">Edit Details</p>
            </NavLink>
          </ul>
        </div>
      
       <div>
          <Outlet/>
        </div>
        
      </div>
    </div>
  );
};


export default UserDashboard;