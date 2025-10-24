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
      window.location.href = "/";
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="shadow-sm bg-white py-4">
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
            <Link
              to="/applications"
              className="hover:text-blue-700 transition-none"
            >
              Applied Jobs
            </Link>
            <span className="text-gray-400">|</span>
            <p className="max-sm:hidden">Hi, {userData.name || "User"}</p>
            <div className="relative group">
              <img
                className="w-10 h-10 rounded-full border-2 border-blue-800 object-cover cursor-pointer"
                src={userData.image}
                alt="User Avatar"
              />
              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-blue-900 rounded pt-12">
                <ul className="list-none m-0 p-2 bg-white border border-gray-400 rounded-md text-sm">
                  <li>
                    <Link
                      to="/user-dashboard"
                      className="py-1 px-4 block text-lg text-blue-600 hover:bg-gray-100 rounded"
                    >
                      Profile
                    </Link>
                  </li>
                  <li
                    className="py-1 px-4 cursor-pointer text-lg text-red-600 hover:bg-red-300 hover:text-white rounded"
                    onClick={(e) => logout(e)}
                  >
                    Logout
                  </li>
                </ul>
              </div>
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
  );
};

export default Navbar;
