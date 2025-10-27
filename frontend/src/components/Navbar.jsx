import axios from "axios";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { setShowLogin, setIsLogin, userData, setUserData, backendUrl } =
    useContext(AppContext);

  const logout = async (e) => {
    e.stopPropagation();
    try {
      const { data } = await axios.get(`${backendUrl}/api/users/logout`, {
        withCredentials: true,
      });
      if (!data.success) {
        return toast.error(data.message);
      }
      toast.success("Logged out successfully");
      setUserData(null);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 shadow-sm bg-white py-4">
        <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
          {/* --- Logo --- */}
          <h1
            className="text-3xl font-extrabold tracking-tight cursor-pointer"
            onClick={() => navigate("/")}
          >
            <span className="text-blue-900">Spot</span>
            <span className="text-gray-800">Jobs</span>
          </h1>

          {/* --- Right Side (User Section) --- */}
          {userData ? (
            <div className="flex items-center gap-4 text-gray-700 font-medium">
              <Link to="/" className="hover:text-blue-700 transition-none">
                Home
              </Link>
              <span className="text-gray-400">|</span>

              {userData.role === "User" ? (
                <>
                  <Link
                    to="/user/profile"
                    className="hover:text-blue-700 transition-none"
                  >
                    Dashboard
                  </Link>
                  <span className="text-gray-400">|</span>
                  <Link
                    to="/user/applications"
                    className="hover:text-blue-700 transition-none"
                  >
                    Applied Jobs
                  </Link>
                  <span className="text-gray-400">|</span>
                </>
              ) : (
                <>
                  <Link
                    to="/recruiter/manage-jobs"
                    className="hover:text-blue-700 transition-none"
                  >
                    Dashboard
                  </Link>
                  <span className="text-gray-400">|</span>
                  <Link
                    to="/recruiter/view-applications"
                    className="hover:text-blue-700 transition-none"
                  >
                    View Applications
                  </Link>
                  <span className="text-gray-400">|</span>
                </>
              )}

              <p className="max-sm:hidden">Hi, {userData.name || "User"}</p>

              {/* Dropdown */}
              <div className="relative">
                <img
                  className="w-10 h-10 rounded-full border-2 border-blue-800 object-cover cursor-pointer"
                  src={userData.image}
                  alt="User Avatar"
                />
                <ul className="absolute right-0 mt-2 hidden group-hover:block bg-white border border-gray-300 rounded-md shadow-lg w-32">
                  <li
                    className="py-2 px-4 text-sm text-red-600 cursor-pointer hover:bg-red-100 rounded"
                    onClick={logout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex gap-3 max-sm:text-sm">
              {/* Sign Up Button */}
              <button
                onClick={() => {
                  setShowLogin(true);
                  setIsLogin(false);
                }}
                className="px-5 py-2 border border-blue-900 text-blue-700 font-medium rounded-full cursor-pointer
                   bg-white hover:bg-blue-50"
              >
                Sign Up
              </button>

              {/* Sign In Button */}
              <button
                onClick={() => {
                  setShowLogin(true);
                  setIsLogin(true);
                }}
                className="px-5 py-2 bg-blue-900 text-white font-medium rounded-full cursor-pointer
                   hover:bg-blue-800"
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Spacer to prevent content being hidden behind navbar */}
      <div className="pt-20"></div>
    </>
  );
};

export default Navbar;
