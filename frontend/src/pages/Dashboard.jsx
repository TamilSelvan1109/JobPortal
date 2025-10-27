import axios from "axios";
import { useContext, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const navigate = useNavigate();
  const { companyData, setCompanyData, setUserData, backendUrl } =
    useContext(AppContext);

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const logout = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/users/logout`, {
        withCredentials: true,
      });
      if (!data.success) return toast.error(data.message);

      toast.success("Logged out successfully");
      setUserData(null);
      setCompanyData(null);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "w-64" : "w-20"
          } bg-white border-r border-gray-300 h-screen flex-shrink-0 transition-width duration-300 sticky top-16`}
        >
          {/* Toggle Button */}
          <div className="flex justify-end p-2 sm:hidden">
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-md border border-gray-300"
            >
              {sidebarOpen ? "✕" : "☰"}
            </button>
          </div>

          <ul className="flex flex-col items-center sm:items-start pt-4 text-gray-800 h-full">
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                  isActive ? "bg-blue-100 border-r-4 border-blue-900" : ""
                }`
              }
              to="/recruiter/manage-jobs"
            >
              <img className="w-6 h-6" src={assets.home_icon} alt="" />
              <p className={`${sidebarOpen ? "block" : "hidden"} sm:block`}>
                Manage Jobs
              </p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                  isActive ? "bg-blue-100 border-r-4 border-blue-900" : ""
                }`
              }
              to="/recruiter/add-job"
            >
              <img className="w-6 h-6" src={assets.add_icon} alt="" />
              <p className={`${sidebarOpen ? "block" : "hidden"} sm:block`}>
                Add Job
              </p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                  isActive ? "bg-blue-100 border-r-4 border-blue-900" : ""
                }`
              }
              to="/recruiter/view-applications"
            >
              <img className="w-6 h-6" src={assets.person_tick_icon} alt="" />
              <p className={`${sidebarOpen ? "block" : "hidden"} sm:block`}>
                View Applications
              </p>
            </NavLink>

            {/* Logout */}
            <li
              className="flex items-center p-3 sm:px-6 gap-2 w-full mt-auto cursor-pointer hover:bg-red-100 text-red-600"
              onClick={logout}
            >
              <img className="w-6 h-6" src={assets.logout_icon} alt="Logout" />
              <p className={`${sidebarOpen ? "block" : "hidden"} sm:block`}>
                Logout
              </p>
            </li>
          </ul>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6 overflow-y-auto h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
