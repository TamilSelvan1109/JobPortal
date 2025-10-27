import axios from "axios";
import { FileEdit, FileText, LogOut, UserCircle } from "lucide-react";
import { useContext, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { AppContext } from "../context/AppContext";

const UserDashboard = () => {
  const { userData, setUserData, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
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
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "w-64" : "w-20"
          } flex flex-col items-center sm:items-start pt-4 text-gray-800 min-h-screen`}
          style={{ height: "calc(100vh - 4rem)" }}
        >
          {/* Toggle Button (mobile only) */}
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
                `flex items-center p-3 sm:px-6 gap-3 w-full hover:bg-gray-100 ${
                  isActive
                    ? "bg-blue-100 border-r-4 border-blue-900 text-blue-900 font-semibold"
                    : ""
                }`
              }
              to="/user/profile"
            >
              <UserCircle className="w-5 h-5" />
              <p className={`${sidebarOpen ? "block" : "hidden"} sm:block`}>
                My Profile
              </p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-3 w-full hover:bg-gray-100 ${
                  isActive
                    ? "bg-blue-100 border-r-4 border-blue-900 text-blue-900 font-semibold"
                    : ""
                }`
              }
              to="/user/edit"
            >
              <FileEdit className="w-5 h-5" />
              <p className={`${sidebarOpen ? "block" : "hidden"} sm:block`}>
                Edit Details
              </p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-3 w-full hover:bg-gray-100 ${
                  isActive
                    ? "bg-blue-100 border-r-4 border-blue-900 text-blue-900 font-semibold"
                    : ""
                }`
              }
              to="/user/applications"
            >
              <FileText className="w-5 h-5" />
              <p className={`${sidebarOpen ? "block" : "hidden"} sm:block`}>
                Applications
              </p>
            </NavLink>

            {/* Logout */}
            <li
              className="flex items-center p-3 sm:px-6 gap-3 w-full mt-auto cursor-pointer hover:bg-red-100 text-red-600"
              onClick={logout}
            >
              <LogOut className="w-5 h-5" />
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

export default UserDashboard;
